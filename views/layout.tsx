/// <reference path="./../typings/index.d.ts" /> 
import Spinner = require("react-spinner");
import SplitPane = require("react-split-pane");
// import * as diff from "../MfDiff/DiffInterface"
import * as React from "react";
import MicroflowContainer from "./MicroflowContainer";
import { microflows as mfs } from "mendixmodelsdk"
import { observer } from "mobx-react";
import { AppState, ProcessState } from "../ApplicationState";
// import DevTools from "mobx-react-devtools";
import { MfDiffList } from "./MfDiffList"
// import { Label } from "../Utils/generateLabel"
import { ConfigurationBar } from "./ConfigurationBar/ConfigurationBar"
const TESTING_MODE = false;
// import _cpnInterface = require("./microflowComponents/interfaces")
import { backgroundVersion1, backgroundVersion2 } from "./../config";
import ReactDOM = require("react-dom");
import OverviewBarContainer from "./OverviewBarContainer";
import { observable } from "mobx";
export const DiffLayout = observer((props: { microflow: AppState }) => (
    <SplitPane defaultSize={60} minSize={50} maxSize={50} split="horizontal" allowResize={false}>
        <ConfigurationBar AppData={props.microflow} />
        <SplitPane defaultSize={20} minSize={20} maxSize={20} split="horizontal" primary="second" allowResize={false}>
            <LayoutBody appState={props.microflow} />
            <StatusBar status={props.microflow.Status} />
        </SplitPane>
    </SplitPane >
))

@observer class LayoutBody extends React.Component<{ appState: AppState, }, {
}> {
    mouseClientX: number;
    mouseClientY: number;
    @observable scrollWidth1: number;
    @observable scrollWidth2: number;
    @observable offSetWidth: number;
    prevScrollLeft1: number;
    prevScrollTop1: number;
    prevScrollLeft2: number;
    prevScrollTop2: number;
    constructor(props) {
        super(props);
        this.mouseClientX = 0;
        this.mouseClientY = 0;
        this.scrollWidth1 = 0;
        this.scrollWidth2 = 0;
        this.offSetWidth = 0;
        this.prevScrollLeft1 = 0;
        this.prevScrollTop1 = 0;
        this.prevScrollLeft2 = 0;
        this.prevScrollTop2 = 0;
    }
    setPrevScroll(scrollLeft1: number, scrollTop1: number, scrollLeft2: number, scrollTop2: number) {
        this.prevScrollLeft1 = scrollLeft1,
            this.prevScrollLeft2 = scrollLeft2;
        this.prevScrollTop1 = scrollTop1;
        this.prevScrollTop2 = scrollTop2;
    }
    onScroll1() {
        let refVersion1 = ReactDOM.findDOMNode(this.refs['1']);
        let refVersion2 = ReactDOM.findDOMNode(this.refs['2']);
        if (refVersion1 && refVersion2) {
            let clientHeight1 = refVersion1.clientHeight + 50;
            let clientWidth = refVersion1.clientWidth;
            if (this.mouseClientY <= clientHeight1 + 17 && this.mouseClientX <= clientWidth + 17) {
                if (refVersion1.scrollWidth > refVersion1.clientWidth && refVersion1.scrollLeft != this.prevScrollLeft1
                ) {
                    refVersion2.scrollLeft = refVersion1.scrollLeft;
                }
                if (refVersion1.scrollHeight > refVersion1.clientHeight && refVersion1.scrollTop != this.prevScrollTop1
                ) {
                    refVersion2.scrollTop = refVersion1.scrollTop;
                }
            }
            this.setPrevScroll(refVersion1.scrollLeft, refVersion1.scrollTop, refVersion2.scrollLeft, refVersion2.scrollTop)
        }

    }
    onScroll2() {
        let refVersion1 = ReactDOM.findDOMNode(this.refs['1']);
        let refVersion2 = ReactDOM.findDOMNode(this.refs['2']);
        if (refVersion1 && refVersion2) {
            let clientHeight1 = refVersion1.clientHeight + 50;
            let clientHeight2 = clientHeight1 + 17 + refVersion2.clientHeight;
            let clientWidth = refVersion1.clientWidth;
            if (this.mouseClientY <= clientHeight2 + 17 && this.mouseClientX <= clientWidth + 17 &&
                this.mouseClientY > clientHeight1 + 17) {
                if (refVersion2.scrollWidth > refVersion2.clientWidth && refVersion2.scrollLeft != this.prevScrollLeft2
                ) {
                    refVersion1.scrollLeft = refVersion2.scrollLeft;
                }
                if (refVersion2.scrollHeight > refVersion2.clientHeight && refVersion2.scrollTop != this.prevScrollTop2
                ) {
                    refVersion1.scrollTop = refVersion2.scrollTop;
                }
            }
            this.setPrevScroll(refVersion1.scrollLeft, refVersion1.scrollTop, refVersion2.scrollLeft, refVersion2.scrollTop)
        }
    }
    //three methods below is used to construct OverviewBar
    setOffSetWidth(offSetWidth: number) {
        this.offSetWidth = offSetWidth;
    }
    setScrollWidth1(scrollWidth: number) {
        this.scrollWidth1 = scrollWidth
    }
    setScrollWidth2(scrollWidth: number) {
        this.scrollWidth2 = scrollWidth
    }
    componentWillMount() {
        if (TESTING_MODE) {
            this.props.appState.compareTestingMfs();
        }
    }
    componentWillUpdate(nextProps: { appState: { HidePositionAndSize: boolean, mf1: mfs.Microflow } }) {
        if (nextProps.appState.HidePositionAndSize === this._hidePositionAndSize && !this._isChanged) return
        if (this.props.appState.HidePositionAndSize) {
            this.props.appState.mfDiff.ignorePositionAndSize && this.props.appState.mfDiff.ignorePositionAndSize();
        } else {
            this.props.appState.mfDiff.considerPosition && this.props.appState.mfDiff.considerPosition();
        }
    }
    _hidePositionAndSize: boolean;
    _isChanged: boolean;
    render() {
        this._hidePositionAndSize = this.props.appState.HidePositionAndSize;
        let setOffSetWidth = this.setOffSetWidth.bind(this);
        let setScrollWidth1 = this.setScrollWidth1.bind(this);
        let setScrollWidth2 = this.setScrollWidth2.bind(this);
        let onScroll1 = this.onScroll1.bind(this);
        let onScroll2 = this.onScroll2.bind(this);
        let setListComponentInfo1 = this.props.appState.setListOfComponentInfo1.bind(this.props.appState);
        let setListComponentInfo2 = this.props.appState.setListOfComponentInfo2.bind(this.props.appState);
        let onSelectObject = this.props.appState.setSelectedObjectId.bind(this.props.appState);
        if (this.props.appState.ProcessState === ProcessState.LoadingMicroflow) {
            this._isChanged = true;
        } else if (this.props.appState.ProcessState === ProcessState.LoadedMicroflow) {
            this._isChanged = false;
        }
        if (this.props.appState.ProcessState === ProcessState.LoadingMicroflow || this.props.appState.ProcessState === ProcessState.LoadedMicroflow) {
            return <div>
                <SplitPane defaultSize="925px" split="vertical">
                    <div onMouseMove={(e: React.MouseEvent) => { this.mouseClientX = e.clientX; this.mouseClientY = e.clientY }}>
                        <SplitPane defaultSize="47.5%" split="horizontal" maxSize={-200}>
                            {(this.props.appState.ProcessState === ProcessState.LoadedMicroflow) ?
                                <MicroflowContainer setOffSetWidth={setOffSetWidth}
                                    setScrollWidth={setScrollWidth1} isScrolled={this.props.appState.getIsSCrolled}
                                    ref="1" onScroll={onScroll1} style={{ backgroundColor: backgroundVersion1.color }}
                                    setListComponentInfo1={setListComponentInfo1} setListComponentInfo2={setListComponentInfo2}
                                    mf={this.props.appState.mf1} mfDiff={this.props.appState.mfDiff}
                                    highlightedId={this.props.appState.SelectedObjectId} onSelectObject={onSelectObject}
                                    labels={this.props.appState.labels} version="new" hidePositionAndSize={this.props.appState.HidePositionAndSize}
                                    revNos={this.props.appState._revisions[0].Number} /> : <LoadingStatus />}
                            <SplitPane defaultSize="95%" split="horizontal" allowResize={false}>
                                {(this.props.appState.ProcessState === ProcessState.LoadedMicroflow) ?
                                    <MicroflowContainer setOffSetWidth={setOffSetWidth}
                                        setScrollWidth={setScrollWidth2} isScrolled={this.props.appState.getIsSCrolled} ref="2"
                                        onScroll={onScroll2} style={{ backgroundColor: backgroundVersion2.color }}
                                        setListComponentInfo1={setListComponentInfo1}
                                        setListComponentInfo2={setListComponentInfo2}
                                        mf={this.props.appState.mf2} mfDiff={this.props.appState.mfDiff}
                                        highlightedId={this.props.appState.SelectedObjectId} onSelectObject={onSelectObject}
                                        labels={this.props.appState.labels} version="older" hidePositionAndSize={this.props.appState.HidePositionAndSize}
                                        revNos={this.props.appState._revisions[1].Number} /> : <LoadingStatus />}
                                {(this.props.appState.ProcessState === ProcessState.LoadedMicroflow) ?
                                    <OverviewBarContainer mf1={this.props.appState.mf1 as mfs.Microflow} version1="new" mfDiff={this.props.appState.mfDiff}
                                        mf2={this.props.appState.mf2 as mfs.Microflow} version2="older" scrollWidth1={this.scrollWidth1}
                                        scrollWidth2={this.scrollWidth2} hidePositionAndSize={this.props.appState.HidePositionAndSize} offSetWidth={this.offSetWidth} />
                                    : <LoadingStatus />}
                            </SplitPane>
                        </SplitPane>
                    </div>
                    <MfDiffList
                        showFlow={this.props.appState.ShowFlow}
                        onChangeShowFlow={this.props.appState.changeShowFlow.bind(this.props.appState)}
                        additionalInfo1={this.props.appState.listOfComponentInfo1}
                        additionalInfo2={this.props.appState.listOfComponentInfo2}
                        mfDiff={this.props.appState.mfDiff}
                        hightlightedId={this.props.appState.SelectedObjectId}
                        onSelectObject={this.props.appState.setSelectedObjectId.bind(this.props.appState)}
                        revisions={this.props.appState._revisions}
                        labels={this.props.appState.labels}
                        foldAll={this.props.appState.FoldAll}
                        onChangeFold={this.props.appState.changeFold.bind(this.props.appState)}
                        hidePositionAndSize={this.props.appState.HidePositionAndSize}
                        onChangeHidePositionAndSize={this.props.appState.changeHidePositionAndSize.bind(this.props.appState)}
                        processState={this.props.appState.ProcessState}
                        showCommonInfo={this.props.appState.ShowCommonInfo}
                        onShowCommonInfo={this.props.appState.setCommonInfo.bind(this.props.appState)} />
                </SplitPane>
            </div>
        } else {
            return <h1>Fill in information</h1>
        }
    }
}

/*const MfComparator = (props: { inputRef1: string, inputRef2: string, isScrolled: boolean, onScroll1: (e: any) => void, onScroll2: (e: any) => void, setListOfComponentInfo1: (listComponentsInfo: _cpnInterface.microflow.IObjectDict) => void, setListOfComponentInfo2: (listComponentInfo: _cpnInterface.microflow.IObjectDict) => void, processState: ProcessState, mf1: mfs.Microflow | undefined, mf2: mfs.Microflow | undefined, mfDiff: diff.IMfDiff, highlightedId: string, onSelectObject: (id: string) => void, labels: Label, hidePosition: boolean, revNos: number[] }) => (
    <div>
        <SplitPane defaultSize="50%" split="horizontal" maxSize={-200}>
            {(props.processState === ProcessState.Loaded) ? <MicroflowContainer ref={props.inputRef1} isScrolled={props.isScrolled} onScroll={props.onScroll1} style={{ backgroundColor: backgroundVersion1.color }} setListComponentInfo1={props.setListOfComponentInfo1} setListComponentInfo2={props.setListOfComponentInfo2} mf={props.mf1 as mfs.Microflow} mfDiff={props.mfDiff} highlightedId={props.highlightedId} onSelectObject={props.onSelectObject} labels={props.labels} version="new" hidePosition={props.hidePosition} revNos={props.revNos[0]} /> : <LoadingStatus />}
            <SplitPane defaultSize="100%" split="horizontal">
                {(props.processState === ProcessState.Loaded) ? <MicroflowContainer ref={props.inputRef2} isScrolled={props.isScrolled} onScroll={props.onScroll2} style={{ backgroundColor: backgroundVersion2.color }} setListComponentInfo1={props.setListOfComponentInfo1} setListComponentInfo2={props.setListOfComponentInfo2} mf={props.mf2 as mfs.Microflow} mfDiff={props.mfDiff} highlightedId={props.highlightedId} onSelectObject={props.onSelectObject} labels={props.labels} version="older" hidePosition={props.hidePosition} revNos={props.revNos[1]} /> : <LoadingStatus />}
                <div />
            </SplitPane>
        </SplitPane>
    </div>
)*/

const StatusBar = (props: { status: string }) => (
    <div style={{ "width": "100%", "backgroundColor": "#c1c1c1" }}>
        {props.status}
    </div>
)
export const LoadingStatus = (props: { className?: string }) => {
    return <Spinner className={props.className} />
}