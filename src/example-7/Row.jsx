import React, { useRef, useContext } from "react";
import { useDrag } from "react-dnd";
import { ROW } from "./constants";
import DropZone from "./DropZone";
import Column from "./Column";
import { AppContext } from "./AppContext";

const Row = ({ data, components, handleDrop, path }) => {
    const appContext = useContext(AppContext);
    const ref = useRef(null);

    const [{ isDragging }, dragRef] = useDrag({
        item: {
            type: ROW,
            id: data.id,
            children: data.children,
            path,
        },
        type: ROW,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.2 : 1;
    const isSelected = data.id === appContext.selectedRow.id;
    let outline = {};
    if (isSelected) {
        outline = {
            outline: `3px solid #00a2ff`,
        };
    } else {
        console.log(data.id);
    }
    dragRef(ref);

    function renderColumn(column, currentPath) {
        return (
            <Column
                key={column.id}
                data={column}
                components={components}
                handleDrop={handleDrop}
                path={currentPath}
            ></Column>
        );
    }

    return (
        <div
            ref={ref}
            style={{ opacity, ...outline }}
            className="base draggable row"
            onClick={() => appContext.handleSelectRow(data)}
        >
            <small>
                ROW ID : {data.id} {}{" "}
            </small>
            <div className="columns">
                {data.children.map((column, index) => {
                    const currentPath = `${path}-${index}`;

                    return (
                        <React.Fragment key={column.id}>
                            <DropZone
                                data={{
                                    path: currentPath,
                                    childrenCount: data.children.length,
                                }}
                                onDrop={handleDrop}
                                className="horizontalDrag"
                            />
                            {renderColumn(column, currentPath)}
                        </React.Fragment>
                    );
                })}
                <DropZone
                    data={{
                        path: `${path}-${data.children.length}`,
                    }}
                    onDrop={handleDrop}
                    className="horizontalDrag"
                    isLast
                />
            </div>
        </div>
    );
};

export default Row;
