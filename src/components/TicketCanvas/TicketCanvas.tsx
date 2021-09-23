import React, { useEffect, useState } from "react";
import { fabric } from "fabric";

interface IRectWithId extends fabric.IRectOptions {
  id: string;
}


const TicketCanvas = (props: any) => {
  const addZoomRect = () => {
    
    const rect = new fabric.Rect({
      width: props.canvas.getWidth() + 1,
      height: props.canvas.getHeight() + 1,
      left: -1,
      top: -1,
      fill: "white",
      stroke: "grey",
      selectable: false,
      id: "zoomRect",
    } as IRectWithId);
    props.canvas.add(rect);

  };

  if (props.canvas) {
    addZoomRect();
    props.canvas.on("object:moving", function (e: any) {
      var obj = e.target;
      // if object is too big ignore
      if (
        obj.currentHeight > obj.canvas.height ||
        obj.currentWidth > obj.canvas.width
      ) {
        return;
      }
      obj.setCoords();
      // top-left  corner
      if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 30) {
        obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
        obj.left = Math.max(
          obj.left,
          obj.left - obj.getBoundingRect().left + 30
        );
      }
      // bot-right corner
      if (
        obj.getBoundingRect().top + obj.getBoundingRect().height >
          obj.canvas.height ||
        obj.getBoundingRect().left + obj.getBoundingRect().width >
          obj.canvas.width - 30
      ) {
        obj.top = Math.min(
          obj.top,
          obj.canvas.height -
            obj.getBoundingRect().height +
            obj.top -
            obj.getBoundingRect().top
        );
        obj.left = Math.min(
          obj.left,
          obj.canvas.width -
            obj.getBoundingRect().width +
            obj.left -
            obj.getBoundingRect().left -
            30
        );
      }
    });

    //Invisible rasta for moving objects
    props.canvas.on("object:moving", function (options: any) {
      options.target.set({
        //left: Math.round(options.target.left / 10) * 10,
        //top: Math.round(options.target.top / 10) * 10,
      });
    });

    props.canvas.on("mouse:wheel", (opt: any) => {
      var delta = opt.e.deltaY;

      var zoom = props.canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 1) {
        zoom = 1;
      }
      if (zoom < 0.5) {
        zoom = 0.5;
      }
      props.canvas.zoomToPoint(
        { x: props.canvas.width / 2, y: props.canvas.height / 2 },
        zoom
      );
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }
  return (
    <div>
      <canvas className="border" id="canvas" />
    </div>
  );
};

export { TicketCanvas };
