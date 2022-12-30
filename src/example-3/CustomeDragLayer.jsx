import { ItemTypes } from "./ItemTypes";
import { useDrop, useDragLayer } from "react-dnd";
import { memo, useCallback, useState } from "react";
import BoxDragPreview from "./BoxDragPreview";
import { snapToGrid } from "./utils";
const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
};

function CustomDragLayer(props) {
    const { item, itemType, isDragging, initialOffset, currentOffset } =
        useDragLayer((monitor) => {
            return {
                item: monitor.getItem(),
                itemType: monitor.getItemType(),
                isDragging: monitor.isDragging(),
                initialOffset: monitor.getInitialSourceClientOffset(),
                currentOffset: monitor.getSourceClientOffset(),
            };
        });

    function renderItem() {
        switch (itemType) {
            case ItemTypes.BOX:
                return <BoxDragPreview title={item.title} />;

            default:
                return null;
        }
    }

    if (!isDragging) return null;

    return (
        <div style={{ ...layerStyles }}>
            <div
                style={getItemStyles(
                    initialOffset,
                    currentOffset,
                    props.snapToGrid
                )}
            >
                {renderItem()}
            </div>
        </div>
    );
}

function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
    debugger;

    if (!initialOffset || !currentOffset) {
        return {
            display: "none",
        };
    }

    let { x, y } = currentOffset;

    if (isSnapToGrid) {
        x = x - initialOffset.x;
        y = y - initialOffset.y;

        console.log({ x, y });

        console.log(snapToGrid(x, y));

        [x, y] = snapToGrid(x, y);

        x = x + initialOffset.x;
        y = y + initialOffset.y;
    }
    const transform = `translate(${x}px, ${y}px)`;

    return {
        transform,
        WebkitTransform: transform,
    };
}

export { CustomDragLayer };
