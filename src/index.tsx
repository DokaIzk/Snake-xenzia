import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameScreen } from "./screens/GameScreen/GameScreen";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <GameScreen />
  </StrictMode>,
);
