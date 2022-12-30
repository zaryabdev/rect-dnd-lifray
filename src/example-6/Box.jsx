import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.jsx";
const style = {
    display: "inline-block",
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    cursor: "move",
};
export const Box = () => {
    const [, drag] = useDrag(() => ({ type: ItemTypes.BOX }));
    return (
        <div ref={drag} style={style}>
            Drag me
        </div>
    );
};
