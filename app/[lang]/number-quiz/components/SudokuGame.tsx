'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { translate } from '@/lib/i18n/client';
import Button from '@/components/ui/button';

type Props = {
  lang: string;
}

export default function SudokuGame({ lang }: Props) {
  const [board, setBoard] = useState<number[][]>([]);
  const [initialBoard, setInitialBoard] = useState<number[][]>([]);
  const [message, setMessage] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const t = useCallback((key: string) => translate(lang, key), [lang]);

  const generateEmptyBoard = () => {
    return Array(9).fill(null).map(() => Array(9).fill(0));
  };

  const isValid = (board: number[][], row: number, col: number, num: number) => {
    // 行チェック
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
    }

    // 列チェック
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }

    // 3x3ブロックチェック
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }

    return true;
  };

  const solveSudoku = (board: number[][]) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const generateNewGame = useCallback(() => {
    const newBoard = generateEmptyBoard();
    solveSudoku(newBoard);
    
    const difficulty = (document.getElementById('difficulty') as HTMLSelectElement)?.value || '0.4';
    const cellsToRemove = Math.floor(81 * parseFloat(difficulty));

    const gameBoard = newBoard.map(row => [...row]);
    for (let i = 0; i < cellsToRemove; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * 9);
        col = Math.floor(Math.random() * 9);
      } while (gameBoard[row][col] === 0);
      gameBoard[row][col] = 0;
    }

    setBoard(gameBoard.map(row => [...row]));
    setInitialBoard(gameBoard.map(row => [...row]));
    setMessage('');
    setIsComplete(false);
  }, []);

  const handleCellChange = (row: number, col: number, value: string) => {
    if (initialBoard[row][col] !== 0) return;
    
    const newValue = value === '' ? 0 : parseInt(value);
    if (isNaN(newValue) || newValue < 0 || newValue > 9) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = newValue;
    setBoard(newBoard);
  };

  const checkSolution = () => {
    // 未入力のマスがあるかチェック
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          setMessage(t('numberQuiz.game.messages.incorrect'));
          setIsComplete(false);
          return;
        }
      }
    }

    // 解答が正しいかチェック
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const temp = board[i][j];
        board[i][j] = 0;
        if (!isValid(board, i, j, temp)) {
          board[i][j] = temp;
          setMessage(t('numberQuiz.game.messages.incorrect'));
          setIsComplete(false);
          return;
        }
        board[i][j] = temp;
      }
    }

    setMessage(t('numberQuiz.game.messages.complete'));
    setIsComplete(true);
  };

  useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="difficulty" className="text-lg">
          {t('numberQuiz.game.difficulty.label')}:
        </label>
        <select
          id="difficulty"
          className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          defaultValue="0.4"
          onChange={() => generateNewGame()}
        >
          <option value="0.3">{t('numberQuiz.game.difficulty.easy')}</option>
          <option value="0.4">{t('numberQuiz.game.difficulty.normal')}</option>
          <option value="0.6">{t('numberQuiz.game.difficulty.hard')}</option>
        </select>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg ${isComplete ? 'bg-green-600' : 'bg-red-600'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-9 gap-0.5 bg-purple-800 p-0.5 rounded-lg shadow-lg mb-6">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength={1}
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
              className={`
                w-12 h-12 text-center text-xl
                bg-gray-700 outline-none
                ${initialBoard[rowIndex][colIndex] !== 0 ? 'text-gray-400' : 'text-white'}
                ${(colIndex + 1) % 3 === 0 ? 'border-r-2 border-purple-800' : ''}
                ${(rowIndex + 1) % 3 === 0 ? 'border-b-2 border-purple-800' : ''}
              `}
            />
          ))
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={generateNewGame}
          variant="secondary"
        >
          {t('numberQuiz.game.buttons.newGame')}
        </Button>
        <Button
          onClick={checkSolution}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          {t('numberQuiz.game.buttons.checkSolution')}
        </Button>
      </div>
    </div>
  );
} 