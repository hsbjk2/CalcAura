import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  displayMode?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, displayMode = false, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !math) return;
    try {
      katex.render(math, containerRef.current, {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml',
        trust: true,
      });
    } catch {
      if (containerRef.current) {
        containerRef.current.textContent = math;
      }
    }
  }, [math, displayMode]);

  if (displayMode) {
    return (
      <div className="w-full max-w-full overflow-x-auto overflow-y-visible py-1.5 px-1 thin-scrollbar text-center min-w-0">
        <div
          ref={containerRef}
          className={`inline-block min-w-0 max-w-full text-center text-slate-800 dark:text-slate-200 ${className}`}
        />
      </div>
    );
  }

  return (
    <span className="inline-block max-w-full overflow-x-auto overflow-y-visible align-middle py-0.5 px-0.5 thin-scrollbar min-w-0">
      <span
        ref={containerRef}
        className={`inline-block min-w-0 text-slate-800 dark:text-slate-200 ${className}`}
      />
    </span>
  );
};
