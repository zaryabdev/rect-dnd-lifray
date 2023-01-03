import React, { Fragment, useState, useEffect } from "react";
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
import { API_URL } from "./Config";
import axios from "axios";

function App() {
    // let initialState = {
    //     username: "faizan",
    //     password: "123",
    // };
    // const [userDetails] = useState(initialState);

    // useEffect(() => {
    //     login();
    // }, []);

    // function login() {
    //     axios
    //         .post(API_URL + "?service.key=login", userDetails)
    //         .then((response) => {
    //             if (response.data.C_DATA.AUTH_KEY) {
    //                 let authKey = response.data.C_DATA.AUTH_KEY;
    //                 axios.defaults.headers.common["AUTH_KEY"] = authKey;
    //                 localStorage.setItem("AUTH_KEY", authKey);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    // function getData() {
    //     var dataRequest = {
    //         dataKeys: [
    //             {
    //                 serviceParams: "",
    //                 dataKey: "l",
    //                 serviceKey: "layout",
    //                 mode: "formData",
    //             },
    //             {
    //                 serviceParams: "",
    //                 dataKey: "c",
    //                 serviceKey: "component",
    //                 mode: "formData",
    //             },
    //         ],
    //     };

    //     axios
    //         .post(API_URL + "?service.key=multiKey.data", dataRequest)
    //         .then((response) => {
    //             if (
    //                 response.status === 200 &&
    //                 response.data.C_STATUS === "SUCCESS"
    //             ) {
    //                 let data = response.data.C_DATA;
    //             }
    //         })
    //         .catch((error) => {});
    // }

    // function handleSaveLayout() {
    //     let fieldsData = {};

    //     let request = {};
    //     request.data = [];
    //     let entityForm = {};
    //     entityForm.formId = "layout";
    //     entityForm.entity = "layout";
    //     entityForm.action = "update";

    //     if (fieldsData.id && fieldsData.id !== "") {
    //         entityForm.id = fieldsData.id;
    //     } else {
    //         entityForm.id = "new";
    //     }

    //     entityForm.formData = fieldsData;

    //     request.data.push(entityForm);

    //     axios
    //         .post(API_URL + "?service.key=update.formData", request)
    //         .then((response) => {
    //             if (response.data.C_STATUS == "SUCCESS") {
    //             } else {
    //             }
    //         })
    //         .catch((error) => {});
    // }

    // function handleSaveComponents() {
    //     let fieldsData = {};

    //     let request = {};
    //     request.data = [];
    //     let entityForm = {};
    //     entityForm.formId = "component";
    //     entityForm.entity = "component";
    //     entityForm.action = "update";

    //     if (fieldsData.id && fieldsData.id !== "") {
    //         entityForm.id = fieldsData.id;
    //     } else {
    //         entityForm.id = "new";
    //     }

    //     entityForm.formData = fieldsData;

    //     request.data.push(entityForm);

    //     axios
    //         .post(API_URL + "?service.key=update.formData", request)
    //         .then((response) => {
    //             if (response.data.C_STATUS == "SUCCESS") {
    //             } else {
    //             }
    //         })
    //         .catch((error) => {});
    // }

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Example7 />
            </DndProvider>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
