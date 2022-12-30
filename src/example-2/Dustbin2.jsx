import { useEffect } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const style = {
    height: "12rem",
    width: "12rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    color: "lightgray",
    padding: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
    float: "left",
    border: "1px solid lightgray",
};

function Dustbin2({ allowedDropEffect }) {
    const [{ isOver, canDrop }, dropRef] = useDrop(() => {
        return {
            accept: ItemTypes.BOX2,
            collect: (monitor, props) => {
                // console.log(`CALLED ONCE INSIDE DROP`);
                return {
                    isOver: monitor.isOver(),
                    canDrop: monitor.canDrop(),
                };
            },
            drop: (item, monitor) => {
                return {
                    name: `name is ${allowedDropEffect} : from props`,
                    allowedDropEffect: allowedDropEffect,
                };
            },
        };
    }, [allowedDropEffect]);

    const isActive = canDrop && isOver;

    const backgroundColor = selectBackgroundColor(isActive, canDrop);

    function selectBackgroundColor(isActive, canDrop) {
        if (isActive) {
            return "red";
        } else if (canDrop) {
            return "green";
        } else {
            return "black";
        }
    }

    return (
        <div ref={dropRef} style={{ ...style, backgroundColor }}>
            {`Works with ${allowedDropEffect} drop effect`}
            <br />
            <br />
            {isActive ? "Release to drop" : "Drag a box here"}
        </div>
    );
}

export { Dustbin2 };
