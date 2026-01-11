import { useEffect, useState } from "react";
import { renderAIHighlightRects } from "../../hooks/renderAIHighlightRects";

const HighlightLayer = ({ page, highlights }) => {
  const [rects, setRects] = useState([]);
  useEffect(() => {
    let observer;
    let cancelled = false;

    const pageEl = document.querySelector(
      `.react-pdf__Page[data-page-number="${page}"]`
    );

    if (!pageEl) return;

    const renderHighlights = () => {
      if (cancelled) return;

      const textLayer = pageEl.querySelector(".react-pdf__Page__textContent");
      if (!textLayer) return;

      let allRects = [];

      highlights
        .filter((h) => String(h.pageNumber) === String(page))
        .forEach((h) => {
          // USER
          if (h.source === "USER") {
            try {
              const userRects = JSON.parse(h.position || "[]");
              allRects.push(
                ...userRects.map((r) => ({
                  ...r,
                  source: "USER",
                }))
              );
            } catch {}
          }

          // AI
          if (h.source === "AI") {
            try {
              const position =
                typeof h.position === "string"
                  ? JSON.parse(h.position)
                  : h.position;

              const aiRects = renderAIHighlightRects(
                position,
                pageEl,
                h.text.length
              );

              if (aiRects?.length) {
                allRects.push(
                  ...aiRects.map((r) => ({
                    ...r,
                    source: "AI",
                  }))
                );
              }
            } catch {}
          }
        });

      setRects(allRects);
    };

    // 👉 chạy ngay nếu textLayer đã tồn tại
    renderHighlights();

    // 👉 theo dõi DOM thay đổi (PDF reload, zoom, render lại)
    observer = new MutationObserver(renderHighlights);
    observer.observe(pageEl, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [page, highlights]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      {rects.map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: r.width,
            height: r.height,

            background:
              r.source === "AI"
                ? "rgba(255, 77, 79, 0.35)" // 🔴 AI
                : "rgba(24, 144, 255, 0.35)", // 🔵 USER

            borderRadius: 3,
          }}
        />
      ))}
    </div>
  );
};

export default HighlightLayer;
