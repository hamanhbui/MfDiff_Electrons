/// <ref erence path="./ ../typings/index.d.ts" /> 
import * as React from "react";
import { microflows } from "mendixmodelsdk";
import _cpnInterface = require("./microflowComponents/interfaces")
import { findHorizontal } from "./microflowComponents/ConvertFunction/FindHorizontal";
import { findVertical } from "./microflowComponents/ConvertFunction/FindVertical";
import { findMaxHorizontal } from "./microflowComponents/ConvertFunction/FindMaxHorizontal";
import { findMaxVertical } from "./microflowComponents/ConvertFunction/FindMaxVertical";
import { observer } from "mobx-react";
import * as diff from "./../MfDiff/DiffInterface";
import Microflow from "./Microflow";
import { TypeEnum } from "./microflowComponents/interfaces/TypeEnum"
import MfComponent = require("./microflowComponents/")
import { checkInstanceAndGetType, checkInstanceAndGetGeometry } from "./microflowComponents/utils";
/**
 * HighlightedComponent observe the change of HighlightedId and render if necessaary
 */
const HighlightedComponent = observer((props: { highlightedId: string, idPosDict: { [id: string]: _cpnInterface.microflow.IGeometry }, idTypeDict: { [id: string]: TypeEnum } }) => {
    switch (props.idTypeDict[props.highlightedId]) {
        case TypeEnum.Start:
        case TypeEnum.End:
        case TypeEnum.ContinueEvent:
        case TypeEnum.BreakEvent:
        case TypeEnum.ErrorEvent: {
            return <MfComponent.HighlightClickEvent id={props.highlightedId} data={props.idPosDict[props.highlightedId]} />
        }
        case TypeEnum.ExclusiveSplit:
        case TypeEnum.InheritanceSplit:
        case TypeEnum.ExclusiveMerge: {
            return <MfComponent.HighlightClickSplit id={props.highlightedId} data={props.idPosDict[props.highlightedId]} />
        }
        case TypeEnum.Parameter: {
            return <MfComponent.HighlightClickParameter id={props.highlightedId} data={props.idPosDict[props.highlightedId]} />
        }
        case TypeEnum.Annotation: {
            return <MfComponent.HighlightClickAnnotation id={props.highlightedId} data={props.idPosDict[props.highlightedId]} />
        }
        case TypeEnum.LoopedAcivity: {
            return <div />
        }
    }
    return <MfComponent.HighlightClickAction id={props.highlightedId} data={props.idPosDict[props.highlightedId]} />
});
/**
 * MicroflowContainer contains:
 * - Microflow
 * - MicroflowHighlighted
 * - MicroflowDiff
 */
export default class MicroflowContainer extends React.Component<{
    setOffSetWidth: (offSetWidth: number) => void, setScrollWidth: (scrollWidth: number) => void, isScrolled: boolean,
    onScroll: (e: any) => void, setListComponentInfo1: (componentInfo: _cpnInterface.microflow.IObjectDict) => void,
    setListComponentInfo2: (objectInfo: _cpnInterface.microflow.IObjectDict) => void, mf: microflows.Microflow | undefined,
    labels: { [id: string]: string }, version: string, mfDiff: diff.IMfDiff, highlightedId: string,
    onSelectObject: (id: string) => void, hidePositionAndSize: boolean, revNos: number, style?: any
},
    {}>{
    private scrollTimer: number;
    constructor() {
        super();
        this.scrollTimer = -1;
    }
    onClickRenderer() {
        this.props.onSelectObject("");
    }
    _scrollingDiv: HTMLDivElement;
    setScroll() {
        if (this.scrollTimer != -1) {
            clearTimeout(this.scrollTimer);
        }
        this.scrollTimer = window.setTimeout(this.props.onScroll, 0);
    }
    getGeometryDict() {
        let idPosDict: { [id: string]: _cpnInterface.microflow.IGeometry } = {};
        if (this.props.mf)
            checkInstanceAndGetGeometry(this.props.mf.objectCollection, idPosDict);
        return idPosDict;
    }
    getTypeDict() {
        let idTypeDict: { [id: string]: TypeEnum } = {};
        if (this.props.mf)
            checkInstanceAndGetType(this.props.mf.objectCollection, idTypeDict);
        return idTypeDict;
    }
    componentDidMount() {
        this.props.setScrollWidth(this._scrollingDiv.scrollWidth);
        this.props.setOffSetWidth(this._scrollingDiv.offsetWidth);
    }
    componentDidUpdate() {
        this.props.setScrollWidth(this._scrollingDiv.scrollWidth);
        this.props.setOffSetWidth(this._scrollingDiv.offsetWidth);
    }
    render() {
        let style = {
            height: "100%",
            width: "100%",
            overflow: "auto"
        }
        for (let stl in this.props.style) {
            style[stl] = this.props.style[stl];
        }
        let left = 0, top = 0, width = 0;
        if (this.props.mf) {
            left = findHorizontal(this.props.mf);
            top = findVertical(this.props.mf) - findMaxVertical(this.props.mf);
            width = findMaxHorizontal(this.props.mf);
        }
        return (
            <div onClick={this.onClickRenderer.bind(this)} style={style} ref={div => this._scrollingDiv = div} onScroll={this.setScroll.bind(this)} >
                <Microflow setListComponentInfo1={this.props.setListComponentInfo1} setListComponentInfo2={this.props.setListComponentInfo2} mf={this.props.mf} labels={this.props.labels} version={this.props.version}
                    mfDiff={this.props.mfDiff} onSelectObject={this.props.onSelectObject} hidePositionAndSize={this.props.hidePositionAndSize} revNos={this.props.revNos} />
                <div style={{ left: left, top: top, width: width, position: "relative" }}>
                    <HighlightedComponent highlightedId={this.props.highlightedId} idPosDict={this.getGeometryDict()} idTypeDict={this.getTypeDict()} />
                </div>
            </div >
        )
    }
    componentWillUpdate(nextProps) {
        if (this.scrollTimer != -1) {
            clearTimeout(this.scrollTimer);
        }
        this.scrollTimer = window.setTimeout(() => {
            if (nextProps.isScrolled === false) {
                let geometry = this.getGeometryDict();
                let topParentDiv = 0;
                let leftParentDiv = 0;
                if (this.props.mf) {
                    topParentDiv = findVertical(this.props.mf);
                    leftParentDiv = findHorizontal(this.props.mf);
                }
                if (geometry[nextProps.highlightedId]) {
                    if (geometry[nextProps.highlightedId].top + geometry[nextProps.highlightedId].height + topParentDiv <= this._scrollingDiv.offsetHeight + this._scrollingDiv.scrollTop
                        && geometry[nextProps.highlightedId].top + geometry[nextProps.highlightedId].height + topParentDiv >= this._scrollingDiv.scrollTop) {
                    }
                    else {
                        this._scrollingDiv.scrollTop = geometry[nextProps.highlightedId].top;
                    }
                    if (geometry[nextProps.highlightedId].left + geometry[nextProps.highlightedId].width + leftParentDiv <= this._scrollingDiv.offsetWidth + this._scrollingDiv.scrollLeft
                        && geometry[nextProps.highlightedId].left + geometry[nextProps.highlightedId].width + leftParentDiv >= this._scrollingDiv.scrollLeft) {
                    }
                    else {
                        this._scrollingDiv.scrollLeft = geometry[nextProps.highlightedId].left;
                    }
                }
            } this.scrollTimer = -1;
        }, 0);
    }
}  