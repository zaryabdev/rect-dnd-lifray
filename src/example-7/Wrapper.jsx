import React, { useRef, useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";
const style = {};

const Wrapper = ({ component, isSelected, children }) => {
    const [showConfig, setShowConfig] = useState(false);

    useEffect(() => {
        if (isSelected) {
            setShowConfig(true);
        } else {
            setShowConfig(false);
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
                    </div>
                </div>
            </div>
            <div className="modal modal-lg fade" id="authorization">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">Authorization</div>
                        <div className="modal-body"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Settings() {
    const context = useContext(AppContext);
    const [currentComponent, setCurrentComponent] = useState({});
    const [propsToSend, setPropsToSend] = useState({});
    const [inputField, setInputField] = useState({
        title: "",
        serviceKey: "",
    });
    useEffect(() => {
        if (context) {
            setCurrentComponent(context.selectedComponent);
        }
    }, [context]);

    const handleUpdateComponentData = () => {
        let _components = { ...context.components };
        _components[currentComponent.component_id].data = inputField;
        context.setComponents(_components);
    };

    const handleInputField = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setInputField((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6">
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            onChange={(e) => handleInputField(e)}
                            value={inputField.title}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="mb-3">
                        <label className="form-label">Service Key</label>
                        <input
                            type="text"
                            className="form-control"
                            name="serviceKey"
                            onChange={(e) => handleInputField(e)}
                            value={inputField.serviceKey}
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end align-items-center">
                <button
                    className="btn btn-sm btn-primary align-self-center"
                    onClick={() => handleUpdateComponentData()}
                >
                    Save
                </button>
            </div>
            <code>{JSON.stringify(currentComponent)}</code>
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
