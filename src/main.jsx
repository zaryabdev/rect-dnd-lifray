import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import Example0 from "./example-0/example";
// import Example1 from "./example-1/example";
// import Example2 from "./example-2/example";
// import Example3 from "./example-3/example";
// import Example4 from "./example-4/example";
// import Example5 from "./example-5/example";
// import Example6 from "./example-6/example";
import Example7 from "./example-7/example";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Example7 />
            </DndProvider>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
