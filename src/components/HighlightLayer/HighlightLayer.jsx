const HighlightLayer = ({ page, highlights }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      {highlights
        .filter((h) => String(h.pageNumber) === String(page))
        .flatMap((h) => {
          let rects = [];

          try {
            rects = JSON.parse(h.position || "[]");
          } catch (e) {
            console.error("Invalid highlight position JSON", e);
          }

          return rects.map((r, i) => (
            <div
              key={`${h.id || h.highlightId}-${i}`}
              style={{
                position: "absolute",
                left: `${r.x}px`,
                top: `${r.y}px`,
                width: `${r.width}px`,
                height: `${r.height}px`,
                background:
                  h.source === "AI"
                    ? "rgba(255,77,79,0.3)"
                    : "rgba(24,144,255,0.3)",
                borderRadius: 4,
              }}
            />
          ));
        })}
    </div>
  );
};
export default HighlightLayer;
