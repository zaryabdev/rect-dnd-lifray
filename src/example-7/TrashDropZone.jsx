import { useDrop } from "react-dnd";
import classNames from "classnames";
import { COLUMN, ROW, COMPONENT } from "./constants";
import { useState } from "react";

const ACCEPTS = [ROW, COLUMN, COMPONENT];
const TrashDropZone = ({ layout: data, onDrop }) => {
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: ACCEPTS,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop: (item, monitor) => {
            onDrop(data, item);
        },
        canDrop: (item, monitor) => {
            const layout = data.layout;
            const itemPath = item.path;
            const splitItemPath = itemPath.split("-");
            const itemPathRowIndex = splitItemPath[0];
            const itemRowChildrenLength = layout[itemPathRowIndex]
                ? layout[itemPathRowIndex].children.length
                : 0;

            // prevent removing a col when row has only one col

            if (item.type === COLUMN && itemRowChildrenLength < 2) {
                return false;
            }

            return true;
        },
    });

    const isActive = isOver && canDrop;
    return (
        <div
            ref={dropRef}
            className={classNames("trashDropZone", { active: isActive })}
        >
            TRASH
        </div>
    );
};

export default TrashDropZone;
