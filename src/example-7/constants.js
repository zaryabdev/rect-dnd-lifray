import { v4 as uuidv4 } from "uuid";

export const SIDEBAR_ITEM = "sidebaritem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
    {
        id: `id:${uuidv4()}`,
        component_id: `component_id:${uuidv4()}`,
        type: SIDEBAR_ITEM,
        component: {
            type: "container",
            data: {},
        },
    },
    {
        id: `id:${uuidv4()}`,
        component_id: `component_id:${uuidv4()}`,
        type: SIDEBAR_ITEM,
        component: {
            type: "grid",
            data: {},
        },
    },
    {
        id: `id:${uuidv4()}`,
        component_id: `component_id:${uuidv4()}`,
        type: SIDEBAR_ITEM,
        component: {
            type: "component",
            data: {},
        },
    },
];
