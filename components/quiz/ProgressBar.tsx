import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-sm mx-auto mb-6 px-1">
      <div className="flex justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-brand-muted mb-3">
        <span>Assessment Progress</span>
        <span>{current} / {total}</span>
      </div>
      <div className="h-[3px] w-full bg-brand-line/30 rounded-full overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full bg-brand-accent transition-all duration-500 ease-out"
        />
      </div>
    </div>
  );
};
