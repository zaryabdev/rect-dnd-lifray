import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
const style = {
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    float: "left",
};

function Box2({ name }) {
    const [{ opacity, isDragging }, dragRef, dragPreview] = useDrag(() => {
        return {
            type: ItemTypes.BOX2,
            item: { name },
            collect: (monitor, props) => {
                // console.log(monitor.isDragging());
                // console.log(props);
                // console.log(`CALLED ONCE INSIDE DRAG`);
                return {
                    opacity: monitor.isDragging() ? 0.2 : 1,
                };
            },
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult();

                console.log("DROP RESULT");
                console.log(dropResult);

                // console.log("DID DROP" + monitor.didDrop());
                // console.log("CAN DROP" + monitor.canDrop());

                if (item && dropResult) {
                    let msg = "";

                    alert(msg);
                }
            },
        };
    });

    useEffect(() => {
        console.log(`INSIDE BOX 2 UE`);
        console.log("opacity => " + opacity);
    }, [opacity]);

    return (
        <div ref={dragRef} style={{ ...style, opacity }}>
            {name}
        </div>
    );
}

export { Box2 };
