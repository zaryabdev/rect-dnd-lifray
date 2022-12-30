import { useDrag } from "react-dnd";

import { memo } from "react";

const style = {
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    cursor: "move",
    float: "left",
};

function Box({ id, type, isDropped }) {
    const [{ opacity }, dragRef] = useDrag(() => {
        return {
            type: type,
            item: { id },
            collect: (monitor) => {
                return {
                    opacity: monitor.isDragging() ? 0.2 : 1,
                };
            },
        };
    }, [id, type]);

    return (
        <div ref={dragRef} style={{ ...style, opacity }}>
            {isDropped ? <s>{id}</s> : <b> {id} </b>}
        </div>
    );
}

export default memo(Box);
