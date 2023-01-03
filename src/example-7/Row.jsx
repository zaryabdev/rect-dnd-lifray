import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ROW } from "./constants";
import DropZone from "./DropZone";
import Column from "./Column";

const Row = ({ rowData, components, handleDrop, path }) => {
    console.log({ rowData, components });
    const ref = useRef(null);

    const [{ isDragging }, dragRef] = useDrag({
        item: {
            type: ROW,
            id: rowData.id,
            children: rowData.children,
            path,
        },
        type: ROW,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.2 : 1;

    dragRef(ref);

    function renderColumn(column, currentPath) {
        return (
            <Column
                key={column.id}
                columnData={column}
                components={components}
                handleDrop={handleDrop}
                path={currentPath}
            ></Column>
        );
    }

    return (
        <div ref={ref} style={{ opacity }} className="base draggable row">
            <div className="columns">
                {rowData.children.map((column, index) => {
                    const currentPath = `${path}-${index}`;

                    return (
                        <React.Fragment key={column.id}>
                            <DropZone
                                data={{
                                    path: currentPath,
                                    childrenCount: rowData.children.length,
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
                        path: `${path}-${rowData.children.length}`,
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
