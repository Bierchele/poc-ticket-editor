import { fabric } from "fabric";
import { CSSProperties, useEffect, useState } from "react";
import { uploadBackground } from "../../commands/uploadBackground";

const panelStyle = {
  width: "200px",
  height: "300px",
  float: "right",
  right: "100px",
  top: "100px",
  position: "absolute",
} as CSSProperties;

const CanvasOptionPanel = (props: any) => {
  const [canvasSize, setCanvasSize] = useState({
    width: 800,
    height: 600,
  });

  useEffect(() => {
    if (props.canvas) {
      props.canvas.setDimensions(canvasSize);
      props.canvas.getObjects().forEach(function (o: any) {
        if (o.id === "zoomRect") {
          props.canvas.setActiveObject(o);
          const activeObj = props.canvas.getActiveObject();
          activeObj?.setOptions({
            width: canvasSize.width + 1,
            height: canvasSize.height + 1,
            left: -1,
            top: -1,
            fill: "white",
            stroke: "grey",
            selectable: false,
            id: "zoomRect",
          });
        }
        props.canvas.discardActiveObject();
      });
      /*
      props.canvas.add(
        new fabric.Line([30, 1, 30, props.canvas.height], {
          strokeDashArray: [5, 5],
          stroke: "grey",
          selectable: false,
        })
      );
      props.canvas.add(
        new fabric.Line(
          [props.canvas.width - 30, 1, props.canvas.width - 30, props.canvas.height],
          {
            strokeDashArray: [5, 5],
            stroke: "grey",
            selectable: false,
          }
        )
      );
      */
    }
  }, [canvasSize]);

  const parseValueToWitdh = (value: string) => {
    return parseInt(value.substring(0, value.indexOf("*")));
  };

  const parseValueToHeight = (value: string) => {
    return parseInt(value.substring(value.indexOf("*") + 1));
  };

  return (
    <div style={panelStyle} className="border">
      <select
        className="w-100"
        onChange={(e) =>
          setCanvasSize({
            width: parseValueToWitdh(e.target.value),
            height: parseValueToHeight(e.target.value),
          })
        }
      >
        <option value="0">Ticket Design Typ:</option>
        <option value="940*1329">Print@Home</option>
        <option value="800*350">Hard</option>
        <option value="450*250">Plastik</option>
        <option value="700*400">Boca6Zoll</option>
        <option value="900*350">Boca8Zoll</option>
        <option value="230*400">Spio2Zoll</option>
        <option value="700*230">Spio4Zoll</option>
      </select>
      <input
        type="file"
        name="file"
        onChange={(e) => uploadBackground(e, props.canvas)}
      />
    </div>
  );
};

export { CanvasOptionPanel };
