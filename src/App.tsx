import React, { useEffect, useReducer, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Board from './Board';
import { initGame, applyMove, type Direction, type GameState } from './game';

type Action =
  | { type: 'MOVE'; dir: Direction }
  | { type: 'RESTART' }
  | { type: 'SET_SIZE'; size: number };

const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'MOVE':
      return applyMove(state, action.dir);
    case 'RESTART':
      return initGame(state.size);
    case 'SET_SIZE':
      return initGame(action.size);
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initGame(4));

  const handleKey = useCallback((e: KeyboardEvent) => {
    const keyMap: Record<string, Direction> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      w: 'up',
      s: 'down',
      a: 'left',
      d: 'right',
    };
    const dir = keyMap[e.key];
    if (dir) {
      e.preventDefault();
      dispatch({ type: 'MOVE', dir });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div className="container text-center mt-4">
      <h1>2048 Game</h1>
<h6 style={{ display: 'inline', marginRight: '5px' }}>by</h6>
<h1 style={{ display: 'inline' }}>Exponent Energy</h1>


      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="fw-bold fs-5">Score: {state.score}</div>
        <div>
          <button className="btn btn-outline-primary me-2" onClick={() => dispatch({ type: 'RESTART' })}>
            Restart
          </button>
          <select
            className="form-select d-inline-block w-auto"
            value={state.size}
            onChange={(e) => dispatch({ type: 'SET_SIZE', size: parseInt(e.target.value) })}
          >
            {[3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}×{n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Board board={state.board} />

      <div className="mt-3">
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={() => dispatch({ type: 'MOVE', dir: 'up' })}>
            ↑
          </button>
        </div>
        <div className="btn-group mt-2">
          <button className="btn btn-secondary" onClick={() => dispatch({ type: 'MOVE', dir: 'left' })}>
            ←
          </button>
          <button className="btn btn-secondary" onClick={() => dispatch({ type: 'MOVE', dir: 'down' })}>
            ↓
          </button>
          <button className="btn btn-secondary" onClick={() => dispatch({ type: 'MOVE', dir: 'right' })}>
            →
          </button>
        </div>
      </div>

      {state.won && <div className="alert alert-success mt-3">🎉 You reached 2048!</div>}
      {state.over && <div className="alert alert-danger mt-3">💀 No moves left!</div>}
    </div>
  );
};

export default App;
