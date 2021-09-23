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
const HyperLinkPanel = (props: any) => {
  const [activeObj, setActiveObj] = useState<any>();
  const [textProps, setTextProps] = useState({
    width: props.object.width,
    height: props.object.height,
    top: props.object.top,
    left: props.object.left,
    fontSize: props.object.fontSize,
    textAlign: props.object.textAlign,
    fixedWidth: 150,
    fontFamily: props.object.fontFamily,
    fontStyle: props.object.fontStyle,
    underline: props.object.underline,
    fill: props.object.fill,
    url: props.object.url,
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
          fontSize: obj.fontSize,
          textAlign: obj.textAlign,
          fixedWidth: 150,
          fontFamily: obj.fontFamily,
          fontStyle: obj.fontStyle,
          underline: obj.underline,
          fill: obj.fill,
          url: obj.url,
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
          fontSize: obj.fontSize,
          textAlign: obj.textAlign,
          fixedWidth: 150,
          fontFamily: obj.fontFamily,
          fontStyle: obj.fontStyle,
          underline: obj.underline,
          fill: obj.fill,
          url: obj.url,
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
    <div
      style={panelStyle}
      tabIndex={0}
      className="border flex-column "
    >
      <button
        onClick={() =>
          setTextProps({
            width: textProps.width,
            height: textProps.height,
            top: textProps.top,
            left: textProps.left,
            fontSize: textProps.fontSize,
            textAlign: textProps.textAlign,
            fixedWidth: 150,
            fontFamily: textProps.fontStyle,
            fontStyle: textProps.fontStyle === "italic" ? "normal" : "italic",
            underline: textProps.underline,
            fill: textProps.fill,
            url: textProps.url,
          })
        }
      >
        I
      </button>
      <button
        onClick={() =>
          setTextProps({
            width: textProps.width,
            height: textProps.height,
            top: textProps.top,
            left: textProps.left,
            fontSize: textProps.fontSize,
            textAlign: textProps.textAlign,
            fixedWidth: 150,
            fontFamily: textProps.fontFamily,
            fontStyle: textProps.fontStyle === "bold" ? "normal" : "bold",
            underline: textProps.underline,
            fill: textProps.fill,
            url: textProps.url,
          })
        }
      >
        B
      </button>
      <button
        onClick={() =>
          setTextProps({
            width: textProps.width,
            height: textProps.height,
            top: textProps.top,
            left: textProps.left,
            fontSize: textProps.fontSize,
            textAlign: textProps.textAlign,
            fixedWidth: 150,
            fontFamily: textProps.fontFamily,
            fontStyle: textProps.fontStyle,
            underline: true,
            fill: textProps.fill,
            url: textProps.url,
          })
        }
      >
        U
      </button>
      <div>Schriftgröße</div>
      <input
        type="number"
        value={Math.round(textProps.fontSize)}
        onChange={(e) =>
          setTextProps({
            width: textProps.width,
            height: textProps.height,
            top: textProps.top,
            left: textProps.left,
            fontSize: parseInt(e.target.value),
            textAlign: textProps.textAlign,
            fixedWidth: 150,
            fontFamily: textProps.fontFamily,
            fontStyle: textProps.fontStyle,
            underline: textProps.underline,
            fill: textProps.fill,
            url: textProps.url,
          })
        }
      ></input>
      <select
        className="w-75"
        onChange={(e) =>
          setTextProps({
            width: textProps.width,
            height: textProps.height,
            top: textProps.top,
            left: textProps.left,
            fontSize: textProps.fontSize,
            textAlign: textProps.textAlign,
            fixedWidth: 150,
            fontFamily: e.target.value,
            fontStyle: textProps.fontStyle,
            underline: textProps.underline,
            fill: textProps.fill,

            url: textProps.url,
          })
        }
      >
        <option value="0">Schriftart</option>
        <option value="serif">serif</option>
        <option value="sans-serif">sans-serif</option>
        <option value="monospace">monospace</option>
        <option value="fantasy">fantasy</option>
        <option value="arial">arial</option>
      </select>

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
            fontSize: textProps.fontSize,
            textAlign: textProps.textAlign,
            fixedWidth: 150,
            fontFamily: textProps.fontFamily,
            fontStyle: textProps.fontStyle,
            underline: textProps.underline,
            fill: textProps.fill,
            url: textProps.url,
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
            fontSize: textProps.fontSize,
            textAlign: textProps.textAlign,
            fixedWidth: 150,
            fontFamily: textProps.fontFamily,
            fontStyle: textProps.fontStyle,
            underline: textProps.underline,
            fill: textProps.fill,
            url: textProps.url,
          })
        }
      ></input>
      <div>Textfarbe</div>
      <input
        className="w-75"
        type="color"
        value={textProps.fill}
        onChange={(e) =>
          setTextProps({
            width: textProps.width,
            height: textProps.height,
            top: textProps.top,
            left: textProps.left,
            fontSize: textProps.fontSize,
            textAlign: textProps.textAlign,
            fixedWidth: 150,
            fontFamily: textProps.fontFamily,
            fontStyle: textProps.fontStyle,
            underline: textProps.underline,
            fill: e.target.value,
            url: textProps.url,
          })
        }
      ></input>

      <input
        className="w-75"
        type="text"
        value={textProps.url}
        onChange={(e) =>
          setTextProps({
            width: textProps.width,
            height: textProps.height,
            top: textProps.top,
            left: textProps.left,
            fontSize: textProps.fontSize,
            textAlign: textProps.textAlign,
            fixedWidth: 150,
            fontFamily: textProps.fontFamily,
            fontStyle: textProps.fontStyle,
            underline: textProps.underline,
            fill: textProps.fill,
            url: e.target.value,
          })
        }
      ></input>
      <button onClick={() => deleteObject(props.canvas)}>DELETE</button>
    </div>
  );
};

export { HyperLinkPanel };
