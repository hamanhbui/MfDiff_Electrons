import React = require("react")
import { AppInfo } from "../../MfDiff/ProjectInterface"
export class DisplayedApp extends React.Component<{ value: AppInfo }, {}> {
    render() {
        return <span className="Select-option-value">
            {this.props.value.Name}
        </span>
    }
}

export function AppDropdownItem(props: { selectValue: (revNo) => void, key: string, focusOption, option, style }) {
    return <div
        className="dropdown-element"
        key={props.key}
        style={{ ...props.style, lineHeight: "50px" }}
        onClick={() => {
            props.selectValue(props.option.value)
        }}
        onMouseOver={() => props.focusOption(props.option.value)}>
        {props.option.value.Name}
    </div>
}

export function filterApps(option: { value: AppInfo, label: AppInfo }, inputString: string) {
    let value = option.value;
    if (!value) return false;
    if (value.Name.toLowerCase().includes(inputString.toLowerCase())) {
        return true;
    } else {
        return false;
    }

}

export function compareTwoAppsByName(app1: AppInfo, app2: AppInfo): number {
    if (app1.Name.toLowerCase() === app2.Name.toLowerCase()) return 0;
    if (app1.Name.toLowerCase() < app2.Name.toLowerCase()) return -1;
    return 1;
}