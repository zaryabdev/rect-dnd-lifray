import React, { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import SideBarItem from "./SideBarItem";
import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import Row from "./Row";
import initialData from "./initial-data";
import { AppContext } from "./AppContext";
import {
    SIDEBAR_ITEMS,
    SIDEBAR_ITEM,
    COLUMN,
    ROW,
    COMPONENT,
} from "./constants";
import {
    handleMoveWithinParent,
    handleMoveToDifferentParent,
    handleMoveSidebarComponentIntoParent,
    handleRemoveItemFromLayout,
} from "./helpers";
import "./styles.css";

const Container = () => {
    const initialLayout = initialData.layout;
    const initialComponents = initialData.components;

    const [layout, setLayout] = useState(initialLayout);
    const [components, setComponents] = useState(initialComponents);
    const [selectedComponent, setSelectedComponent] = useState({});
    const [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {
        console.log(`Current state of layout`);
        console.log(layout);
    }, [layout]);

    const handleDrop = useCallback(
        (dropZone, item) => {
            console.log("dropZone", dropZone);
            console.log("item", item);
            debugger;

            const splitDropZonePath = dropZone.path.split("-");
            const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

            const newItem = {
                id: item.id,
                type: item.type,
            };

            if (item.type === COLUMN) {
                newItem.children = item.children;
            }

            // TODO: debug this code block
            if (item.type === SIDEBAR_ITEM) {
                // 1. Move side bar item into page

                const newComponent = {
                    id: uuidv4(),
                    ...item.component,
                };

                const newItem = {
                    id: newComponent.id,
                    type: COMPONENT,
                };

                setComponents({
                    ...components,
                    [newComponent.id]: newComponent,
                });

                const updatedLayout = handleMoveSidebarComponentIntoParent(
                    layout,
                    splitDropZonePath,
                    newItem
                );

                console.log({ updatedLayout });

                setLayout(updatedLayout);
            }

            // move down here since sidebar items dont have path

            const splitItemPath = item.path.split("-");
            const pathToItem = splitItemPath.slice(0, -1).join("-");

            // 2. pure move ( no create)
            if (splitItemPath.length === splitDropZonePath.length) {
                // 2a. move within parent
                if (pathToItem === pathToDropZone) {
                    const updatedLayput = handleMoveWithinParent(
                        layout,
                        splitDropZonePath,
                        splitItemPath
                    );
                    console.log({ updatedLayput });

                    setLayout(updatedLayput);
                    return;
                } else {
                    // 2.b. OR move different parent
                    // TODO FIX columns. item includes children
                    const updatedLayout = handleMoveToDifferentParent(
                        layout,
                        splitDropZonePath,
                        splitItemPath,
                        newItem
                    );

                    console.log({ updatedLayout });

                    setLayout(updatedLayout);
                    return;
                }
            }

            // 3. Move + Create
            const updatedLayout = handleMoveToDifferentParent(
                layout,
                splitDropZonePath,
                splitItemPath,
                newItem
            );

            console.log({ updatedLayout });

            setLayout(updatedLayout);
        },

        [layout, components]
    );

    const handleDropToTrashBin = useCallback(
        (dropZone, item) => {
            const splitItemPath = item.path.split("-");
            console.log({ layout });
            const removedItemLayout = handleRemoveItemFromLayout(
                layout,
                splitItemPath
            );
            console.log({ removedItemLayout });
            setLayout(removedItemLayout);
        },
        [layout]
    );

    const handleSelectComponent = (component) => {
        setSelectedComponent(component);
    };

    const handleSelectRow = (row) => {
        console.log(row);
        setSelectedRow(row);
    };

    function renderRow(row, currentPath) {
        return (
            <Row
                key={row.id}
                data={row}
                handleDrop={handleDrop}
                path={currentPath}
                components={components}
            ></Row>
        );
    }

    return (
        <div className="body">
            <AppContext.Provider
                value={{
                    selectedComponent,
                    handleSelectComponent,
                    selectedRow,
                    handleSelectRow,
                }}
            >
                <div className="pageContainer">
                    <div className="page">
                        {layout.map((row, index) => {
                            const currentPath = `${index}`;

                            return (
                                <React.Fragment key={row.id}>
                                    <DropZone
                                        data={{
                                            path: currentPath,
                                            childrenCount: layout.length,
                                        }}
                                        onDrop={handleDrop}
                                    ></DropZone>
                                    {renderRow(row, currentPath)}
                                </React.Fragment>
                            );
                        })}
                        <DropZone
                            data={{
                                path: `${layout.length}`,
                                childrenCount: layout.length,
                            }}
                            onDrop={handleDrop}
                            isLast
                        ></DropZone>
                    </div>
                    <TrashDropZone
                        layout={{
                            layout,
                        }}
                        onDrop={handleDropToTrashBin}
                    ></TrashDropZone>
                </div>
                <div className="sideBar">
                    <center>
                        <b>Widgets</b>
                    </center>
                    {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => {
                        return (
                            <SideBarItem
                                key={sideBarItem.id}
                                data={sideBarItem}
                            />
                        );
                    })}
                </div>
            </AppContext.Provider>
        </div>
    );
};

export default Container;
