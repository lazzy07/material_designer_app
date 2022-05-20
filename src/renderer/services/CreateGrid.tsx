import React from "react";

export const createGrid = (
  color: string,
  width: number,
  height: number,
  zoom: number,
  x: number,
  y: number
) => {
  return (
    <svg
      style={{ zIndex: -1000 }}
      width="100%"
      height="100%"
      viewBox={`${x} ${y} ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="smallGrid"
          width={8 * zoom}
          height={8 * zoom}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${8 * zoom} 0 L 0 0 0 ${8 * zoom}`}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
        </pattern>
        <pattern
          id="grid"
          width={80 * zoom}
          height={80 * zoom}
          patternUnits="userSpaceOnUse"
        >
          <rect width={80 * zoom} height={80 * zoom} fill="url(#smallGrid)" />
          <path
            d={`M ${80 * zoom} 0 L 0 0 0 ${80 * zoom}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
};

export const createGrid2 = (
  color: string,
  width: number,
  height: number,
  zoom: number,
  x: number,
  y: number
) => {
  return (
    <svg
      style={{ zIndex: -1000 }}
      width="100%"
      height="100%"
      viewBox={`${x} ${y} ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="smallGrid1"
          width={8 * zoom}
          height={8 * zoom}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${8 * zoom} 0 L 0 0 0 ${8 * zoom}`}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
        </pattern>
        <pattern
          id="grid1"
          width={80 * zoom}
          height={80 * zoom}
          patternUnits="userSpaceOnUse"
        >
          <rect width={80 * zoom} height={80 * zoom} fill="url(#smallGrid1)" />
          <path
            d={`M ${80 * zoom} 0 L 0 0 0 ${80 * zoom}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid1)" />
    </svg>
  );
};
