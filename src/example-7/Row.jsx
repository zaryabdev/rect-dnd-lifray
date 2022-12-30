import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ROW } from "./constants";
import DropZone from "./DropZone";
import Column from "./Column";

const Row = ({ data, components, handleDrop, path }) => {
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
        <div ref={ref} style={{ opacity }} className="base draggable row">
            <small> ID : {data.id} </small>
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
