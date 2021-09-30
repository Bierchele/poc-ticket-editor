import { openImageFile } from "./openImageFile";
import { image } from "html2canvas/dist/types/css/types/image";
import { fabric } from "fabric";
import { createElement } from "react";

export const rasterizeSVG = (canvas: any) => {
  return canvas.toSVG();
  /*
  const imgData = canvas.toDataURL("image/JPEG", 1);
 
  const outerSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const myImage = document.createElementNS(
    "http://www.w3.org/2000/image",
    "image"
  );
  const g = document.createElementNS("http://www.w3.org/2000/g", "g");

  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("viewBox", `0 0 ${canvas.width} ${canvas.height}`);
  svg.setAttribute("xml:space", "preserve")
  svg.setAttribute("width", canvas.width);
  svg.setAttribute("height", canvas.height)
  g.setAttribute("transform", `matrix(1.0 0 0 0.1 ${canvas.width} ${canvas.height})`);
  
  myImage.setAttribute("xlink:href", imgData);
  myImage.setAttribute("fill-rule", "nonzero");
 
  g.appendChild(myImage);
  svg.appendChild(g);
  outerSvg.appendChild(svg);
 console.log(outerSvg.innerHTML);
 */

};
