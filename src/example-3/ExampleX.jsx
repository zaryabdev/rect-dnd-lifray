import { useCallback, useState } from "react";
import { CustomDragLayer } from "./CustomeDragLayer";
import { Container } from "./Container";
function ExampleX() {
    const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(false);
    const [snapToGridWhileDragging, setSnapToGridWhileDragging] =
        useState(false);
    return (
        <div>
            <Container snapToGrid={snapToGridAfterDrop} />
            <CustomDragLayer snapToGrid={snapToGridWhileDragging} />
            <p>
                <label htmlFor="">
                    <input
                        type="checkbox"
                        checked={snapToGridWhileDragging}
                        onChange={() =>
                            setSnapToGridWhileDragging((prev) => !prev)
                        }
                    />
                    <small>Snap to grid while dragging</small>
                </label>
                <br />
                <label htmlFor="">
                    <input
                        type="checkbox"
                        checked={snapToGridAfterDrop}
                        onChange={() => setSnapToGridAfterDrop((prev) => !prev)}
                    />
                    <small>Snap to grid after drop</small>
                </label>
            </p>
        </div>
    );
}

export { ExampleX };
