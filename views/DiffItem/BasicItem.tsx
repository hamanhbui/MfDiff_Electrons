/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { } from "react-bootstrap"
export const NULL_COMPONENT = <span />
import Diff = require("../../MfDiff/DiffInterface")
import single = require("../../MfDiff/SingleInterface")
import { IViewOption } from "../MfDiffList"
import { backgroundVersion1, backgroundVersion2, diffDeleteStyle, diffEditStyle, diffNewStyle } from "../../config"
import { StandardString } from "../../Utils/FormatString"
const elementTitleColor = {
    "Delete": diffDeleteStyle.fill,
    "Modify": diffEditStyle.fill,
    "New": diffNewStyle.fill,
    "NoChange": "darkgray"
}

export const DiffContainer = (props) => (
    <div className="group-container">
        <span className="group-label">{props.name}</span>
        <div className="group-body" >
            {props.children}
        </div>
    </div>
)

export const PairContainer = (props) => {
    return <div className="pair-container">
        <div style={{ background: backgroundVersion1.color, borderBottom: "1px solid white", padding: "2px 0" }}>
            <b value={'1'} /> {props.children[0]}
        </div>
        <div style={{ background: backgroundVersion2.color, marginBottom: "5px", padding: "2px 0" }}>
            <b value={'2'} /> {props.children[1]}
        </div>
    </div>
}

export class ElementContainer extends React.Component<{ label?: string, diff: Diff.IMfElementDiffBase, name: single.ElementType, viewOption: IViewOption, borderColor: string }, { isShowed: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            isShowed: true,
        }
        this.showOrHideContent = this.showOrHideContent.bind(this);
    }
    _body;
    showOrHideContent() {
        if (this.state.isShowed) {
            (this._body as HTMLDivElement).style.display = "none";
        } else {
            (this._body as HTMLDivElement).style.display = "block";
        }
        this.setState({ isShowed: !this.state.isShowed })
    }
    componentWillUpdate(nextProps: { viewOption: IViewOption }) {
        this.state.isShowed = !nextProps.viewOption.foldAll
    }
    render() {
        let display = false;
        if (!this.props.viewOption.hidePositionAndSize) {
            if (this.props.diff["position"]) {
                display = true;
            }
        }
        for (let property in this.props.diff) {
            if (property !== "position" && property !== "id" && property !== "typeName" && this.props.diff[property]) {
                display = true;
            }
        }
        if (!display) return <span />
        return <div className="mx-mf-details-sidebar mx-mf-details-sidebar-active element-container" role="dialog" aria-hidden={false}>
            <div className="mx-mf-details-sidebar-contents" style={{ overflow: "hidden" }}>
                <div onClick={() => { this.props.viewOption.onSelectObject() }} className="mx-mf-details-header" style={{ backgroundColor: this.props.viewOption.hightlighted ? "#ffa500" : elementTitleColor[this.props.borderColor] }}>
                    <div className="chip" style={this.props.label ? {} : { width: 0 }}>
                        {this.props.label ? this.props.label.split("_")[0] : ""}
                        <sub>{this.props.label ? this.props.label.split("_")[1] : ""}</sub>
                    </div>
                    <h6 className="mx-mf-details-title"><b>{this.props.diff.typeName === single.ElementType.Property ? "Properties" : this.props.name.name}</b></h6>
                    <div onClick={(e: React.MouseEvent) => { this.showOrHideContent(); e.stopPropagation() }} style={{ float: "right" }}>
                        {!this.state.isShowed ?
                            <svg style={{ width: 16, height: 16 }}>
                                <line x1="5" y1="0" x2="12.5" y2="7.5" style={{ stroke: "grey", strokeWidth: 2 }} />
                                <line x1="12.5" y1="7.5" x2="5" y2="15" style={{ stroke: "grey", strokeWidth: 2 }} />
                            </svg> : <svg style={{ width: 16, height: 16 }}>
                                <line x1="0" y1="5" x2="7.5" y2="12.5" style={{ stroke: "grey", strokeWidth: 2 }} />
                                <line x1="7.5" y1="12.5" x2="15" y2="5" style={{ stroke: "grey", strokeWidth: 2 }} />
                            </svg>}
                    </div>
                </div>
                <div className="mx-mf-details-body" ref={body => this._body = body} style={{ display: this.props.viewOption.foldAll ? "none" : "block" }} >
                    {this.props.children}
                </div>
            </div>
        </div>
    }
}

export const PairBooleanItem = (props: { diff: Diff.IBasicDiff<boolean>, name: string, revNos: number[] }) => (
    <PairContainer>
        <SingleBooleanItem name={props.name} value={props.diff.member1 as boolean} />
        <SingleBooleanItem name={props.name} value={props.diff.member2 as boolean} />
    </PairContainer>
)

export const SingleBooleanItem = (props: { name: string, value: boolean }) => (
    <EnumItem name={props.name} values={["Yes", "No"]} checkedValue={props.value ? "Yes" : "No"} />
)

export const PairItem = (props: { revNos?: number[], diff: Diff.IBasicDiff<any>, name: string | undefined }) => (
    <PairContainer>
        <SingleItem name={props.name} value={props.diff.member1} />
        <SingleItem name={props.name} value={props.diff.member2} />
    </PairContainer>
)

export const PairEnumItem = (props: { name: string, values: string[], diff: Diff.IBasicDiff<string> }) => (
    <PairContainer>
        <EnumItem name={props.name} values={props.values} checkedValue={props.diff.member1 as string} />
        <EnumItem name={props.name} values={props.values} checkedValue={props.diff.member2 as string} />
    </PairContainer>
)

export const SingleTextAreaItem = (props: { name: string, value: string }) => (
    <div className="text-container" style={{ height: "60px" }}>
        {props.name ? <div className="text-label">{props.name}</div> : undefined}
        <textarea style={{ height: "100%", width: "100%" }} disabled value={props.value} />
    </div>
)

export const PairTextAreaItem = (props: { name: string, diff: Diff.IBasicDiff<string> }) => (
    <PairContainer>
        <SingleTextAreaItem name={props.name} value={props.diff.member1 as string} />
        <SingleTextAreaItem name={props.name} value={props.diff.member2 as string} />
    </PairContainer>
)

export const SingleItem = (props: { name?: string, value: string | undefined, style?: any }) => (
    <div className="text-container">
        {props.name !== undefined ? <span className="text-label">{props.name}</span> : undefined}
        <input style={props.style} type="text" className="text-value" disabled value={(props.value) ? props.value : ""} />
    </div>
)

export const EnumItem = (props: { name: string, values: string[], checkedValue: string, style?: {} }) => (
    <div className="text-container">
        <span className="text-label">{props.name}</span>
        <form style={{ display: "inline", lineHeight: "25px", ...props.style }}>
            {props.values.map((val, index) => {
                if (val) {
                    return <label key={index} className="radio-inline"><input style={{ marginTop: 5 }} type="radio" disabled checked={StandardString.compareTwoStrings(props.checkedValue, val)} />{val}</label>
                }
            })}
        </form>
    </div >
)

export const VerticalEnumItem = (props: { name: string, values: string[], optionalValues: boolean[], style?: {}, checkedValue: string }) => (
    <div className="text-container" style={{ height: "auto" }}>
        <span className="text-label">{props.name}</span>
        <div className="text-value">
            {props.values.map((val, index) => {
                if (val) {
                    return <div className="text-container" style={{ paddingLeft: "0" }} key={index}>
                        <label className="radio-inline" style={{ width: "150px" }}><input style={{ marginTop: 5 }} type="radio" disabled checked={StandardString.compareTwoStrings(props.checkedValue.split("_")[0], val)} />{val}</label>
                        {props.optionalValues[index] ? <input type="text" className="text-value" disabled value={StandardString.compareTwoStrings(props.checkedValue.split("_")[0], val) ? props.checkedValue.split("_")[1] : ""} /> : undefined}
                    </div>
                }
            })}
        </div>
    </div>
)
export class ArrayType {
    constructor(public arrayType: { width: string, property: string }[]) { }
    static MemberChange = new ArrayType([{
        width: "20%",
        property: "name"
    }, {
        width: "20%",
        property: "type"
    }, {
        width: "10%",
        property: "operation"
    }, {
        width: "50%",
        property: "value"
    }])
    static Attribute = new ArrayType([{
        width: "50%",
        property: "name",
    }, {
        width: "50%",
        property: "value"
    }])
    static Parameter = new ArrayType([{
        width: "30%",
        property: "name",
    }, {
        width: "30%",
        property: "type",
    }, {
        width: "40%",
        property: "value",
    }])
}
export const SingleCheckBox = (props: { name?: string, tittle: string, value: string | undefined, isChecked: boolean, style?: any }) => (
    <div className="text-container">
        {props.name !== undefined ? <span className="text-label">{props.name}</span> : undefined}
        <label className="checkbox-inline" style={{ paddingLeft: 15, paddingRight: 15, width: 170 }}>
            <input style={{ marginTop: 2, marginLeft: -15 }} type="checkbox" disabled checked={props.isChecked} value={(props.value) ? props.value : ""} />
            {props.tittle}
        </label>
        <label className="text-inline" style={{ width: "100%" }}>

            <input style={props.style} type="text" className="text-value" disabled value={(props.value) ? props.value : ""} />
        </label>
    </div>
)
export const PairCheckBox = (props: { revNos?: number[], tittle: string, diff: Diff.IBasicDiff<any>, name: string, isChecked: Diff.IBasicDiff<boolean> }) => (
    <PairContainer>
        <SingleCheckBox style={{ fontWeight: 400 }} name={props.name} tittle={props.tittle} value={props.diff.member1} isChecked={props.isChecked.member1 as boolean} />
        <SingleCheckBox style={{ fontWeight: 400 }} name={props.name} tittle={props.tittle} value={props.diff.member2} isChecked={props.isChecked.member2 as boolean} />
    </PairContainer>
)

export class DisplayArrayItemOption {
    constructor(private _displayOptions: ArrayType, private _heading: string[]) { }
    getElementOptions() {
        let elementOptions: { width: string; property: string; heading: string }[] = [];
        for (let i = 0; i < this._displayOptions.arrayType.length; ++i) {
            elementOptions.push({
                ...this._displayOptions.arrayType[i],
                heading: this._heading[i]
            })
        }
        return elementOptions;
    }
}

export const ArrayItem = (props: {
    name: string, revNos: number[], diff: Array<Diff.IAttributeDiff> | undefined, displayOptions: DisplayArrayItemOption, showCommonInfo: boolean
}) => {

    return <div className={props.name && "text-container"} style={{ height: "auto" }}>
        {props.name && <div className="text-label">{props.name}</div>}
        <div className={"array-container text-value " + (props.name && "array-container-named")}>
            {/*<div className="array-toolbar" />*/}
            <div className="array-table-area" style={{ width: props.name && "100%" }}>
                {props.displayOptions.getElementOptions().map(elementOption => (
                    <div key={elementOption.heading} className="table-heading" style={{ width: elementOption.width }}>{elementOption.heading}</div>)
                )}
                <div style={{ overflow: "auto", height: "150px" }}>
                    {props.diff && props.diff.map((element, index) => {
                        if (!element.isDiff) {
                            if (!props.showCommonInfo) return undefined
                            return <div key={index} style={{ display: "flex" }}>
                                {props.displayOptions.getElementOptions().map(elementOption => (
                                    <div key={elementOption.heading} className="table-data" style={{ width: elementOption.width }}>
                                        {element.member1 ? (element.member1)[elementOption.property] : element[elementOption.property]}
                                    </div>))}
                            </div>
                        } else {
                            return <div style={{ borderBottom: "6px solid transparent" }} key={index}>
                                <div style={{ margin: "1px 0", display: "flex" }}>
                                    {props.displayOptions.getElementOptions().map(elementOption => (
                                        <div key={elementOption.heading} className="table-data" style={{ width: elementOption.width, background: backgroundVersion1.color }}>
                                            {element.member1 ? (element.member1 as Diff.IAttribute)[elementOption.property] : ""}
                                        </div>))}
                                </div>
                                <div style={{ margin: "1px 0", display: "flex" }}>
                                    {props.displayOptions.getElementOptions().map(elementOption => (
                                        <div key={elementOption.heading} className="table-data" style={{ width: elementOption.width, background: backgroundVersion2.color }}>
                                            {element.member2 ? (element.member2 as Diff.IAttribute)[elementOption.property] : ""}
                                        </div>))}
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>
        </div>
    </div>
}