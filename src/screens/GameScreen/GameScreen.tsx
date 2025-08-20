import React, { useState, useEffect, useCallback } from "react";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";

const GRID_SIZE = 24;
const BOARD_WIDTH = 312;
const BOARD_HEIGHT = 528;

const getRandomCoordinate = () => {
  const x = Math.floor(Math.random() * (BOARD_WIDTH / GRID_SIZE)) * GRID_SIZE;
  const y = Math.floor(Math.random() * (BOARD_HEIGHT / GRID_SIZE)) * GRID_SIZE;
  return { x, y };
};

export const GameScreen = (): JSX.Element => {
  const [snake, setSnake] = useState([{ x: 144, y: 240 }]);
  const [food, setFood] = useState(getRandomCoordinate());
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"initial" | "playing" | "gameOver">("initial");

  const handleStart = () => {
    setSnake([{ x: 144, y: 240 }]);
    setFood(getRandomCoordinate());
    setDirection("RIGHT");
    setSpeed(200);
    setGameOver(false);
    setScore(0);
    setGameState("playing");
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    },
    [direction]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameState !== "playing" || gameOver) return;

    const gameInterval = setInterval(() => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case "UP":
          head.y -= GRID_SIZE;
          break;
        case "DOWN":
          head.y += GRID_SIZE;
          break;
        case "LEFT":
          head.x -= GRID_SIZE;
          break;
        case "RIGHT":
          head.x += GRID_SIZE;
          break;
      }

      // Wall collision
      if (head.x < 0 || head.x >= BOARD_WIDTH || head.y < 0 || head.y >= BOARD_HEIGHT) {
        setGameOver(true);
        setGameState("gameOver");
        return;
      }

      // Self collision
      for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          setGameOver(true);
          setGameState("gameOver");
          return;
        }
      }

      newSnake.unshift(head);

      // Food eating
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(getRandomCoordinate());
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }, speed);

    return () => clearInterval(gameInterval);
  }, [snake, direction, speed, gameOver, food, gameState]);

  return (
    <main className="bg-[#1c1c1c] grid justify-items-center [align-items:start] w-screen min-h-screen">
      <div className="bg-[#1c1c1c] w-[360px] h-[780px] relative">
        {/* Score display */}
        <header className="flex items-center justify-between px-6 pt-8">
          <img
            className="w-[88px] h-[30px] object-cover"
            alt="Snake logo"
            src="/image-2.png"
          />

          <div className="flex items-center gap-1">
            <img
              className="w-[74px] h-[77px]"
              alt="Score icon"
              src="/component-1.svg"
            />
            <span className="font-headline-h1-demibold-eu-headinglarge text-[#fd4e3d] text-[length:var(--headline-h1-demibold-eu-headinglarge-font-size)] leading-[var(--headline-h1-demibold-eu-headinglarge-line-height)] font-[number:var(--headline-h1-demibold-eu-headinglarge-font-weight)] tracking-[var(--headline-h1-demibold-eu-headinglarge-letter-spacing)] [font-style:var(--headline-h1-demibold-eu-headinglarge-font-style)]">
              {score}
            </span>
          </div>
        </header>

        {/* Game area */}
        <section className="absolute w-[312px] h-[528px] top-[77px] left-6 bg-lightcolortext-03 rounded-lg overflow-hidden shadow-[inset_2px_2px_5px_#00000099]">
          <div className="relative w-[312px] h-[528px]">
            <img
              className="absolute w-full h-full object-cover"
              alt="Game background"
              src="/image-3.png"
            />

            {gameState === "initial" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button onClick={handleStart} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-2xl">
                  Start Game
                </Button>
              </div>
            )}

            {gameState === "gameOver" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                <h2 className="text-white text-4xl font-bold mb-4">Game Over</h2>
                <Button onClick={handleStart} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Restart
                </Button>
              </div>
            )}

            {gameState === "playing" && (
              <>
                {/* Render Snake */}
                {snake.map((segment, index) => (
                  <div
                    key={index}
                    className="absolute w-6 h-6 bg-green-500 rounded-sm"
                    style={{ top: segment.y, left: segment.x }}
                  />
                ))}

                {/* Render Food */}
                <div
                  className="absolute w-6 h-6 bg-red-500 rounded-full"
                  style={{ top: food.y, left: food.x }}
                />
              </>
            )}
          </div>
        </section>

        {/* Time display and progress bar */}
        <div className="absolute top-[610px] left-[30px] w-[300px]">
          <Progress value={100} className="h-0.5 bg-[#b0ee62]" />
        </div>

        <div className="absolute top-[617px] left-[135px] inline-flex items-start">
          <span className="relative w-[62px] mt-[-1.00px] font-body-b-3-regular-eu-bodysmall font-[number:var(--body-b-3-regular-eu-bodysmall-font-weight)] text-[#b0ee62] text-[length:var(--body-b-3-regular-eu-bodysmall-font-size)] tracking-[var(--body-b-3-regular-eu-bodysmall-letter-spacing)] leading-[var(--body-b-3-regular-eu-bodysmall-line-height)] [font-style:var(--body-b-3-regular-eu-bodysmall-font-style)]">
            TIME LEFT:
          </span>
          <span className="relative w-fit mt-[-1.00px] [font-family:'Mulish',Helvetica] font-normal text-white text-xs tracking-[0] leading-4 whitespace-nowrap">
            300
          </span>
          <span className="relative w-fit mt-[-1.00px] font-body-b-3-regular-eu-bodysmall font-[number:var(--body-b-3-regular-eu-bodysmall-font-weight)] text-white text-[length:var(--body-b-3-regular-eu-bodysmall-font-size)] tracking-[var(--body-b-3-regular-eu-bodysmall-letter-spacing)] leading-[var(--body-b-3-regular-eu-bodysmall-line-height)] whitespace-nowrap [font-style:var(--body-b-3-regular-eu-bodysmall-font-style)]">
            s
          </span>
        </div>

        {/* Control buttons */}
        <div className="absolute bottom-[45px] left-7 flex gap-[18px]">
          <Button
            className="w-[143px] h-[85px] bg-[#242424] rounded-2xl border border-solid border-[#303030] shadow-[inset_0px_-12px_0px_#0000008c] hover:bg-[#2a2a2a] h-auto"
            variant="ghost"
          >
            <img
              className="w-[23px] h-[26px]"
              alt="Left arrow"
              src="/polygon-1.svg"
            />
          </Button>

          <Button
            className="w-[143px] h-[85px] bg-[#242424] rounded-2xl border border-solid border-[#303030] shadow-[inset_0px_-12px_0px_#0000008c] hover:bg-[#2a2a2a] h-auto"
            variant="ghost"
          >
            <img
              className="w-[23px] h-[26px]"
              alt="Right arrow"
              src="/polygon-1-1.svg"
            />
          </Button>
        </div>
      </div>
    </main>
  );
};
