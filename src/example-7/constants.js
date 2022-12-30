import { v4 as uuidv4 } from "uuid";

export const SIDEBAR_ITEM = "sidebaritem";
export const ROW = "row";
export const COLUMN = "col";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
    {
        id: uuidv4(),
        type: SIDEBAR_ITEM,
        component: {
            type: "navbar",
            content: "NAVBAR",
        },
    },
    {
        id: uuidv4(),
        type: SIDEBAR_ITEM,
        component: {
            type: "heading",
            content: "HEADING",
        },
    },
    {
        id: uuidv4(),
        type: SIDEBAR_ITEM,
        component: {
            type: "button",
            content: "BUTTON",
        },
    },
    {
        id: uuidv4(),
        type: SIDEBAR_ITEM,
        component: {
            type: "card",
            content: "CARD",
        },
    },
    {
        id: uuidv4(),
        type: SIDEBAR_ITEM,
        component: {
            type: "image",
            content: "IMAGE",
        },
    },
    {
        id: uuidv4(),
        type: SIDEBAR_ITEM,
        component: {
            type: "footer",
            content: "FOOTER",
        },
    },
];
