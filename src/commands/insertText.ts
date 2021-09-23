import { fabric } from "fabric";

export const insertText = (text: string, canvas: any) => {
  let fabricText = new fabric.Textbox(text, {
    width: 50,
    height: 50,
    top: 0,
    left: 0,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Arial",
    fontStyle: "normal",
    underline: false,
    fill: "#000000",
    borderColor: "#000000",
    strokeWidth: 1,
    stroke: "black",
    
  });



  canvas.add(fabricText);
};
