import React, { useEffect, useState } from "react";
import { TicketCanvas } from "./components/TicketCanvas/TicketCanvas";
import { MoveablePanel } from "./components/Panels/MoveablePanel";
import { initCanvas } from "./components/TicketCanvas/initCanvas";
import { fabric } from "fabric";
import { CanvasOptionPanel } from "./components/Panels/CanvasOptionPanel";

function App() {
  const [canvas, setCanvas] = useState<any>();

  useEffect(() => {
    setCanvas(initCanvas(800, 350));
  }, []);

  const keyPress = (e: any) => {
    return e.key;
  };

  return (
    <div className="App">
      <div className="d-flex justify-content-center mt-5 mb-5">
        <TicketCanvas canvas={canvas} />
      </div>
      <MoveablePanel canvas={canvas} keyPress={keyPress} />
      <CanvasOptionPanel canvas={canvas}/> 
    </div>
  );
}

export default App;
