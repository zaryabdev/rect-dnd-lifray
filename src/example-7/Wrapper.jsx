import React, { useRef, useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";
const style = {};

const Wrapper = ({ component, isSelected, children }) => {
    console.log(`INSIDE WRAPPER`);
    console.log(component);

    const context = useContext(AppContext);
    const [showConfig, setShowConfig] = useState(false);

    useEffect(() => {
        if (isSelected) {
            setShowConfig(true);
        } else {
            setShowConfig(false);
        }
        if (context) {
            const components = context ? context.components : {};
            console.log({ component, components });
        }
    }, [isSelected]);

    return (
        <div className="position-relative">
            {showConfig && <ConfigTooltip title={component.type} />}
            {children}
            <div className="modal modal-lg fade" id="setting">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">Setting</div>
                        <div className="modal-body">
                            <Settings component={component} />
                        </div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
            <div className="modal modal-lg fade" id="authorization">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">Authorization</div>
                        <div className="modal-body"></div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Settings({ component }) {
    return (
        <div>
            <code>{JSON.stringify(component)}</code>
        </div>
    );
}

function ConfigTooltip({ title }) {
    return (
        <span className="tooltip-bg rounded-top position-absolute  start-0-custom translate-start py-2">
            <span className="ps-3 pe-2 text-light grab">
                <i className="fa-solid fa-grip-vertical"></i>
            </span>
            <span className="px-2 text-light">
                <span className="text-capitalize fw-semibold">{title}</span>
            </span>
            <span
                data-bs-toggle="modal"
                data-bs-target="#authorization"
                className="px-2 text-light pointer"
            >
                <i className="fa-solid fa-user-shield"></i>
            </span>
            <span
                data-bs-toggle="modal"
                data-bs-target="#setting"
                className="px-2 text-light pointer"
            >
                <i className="fa-solid fa-gear"></i>
            </span>
            <span className="ps-2 pe-3 text-light pointer">
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </span>
        </span>
    );
}

export default Wrapper;
