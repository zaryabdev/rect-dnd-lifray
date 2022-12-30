import { memo } from "react";
import { Colors } from "./Colors";
import { StatefulTargetBox } from "./TargetBox";
import { SourceBox } from "./SourceBox";
export const Container = memo(function Container() {
    return (
        <div style={{ overflow: "hidden", clear: "both", margin: "-.5rem" }}>
            <div style={{ float: "left" }}></div>
            <SourceBox color={Colors.BLUE}>
                <SourceBox color={Colors.YELLOW}>
                    <SourceBox color={Colors.BLUE} />
                    <SourceBox color={Colors.BLUE} />
                    <SourceBox color={Colors.BLUE} />
                </SourceBox>
                <SourceBox color={Colors.YELLOW}>
                    <SourceBox color={Colors.BLUE} />
                </SourceBox>
            </SourceBox>
            <SourceBox color={Colors.YELLOW}>
                <SourceBox color={Colors.BLUE} />
            </SourceBox>
            <div
                style={{
                    float: "left",
                    marginLeft: "5rem",
                    marginTop: ".5rem",
                }}
            >
                <StatefulTargetBox />
            </div>
        </div>
    );
});
