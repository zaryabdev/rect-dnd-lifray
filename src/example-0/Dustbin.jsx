import { memo } from "react";
import { useDrop } from "react-dnd";

const style = {
    height: "12rem",
    width: "12rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    color: "white",
    padding: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
    float: "left",
};

function Dustbin({ accept, lastDropppedItem, onDrop }) {
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: accept,
        drop: onDrop,
        collect: (monitor) => {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            };
        },
    });

    const isActive = isOver && canDrop;

    let backgroundColor = "black";
    if (isActive) {
        backgroundColor = "red";
    } else if (canDrop) {
        backgroundColor = "green";
    }

    return (
        <div ref={dropRef} style={{ ...style, backgroundColor }}>
            {isActive
                ? "Release to drop"
                : `This dustbin accepts :  ${accept.join(" | ")}`}

            {lastDropppedItem && (
                <p> Last dropped item {JSON.stringify(lastDropppedItem)} </p>
            )}
        </div>
    );
}

export default memo(Dustbin);
