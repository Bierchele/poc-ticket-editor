import { fabric } from "fabric";

export const addImage = (canvas: any, image: any, { width, height }: any) => {
 
  fabric.Image.fromURL(image, function (myImg) {
    //i create an extra var for to change some image properties
    var img1: any = myImg.set({
      left: 30, 
      height: myImg.height,
      width: myImg.width,
      snapAngle: 90
    });
    console.log(myImg.width, myImg.height)
    img1.scaleToHeight(width);
    img1.scaleToWidth(height);
    img1.setControlsVisibility({
      tl: true, //top-left
      mt: false, // middle-top
      tr: true, //top-right
      ml: false, //middle-left
      mr: false, //middle-right
      bl: true, // bottom-left
      mb: false, //middle-bottom<
      br: true, //bottom-right
    });
    canvas.add(img1);
  });
};
