import React, { useRef, useContext } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";
import Wrapper from "./Wrapper";
import AppContext from "./AppContext";
const style = {
    // border: "1px dashed lightgray",
    // padding: "0.5rem 1rem",
    backgroundColor: "#F7F7F7",
    cursor: "move",
};
import LineChart from "./components/LineChart";
import MultiLineChart from "./components/MultilineChart";
import StackedAreaChart from "./components/StackedAreaChart";
import PieChart from "./components/PieChart";

const componentList = {
    linechart: LineChart,
    multilinechart: MultiLineChart,
    piechart: PieChart,
    stackedareachart: StackedAreaChart,
};

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
    const isSelected =
        context.selectedComponent.component_id === componentData.component_id;

    return (
        <Wrapper component={component} isSelected={isSelected}>
            <div
                ref={ref}
                style={{ ...style, opacity }}
                className={`component draggable ${
                    isSelected ? "outlineBlue" : ""
                } `}
                onClick={() => context.handleSelectComponent(component)}
            >
                {context.CreateComponent(component, componentList)}
            </div>
        </Wrapper>
    );
};

export default Component;
