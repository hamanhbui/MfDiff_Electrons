import React = require("react")
import { BranchInfo } from "../../MfDiff/ProjectInterface"
import { LimitedString } from "../../Utils/FormatString"

export class DisplayedBranch extends React.Component<{ value: BranchInfo }, {}> {
    render() {
        return <span className="Select-option-value">
            {this.props.value.DisplayName}
        </span>
    }
}

export function BranchDropdownItem(props: { selectValue, focusOption, key: string, option: { value: BranchInfo, label: BranchInfo }, style }) {
    return <div
        id={props.option.value.DisplayName}
        className="dropdown-element"
        key={props.key}
        style={{ ...props.style, lineHeight: "50px" }}
        onMouseDown={() => props.selectValue(props.option.value)}
        onMouseOver={() => props.focusOption(props.option.value)}>
        <span style={{ width: "200px", height: "100%" }}>{new LimitedString(props.option.value.DisplayName, 30).toString()} </span>
    </div>
}



export function filterBranches(option: { value: BranchInfo, label: BranchInfo }, inputString: string) {
    let value = option.value;
    if (!value) return false;
    if (value.Name.toLowerCase().includes(inputString)) {
        return true;
    } else {
        return false;
    }

}

export function compareTwoBranchesByName(branch1: BranchInfo, branch2: BranchInfo): number {
    if (branch1.Name.toLowerCase() === branch2.Name.toLowerCase()) return 0;
    if (branch1.Name.toLowerCase() > branch2.Name.toLowerCase()) return 1;
    return -1;
}