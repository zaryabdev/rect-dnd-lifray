import { memo, useCallback, useState } from "react";
const styles = {
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    cursor: "move",
};

function BoxX({ title, isYellow, preview }) {
    const backgroundColor = isYellow ? "yellow" : "white";
    return (
        <div
            style={{ ...styles, backgroundColor }}
            role={preview ? "BoxPreview" : "Box"}
        >
            {title}
        </div>
    );
}

export const Box = memo(BoxX);
