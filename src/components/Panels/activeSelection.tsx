import { fabric } from "fabric";
import { Textbox } from "fabric/fabric-impl";
import { useEffect, useState } from "react";
import { deleteObject } from "../../commands/deleteActiveObject";

const panelStyle = {
  width: "199px",
  height: "350px",
  marginTop: "5px",
};

// fabric.Textbox.prototype.cacheProperties = fabric.Textbox.prototype!.cacheProperties.concat('active');
const ActiveSelectionPanel = (props: any) => {
  const [activeObj, setActiveObj] = useState<any>();
  const [textProps, setTextProps] = useState({
    width: props.object.width,
    height: props.object.height,
    top: props.object.top,
    left: props.object.left,
  });

  useEffect(() => {
    if (props.canvas) {
      const obj = props.canvas.getActiveObject();
      props.canvas.on("selection:created", () => {
        const newTextProps = {
          width: obj.width,
          height: obj.height,
          top: obj.top,
          left: obj.left,
        };

        setTextProps(newTextProps);
        setActiveObj(props.canvas.getActiveObject());
      });

      props.canvas.on("object:moving", () => {
        const newTextProps = {
          width: obj.width,
          height: obj.height,
          top: obj.top,
          left: obj.left,
        };

        setTextProps(newTextProps);
        setActiveObj(props.canvas.getActiveObject());
      });
    }
  }, []);

  // Wird oft benutzt Duplikation vermeiden
  useEffect(() => {
    const applyChange = () => {
      activeObj?.setOptions(textProps);
      props.canvas.renderAll();
    };
    applyChange();
    var objs = props.canvas.getObjects().map(function (o: any) {
      return o;
    });
  }, [textProps]);

  const moveWithKey = (e: any) => {
    const key = props.keyPress(e);
    console.log(key);
    const copyOfProps = Object.assign(textProps);
    switch (key) {
      case "ArrowUp":
        copyOfProps.top -= 1;
        break;
      case "ArrowDown":
        copyOfProps.top += 1;
        break;
      case "ArrowRight":
        copyOfProps.left += 1;
        break;
      case "ArrowLeft":
        copyOfProps.left -= 1;
        break;
    }
    setTextProps(copyOfProps);
    props.canvas.renderAll();
  };

  return (
    <div style={panelStyle} tabIndex={0} className="border flex-column ">
      <div>Position</div>
      <input
        type="number"
        value={Math.round(textProps.left)}
        onChange={(e) =>
          setTextProps({
            width: textProps.width,
            height: textProps.height,
            top: textProps.top,
            left: Math.round(parseInt(e.target.value)),
          })
        }
      ></input>
      <input
        type="number"
        value={Math.round(textProps.top)}
        onChange={(e) =>
          setTextProps({
            width: textProps.width,
            height: textProps.height,
            top: parseInt(e.target.value),
            left: textProps.left,
          })
        }
      ></input>

      <button onClick={() => deleteObject(props.canvas)}>DELETE</button>
    </div>
  );
};

export { ActiveSelectionPanel };
