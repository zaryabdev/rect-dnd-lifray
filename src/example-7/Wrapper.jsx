import React, { useRef, useContext } from "react";
import AppContext from "./AppContext";
const style = {};

const Wrapper = ({ children }) => {
    const context = useContext(AppContext);

    return <div className="border border-warning border-2"> {children}</div>;
};

export default Wrapper;
