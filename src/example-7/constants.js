import { v4 as uuidv4 } from "uuid";

export const SIDEBAR_ITEM = "sidebaritem";
export const ROW = "row";
export const COLUMN = "col";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
    {
        id: "new",
        component_id: uuidv4(),
        type: SIDEBAR_ITEM,
        component: {
            type: "container",
            content: "I AM A CONTAINER",
        },
    },
    {
        id: "new",
        component_id: uuidv4(),
        component: {
            type: "grid",
            content: "I AM A GRID",
        },
    },
    {
        id: "new",
        component_id: uuidv4(),
        component: {
            type: "component",
            content: " 🫂 I AM A COMPONENT",
        },
    },
];
