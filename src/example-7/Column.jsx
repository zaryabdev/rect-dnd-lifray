import React, { useRef, useContext } from "react";
import classNames from "classnames";
import { useDrag } from "react-dnd";
import { COLUMN } from "./constants";
import DropZone from "./DropZone";
import Component from "./Component";
import AppContext from "./AppContext";

const Column = ({ columnData, components, handleDrop, path }) => {
    console.log({ columnData, components });
    const context = useContext(AppContext);
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: COLUMN,
            id: columnData.id,
            children: columnData.children,
            path,
        },
        type: COLUMN,
        canDrag: !context.forbidDrag,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(ref);

    let columnStyles = classNames({
        move: !context.forbidDrag,
        default: context.forbidDrag,
    });

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
            style={{ opacity }}
            className={`base draggable column ${columnStyles}`}
        >
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
