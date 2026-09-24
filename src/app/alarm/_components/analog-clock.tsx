const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
const ticks = Array.from({ length: 60 }, (_, i) => i);

function Hand({
  angle,
  length,
  width,
  color = "black",
}: {
  angle: number;
  length: number;
  width: number;
  color?: string;
}) {
  return (
    <line
      x1="100"
      y1="112"
      x2="100"
      y2={100 - length}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      transform={`rotate(${angle} 100 100)`}
    />
  );
}

export function AnalogClock({ date }: { date: Date | null }) {
  const seconds = date?.getSeconds() ?? 0;
  const minutes = (date?.getMinutes() ?? 0) + seconds / 60;
  const hours = ((date?.getHours() ?? 0) % 12) + minutes / 60;

  return (
    <svg viewBox="0 0 200 200" className="size-60" role="img" aria-label="Reloj">
      <defs>
        <linearGradient id="clock-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e5e5e5" />
          <stop offset="100%" stopColor="#9a9a9a" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#clock-rim)" />
      <circle cx="100" cy="100" r="90" fill="white" />
      {ticks.map((i) => (
        <line
          key={i}
          x1="100"
          y1="13"
          x2="100"
          y2={i % 5 === 0 ? 20 : 16}
          stroke="black"
          strokeWidth={i % 5 === 0 ? 2 : 1}
          transform={`rotate(${i * 6} 100 100)`}
        />
      ))}
      {numbers.map((n) => {
        const angle = (n * 30 * Math.PI) / 180;
        return (
          <text
            key={n}
            x={100 + 66 * Math.sin(angle)}
            y={100 - 66 * Math.cos(angle)}
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold text-[20px]"
          >
            {n}
          </text>
        );
      })}
      {date && (
        <>
          <Hand angle={hours * 30} length={45} width={5} />
          <Hand angle={minutes * 6} length={70} width={3} />
          <Hand angle={seconds * 6} length={78} width={1} color="#333" />
        </>
      )}
      <circle cx="100" cy="100" r="4" fill="black" />
    </svg>
  );
}
