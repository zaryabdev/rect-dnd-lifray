import { Box } from "./Box.jsx";
import { Box2 } from "./Box2.jsx";
import { Dustbin } from "./Dustbin.jsx";
import { Dustbin2 } from "./Dustbin2.jsx";
export const Container = () => (
    <div>
        <div style={{ overflow: "hidden", clear: "both" }}>
            <Box2 name="phone"></Box2>
            <Box2 name="battery"></Box2>
            <Box2 name="pen"></Box2>
        </div>
        <div style={{ overflow: "hidden", clear: "both" }}>
            <Dustbin2 allowedDropEffect="any" />
            <Dustbin2 allowedDropEffect="copy" />
            <Dustbin2 allowedDropEffect="move" />
        </div>
        <hr />

        <div style={{ overflow: "hidden", clear: "both" }}>
            <Box name="Glass" />
            <Box name="Banana" />
            <Box name="Paper" />
            <Box name="Pencil" />
        </div>
        <div style={{ overflow: "hidden", clear: "both" }}>
            <Dustbin allowedDropEffect="any" />
            <Dustbin allowedDropEffect="copy" />
            <Dustbin allowedDropEffect="move" />
        </div>
    </div>
);
