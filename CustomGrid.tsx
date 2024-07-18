'use client';

import React, { ReactNode } from 'react';

interface CustomGridProps {
  cells: CellConfig[];
  columns?: number;
  gap?: string;
  horizontalGap?: string;
  verticalGap?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CellConfig {
  content: ReactNode;
  colSpan: number;
  rowSpan: number;
  className?: string;
  style?: React.CSSProperties;
}

const CustomGrid: React.FC<CustomGridProps> = ({
  cells,
  // The default value is 12 'cause it is a magical number that lets u implement whatever structure.
  columns = 12,
  gap,
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'grid',
        // Set the number of columns dynamically
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        // Set the gaps between grid items
        gap: `${gap}`,
        ...style,
      }}
    >
      {cells.map((cell, index) => (
        <div
          key={index}
          // Add custom class if provided
          className={cell.className}
          style={{
            // Handle -1 for colSpan to span till the end
            gridColumn:
              cell.colSpan === -1 ? `span ${columns}` : `span ${cell.colSpan}`,
            // Handle rowSpan for the cell
            gridRow: `span ${cell.rowSpan}`,
            // Custom styles
            ...cell.style,
          }}
        >
          {cell.content} {/* Render the cell content */}
        </div>
      ))}
    </div>
  );
};

export default CustomGrid;
