import React from "react";

const Palette = ({ palette, width, height }) => {
  const compare = ({ pos: pos1 }, { pos: pos2 }) => pos1 - pos2;
  const sortedPalette = [...palette].sort(compare);
  const gradientId = "_" + Math.random().toString(36).substr(2, 9);
  const gradientUrl = `url(#${gradientId})`;
  return (
    <div className="palette" style={{ width, height }}>
      <svg width="100%" height="100%">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0.5" x2="1" y2="0.5">
            {" "}
            {sortedPalette.map((c) => (
              <stop
                key={c.id}
                offset={c.pos}
                style={{ stopColor: c.color, stopOpacity: 1 }}
              />
            ))}
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill={gradientUrl} />
      </svg>
    </div>
  );
};

export default Palette;
