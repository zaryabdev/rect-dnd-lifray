import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";

const style = {
    border: "1px dashed black",
    padding: "0.5rem 1rem",
    backgroundColor: "#495464",
    cursor: "move",
};

const Component = ({ componentData, components, path }) => {
    console.log({ componentData, components });

    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        item: {
            id: componentData.id,
            component_id: componentData.id,
            type: COMPONENT,
            path: path,
        },
        type: COMPONENT,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(ref);

    const component = components[componentData.component_id];

    return (
        <div
            ref={ref}
            style={{ ...style, opacity }}
            className="component draggable"
        >
            <div>{componentData.id}</div>
            <div>{component ? component.id : "NO COMPONENT FOUND"}</div>
        </div>
    );
};

export default Component;
