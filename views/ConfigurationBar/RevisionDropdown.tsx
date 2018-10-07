import React = require("react")
import { DateString, LimitedString } from "../../Utils/FormatString"
import { RevisionInfo } from "../../MfDiff/ProjectInterface"

export class DisplayedRevision extends React.Component<{ value: RevisionInfo }, {}> {
    render() {
        return <span className="Select-option-value">
            {this.props.value.Number}
            {/*{this.props.value.Number} - {this.props.value.Date ? new DateString(this.props.value.Date).toString() : "no information"}*/}
        </span>
    }
}

export function RevisionDropdownItem(props: { key: string, option: { value: RevisionInfo, label: RevisionInfo }, selectValue, focusOption, style: {} }) {
    if (!props.option) return <span />;
    return <div
        style={props.style}
        className="dropdown-element"
        key={props.key}
        onClick={() => { props.selectValue(props.option.value) }}
        onMouseOver={() => { props.focusOption(props.option.value) }}>
        <div className="number">
            {props.option.value.Number}
        </div>
        {props.option.value.Author && <div className="content" >
            <span style={{ color: "blue" }}>{new LimitedString(props.option.value.Author as string, 25).toString()}</span>
            <span style={{ color: "gray", float: "right", display: "inline-block" }}>{
                props.option.value.Date != "" ? new DateString(props.option.value.Date as string).toString() :
                    "Cannot retrieve date"}</span>
            <br />
            <span>{new LimitedString(props.option.value.CommitMessage as string, 35).toString()}</span>
        </div>}
    </div>
}

export function compareTwoRevisionsByRevNo(rev1: RevisionInfo, rev2: RevisionInfo): number {
    if (rev1.Number > rev2.Number) return -1;
    if (rev1.Number === rev2.Number) return 0;
    return 1;
}

export function filterRevisions(option: { value: RevisionInfo, label: RevisionInfo }, inputString: string) {
    let value = option.value
    if (!value) return false;
    if (value.Number && value.Number.toString().includes(inputString)) {
        return true;
    }
    if (value.Author && value.Author.toLowerCase().includes(inputString)) {
        return true;
    }
    if (value.CommitMessage && value.CommitMessage.toLowerCase().includes(inputString)) {
        return true;
    }
    if (value.Date) {
        let date = new DateString(value.Date).toString();
        if (date.toLowerCase().includes(inputString)) {
            return true;
        }
    }
    if (value.MendixVersion && value.MendixVersion.toLowerCase().includes(inputString)) {
        return true;
    }
    return false;
}