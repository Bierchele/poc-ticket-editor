import { fabric } from "fabric";

export const initCanvas = (width: number, height: number) => {
  return new fabric.Canvas("canvas", {
    width: width,
    height: height,
  });
  
};
