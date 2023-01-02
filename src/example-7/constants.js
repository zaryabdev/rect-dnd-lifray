import { v4 as uuidv4 } from "uuid";

export const SIDEBAR_ITEM = "sidebaritem";
export const ROW = "row";
export const COLUMN = "col";
export const COMPONENT = "component";

// const wrapper = {
//     title: "",
// authorizations: [
//     {
//         type: "GROUP",
//         value: "ADMIN", // eg: ADMIN - REGISTERED
//         permission: "ADMIN", // VIEW - EDIT - ADMIN
//     },
//     {
//         type: "GROUP",
//         value: "USER", // eg: ADMIN - REGISTERED
//         permission: "VIEW", // VIEW - EDIT - ADMIN
//     },
// ],
// component: {
//     id: "",
//     type: "",
// },
// props: [],
// values: [{
// id: "",
// value : "",
//}]
// },

// component will provide props to this wrapper

// const component = {
//     props: [
//         {
//             id: "title",
//             label: "Label",
//             type: "text", // text, date, options,
//             value: "",
//             options: [], // optional
//         },
//     ],
// };

export const SIDEBAR_ITEMS = [
    {
        id: uuidv4(),
        type: SIDEBAR_ITEM,
        component: {
            type: "card",
            data: {
                content: "CARD",
                serviveKey: "card.key",
            },
        },
    },
    {
        id: uuidv4(),
        type: SIDEBAR_ITEM,
        component: {
            type: "image",
            data: {
                content: "IMAGE",
                serviveKey: "image.key",
            },
        },
    },
];
