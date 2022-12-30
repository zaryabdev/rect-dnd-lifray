import { useDrag } from "react-dnd";

const SideBarItem = ({ data }) => {
    const [{ opacity }, dragRef] = useDrag({
        item: data,
        type: data.type,
        collect: (monitor) => {
            return {
                opacity: monitor.isDragging() ? 0.4 : 1,
            };
        },
    });

    return (
        <div className="sideBarItem" ref={dragRef} style={{ opacity }}>
            {data.component.type}
        </div>
    );
};

export default SideBarItem;
