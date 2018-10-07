/// <reference path="./typings/index.d.ts" />
import { observable, computed, runInAction } from "mobx";
import * as diff from "./MfDiff/DiffInterface"
import { microflows as mfs } from "mendixmodelsdk"
import { ProjectComparing } from "./MfDiff/ProjectComparing"
import { RevisionUtils } from "./MfDiff/RevisionUtils"
import when = require("when")
import { ProjectInfo } from "./MfDiff/ProjectInfo"
import { generateLabel } from "./Utils/generateLabel"
import { TestingMicroflow1, TestingMicroflow2 } from "./data/RetrieveAction"
import _cpnInterface = require("././views/microflowComponents/interfaces");
import { DataServices } from "./dataServices"
import { Error } from "./Utils/Error"
import { ProjectData } from "./MfDiff/ProjectData"
import { RevisionInfo, BranchInfo } from "./MfDiff/ProjectInterface"

export enum ProcessState {
    NoInfo,
    LoadingApp,
    LoadedApp,
    retrievingBranch,
    retrievedBranch,
    LoadingBranch0,
    LoadedBranch0,
    LoadingBranch1,
    LoadedBranch1,
    LoadingRevisions,
    LoadedRevisions,
    LoadingMicroflow,
    LoadedMicroflow,
}

export class AppState {
    @observable mf1: mfs.Microflow | undefined;
    @observable mf2: mfs.Microflow | undefined;
    @observable mfDiff: diff.IMfDiff;
    @observable _revisions: RevisionInfo[];
    @observable labels: { [id: string]: string }
    @observable private selectedObjectId: string;
    @observable private _foldAll: boolean;
    @observable private _hidePositionAndSize: boolean
    @observable private _processState: ProcessState;
    @observable private _showCommonInfo: boolean;
    @observable private _showFlow: boolean;
    @observable listOfComponentInfo1: _cpnInterface.microflow.IObjectDict;
    @observable listOfComponentInfo2: _cpnInterface.microflow.IObjectDict;
    @observable private isScrolled: boolean;
    private _projectInfo: ProjectInfo;
    private _microflowName: string;
    private _previousState: ProcessState;
    private _projectData: ProjectData;
    constructor() {
        this.mf1 = undefined;
        this.mf2 = undefined;
        this.selectedObjectId = "";
        this.mfDiff = { deleteElementList: [], editElementList: [], newElementList: [] };
        this._revisions = [];
        this._foldAll = false;
        this._hidePositionAndSize = true;
        this._showCommonInfo = true;
        this.listOfComponentInfo1 = new _cpnInterface.microflow.IObjectDict();
        this.listOfComponentInfo2 = new _cpnInterface.microflow.IObjectDict();
        this.setProcessState(ProcessState.NoInfo)
        this.isScrolled = false;
    }
    @computed get getIsSCrolled() {
        return this.isScrolled;
    }
    setListOfComponentInfo1(caption: _cpnInterface.microflow.IObjectDict) {
        for (let i in this.listOfComponentInfo1) {
            delete this.listOfComponentInfo1[i];
        }
        for (let i in caption) {
            this.listOfComponentInfo1[i] = caption[i];
        }
    }
    setListOfComponentInfo2(caption: _cpnInterface.microflow.IObjectDict) {
        for (let i in this.listOfComponentInfo2) {
            delete this.listOfComponentInfo2[i];
        }
        for (let i in caption) {
            this.listOfComponentInfo2[i] = caption[i];
        }
    }
    changeShowFlow() {
        this._showFlow = !this._showFlow;
    }
    setProjectInfo(projectInfo: ProjectInfo): void {
        this._projectInfo = projectInfo
    }
    setMicroflowName(microflowName: string): void {
        this._microflowName = microflowName
    }
    setRevisions(revisions: RevisionInfo[]): void {
        if (revisions[0].Number < revisions[1].Number) {
            this._revisions = [revisions[0], revisions[1]]
        }
        this._revisions = revisions
    }
    setCommonInfo() {
        this._showCommonInfo = !this._showCommonInfo;
    }
    backToPreviousState() {
        this._processState = this._previousState;
    }
    loadApp(projectInfo: ProjectInfo): when.Promise<any> {
        this.setProcessState(ProcessState.LoadingApp);
        if (this._projectData && (this._projectInfo.apikey === projectInfo.apikey && this._projectInfo.projectId === projectInfo.projectId && this._projectInfo.username === projectInfo.username && this._projectInfo.projectName === projectInfo.projectName)) {
            console.log('The project information has not been changed')
        }
        return when.promise((resolve, reject) => {
            DataServices.loadApp(projectInfo)
                .then(app => {
                    this.setProcessState(ProcessState.LoadedApp);
                    resolve(app)
                })
                .catch(error => {
                    this.backToPreviousState();
                    reject(error)
                })
        })
    }
    retrieveRevisions(projectInfo: ProjectInfo, branch: BranchInfo, number: number): when.Promise<any> {
        if (number === 0) {
            this.setProcessState(ProcessState.LoadingBranch0);
        } else {
            this.setProcessState(ProcessState.LoadingBranch1)
        }
        return when.promise((resolve, reject) => {
            this._projectData.getBranch(branch).retrieveAllRevisions()
                .then(revisions => {
                    resolve(revisions)
                    this._projectInfo = projectInfo
                    if (number === 0) {
                        this.setProcessState(ProcessState.LoadedBranch0);
                    } else {
                        this.setProcessState(ProcessState.LoadedBranch1)
                    }
                })
                .catch(error => {
                    this.backToPreviousState();
                    reject(error)
                })
        })
    }

    retrieveBranches(projectInfo: ProjectInfo): when.Promise<any> {
        this.setProcessState(ProcessState.retrievingBranch);
        // if (this._projectData && (this._projectInfo.apikey === projectInfo.apikey && this._projectInfo.projectId === projectInfo.projectId && this._projectInfo.username === projectInfo.username && this._projectInfo.projectName === projectInfo.projectName)) {
        //     console.log('The project information has not been changed')
        // }
        this._projectData = new ProjectData(projectInfo)
        return when.promise((resolve, reject) => {
            this._projectData.retrieveBranchInfo()
                .then(branches => {
                    resolve(branches)
                    this._projectInfo = projectInfo
                    // this._projectData = new ProjectData(projectInfo);
                    this.setProcessState(ProcessState.retrievedBranch)
                })
                .catch(error => {
                    this.backToPreviousState();
                    reject(error)
                })
        })
    }

    loadRevisions(revisionInfos: RevisionInfo[]): when.Promise<mfs.IMicroflow> {
        this.setRevisions(revisionInfos);
        this.setProcessState(ProcessState.LoadingRevisions);
        return when.promise<mfs.IMicroflow>((resolve, reject) => {
            this._projectData.loadRevisions(revisionInfos)
                .then(([newRevision, oldRevision]: RevisionUtils[]) =>
                    ProjectComparing.compareRevisions(newRevision, oldRevision))
                .then((commonModules: string[]) => {
                    resolve(commonModules);
                    this.setProcessState(ProcessState.LoadedRevisions)
                })
                .catch(e => {
                    reject(e)
                    this.backToPreviousState();
                });
        })
    }

    getMicroflowsFromModule(moduleName: string) {
        return ProjectComparing.compareTwoModulesByMfs(this._revisions.map(revision =>
            this._projectData.getRevision(revision)), moduleName);
    }

    loadAllMicroflowsFromModule(moduleName: string) {
        return when.promise<any>((resolve, reject) => {
            when.all<any>(this._revisions.map(revNo => (this._projectData.getRevision(revNo) as RevisionUtils).loadMicroflowsFromModules(moduleName)))
                .then((twoListOfMfs: mfs.Microflow[][]) => {
                    let analysisResults: diff.IMicroflow[] = [];
                    let comparedResult = ProjectComparing.compareTwoListOfMfs(twoListOfMfs)
                    comparedResult.commonMicroflows.map(pairOfMfs => {
                        analysisResults.push(ProjectComparing.compareTwoMicroflows(pairOfMfs.newMf as mfs.Microflow, pairOfMfs.oldMf as mfs.Microflow));
                    })
                    resolve({
                        addedMfs: comparedResult.addedMicroflows,
                        deletedMfs: comparedResult.removedMicroflows,
                        editedMfs: analysisResults
                    });
                })
                .catch(e => reject(e))
        })
    }

    loadSelectedMicroflow(microflowId: string, microflowName: string): when.Promise<any> {
        this.setMicroflowName(microflowName)
        this.setProcessState(ProcessState.LoadingMicroflow)
        return when.join(this._projectData.loadMicroflow(this._revisions[0], microflowId, this._microflowName), this._projectData.loadMicroflow(this._revisions[1], microflowId, this._microflowName))
            .then((result: mfs.Microflow[]) => {
                let analysisResult = ProjectComparing.compareTwoMicroflows(result[0] as mfs.Microflow, result[1] as mfs.Microflow);
                runInAction("update state", () => {
                    this.mf1 = analysisResult.microflow1;
                    this.mf2 = analysisResult.microflow2;
                    this.mfDiff = analysisResult.mfDiff;
                    //this.labels = generateLabel(this.mf1, this.mf2)
                    this.labels = generateLabel(undefined, undefined)
                    this.setProcessState(ProcessState.LoadedMicroflow)
                });
            })
            .catch((e: Error) => {
                this.backToPreviousState();
                e instanceof Error && e.showPopUp();
            })
    }
    compareTestingMfs() {
        this._processState = ProcessState.LoadedMicroflow;
        // this._revisions = [1, 2];
        this.mfDiff = ProjectComparing.compareTwoTestingMicroflows(TestingMicroflow1, TestingMicroflow2);
    }
    @computed get ProcessState() {
        return this._processState
    }
    setProcessState(stateToChange: ProcessState): void {
        this._previousState = this._processState;
        this._processState = stateToChange;
        console.log(this._processState);
    }
    changeFold() {
        this._foldAll = !this._foldAll;
    }
    changeHidePositionAndSize() {
        this._hidePositionAndSize = !this._hidePositionAndSize
    }
    @computed get FoldAll() {
        return this._foldAll
    }
    @computed get HidePositionAndSize() {
        return this._hidePositionAndSize
    }
    @computed get ShowCommonInfo() {
        return this._showCommonInfo
    }
    @computed get numberOfEditMfObject() { return this.mfDiff.editElementList.length; };
    setSelectedObjectId(id: string) {
        this.isScrolled = false;
        this.selectedObjectId = id;
    }
    @computed get SelectedObjectId() {
        return this.selectedObjectId;
    }
    @computed get ShowFlow() {
        return this._showFlow;
    }
    @computed get Status() {
        switch (this.ProcessState) {
            case ProcessState.LoadingApp: return "Loading application list  ..."
            case ProcessState.LoadingRevisions: return "Creating online working copy and loading microflow list ..."
            case ProcessState.LoadedRevisions: return "Loaded  microflow list"
            case ProcessState.retrievingBranch: return "Loading branch info"
            case ProcessState.LoadingBranch0: return "Loading revision list of first branch"
            case ProcessState.LoadingBranch1: return "Loading revision list of second branch"
            case ProcessState.LoadingMicroflow: return "Loading microflow ...";
            case ProcessState.LoadedMicroflow: {
                let edittedObjectNum = this.mfDiff.editElementList.filter(element => element.isDiff).length;
                let newObjectNum = this.mfDiff.newElementList.length;
                let delObjectNum = this.mfDiff.deleteElementList.length;
                if ((edittedObjectNum + newObjectNum + delObjectNum) > 0) {
                    return `Modified objects:${edittedObjectNum} | New objects: ${newObjectNum} | Deleted objects: ${delObjectNum}`;
                }
                else {
                    return "No changes";
                }

            }
            default: return "Ready";
        }
    }
}