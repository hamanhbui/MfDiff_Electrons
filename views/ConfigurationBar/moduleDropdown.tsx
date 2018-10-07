import React = require("react")
import { ModuleInfo } from "./ConfigurationBar"
import { LimitedString } from "../../Utils/FormatString"

export class DisplayedModule extends React.Component<{ value: ModuleInfo }, {}> {
    render() {
        return <span className="Select-option-value">
            {this.props.value.name}
        </span>
    }
}

export function ModuleDropdownItem(props: { selectValue, focusOption, key: string, option: { value: ModuleInfo, label: ModuleInfo }, style }) {
    return <div
        id={props.option.value.name}
        className="dropdown-element"
        key={props.key}
        style={{ ...props.style, lineHeight: "50px" }}
        onMouseDown={() => props.selectValue(props.option.value)}
        onMouseOver={() => props.focusOption(props.option.value)}>
        <span style={{ width: "200px", height: "100%" }}>{new LimitedString(props.option.value.name, 30).toString()} </span>
    </div>
}



export function filterModules(option: { value: ModuleInfo, label: ModuleInfo }, inputString: string) {
    let value = option.value;
    if (!value) return false;
    if (value.name.toLowerCase().includes(inputString)) {
        return true;
    } else {
        return false;
    }

}

export function compareTwoModulesByName(module1: ModuleInfo, module2: ModuleInfo): number {
    if (module1.name.toLowerCase() === module2.name.toLowerCase()) return 0;
    if (module1.name.toLowerCase() > module2.name.toLowerCase()) return 1;
    return -1;
}