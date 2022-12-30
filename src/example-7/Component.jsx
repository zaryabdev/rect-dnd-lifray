import React, { useRef, useContext, Fragment } from "react";

import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";
import { AppContext } from "./AppContext";
// backgroundColor: "#495464",
const style = {
    border: "1px dashed black",
    // padding: "0.5rem 1rem",
    cursor: "move",
};

const Component = ({ data, components, path }) => {
    const appContext = useContext(AppContext);
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
    const isSelected = data.id === appContext.selectedComponent.id;
    let outline = {};
    if (isSelected) {
        outline = {
            outline: `3px solid #00a2ff`,
        };
    }
    drag(ref);

    const component = components[data.id];

    return (
        <Fragment>
            <div
                onClick={() => {
                    appContext.handleSelectComponent(component);
                }}
                ref={ref}
                style={{ ...style, opacity, ...outline }}
                className="component draggable"
            >
                <small>
                    CID:{data.id} | <span>{component.content}</span>
                </small>
            </div>
        </Fragment>
    );
};

export default Component;
