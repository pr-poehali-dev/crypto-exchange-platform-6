import { useMemo } from "react";

interface PriceChartProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

const PriceChart = ({ data, color, width = 120, height = 40 }: PriceChartProps) => {
  const path = useMemo(() => {
    if (data.length < 2) return "";
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((val, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - ((val - min) / range) * (height - 4) - 2,
    }));

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 3;
      const cp1y = points[i - 1].y;
      const cp2x = points[i].x - (points[i].x - points[i - 1].x) / 3;
      const cp2y = points[i].y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i].x} ${points[i].y}`;
    }
    return d;
  }, [data, width, height]);

  const gradientId = useMemo(() => `grad-${Math.random().toString(36).slice(2)}`, []);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {path && (
        <>
          <path
            d={`${path} L ${width} ${height} L 0 ${height} Z`}
            fill={`url(#${gradientId})`}
          />
          <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
};

export default PriceChart;
