import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COLUMN } from "./constants";
import DropZone from "./DropZone";
import Component from "./Component";

const style = {};
const Column = ({ columnData, components, handleDrop, path }) => {
    console.log({ columnData, components });

    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: COLUMN,
            id: columnData.id,
            children: columnData.children,
            path,
        },
        type: COLUMN,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(ref);

    const renderComponent = (component, currentPath) => {
        return (
            <Component
                key={component.id}
                componentData={component}
                components={components}
                path={currentPath}
            />
        );
    };

    return (
        <div
            ref={ref}
            style={{ ...style, opacity }}
            className="base draggable column"
        >
            CID: {columnData.id}
            {columnData.children.map((component, index) => {
                const currentPath = `${path}-${index}`;

                return (
                    <React.Fragment key={component.id}>
                        <DropZone
                            data={{
                                path: currentPath,
                                childrenCount: columnData.children.length,
                            }}
                            onDrop={handleDrop}
                        />
                        {renderComponent(component, currentPath)}
                    </React.Fragment>
                );
            })}
            <DropZone
                data={{
                    path: `${path}-${columnData.children.length}`,
                    childrenCount: columnData.children.length,
                }}
                onDrop={handleDrop}
                isLast
            />
        </div>
    );
};
export default Column;
