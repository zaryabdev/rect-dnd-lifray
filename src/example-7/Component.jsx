import React, { useRef, useContext } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";
import Wrapper from "./Wrapper";
import AppContext from "./AppContext";
const style = {
    border: "1px dashed black",
    padding: "0.5rem 1rem",
    backgroundColor: "#495464",
    cursor: "move",
};
import LineChart from "./components/LineChart";
import MultiLineChart from "./components/MultilineChart";
import StackedAreaChart from "./components/StackedAreaChart";
import PieChart from "./components/PieChart";
const Component = ({ componentData, components, path }) => {
    console.log({ componentData, components });
    const context = useContext(AppContext);
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        item: {
            id: componentData.id,
            component_id: componentData.component_id,
            type: COMPONENT,
            path: path,
        },
        type: COMPONENT,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(ref);

    const component = components[componentData.component_id];
    component.path = path;

    return (
        <Wrapper>
            <div
                ref={ref}
                style={{ ...style, opacity }}
                className={`component draggable ${
                    context.selectedComponent.component_id ===
                    componentData.component_id
                        ? "outlineBlue"
                        : ""
                } `}
                onClick={() => context.handleSelectComponent(component)}
            >
                {/* <div>{componentData.}</div> */}
                {/* <MultiLineChart></MultiLineChart>
                 */}
                {/* <PieChart /> */}
            </div>
        </Wrapper>
    );
};

export default Component;
