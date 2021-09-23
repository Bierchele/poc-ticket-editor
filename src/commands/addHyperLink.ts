import { fabric } from "fabric";

interface withTextType extends fabric.ITextOptions {
  textType: string;
  url: string
}

export const addHyperLink = (text: string, canvas: any) => {
  let fabricText = new fabric.IText(text, {
    width: 50,
    height: 50,
    top: 0,
    left: 0,
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Arial",
    fontStyle: "normal",
    underline: true,
    overline: true,
    fill: "#453f90",
    borderColor: "#000000",
    textType: "hyperlink",
    url: ""
  } as withTextType);

  canvas.add(fabricText);
};
