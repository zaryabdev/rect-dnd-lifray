import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";

const style = {
    border: "1px dashed black",
    padding: "0.5rem 1rem",
    backgroundColor: "#495464",
    cursor: "move",
};

const Component = ({ data, components, path }) => {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        item: {
            id: data.id,
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

    const component = components[data.id];

    return (
        <div
            ref={ref}
            style={{ ...style, opacity }}
            className="component draggable"
        >
            <div>{data.id}</div>
            <div>{component.content}</div>
        </div>
    );
};

export default Component;
