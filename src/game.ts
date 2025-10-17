// src/game.ts
export type Cell = number | null;
export type Board = Cell[][];

export interface GameState {
  board: Board;
  score: number;
  won: boolean;
  over: boolean;
  size: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

export const makeEmptyBoard = (size: number): Board =>
  range(size).map(() => range(size).map(() => null));

export const spawnRandomTile = (board: Board): Board => {
  const empty: [number, number][] = [];
  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === null) empty.push([r, c]);
    }
  }
  if (empty.length === 0) return board;

  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  const newBoard = board.map((row) => [...row]);
  newBoard[r][c] = value;
  return newBoard;
};

export const initGame = (size = 4): GameState => {
  let board = makeEmptyBoard(size);
  board = spawnRandomTile(board);
  board = spawnRandomTile(board);
  return { board, score: 0, won: false, over: false, size };
};

const transpose = (b: Board): Board => b[0].map((_, c) => b.map((r) => r[c]));

const collapseLine = (line: Cell[]): { newLine: Cell[]; gained: number } => {
  const nonEmpty = line.filter((v) => v !== null) as number[];
  const merged: number[] = [];
  let gained = 0;
  for (let i = 0; i < nonEmpty.length; i++) {
    if (nonEmpty[i] === nonEmpty[i + 1]) {
      const m = nonEmpty[i] * 2;
      merged.push(m);
      gained += m;
      i++;
    } else merged.push(nonEmpty[i]);
  }
  const finalLine = [...merged, ...Array(line.length - merged.length).fill(null)];
  return { newLine: finalLine, gained };
};

export const move = (board: Board, dir: Direction) => {
  let newBoard: Board = board.map((r) => [...r]);
  let gained = 0;
  let moved = false;

  const operate = (rows: Board) =>
    rows.map((row) => {
      const { newLine, gained: g } = collapseLine(row);
      if (JSON.stringify(newLine) !== JSON.stringify(row)) moved = true;
      gained += g;
      return newLine;
    });

  if (dir === 'left') newBoard = operate(newBoard);
  else if (dir === 'right') newBoard = operate(newBoard.map((r) => [...r].reverse())).map((r) => [...r].reverse());
  else if (dir === 'up') newBoard = transpose(operate(transpose(newBoard)));
  else if (dir === 'down')
    newBoard = transpose(operate(transpose(newBoard).map((r) => [...r].reverse()))).map((r) => [...r].reverse());

  return { newBoard, gained, moved };
};

const hasEmpty = (board: Board) => board.some((r) => r.some((c) => c === null));

const canMove = (board: Board) => {
  if (hasEmpty(board)) return true;
  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const v = board[r][c];
      if (r + 1 < size && board[r + 1][c] === v) return true;
      if (c + 1 < size && board[r][c + 1] === v) return true;
    }
  }
  return false;
};

const hasWon = (board: Board) => board.some((r) => r.some((c) => (c ?? 0) >= 2048));

export const applyMove = (state: GameState, dir: Direction): GameState => {
  if (state.over || state.won) return state;
  const { newBoard, gained, moved } = move(state.board, dir);
  if (!moved) return state;

  const afterMove = spawnRandomTile(newBoard);
  const won = hasWon(afterMove);
  const over = !canMove(afterMove);

  return { ...state, board: afterMove, score: state.score + gained, won, over };
};
