export const renderAIHighlightRects = (position, pageElement, remaining) => {
  const fuzzyIndexOf = (source, target) => {
    let i = 0;
    let j = 0;

    while (i < source.length && j < target.length) {
      if (source[i] === target[j]) {
        j++;
      }
      i++;
    }

    return j === target.length ? i - j : -1;
  };

  const normalize = (str = "") =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, ""); // ❗ bỏ luôn space

  if (!position || position.type !== "TEXT_RANGE") return [];
  if (!position.exact) return [];

  const textLayer = pageElement.querySelector(".react-pdf__Page__textContent");
  if (!textLayer) return [];

  const exact = position.exact;
  const anchor = exact.split(" ").slice(0, 3).join(" ");

  const normAnchor = normalize(anchor);

  const walker = document.createTreeWalker(textLayer, NodeFilter.SHOW_TEXT);

  let startNode = null;
  let startOffset = 0;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const raw = node.textContent || "";
    const normRaw = normalize(raw);

    const idx = fuzzyIndexOf(normRaw, normAnchor);

    if (idx !== -1) {
      startNode = node;

      // map ngược offset (approx)
      startOffset = Math.floor((idx / normRaw.length) * raw.length);

      break;
    }
  }

  if (!startNode) {
    console.warn("❌ Cannot fuzzy-match AI highlight");
    return [];
  }
  const range = document.createRange();
  range.setStart(startNode, startOffset);

  // 👉 walker mới để đi tiếp từ startNode
  const forwardWalker = document.createTreeWalker(
    textLayer,
    NodeFilter.SHOW_TEXT,
  );

  forwardWalker.currentNode = startNode;

  let endNode = startNode;
  let endOffset = startOffset;
  let previousNode = null;

  while (forwardWalker.currentNode && remaining > 0) {
    const node = forwardWalker.currentNode;
    const text = node.textContent || "";

    let available =
      node === startNode ? text.length - startOffset : text.length;

    if (available >= remaining) {
      endNode = node;

      if (node === startNode) {
        endOffset = startOffset + remaining;
      } else {
        endOffset = remaining;
      }

      break;
    }

    remaining -= available;
    previousNode = node;
    forwardWalker.nextNode();
  }

  if (previousNode && endNode !== startNode) {
    endNode = previousNode;
    endOffset = previousNode.textContent.length;
  }

  range.setEnd(endNode, endOffset);
  const containerRect = textLayer.getBoundingClientRect();

  return Array.from(range.getClientRects()).map((r) => ({
    x: r.left - containerRect.left,
    y: r.top - containerRect.top,
    width: r.width,
    height: r.height,
  }));
};
