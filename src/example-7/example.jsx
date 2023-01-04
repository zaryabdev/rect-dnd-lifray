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
import "./cursor.css";

import RenderPreview from "./RenderPreview.jsx";

const Container = () => {
    // const initialLayout = initialData.layout;
    // const initialComponents = initialData.components;
    const [layout, setLayout] = useState(initialLayout);
    const [components, setComponents] = useState(initialComponents);

    const [selectedComponent, setSelectedComponent] = useState({});

    // useEffect(() => {
    //     console.log({ layout });
    //     console.log({ components });
    // }, [layout, components]);

    const handleDrop = useCallback(
        (dropZone, item) => {
            // console.log(`ITEM DROPPED`);
            // console.log({ item });
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

                // console.log({ updatedLayout });

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
                    // console.log({ updatedLayput });

                    setLayout(updatedLayput);
                    return;
                } else {
                    // 2.b. OR move different parent
                    // TODO FIX columns. item includes children
                    const updatedLayout = handleMoveToDifferentParent(
                        layout,
                        splitDropZonePath,
                        splitItemPath,
                        newLayoutItem
                    );

                    // console.log({ updatedLayout });

                    setLayout(updatedLayout);
                    return;
                }
            }

            // 3. Move + Create
            const updatedLayout = handleMoveToDifferentParent(
                layout,
                splitDropZonePath,
                splitItemPath,
                newLayoutItem
            );

            // console.log({ updatedLayout });

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

    const handleLayoutSave = () => {
        localStorage.removeItem("layout");
        localStorage.removeItem("components");

        let layoutStr = JSON.stringify(layout);
        let componentsStr = JSON.stringify(components);

        localStorage.setItem("layout", layoutStr);
        localStorage.setItem("components", componentsStr);
    };

    const handleGetLayout = () => {
        let layoutStr = localStorage.getItem("layout");
        let componentsStr = localStorage.getItem("components");

        setLayout(JSON.parse(layoutStr));
        setComponents(JSON.parse(componentsStr));
    };

    const handleRemoveFromLayput = useCallback(
        (item) => {
            // console.log(item);

            const splitItemPath = item.path.split("-");
            console.log({ layout });
            const removedItemLayout = handleRemoveItemFromLayout(
                layout,
                splitItemPath
            );
            // console.log({ removedItemLayout });
            setLayout(removedItemLayout);
        },
        [layout]
    );

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
        <div className="container-fluid">
            <div className="navbar border-bottom">
                <small className="mx-2">React Dnd - Liferay Clone</small>
                <button
                    className="btn btn-sm btn-warning mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#preview"
                >
                    Preview
                </button>
            </div>
            <AppContext.Provider
                value={{
                    selectedComponent,
                    handleSelectComponent,
                    components,
                    setComponents,
                    CreateComponent,
                }}
            >
                <div className="container-fluid px-0">
                    <div className="row">
                        <div className="col-sm-10">
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
                            <TrashDropZone
                                layout={{
                                    layout,
                                }}
                                onDrop={handleDropToTrashBin}
                            ></TrashDropZone>
                        </div>
                        <div className="col-sm-2">
                            <center>
                                <b>Widgets</b>
                            </center>
                            {Object.values(SIDEBAR_ITEMS).map(
                                (sideBarItem, index) => {
                                    return (
                                        <SideBarItem
                                            key={sideBarItem.id}
                                            data={sideBarItem}
                                        />
                                    );
                                }
                            )}

                            <button
                                className="btn btn-sm btn-dark m-2"
                                onClick={() =>
                                    handleRemoveFromLayput(selectedComponent)
                                }
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-sm btn-dark m-2"
                                onClick={() => handleLayoutSave()}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-sm btn-dark m-2"
                                onClick={() => handleGetLayout()}
                            >
                                Get
                            </button>
                            <div>
                                <code>
                                    {JSON.stringify(
                                        selectedComponent.data,
                                        null,
                                        2
                                    )}
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </AppContext.Provider>

            <div className="modal modal-xl fade" id="preview">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex vw-100 flex-row justify-content-between align-items-center">
                                <div className="ps-2">Design Preview</div>
                                <div className="align-self-center pe-2">
                                    <div className="align-self-center btn-group btn-group-sm">
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark fa-solid fa-mobile-screen-button"
                                        ></button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark fa-solid fa-display"
                                        ></button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark fa-solid fa-tablet-screen-button"
                                        ></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body">
                            <RenderPreview
                                layout={layout}
                                components={components}
                            ></RenderPreview>
                        </div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function CreateComponent(component, componentList) {
    if (typeof componentList[component.type] !== "undefined") {
        return React.createElement(componentList[component.type], {
            key: component.id,
            component,
        });
    }
    return React.createElement(
        () => (
            <div
                style={{ minHeight: "90vh" }}
                className="d-flex align-items-center justify-content-center vh-100"
            >
                <div className="text-center">
                    <p className="fs-3">
                        {" "}
                        The Component for{" "}
                        <span className="text-danger">
                            {component.component_id}
                        </span>{" "}
                        has not been created yet.
                    </p>
                </div>
            </div>
        ),
        { key: component.id }
    );
}
export default Container;
