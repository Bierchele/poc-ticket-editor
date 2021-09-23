import { image } from "html2canvas/dist/types/css/types/image";
import { useEffect, useState } from "react";
import { deleteObject } from "../../commands/deleteActiveObject";

const panelStyle = {
  width: "199px",
  height: "300px",
  marginTop: "5px",
};

const ImageOptionPanel = (props: any) => {
  const [activeObj, setActiveObj] = useState<any>();
  const [imageProps, setImageProps] = useState({
    snapAngle: 90,
    top: props.object.top,
    left: props.object.left,
    width: props.object.width,
    height: props.object.height,
    scaleX: props.object.scaleX,
    scaleY: props.object.scaleY,
  });

  useEffect(() => {
    if (props.canvas) {
      const obj = props.canvas.getActiveObject();
      props.canvas.on("selection:created", (e: any) => {
        const newImageProps = {
          snapAngle: 90,
          top: obj.top,
          left: obj.left,
          width: obj.width,
          height: obj.height,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
        };
        setImageProps(newImageProps);
        setActiveObj(props.canvas.getActiveObject());
      });

      props.canvas.on("object:moving", (e: any) => {
        const newImageProps = {
          snapAngle: 90,
          top: obj.top,
          left: obj.left,
          width: obj.width,
          height: obj.height,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
        };
        setImageProps(newImageProps);
      });

     
    }
  }, []);

  useEffect(() => {
    const applyChange = () => {
      activeObj?.setOptions(imageProps);
      props.canvas.renderAll();
    };

    applyChange();
  }, [imageProps]);

  const changeProps = (prop: string, toChange: any) => {
    const copyOfProps = Object.assign(imageProps);
    console.log(imageProps);
    console.log(toChange)

    switch (prop) {
      case "size":
        copyOfProps.width = imageProps.width;
        copyOfProps.height = imageProps.height;
        copyOfProps.scaleX = parseInt(toChange) / imageProps.width;
        copyOfProps.scaleY = parseInt(toChange) / imageProps.height;
        break;
      case "top":
        copyOfProps.top = parseInt(toChange);
        break;
      case "left":
        copyOfProps.left = parseInt(toChange);
        break;
    }
    setImageProps(copyOfProps);
  };

  return (
    <div style={panelStyle} className="border flex-column ">
      <div>Size</div>
      <input
        type="number"
        value={Math.round(imageProps.width * imageProps.scaleX)}
        onChange={(e) =>
          setImageProps({
            snapAngle: 90,
            top: imageProps.top,
            left: imageProps.left,
            width: imageProps.width,
            height: imageProps.height,
            scaleX: parseInt(e.target.value) / imageProps.width,
            scaleY: parseInt(e.target.value) / imageProps.width,
          })
        }
      ></input>
      <div>Position</div>
      <input
        type="number"
        value={imageProps.left}
        onChange={(e) =>
          setImageProps({
            snapAngle: 90,
            top: imageProps.top,
            left: parseInt(e.target.value),
            width: imageProps.width,
            height: imageProps.height,
            scaleX: imageProps.scaleX,
            scaleY: imageProps.scaleY,
          })
        }
      ></input>
      <input
        type="number"
        value={imageProps.top}
        onChange={(e) =>
          setImageProps({
            snapAngle: 90,
            top: parseInt(e.target.value),
            left: imageProps.left,
            width: imageProps.width,
            height: imageProps.height,
            scaleX: imageProps.scaleX,
            scaleY: imageProps.scaleY,
          })
        }
      ></input>
      <button onClick={() => deleteObject(props.canvas)}>DELETE</button>
    </div>
  );
};

export { ImageOptionPanel };
