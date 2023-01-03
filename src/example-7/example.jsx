import React, { useState, useCallback, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import SideBarItem from "./SideBarItem";
import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import Row from "./Row";
import { initialLayout, initialComponents } from "./initial-data";
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
import AppContext from "./AppContext";
import "./styles.css";

const Container = () => {
    // const initialLayout = initialData.layout;
    // const initialComponents = initialData.components;
    const [layout, setLayout] = useState(initialLayout);
    const [components, setComponents] = useState(initialComponents);

    const [selectedComponent, setSelectedComponent] = useState({});
    const [inputField, setInputField] = useState({
        serviceKey: "",
        parmas: "",
    });
    useEffect(() => {
        console.log({ layout });
        console.log({ components });
    }, [layout, components]);

    const handleDrop = useCallback(
        (dropZone, item) => {
            console.log(`ITEM DROPPED`);
            console.log({ item });
            debugger;

            const splitDropZonePath = dropZone.path.split("-");
            const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

            const newLayoutItem = {
                id: item.id,
                type: item.type,
            };

            if (item.type === COMPONENT) {
                newLayoutItem.component_id = item.component_id;
            }

            if (item.type === COLUMN) {
                newLayoutItem.children = item.children;
            }

            // TODO: debug this code block
            if (item.type === SIDEBAR_ITEM) {
                // 1. Move side bar item into page

                const newComponent = {
                    id: `component-db-id:${uuidv4()}`,
                    component_id: `component_id:${uuidv4()}`,
                    ...item.component,
                };

                const newLayoutItem = {
                    id: newComponent.id,
                    component_id: newComponent.component_id,
                    type: COMPONENT,
                };

                setComponents({
                    ...components,
                    [newComponent.component_id]: newComponent,
                });

                const updatedLayout = handleMoveSidebarComponentIntoParent(
                    layout,
                    splitDropZonePath,
                    newLayoutItem
                );

                console.log({ updatedLayout });

                setLayout(updatedLayout);
            }

            // move down here since sidebar items dont have path

            const splitItemPath = item.path ? item.path.split("-") : [];
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
                    debugger;
                    const updatedLayout = handleMoveToDifferentParent(
                        layout,
                        splitDropZonePath,
                        splitItemPath,
                        newLayoutItem
                    );

                    console.log({ updatedLayout });

                    setLayout(updatedLayout);
                    return;
                }
            }

            // 3. Move + Create
            debugger;
            const updatedLayout = handleMoveToDifferentParent(
                layout,
                splitDropZonePath,
                splitItemPath,
                newLayoutItem
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

    const handleUpdateComponentData = () => {
        debugger;

        let _components = { ...components };
        _components[selectedComponent.component_id].data = inputField;
        setComponents(_components);
    };

    const handleInputField = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setInputField((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectComponent = (component) => {
        setSelectedComponent(component);
    };

    function renderRow(row, currentPath) {
        return (
            <Row
                key={row.id}
                rowData={row}
                handleDrop={handleDrop}
                path={currentPath}
                components={components}
            ></Row>
        );
    }

    return (
        <div className="body container-fluid px-0">
            <AppContext.Provider
                value={{
                    selectedComponent,
                    handleSelectComponent,
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
                    <div class="form-floating mb-3">
                        <input
                            type="text"
                            name="serviceKey"
                            placeholder="serviceKey"
                            onChange={(e) => handleInputField(e)}
                            value={inputField.serviceKey}
                        />
                        <label for="floatingInputValue">Service Key</label>
                    </div>
                    <div class="form-floating">
                        <input
                            type="text"
                            name="parmas"
                            placeholder="parmas"
                            onChange={(e) => handleInputField(e)}
                            value={inputField.parmas}
                        />
                        <label for="floatingPassword">Param</label>
                    </div>

                    <button
                        className="btn btn-sm btn-dark m-2"
                        onClick={() => handleUpdateComponentData()}
                    >
                        Update
                    </button>
                    <code>
                        <pre>{JSON.stringify(selectedComponent.data)}</pre>
                    </code>
                </div>
            </AppContext.Provider>
        </div>
    );
};

export default Container;
