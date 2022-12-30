import { useState, useEffect } from "react";
import { Box } from "./Box";

const styles = {
    display: "inline-block",
    transform: "rotate(-12deg)",
    WebkitTransform: "rotate(-12deg)",
};
function BoxDragPreview({ title }) {
    const [tickTock, setTickTock] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setTickTock(!tickTock), 100);
        return () => clearInterval(interval);
    }, [tickTock]);

    return (
        <div style={styles}>
            <Box title={title} isYellow={ticktock} preview></Box>
        </div>
    );
}

export default BoxDragPreview;
