import React, { useRef, useContext, useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";
import Wrapper from "./Wrapper";
import AppContext from "./AppContext";
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

const RenderPreview = ({ layout, components }) => {
    useEffect(() => {
        console.log(`layout`);
        console.log(layout);
    }, [layout]);

    function renderRow(row) {
        return <Row key={row.id} rowData={row} components={components}></Row>;
    }

    return (
        <Wrapper>
            <div className="container-fluid">
                {layout.map((row, index) => {
                    return (
                        <div className="row" key={row.id}>
                            {renderRow(row)}
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
};

function Row({ rowData, components }) {
    function renderColumn(column) {
        return (
            <React.Fragment>
                <div className="col">
                    <Column
                        key={column.id}
                        columnData={column}
                        components={components}
                    ></Column>
                </div>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            {rowData.children.map((column, index) => {
                return (
                    <React.Fragment key={column.id}>
                        {renderColumn(column)}
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
}

function Column({ columnData, components }) {
    const renderComponent = (component) => {
        return (
            <React.Fragment>
                <div className="col-wrapper">
                    <Component
                        key={component.id}
                        componentData={component}
                        components={components}
                    />
                </div>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {columnData.children.map((component) => {
                return (
                    <React.Fragment key={component.id}>
                        {renderComponent(component)}
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
}

function Component({ componentData, components }) {
    console.log(`INSIDE PREVIEW COMPONENT`);
    console.log(components);

    const context = useContext(AppContext);
    const [component, setComponent] = useState(null);

    useEffect(() => {
        setComponent(components[componentData.component_id]);
    }, [componentData]);

    useEffect(() => {
        console.log(`Latest state of component`);
        console.log(component);
    }, [component]);

    console.log({ componentData });

    return (
        <React.Fragment>
            {/* <code>{JSON.stringify(component)}</code> */}
            {/* {JSON.stringify(context)} */}
            {component && CreateComponent(component, componentList)}
        </React.Fragment>
    );
}

function CreateComponent(component, componentList) {
    debugger;
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

export default RenderPreview;
