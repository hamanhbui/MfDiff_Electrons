import React = require("react")
// import { microflows as mfs } from "mendixmodelsdk"
import { MicroflowInfo, MicroflowState } from "./ConfigurationBar"
import { LoadingStatus } from "../layout"
import { LimitedString } from "../../Utils/FormatString"
import { diffEditStyle, diffNewStyle, diffDeleteStyle } from "../../config"

export class DisplayedMicroflow extends React.Component<{ value: MicroflowInfo }, {}> {
    render() {
        return <span className="Select-option-value">
            {this.props.value.qualifiedName && this.props.value.qualifiedName.split(".")[1]}
        </span>
    }
}

export function MicroflowDropdownItem(props: { selectValue, focusOption, key: string, option: { value: MicroflowInfo, label: MicroflowInfo }, style }) {
    return <div
        id={props.option.value.qualifiedName}
        className="dropdown-element"
        key={props.key}
        style={{ ...props.style, lineHeight: "50px" }}
        onMouseDown={() => props.selectValue(props.option.value)}
        onMouseOver={() => props.focusOption(props.option.value)}>
        <span style={{ width: "200px", height: "100%" }}>{new LimitedString(props.option.value.qualifiedName && props.option.value.qualifiedName.split(".")[1], 30).toString()} </span>
        <div style={{ width: "50px", height: "100%" }}>
            {props.option.value.state === MicroflowState.Loading ? <LoadingStatus className="dropdown-item-spinner" /> :
                props.option.value.state === MicroflowState.Edited ? <span style={{ color: diffEditStyle.fill }}>Modified</span> :
                    props.option.value.state === MicroflowState.Delete ? <span style={{ color: diffDeleteStyle.fill }}>Deleted</span> :
                        props.option.value.state === MicroflowState.New ? <span style={{ color: diffNewStyle.fill }}>Added</span> :
                            <span style={{ color: "darkgray" }}>No change</span>}
        </div>
    </div>
}



export function filterMicroflows(option: { value: MicroflowInfo, label: MicroflowInfo }, inputString: string) {
    let value = option.value;
    if (!value) return false;
    if (value.qualifiedName.toLowerCase().includes(inputString)) {
        return true;
    } else {
        return false;
    }

}

export function compareTwoMfsByNameAndState(mf1: MicroflowInfo, mf2: MicroflowInfo): number {
    if (mf1.state > mf2.state) return 1;
    if (mf1.state < mf2.state) return -1;
    if (mf1.qualifiedName.toLowerCase() === mf2.qualifiedName.toLowerCase()) return 0;
    if (mf1.qualifiedName.toLowerCase() > mf2.qualifiedName.toLowerCase()) return 1;
    return -1;
}