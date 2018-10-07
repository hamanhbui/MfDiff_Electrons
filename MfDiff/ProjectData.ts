import when = require("when");
import { MendixSdkClient } from "mendixplatformsdk";
// import { RevisionUtils } from "./RevisionUtils"
import { ProjectInfo, BranchInfo, RevisionInfo } from "./ProjectInterface";
import { BranchUtils } from "./BranchUtils"
import { DataServices } from "../dataServices"

export class ProjectData {
    private _client: MendixSdkClient;
    private _info: ProjectInfo
    private _listOfBranches: BranchUtils[]

    constructor(projectInfo: ProjectInfo) {
        this._client = new MendixSdkClient(projectInfo.username, projectInfo.apikey);
        this._info = projectInfo;
        this._listOfBranches = [];
    }

    getAllBranches() {
        return this._listOfBranches;
    }

    retrieveBranchInfo() {
        return when.promise<BranchInfo>((resolve, reject) => {
            DataServices.retrieveBranches(this._info)
                .then((branchInfos: BranchInfo[]) => {
                    resolve(branchInfos)
                    this._listOfBranches = branchInfos.map(branchInfo => new BranchUtils(this._info, branchInfo))
                })
                .catch(e => {
                    reject(e)
                })
        })
    }

    getRevision(revisionInfo: RevisionInfo) {
        let branch = this.getBranch(revisionInfo.branchInfo)
        return branch.getRevision(revisionInfo);
    }

    loadRevisions(revisionInfos: RevisionInfo | RevisionInfo[]): when.Promise<RevisionUtils[]> {
        if (!(revisionInfos instanceof Array)) {
            revisionInfos = [revisionInfos]
        }
        return when.all(revisionInfos.map(revisionInfo => {
            let branch = this._listOfBranches.find(branch => branch.getName() === (revisionInfo.branchInfo && revisionInfo.branchInfo.Name))
            return (branch as BranchUtils).loadRevision(revisionInfo)
        }))
    }

    loadMicroflow(revisionInfo: RevisionInfo, microflowId: string, microflowName: string): when.Promise<mfs.Microflow> {
        let revision = this.getRevision(revisionInfo)
        return revision.loadMicroflowById(microflowId, microflowName)
    }

    getBranch(branchInfo: BranchInfo): BranchUtils {
        return this._listOfBranches.find(branch => branch.getName() === branchInfo.Name) as BranchUtils
    }

}