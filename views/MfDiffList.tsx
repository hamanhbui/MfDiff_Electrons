import diff = require("../MfDiff/DiffInterface")
import * as React from "react"
import { DiffItem, DiffProperty } from "./DiffItem/"
import * as ReactDOM from "react-dom"
import { Label } from "../Utils/generateLabel"
import { LoadingStatus } from "./layout"
import { ProcessState } from "../ApplicationState"
import { Checkbox } from "./Checkbox"
import _cpnInterface = require("./microflowComponents/interfaces")
import { observer } from "mobx-react";
import { loadDiffInterface, checkDiffInterface } from "../MfDiff/LoadDiffInterface"
import { MenuItem, DropdownButton } from "react-bootstrap"
import { RevisionInfo } from "../MfDiff/ProjectInterface"
export interface IViewOption {
    showFlow: boolean,
    hidePositionAndSize: boolean;
    hightlighted: boolean;
    foldAll: boolean;
    onSelectObject: () => void;
    showCommonInfo: boolean;
}

export class MfDiffHeading extends React.Component<{
    currentTab: number,
    foldAll: boolean,
    onChangeFold: () => void,
    hidePositionAndSize: boolean,
    onChangeHidePositionAndSize: () => void,
    showCommonInfo: boolean,
    onShowcCommonInfo: () => void,
    showFlow: boolean,
    onChangeShowFlow: () => void,
    onChangeTab: (numTab: number) => void
}, {}> {
    render() {
        return <div style={{ backgroundColor: "#ddd", padding: "3px 3px 0px", whiteSpace: "nowrap" }}>
            <div className="dropdown btn-group btn-group-default" data-reactid="721">
                <div style={{ display: "inline-block", marginRight: 3 }}>
                    <button style={{ outline: "none", color: "white", backgroundColor: "darkgray", borderRadius: 0 }} onClick={() => this.props.onChangeTab(1)} type="button" className="btn btn-default" data-reactid="722">Microflow</button>
                    <DropdownButton style={{ color: "white", backgroundColor: "darkgray", borderRadius: 0 }} title="" id="bg-nested-dropdown" disabled={this.props.currentTab === 1 ? false : true}>
                        <MenuItem eventKey="1">
                            <Checkbox label="Fold all" checked={this.props.foldAll} onClick={this.props.onChangeFold}></Checkbox>
                        </ MenuItem>
                        <MenuItem eventKey="2">
                            <Checkbox label="Hide position and size" checked={this.props.hidePositionAndSize} onClick={this.props.onChangeHidePositionAndSize}></Checkbox>
                        </ MenuItem>
                        <MenuItem eventKey="3">
                            <Checkbox label="Show common info" checked={this.props.showCommonInfo} onClick={this.props.onShowcCommonInfo}></Checkbox>
                        </ MenuItem>
                        <MenuItem eventKey="4">
                            <Checkbox label="Show flow" checked={this.props.showFlow} onClick={this.props.onChangeShowFlow}></Checkbox>
                        </ MenuItem>
                    </ DropdownButton>
                </div>
                <div style={{ display: "inline-block" }}>
                    <button style={{ outline: "none", color: "white", backgroundColor: "darkgray", borderRadius: 0 }} onClick={() => this.props.onChangeTab(2)} type="button" className="btn btn-default" data-reactid="722">Properties</button>
                </div>
            </ div>
        </div>
    }
}
export class MfDiffBody extends React.Component<{
    labels: Label,
    mfDiff: diff.IMfDiff,
    hightlightedId: string,
    onSelectObject: (id: string) => void,
    foldAll: boolean,
    hidePositionAndSize: boolean,
    revisions: RevisionInfo[],
    showCommonInfo: boolean,
    showFlow: boolean,
}, {}> {
    scrollingDiv: HTMLDivElement;
    render() {
        return <div ref={div => this.scrollingDiv = div} style={{ width: "100%", height: "96%", overflow: "auto" }} >
            {(this.props.mfDiff.newElementList.map(element => {
                let tmpElement = { isSingle: true, ...element }
                return <DiffItem diff={{ id: element.id, ...checkDiffInterface(loadDiffInterface(tmpElement, tmpElement)) as diff.IMfElementDiffBase }}
                    viewOption={{
                        hightlighted: this.props.hightlightedId === element.id,
                        onSelectObject: () => this.props.onSelectObject(element.id as string),
                        foldAll: this.props.foldAll,
                        hidePositionAndSize: this.props.hidePositionAndSize,
                        showCommonInfo: true,
                        showFlow: this.props.showFlow
                    }}
                    elementType={"New"}
                    revNos={this.props.revisions.map(revision => revision.Number)}
                    key={element.id}
                    ref={element.id}
                    labels={this.props.labels} />
            }))}
            {(this.props.mfDiff.deleteElementList.map(element => {
                let tmpElement = { isSingle: true, ...element }
                return <DiffItem diff={{ id: element.id, ...checkDiffInterface(loadDiffInterface(tmpElement, tmpElement)) as diff.IMfElementDiffBase }}
                    viewOption={{
                        hightlighted: this.props.hightlightedId === element.id,
                        onSelectObject: () => this.props.onSelectObject(element.id as string),
                        foldAll: this.props.foldAll,
                        hidePositionAndSize: this.props.hidePositionAndSize,
                        showCommonInfo: true,
                        showFlow: this.props.showFlow
                    }}
                    elementType={"Delete"}
                    revNos={this.props.revisions.map(revision => revision.Number)}
                    key={element.id}
                    ref={element.id}
                    labels={this.props.labels} />
            }))}
            {/*{(this.props.mfDiff.editElementList.length === 0) ? 'No object was modified' : this.props.mfDiff.editElementList.map(element => (*/}
            {this.props.mfDiff.editElementList.map(element => (
                (this.props.showCommonInfo || element.isDiff) ?
                    <DiffItem diff={element as diff.IMfElementDiffBase}
                        viewOption={{
                            hightlighted: this.props.hightlightedId === element.id,
                            onSelectObject: () => this.props.onSelectObject(element.id as string),
                            foldAll: this.props.foldAll,
                            hidePositionAndSize: this.props.hidePositionAndSize,
                            showCommonInfo: this.props.showCommonInfo,
                            showFlow: this.props.showFlow
                        }}
                        elementType={element.isDiff ? "Modify" : "NoChange"}
                        revNos={this.props.revisions.map(revision => revision.Number)}
                        key={element.id}
                        ref={element.id}
                        labels={this.props.labels} /> : undefined
            ))}

        </div>
    }
    componentWillUpdate(nextProps: { hightlightedId: string }) {
        if (nextProps.hightlightedId && ReactDOM.findDOMNode(this.refs[nextProps.hightlightedId])) {
            this.scrollingDiv.scrollTop = this.scrollingDiv.scrollTop + ReactDOM.findDOMNode(this.refs[nextProps.hightlightedId]).getBoundingClientRect().top - this.scrollingDiv.getBoundingClientRect().top;
        }
    }
}
export class MfDiffProperty extends React.Component<{
    labels: Label,
    mfDiff: diff.IMfDiff,
    revNos: number[],
}, {}> {
    render() {
        return <div style={{ width: "100%", height: "96%", overflow: "auto" }} >
            {(this.props.mfDiff.newElementList.map(element => {
                let tmpElement = { isSingle: true, ...element }
                return <DiffProperty diff={{ id: element.id, ...checkDiffInterface(loadDiffInterface(tmpElement, tmpElement)) as diff.IMfElementDiffBase }}
                    viewOption={{
                        hightlighted: false,
                        onSelectObject: () => { },
                        foldAll: false,
                        hidePositionAndSize: false,
                        showCommonInfo: true,
                        showFlow: false
                    }}
                    elementType={"New"}
                    revNos={this.props.revNos}
                    key={element.id}
                    ref={element.id}
                    labels={this.props.labels} />
            }))}
            {(this.props.mfDiff.deleteElementList.map(element => {
                let tmpElement = { isSingle: true, ...element }
                return <DiffProperty diff={{ id: element.id, ...checkDiffInterface(loadDiffInterface(tmpElement, tmpElement)) as diff.IMfElementDiffBase }}
                    viewOption={{
                        hightlighted: false,
                        onSelectObject: () => { },
                        foldAll: false,
                        hidePositionAndSize: false,
                        showCommonInfo: true,
                        showFlow: true
                    }}
                    elementType={"Delete"}
                    revNos={this.props.revNos}
                    key={element.id}
                    ref={element.id}
                    labels={this.props.labels} />
            }))}
            {/*{(this.props.mfDiff.editElementList.length === 0) ? 'No object was modified' : this.props.mfDiff.editElementList.map(element => (*/}
            {this.props.mfDiff.editElementList.map(element => (
                <DiffProperty diff={element as diff.IMfElementDiffBase}
                    viewOption={{
                        hightlighted: false,
                        onSelectObject: () => { },
                        foldAll: false,
                        hidePositionAndSize: false,
                        showCommonInfo: true,
                        showFlow: true
                    }}
                    elementType={element.isDiff ? "Modify" : "NoChange"}
                    revNos={this.props.revNos}
                    key={element.id}
                    ref={element.id}
                    labels={this.props.labels} />
            ))}

        </div>
    }
}
@observer export class MfDiffList extends React.Component<{
    additionalInfo1: _cpnInterface.microflow.IObjectDict,
    additionalInfo2: _cpnInterface.microflow.IObjectDict,
    mfDiff: diff.IMfDiff,
    revisions: RevisionInfo[],
    labels: Label,
    processState: ProcessState,
    foldAll: boolean,
    onChangeFold: () => void,
    hightlightedId: string,
    onSelectObject: (id: string) => void,
    hidePositionAndSize: boolean,
    onChangeHidePositionAndSize: () => void,
    showCommonInfo: boolean,
    onShowCommonInfo: () => void,
    showFlow: boolean,
    onChangeShowFlow: () => void
}, { currentTab: number }> {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1
        }
    }
    onChangeTab(numTab) {
        this.setState({
            currentTab: numTab
        })
    }
    update() {
        (this.props.mfDiff as diff.MfDiff).updateCaption([this.props.additionalInfo1, this.props.additionalInfo2])
        // this.props.mfDiff.editElementList.forEach(element => {
        //     element.isDiff = false;
        //     for (let property in element) {
        //         if ((!this.props.hidePosition || property !== 'position') && element[property] && element[property]['isDiff']) {
        //             element.isDiff = true;
        //         }
        //     }
        // })
    }
    render() {
        if (this.props.processState === ProcessState.LoadedMicroflow) {
            this.update();
            return <div style={{ width: "100%", height: "100%" }}>
                {/*<SplitPane defaultSize="60%" split="horizontal" maxSize={-100}>
                    <div style={{ width: "100%", height: "100%" }}>*/}
                <MfDiffHeading
                    currentTab={this.state.currentTab}
                    onChangeTab={this.onChangeTab.bind(this)}
                    foldAll={this.props.foldAll}
                    onChangeFold={this.props.onChangeFold}
                    hidePositionAndSize={this.props.hidePositionAndSize}
                    onChangeHidePositionAndSize={this.props.onChangeHidePositionAndSize}
                    showCommonInfo={this.props.showCommonInfo}
                    onShowcCommonInfo={this.props.onShowCommonInfo}
                    showFlow={this.props.showFlow}
                    onChangeShowFlow={this.props.onChangeShowFlow} />
                {this.state.currentTab === 1 ? <MfDiffBody
                    ref="DiffItemList"
                    foldAll={this.props.foldAll}
                    onSelectObject={this.props.onSelectObject}
                    hightlightedId={this.props.hightlightedId}
                    mfDiff={this.props.mfDiff}
                    labels={this.props.labels}
                    revisions={this.props.revisions}
                    hidePositionAndSize={this.props.hidePositionAndSize}
                    showCommonInfo={this.props.showCommonInfo}
                    showFlow={this.props.showFlow} />
                    : <MfDiffProperty
                        mfDiff={this.props.mfDiff}
                        labels={this.props.labels}
                        revNos={this.props.revisions.map(revision => revision.Number)}
                    />}
                {/*<div />
                    {/*</SplitPane>
                </SplitPane>*/}*/}
            </div>
        } else {
            return <LoadingStatus />
        }

    }

}