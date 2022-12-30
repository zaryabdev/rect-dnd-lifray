import { Box } from "./Box.jsx";
import { Dustbin } from "./Dustbin.jsx";
export const Container = () => (
    <div>
        <div style={{ overflow: "hidden", clear: "both", margin: "-1rem" }}>
            <Dustbin greedy={true}>
                <Dustbin greedy={true}>
                    <Dustbin greedy={true} />
                </Dustbin>
            </Dustbin>
            <Dustbin>
                <Dustbin>
                    <Dustbin />
                </Dustbin>
            </Dustbin>
        </div>

        <div style={{ overflow: "hidden", clear: "both", marginTop: "1.5rem" }}>
            <Box />
        </div>
    </div>
);
