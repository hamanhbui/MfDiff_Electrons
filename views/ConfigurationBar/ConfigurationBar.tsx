/// <reference path="../../typings/index.d.ts" />
import React = require("react")
import ReactDOM = require("react-dom")
import { AppState, ProcessState } from "../../ApplicationState"
import { Button } from "react-bootstrap"
import { Error, ErrorType, ErrorProperty } from "../../Utils/Error"
import { microflows as mfs } from "mendixmodelsdk"
import { observer } from "mobx-react"
import { observable } from "mobx";
import { RevisionInfo, AppInfo, BranchInfo } from "../../MfDiff/ProjectInterface"
import { RevisionDropdownItem, DisplayedRevision, filterRevisions, compareTwoRevisionsByRevNo } from "./RevisionDropdown"
import { MicroflowDropdownItem, filterMicroflows, DisplayedMicroflow, compareTwoMfsByNameAndState } from "./MicroflowDropdown"
import { ModuleDropdownItem, compareTwoModulesByName, DisplayedModule, filterModules } from "./moduleDropdown"
import { BranchDropdownItem, compareTwoBranchesByName, DisplayedBranch, filterBranches } from "./BranchDropdown"
import { AppDropdownItem, filterApps, DisplayedApp, compareTwoAppsByName } from "./appDropdown"
import { OptionalDropdown } from "./optionalDropdown"
import { HelpPopUp } from "./helpPopUp"
import Diff = require("../../MfDiff/DiffInterface")
import { MicroflowPopup } from "./MicroflowPopup"
import { SuggestAPI } from './suggestAPI';
// import { Module } from "./../../MfDiff/RevisionUtils"
// import Autosuggest from 'react-bootstrap-autosuggest'
import { FileUserInfo, InfoUser } from './../../userInformation';
import when = require("when")

export enum MicroflowState {
    NoInfo,
    Loading,
    Loaded,
    New,
    Delete,
    Edited,
    NoChange
}
export interface ModuleInfo {
    name: string,
    // id: string
}
export interface MicroflowInfo {
    state: MicroflowState,
    qualifiedName: string,
    id: string
}

@observer export class ConfigurationBar extends React.Component<{ AppData: AppState },
    {
        listOfRevisions0?: RevisionInfo[], listOfRevisions1?: RevisionInfo[], listOfMicroflows?: MicroflowInfo[], listOfApp?: AppInfo[], revisions?: RevisionInfo[],
        listOfModules?: ModuleInfo[], listOfAPIKey?: string[], listOfBranches?: BranchInfo[]
        microflow?: MicroflowInfo, appInfo?: AppInfo, module?: ModuleInfo, userName?: string, dateExpired?: string, branches?: BranchInfo[]
    }>  {
    @observable fileUserInfo: FileUserInfo;
    projectIdInput: HTMLInputElement;
    apikeyInput: any;
    usernameInput: HTMLInputElement;
    prevMicroflow: MicroflowInfo | undefined;
    prevModule: ModuleInfo | undefined;
    @observable projectInfo = {
        projectId: "",
        apikey: "",
        username: "",
        projectName: "",
        branchName: ""
    }
    constructor(props) {
        super(props);
        this.state = {
            microflow: undefined,
            appInfo: undefined,
            listOfAPIKey: [],
            userName: undefined
        }
        this.fileUserInfo = new FileUserInfo();
        this.prevMicroflow = undefined;
        this.prevModule = undefined;
    }
    componentWillMount() {
        this.fileUserInfo.readFileUserName().then((userInfo: InfoUser): when.Promise<any> => {
            this.setState({
                userName: userInfo ? userInfo.userName : undefined,
                //dateExpired: userInfo ? userInfo.date : undefined
            })
            return when.promise((resolve) => {
                resolve(userInfo)
            })
        }).then((userName => {
            this.fileUserInfo.readFileAPIKey(userName != undefined).then((listAPIs) => {
                this.setState({
                    listOfAPIKey: listAPIs
                })
            })
        })
            )
    }
    // setFocus(id: string) {
    //     let tmp = document.getElementById(id)
    //     if (tmp) {
    //         tmp.focus();
    //     }
    // }
    setListOfRevision(listOfRevision: RevisionInfo[], number: number) {
        if (number === 0) {
            this.setState({
                listOfRevisions0: listOfRevision
            })
        } else {
            this.setState({
                listOfRevisions1: listOfRevision
            })
        }
    }
    setMicroflow(microflow: MicroflowInfo) {
        this.setState({
            microflow: microflow
        })
        this.props.AppData.loadSelectedMicroflow(microflow.id, microflow.qualifiedName)
    }
    setListOfMicroflows(listOfMicroflow: MicroflowInfo[]) {
        this.setState({
            listOfMicroflows: listOfMicroflow
        })
    }
    setApp(appId: AppInfo) {
        this.setState({
            appInfo: appId,
            revisions: [],
            microflow: undefined,
            module: undefined,
            listOfModules: [],
            branches: [],
        })
        this.projectInfo.projectId = appId.ProjectId
        let tmp = (this.state.listOfApp as AppInfo[]).find(app => app.ProjectId === this.projectInfo.projectId)
        tmp && (this.projectInfo.projectName = tmp.AppId);
        this.props.AppData.retrieveBranches(this.projectInfo)
            .then((listOfBranches: BranchInfo[]) => {
                this.setListOfBranches(listOfBranches);
                this.setBranch0(listOfBranches.find(branch => branch.Name === "trunk") as BranchInfo)
                this.setBranch1(listOfBranches.find(branch => branch.Name === "trunk") as BranchInfo)
                // this.setFocus("branch")
            })
    }
    setBranch0(branch: BranchInfo) {
        this.props.AppData.retrieveRevisions(this.projectInfo, branch, 0)
            .then((listOfRevisions: RevisionInfo[]) => {
                this.setBranch(branch, 0)
                this.setListOfRevision(listOfRevisions, 0);
                this.setRevision0(listOfRevisions[0])
            })
            .catch((e: Error) => {
                e instanceof Error && e.showPopUp();
                this.props.AppData.backToPreviousState();
            })
    }
    setBranch1(branch: BranchInfo) {
        this.props.AppData.retrieveRevisions(this.projectInfo, branch, 1)
            .then((listOfRevision: RevisionInfo[]) => {
                this.setBranch(branch, 1)
                this.setListOfRevision(listOfRevision, 1);
                this.setRevision1(listOfRevision[0])
            })
            .catch((e: Error) => {
                e instanceof Error && e.showPopUp();
                this.props.AppData.backToPreviousState();
            })
    }
    setListOfBranches(listOfBranches: BranchInfo[]) {
        this.setState({
            listOfBranches: listOfBranches
        })
    }
    setListOfApp(listOfApp: AppInfo[]) {
        this.setState({
            listOfApp: listOfApp
        })
    }
    setRevisions(revNos: RevisionInfo[]) {
        this.setState({
            revisions: revNos,
            listOfMicroflows: []
        })
        // this.setFocus("Compare");
    }

    setModule(module: ModuleInfo) {
        let allMfsFromModules = this.props.AppData.getMicroflowsFromModule(module.name)
        this.setState({
            module: module,
            microflow: undefined,
            listOfMicroflows: [...allMfsFromModules.addedMicroflows, ...allMfsFromModules.commonMicroflows.map(pairOfMfs => [pairOfMfs.newMf, pairOfMfs.oldMf]), ...allMfsFromModules.removedMicroflows].map(mf => (
                (mf[0] && mf[1]) ? {
                    qualifiedName: mf[0].qualifiedName === mf[1].qualifiedName ? mf[0].qualifiedName : mf[0].qualifiedName + "/" + mf[1].qualifiedName.split(".")[1],
                    state: MicroflowState.Loading,
                    id: mf[0].id
                } : {
                        qualifiedName: mf["qualifiedName"],
                        state: MicroflowState.Loading,
                        id: mf["id"]
                    }
            ))
        })
        //this.props.AppData.loadAllMicroflowsFromModule(module.id)
        this.props.AppData.loadAllMicroflowsFromModule(module.name)
            .then((analysisResults: { addedMfs: mfs.Microflow[], deletedMfs: mfs.Microflow[], editedMfs: Diff.IMicroflow[] }) => {
                this.setState((previousState) => ({
                    listOfMicroflows: previousState.listOfMicroflows && previousState.listOfMicroflows.map(mf => {
                        if (previousState.listOfMicroflows && previousState.listOfMicroflows.indexOf(mf) === -1) return mf;
                        let tmpMf = mf;
                        let analysisResult = analysisResults.editedMfs.filter(result => result.microflow1!.id === mf.id)[0];
                        if (analysisResult) {
                            tmpMf.state = (analysisResult.mfDiff.isDiff && analysisResult.mfDiff.isDiff()) ? MicroflowState.Edited : MicroflowState.NoChange;
                        } else if (analysisResults.addedMfs.find(addedMf => addedMf.id === mf.id)) {
                            tmpMf.state = MicroflowState.New
                        } else if (analysisResults.deletedMfs.find(addedMf => addedMf.id === mf.id)) {
                            tmpMf.state = MicroflowState.Delete
                        }
                        return tmpMf
                    })
                }))
                if (this._isOpenMfPopup) {
                    this.onClickShow();
                }
                // this.setFocus("microflow")
            })
    }

    setRevision0(revNo: RevisionInfo) {
        this.setRevisions([revNo, (this.state.revisions as RevisionInfo[])[1]])
    }
    setRevision1(revNo: RevisionInfo) {
        this.setRevisions([(this.state.revisions as RevisionInfo[])[0], revNo])
    }
    setListOfModules(listOfModules: ModuleInfo[]) {
        this.setState({
            listOfModules: listOfModules
        })
    }
    setBranch(branch: BranchInfo, number) {
        if (number === 0) {
            this.setState({
                branches: [branch, (this.state.branches && this.state.branches[1]) as BranchInfo]
            })
        } else {
            this.setState({
                branches: [(this.state.branches && this.state.branches[0]) as BranchInfo, branch]
            })
        }
    }
    onlyNumber(event) {
        if (event.key < '0' || event.key > '9') {
            event.preventDefault()
        }
    }
    onClickLoad() {
        // let dateCurrent = new Date();
        // dateCurrent.setDate(dateCurrent.getDate() - 15);
        // if (this.state.dateExpired && this.state.dateExpired < dateCurrent.toJSON()) {
        //     let e = new Error(ErrorType.Expired, ErrorProperty.Expired)
        //     e instanceof Error && e.showPopUp();
        //     this.props.AppData.backToPreviousState();
        // }
        // else {
        this.projectInfo = {
            projectId: "",
            apikey: this.apikeyInput ? this.apikeyInput.state.value : undefined,
            username: this.usernameInput.value,
            projectName: "",
            branchName: "",
        }
        this.props.AppData.loadApp(this.projectInfo)
            .then((listOfApp: AppInfo[]) => {
                this.setListOfApp(listOfApp);
                //when loading app is succeed, check existing current API in list APIs, and rewrite file listAPI if not existed yet  
                let checkSameAPI: boolean = false;
                if (this.state.userName === this.usernameInput.value) {
                    for (let i = 0; i < this.state.listOfAPIKey!.length; i++) {
                        if (this.projectInfo.apikey === this.state.listOfAPIKey![i]) {
                            checkSameAPI = true;
                        }
                    }
                    if (!checkSameAPI) {
                        this.state.listOfAPIKey!.push(this.projectInfo.apikey);
                        this.fileUserInfo.writeFileAPIKEys(this.state.listOfAPIKey)
                    }
                }
                else {
                    this.state.userName = this.usernameInput.value;
                    let newListAPIKey: string[] = [];
                    newListAPIKey.push(this.projectInfo.apikey);
                    this.setState({
                        listOfAPIKey: newListAPIKey
                    })
                    this.fileUserInfo.writeFileUserName(this.usernameInput.value);
                    this.fileUserInfo.writeFileAPIKEys(this.state.listOfAPIKey)
                }
                // this.setFocus("appId");
            })
            .catch((e: Error) => {
                e instanceof Error && e.showPopUp();
                this.props.AppData.backToPreviousState();
            })
        //}
    }
    onPressEnter(event: React.KeyboardEvent) {
        if (event.keyCode === 13 || event.which === 13) {
            this.onClickLoad();
        }
        else return;
    }
    disableUserAndAPIKeyButton() {
        let processState = this.props.AppData.ProcessState
        let disabledStates = [ProcessState.LoadingApp, ProcessState.LoadingMicroflow, ProcessState.LoadingBranch0, ProcessState.LoadingBranch1, ProcessState.LoadingRevisions]
        return disabledStates.indexOf(processState) >= 0
    }

    onClickCompare() {
        if (!this.state.revisions || !this.state.revisions[0] || !this.state.revisions[1]) {
            new Error(ErrorType.Missing, ErrorProperty.Revision).showPopUp();
        }
        if (!this.state.revisions) return
        if (this.state.revisions[0].Number === this.state.revisions[1].Number &&
            this.state.revisions[0].branchInfo.Name === this.state.revisions[1].branchInfo.Name) {
            new Error(ErrorType.Duplicate, ErrorProperty.Revision).showPopUp();
            return;
        }
        if (this.state.microflow && this.state.module) {
            this.prevModule = this.state.module;
            this.prevMicroflow = this.state.microflow;
        }
        this.props.AppData.loadRevisions([this.state.revisions[0], this.state.revisions[1]])
            .then((commonModules: string[]) => {
                this.setListOfModules(commonModules.map(moduleName => ({
                    name: moduleName,
                    // id: moduleName.id
                })));
                /*check previous module existed in new list modules, if existed then continue check previous microflow in new list microflow otherwise
                 reset module and microflow*/
                if (this.prevMicroflow && this.prevModule && this.state.listOfMicroflows && this.state.module && this.state.listOfModules) {
                    let diffModule: boolean = true;
                    for (let i = 0; i < this.state.listOfModules.length; i++) {
                        if (this.state.listOfModules[i].name === this.prevModule.name) {
                            this.setModule(this.state.listOfModules[i]);
                            diffModule = false;
                        }
                    }
                    if (diffModule) {
                        this.setState({
                            module: undefined,
                            microflow: undefined
                        })
                    }
                    else {
                        for (let i = 0; i < this.state.listOfMicroflows.length; i++) {
                            if (this.state.listOfMicroflows[i].id === this.prevMicroflow.id) {
                                this.setMicroflow(this.state.listOfMicroflows[i]);
                            }
                        }
                    }
                }
                // this.setFocus("module")
                // this.props.AppData.loadAllMicroflows()
                //     .then((analysisResults: string[]) => {
                //         console.log(performance.now())
                //     })
            })
            .catch((e: Error) => e instanceof Error && e.showPopUp())

    }

    onClickHelp() {
        ReactDOM.render(<HelpPopUp />, document.getElementById("popupContainer") as Element)
    }
    _isOpenMfPopup: boolean = false;
    onClickShow() {
        this._isOpenMfPopup = true;
        ReactDOM.render(<MicroflowPopup close={() => { this._isOpenMfPopup = false }} setItem={this.setMicroflow.bind(this)} listOfMicroflows={this.state.listOfMicroflows} />, document.getElementById("popupContainer") as Element)
    }
    render() {
        return <div className="well" >
            <table>
                <tr>
                    <td> <label htmlFor="username">User</label></td>
                    <td>
                        <input className="input" disabled={this.state.userName != undefined} type="text" id="Username" ref={input => this.usernameInput = input}
                            defaultValue={this.state.userName} value={this.state.userName ? this.state.userName : undefined} onKeyPress={this.onPressEnter.bind(this)} />
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="APIkey">API key</label></td>
                    <td><div className="input" onKeyPress={this.onPressEnter.bind(this)} >
                        <SuggestAPI listAPI={this.state.listOfAPIKey ? this.state.listOfAPIKey : []} disabled={this.disableUserAndAPIKeyButton()}
                            ref={App => this.apikeyInput = App} />
                    </div>
                    </td>
                </tr>
            </table>
            {/*<input className="well-input" disabled={this.disableUserAndAPIKeyButton()} type="text" id="APIkey" ref={input => this.apikeyInput = input} defaultValue={defaultProjectInfo.apikey} onKeyPress={this.onPressEnter.bind(this)} />*/}
            <Button onClick={this.onClickLoad.bind(this)} className="load-button">Load</Button>
            <label htmlFor="appId">App</label>
            <OptionalDropdown
                disabledStates={[ProcessState.LoadingBranch0, ProcessState.LoadingBranch1, ProcessState.LoadingMicroflow, ProcessState.LoadingRevisions]}
                displayedValue={DisplayedApp}
                dropdownItem={AppDropdownItem}
                loadingState={[ProcessState.LoadingApp]}
                appState={this.props.AppData.ProcessState}
                id="appId"
                listOfItems={this.state.listOfApp as AppInfo[]}
                value={this.state.appInfo}
                setItem={this.setApp.bind(this)}
                compareFunction={compareTwoAppsByName}
                noResultsText={"No app found"}
                filterOption={filterApps} />
            <table>
                <tr>
                    <td><label htmlFor="rev1">Diff from</label></td>
                    <td><OptionalDropdown
                        disabledStates={[ProcessState.LoadingMicroflow, ProcessState.LoadingRevisions]}
                        displayedValue={DisplayedBranch}
                        dropdownItem={BranchDropdownItem}
                        filterOption={filterBranches}
                        value={this.state.branches && this.state.branches[0]}
                        id="branch"
                        placeholder="Branch"
                        noResultsText="No branches found"
                        listOfItems={this.state.listOfBranches}
                        loadingState={[ProcessState.retrievingBranch]}
                        appState={this.props.AppData.ProcessState}
                        setItem={this.setBranch0.bind(this)}
                        compareFunction={compareTwoBranchesByName} />
                        <OptionalDropdown
                            style={{ width: "80px" }}
                            disabledStates={[ProcessState.LoadingRevisions, ProcessState.LoadingMicroflow]}
                            dropdownItem={RevisionDropdownItem}
                            displayedValue={DisplayedRevision}
                            loadingState={[ProcessState.LoadingBranch0]}
                            appState={this.props.AppData.ProcessState}
                            id="rev1"
                            placeholder="Revision"
                            listOfItems={this.state.listOfRevisions0 as RevisionInfo[]}
                            value={this.state.revisions && this.state.revisions[0]}
                            setItem={this.setRevision0.bind(this)}
                            compareFunction={compareTwoRevisionsByRevNo}
                            noResultsText={"No revisions found"}
                            filterOption={filterRevisions} />
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: "center" }}><label htmlFor="rev2" >to</label></td>
                    <td>
                        <OptionalDropdown
                            disabledStates={[ProcessState.LoadingMicroflow, ProcessState.LoadingRevisions]}
                            displayedValue={DisplayedBranch}
                            dropdownItem={BranchDropdownItem}
                            filterOption={filterBranches}
                            value={this.state.branches && this.state.branches[1]}
                            id="branch"
                            placeholder="Branch"
                            noResultsText="No branches found"
                            listOfItems={this.state.listOfBranches}
                            loadingState={[ProcessState.retrievingBranch]}
                            appState={this.props.AppData.ProcessState}
                            setItem={this.setBranch1.bind(this)}
                            compareFunction={compareTwoBranchesByName} />
                        <OptionalDropdown
                            style={{ width: "80px" }}
                            disabledStates={[ProcessState.LoadingMicroflow, ProcessState.LoadingRevisions]}
                            dropdownItem={RevisionDropdownItem}
                            displayedValue={DisplayedRevision}
                            loadingState={[ProcessState.LoadingBranch1]}
                            appState={this.props.AppData.ProcessState}
                            id="rev2"
                            placeholder="Revision"
                            listOfItems={this.state.listOfRevisions1 as RevisionInfo[]}
                            value={this.state.revisions && this.state.revisions[1]}
                            setItem={this.setRevision1.bind(this)}
                            compareFunction={compareTwoRevisionsByRevNo}
                            noResultsText={"No revisions found"}
                            filterOption={filterRevisions} />
                    </td>
                </tr>
            </table>
            <Button id="Compare" onClick={this.onClickCompare.bind(this)} className="load-button" style={{ width: "70px" }}>Compare</Button>
            <label htmlFor="module">Module</label>
            <OptionalDropdown
                disabledStates={[ProcessState.LoadingMicroflow]}
                displayedValue={DisplayedModule}
                dropdownItem={ModuleDropdownItem}
                filterOption={filterModules}
                value={this.state.module}
                id="module"
                noResultsText="No modules found"
                listOfItems={this.state.listOfModules}
                loadingState={[ProcessState.LoadingRevisions, ProcessState.LoadingBranch0, ProcessState.LoadingBranch1]}
                appState={this.props.AppData.ProcessState}
                setItem={this.setModule.bind(this)}
                compareFunction={compareTwoModulesByName} />
            <label htmlFor="microflowName">Microflow</label>
            <OptionalDropdown
                displayedValue={DisplayedMicroflow}
                dropdownItem={MicroflowDropdownItem}
                value={this.state.microflow}
                id="microflowName"
                listOfItems={this.state.listOfMicroflows as MicroflowInfo[]}
                appState={this.props.AppData.ProcessState}
                setItem={this.setMicroflow.bind(this)}
                compareFunction={compareTwoMfsByNameAndState}
                loadingState={[ProcessState.LoadingRevisions, ProcessState.LoadingBranch0, ProcessState.LoadingBranch1]}
                noResultsText={"No microflows found"}
                filterOption={filterMicroflows} />
            <Button onClick={this.onClickShow.bind(this)} className="load-button">Show</Button>
            {/*<Button onClick={this.onClickShow.bind(this)} type="button" className="load-button">
                <span className="glyphicon glyphicon-modal-window" aria-hidden="true"></span> Show
            </Button>*/}
            <Button id="helpButton" onClick={this.onClickHelp}>
                {/*<span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span>*/}
                <img style={{ width: 25, height: 25 }} src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-question-icon.png" />
            </Button>
        </div >
    }
}
