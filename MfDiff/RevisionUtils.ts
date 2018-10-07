import when = require("when");
import { microflows, IModel } from "mendixmodelsdk";
import { Project, OnlineWorkingCopy, MendixSdkClient, Revision, Branch, loadAsPromise } from "mendixplatformsdk";
import MicroflowUtils = require("./MicroflowUtils");
import { Error, ErrorType, ErrorProperty } from "../Utils/Error"
import { RevisionInfo } from "./ProjectInterface"

const SIZE = 1000;
// export interface Module {
//     id: string,
//     name: string
// }
export class RevisionUtils {
    private _project: Project;
    private _client: MendixSdkClient;
    private _info: RevisionInfo;
    private _revNo: number;
    static NEWEST_REVISION = -1;
    private _microflows: (microflows.IMicroflow | undefined)[];
    private _model: IModel;
    private _workingCopy: OnlineWorkingCopy;
    private _loadedMicroflows: microflows.Microflow[];
    private _isLoaded: boolean
    // private _modules: Module[];
    private _modules: string[];
    constructor(revisionInfo: RevisionInfo) {
        let projectInfo = revisionInfo.projectInfo;
        this._client = new MendixSdkClient(projectInfo.username, projectInfo.apikey);
        this._project = new Project(this._client, projectInfo.projectId, projectInfo.projectName);
        this._info = revisionInfo;
        this._revNo = this._info.Number;
        this._loadedMicroflows = [];
        this._isLoaded = false;
        // this._modules = [];
    }

    retrieveMicroflowsFromModule(moduleName: string): (microflows.IMicroflow | undefined)[] {
        return this._microflows.filter(mf => (mf && mf.qualifiedName ? mf.qualifiedName!.split(".")[0] === moduleName : undefined));
    }

    retrieveAllMicroflows(): when.Promise<microflows.IMicroflow[]> {
        let startRev = performance.now();
        console.log(`Start loading revision ${this._revNo}`)
        return when.promise<microflows.IMicroflow[]>((resolve, reject) => {
            if (this._isLoaded) {
                resolve(this._microflows)
                return;
            }
            this._client.platform().createOnlineWorkingCopy(this._project,
                new Revision(this._revNo, new Branch(this._project, this._info.branchInfo.Name.split("/")[1])))
                .then((workingCopy: OnlineWorkingCopy) => {
                    this._modules = workingCopy.model().allModules().map(module => module.name)
                        .filter(moduleName => ["System", "NavigationLayout", "NavigationLayouts", "Administration", "AppCloudServices"].indexOf(moduleName) === -1)
                    this._isLoaded = true;
                    return workingCopy.model().allMicroflows();
                })
                .catch((e) => {
                    let error: Error
                    if (e.error === "Timeout") {
                        error = new Error(ErrorType.Fail, ErrorProperty.OpenOnlineWorkingCopy)
                    } else if (e.includes) {
                        if (e.includes("URL") && e.includes("doesn't exist")) {
                            error = new Error(ErrorType.Invalid, ErrorProperty.Revision, this._revNo, this._info.branchInfo.DisplayName)
                        } else if (e.includes("username")) {
                            error = new Error(ErrorType.Invalid, ErrorProperty.UsernameOrAPIKey, "")
                        } else if (e.includes("App does not exist")) {
                            error = new Error(ErrorType.Invalid, ErrorProperty.ProjectId, this._info.projectInfo.projectId)
                        } else if (e.includes("such revision")) {
                            error = new Error(ErrorType.Invalid, ErrorProperty.Revision, this._revNo, this._info.branchInfo.DisplayName)
                        } else if (e.includes("not supported by the Model Server")) {
                            error = new Error(ErrorType.NotSupported, ErrorProperty.MendixVersion, e);
                        } else {
                            error = new Error(ErrorType.Undetectable, ErrorProperty.Undetectable)
                        }
                    } else {
                        error = new Error(ErrorType.Undetectable, ErrorProperty.Undetectable)
                    }
                    reject(error);
                    return
                })
                .then((allMf: microflows.IMicroflow[]) => {
                    if (allMf) {
                        this._microflows = allMf.filter(mf => {
                            let modulename = mf && mf.qualifiedName ? mf.qualifiedName.split(".")[0] : "";
                            return ["System", "NavigationLayout", "Administration", "AppCloudServices"].indexOf(modulename) === -1;
                        });
                        console.log(`Successfully load revision ${this._revNo} of project ${this._project.name()}`);
                    }
                    resolve(this);
                    console.log(`Stop loading revision ${this._revNo}. Time: ${performance.now() - startRev} miliseconds`)
                })
        })
    }

    loadSomeMicroflows(index: number, listOfMfIndexes: number[]) {
        let indices: number[] = [];
        let length = Math.min(index + SIZE, listOfMfIndexes.length);
        for (let idx = index; idx < length; ++idx) {
            indices.push(listOfMfIndexes[idx]);
        }
        if (indices.length === 0) return;
        let mfs: microflows.Microflow[] = [];
        console.log("Load microflows from " + index + " to " + (index + indices.length - 1));
        return when.promise(resolve => {
            when.all(indices.map(idx => {
                if (this._microflows[idx] && this._microflows[idx]!.isLoaded) {
                    mfs.push(this._microflows[idx] as microflows.Microflow);
                    return
                }
                return loadAsPromise(this._microflows[idx]!)
                    .then((mf: microflows.Microflow) => {
                        mfs.push(mf);
                        this._microflows[idx] = mf;
                    })
            }))
                .then(() => this.loadSomeMicroflows(index + SIZE, listOfMfIndexes))
                .then((subMfs) => {
                    if (subMfs) mfs.push(subMfs);
                    resolve(mfs)
                })
        })
    }
    loadMicroflowsFromModules(modulename: string) {
        let listOfIndexes = this._microflows.map((mf, index) => {
            return mf && mf.qualifiedName ? (mf.qualifiedName.split(".")[0] === modulename ? index : -1) : -1;
            // try {
            //     return mf!.containerAsModule.id === modulename ? index : -1
            // } catch (e) { return -1 }
        }).filter(index => index !== -1);
        return this.loadSomeMicroflows(0, listOfIndexes)
    }

    loadAllMicroflows(): when.Promise<microflows.Microflow | undefined> {
        console.log(`Start loading all microflows at ${performance.now()}`);
        return when.promise(resolve => {
            return this.loadSomeMicroflows(0, this._microflows.map((mf, index) => mf! && index))
                .then((mfs) => resolve(mfs))
        })
    }

    loadMicroflowById(mfId: string, mfName: string): when.Promise<microflows.Microflow> {
        let microflowIndex = this._microflows.findIndex(mf => mf!.id === mfId);
        if (this._microflows[microflowIndex] && this._microflows[microflowIndex]!.isLoaded) {
            return when.promise<microflows.Microflow>(resolve => resolve(this._microflows[microflowIndex]))
        }
        return when.promise<microflows.Microflow>((resolve, reject) => {
            if (this._microflows) {
                MicroflowUtils.loadMicroflowById(this._microflows, mfId, mfName)
                    .then((mf: microflows.Microflow) => {
                        console.log("Stop loading microflow " + mfName)
                        this._microflows[microflowIndex] = mf
                        resolve(mf)
                    })
                    .catch((e: Error) => {
                        e.setArgument2(this._revNo);
                        reject(e)
                    })
            }
        })
    }

    allMicroflows(): (microflows.IMicroflow | undefined)[] {
        return this._microflows;
    }

    allModules() {
        return this._modules
    }

    getRevNo(): number {
        return this._revNo;
    }

    commitToServer(): void {
        this._client.platform().commitToTeamServer(this._workingCopy)
            .done(
            () => {
                console.log("Successfully commit to server");
            },
            error => {
                console.log(`Failed to commit to server`);
                console.log(error);
            }
            )
    }

    closeConnection(): void {
        this._model.closeConnection(
            () => console.log("Close connection"),
            (error) => console.log("Something went wrong " + error)
        )
    }

    static compareTwoRevisionsByRevNo(first: RevisionUtils, second: RevisionUtils): number {
        if (first.getRevNo() > second.getRevNo()) return 1;
        if (first.getRevNo() === second.getRevNo()) return 0;
        return -1;
    }

}