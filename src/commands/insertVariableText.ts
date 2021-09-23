import { fabric } from "fabric";

export const insertVariableText = (text: string, canvas: any) => {
  let fabricText = new fabric.IText(text, {
    top: 100,
    left: 100,
    fontSize: 15,
    textAlign: "left",
    fontFamily: "Arial",
    fontStyle: "normal",
    fill: "#453f90",
    fontWeight: "bold",
    underline: false
  });
  canvas.add(fabricText);
};
