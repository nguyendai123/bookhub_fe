export const captureHighlight = (selection, pageNumber) => {
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);

  // 🔥 lấy text layer container
  const textLayer = range.startContainer.parentElement.closest(
    ".react-pdf__Page__textContent"
  );

  if (!textLayer) return null;

  const containerRect = textLayer.getBoundingClientRect();

  const rects = Array.from(range.getClientRects()).map((r) => ({
    x: r.left - containerRect.left,
    y: r.top - containerRect.top,
    width: r.width,
    height: r.height,
  }));

  return {
    text: selection.toString(),
    pageNumber,
    rects,
  };
};
