import { memo, useCallback, useEffect, useState } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import Box from "./Box";
import Dustbin from "./Dustbin";
import ItemTypes from "./ItemTypes";

function ContainerX(params) {
    const [boxes] = useState([
        { id: "I_am_glass", type: ItemTypes.GLASS },
        { id: "I_am_food", type: ItemTypes.FOOD },
        { id: "I_am_paper", type: ItemTypes.PAPER },
    ]);

    const [dustbins, setDustbins] = useState([
        { accept: [ItemTypes.GLASS], lastDropppedItem: null },
        { accept: [ItemTypes.FOOD], lastDropppedItem: null },
        {
            accept: [ItemTypes.PAPER, ItemTypes.FOOD, NativeTypes.URL],
            lastDropppedItem: null,
        },
        { accept: [ItemTypes.PAPER, NativeTypes.FILE], lastDropppedItem: null },
    ]);

    const [droppedBoxIds, setDroppedBoxIds] = useState([]);

    function isDropped(boxId) {
        return droppedBoxIds.indexOf(boxId) > -1;
    }

    function handleDrop(index, droppedItem) {
        const { id } = droppedItem;

        setDroppedBoxIds((prevStatee) => {
            return [...prevStatee, id ? id : []];
        });

        console.log(`Item from arr`);
        console.log(dustbins[index]);

        let oldDustbinsState = [...dustbins];
        oldDustbinsState[index].lastDropppedItem = droppedItem;

        console.log(`Item from updates arr`);
        console.log(oldDustbinsState[index]);
        setDustbins(oldDustbinsState);
    }

    return (
        <div>
            <div style={{ overflow: "hidden", clear: "both" }}>
                {dustbins.map((dustbin, index) => {
                    return (
                        <Dustbin
                            key={index}
                            accept={dustbin.accept}
                            lastDropppedItem={dustbin.lastDropppedItem}
                            onDrop={(itemReturnedFromDrop) => {
                                handleDrop(index, itemReturnedFromDrop);
                            }}
                        />
                    );
                })}
            </div>
            <div style={{ overflow: "hidden", clear: "both" }}>
                {boxes.map((box, index) => {
                    return (
                        <Box
                            key={index}
                            id={box.id}
                            type={box.type}
                            isDropped={isDropped(box.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export const Container = memo(ContainerX);
