import { useState, useCallback } from 'react';

export type GameState = 'start' | 'playing' | 'paused' | 'gameOver';

export interface GameStats {
  score: number;
  timeLeft: number;
  level: number;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    timeLeft: 300,
    level: 1,
  });

  const startGame = useCallback(() => {
    setGameState('playing');
    setGameStats({
      score: 0,
      timeLeft: 300,
      level: 1,
    });
  }, []);

  const pauseGame = useCallback(() => {
    setGameState('paused');
  }, []);

  const resumeGame = useCallback(() => {
    setGameState('playing');
  }, []);

  const endGame = useCallback(() => {
    setGameState('gameOver');
  }, []);

  const resetGame = useCallback(() => {
    setGameState('start');
    setGameStats({
      score: 0,
      timeLeft: 300,
      level: 1,
    });
  }, []);

  const updateScore = useCallback((points: number) => {
    setGameStats(prev => ({
      ...prev,
      score: prev.score + points,
    }));
  }, []);

  const updateTimeLeft = useCallback((time: number) => {
    setGameStats(prev => ({
      ...prev,
      timeLeft: Math.max(0, time),
    }));
  }, []);

  return {
    gameState,
    gameStats,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    resetGame,
    updateScore,
    updateTimeLeft,
  };
};