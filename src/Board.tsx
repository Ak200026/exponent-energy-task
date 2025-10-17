// src/Board.tsx
import React from 'react';
import type { Board as BoardType, Cell } from './game';

interface BoardProps {
  board: BoardType;
}

const colorMap: Record<number, string> = {
  2: 'bg-light',
  4: 'bg-secondary text-white',
  8: 'bg-warning',
  16: 'bg-danger text-white',
  32: 'bg-danger text-white',
  64: 'bg-danger text-white',
  128: 'bg-info text-white',
  256: 'bg-primary text-white',
  512: 'bg-success text-white',
  1024: 'bg-dark text-white',
  2048: 'bg-success text-white fw-bold',
};

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="container text-center my-3">
      {board.map((row, i) => (
        <div key={i} className="d-flex justify-content-center">
          {row.map((cell: Cell, j) => {
            const value = cell ?? '';
            const tileClass = value ? colorMap[value] || 'bg-dark text-white' : 'bg-light';
            return (
              <div
                key={j}
                className={`border d-flex align-items-center justify-content-center ${tileClass}`}
                style={{
                  width: '80px',
                  height: '80px',
                  margin: '4px',
                  fontSize: '22px',
                  borderRadius: '6px',
                  fontWeight: 700,
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
