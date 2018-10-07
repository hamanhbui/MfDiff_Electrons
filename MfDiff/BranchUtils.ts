import { BranchInfo, ProjectInfo, RevisionInfo } from "./ProjectInterface"
import { RevisionUtils } from "./RevisionUtils"
import when = require("when")
import { DataServices } from "../dataServices"

export class BranchUtils {
    private _info: BranchInfo
    private _projectInfo: ProjectInfo
    private _listOfRevisions: RevisionUtils[]

    constructor(projectInfo: ProjectInfo, branchInfo: BranchInfo, ) {
        this._info = branchInfo
        this._projectInfo = projectInfo
        this._listOfRevisions = []
    }

    retrieveAllRevisions(): when.Promise<RevisionUtils[]> {
        return when.promise<RevisionUtils[]>((resolve, reject) => {
            DataServices.retrieveRevisions(this._projectInfo, this._info)
                .then((revisionInfos: RevisionInfo[]) => {
                    revisionInfos.forEach(revisionInfo => {
                        this._listOfRevisions[revisionInfo.Number] = new RevisionUtils(revisionInfo)
                    })
                    resolve(revisionInfos)
                })
                .catch(e => {
                    reject(e)
                })
        })
    }

    loadRevision(revisionInfo: RevisionInfo) {
        let revision = this._listOfRevisions[revisionInfo.Number]
        return (revision as RevisionUtils).retrieveAllMicroflows()
    }

    getName(): string {
        return this._info.Name
    }

    getRevision(revisionInfo: RevisionInfo): RevisionUtils {
        return this._listOfRevisions[revisionInfo.Number]
    }

}