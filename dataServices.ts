/// <reference path="./typings/index.d.ts" />
import { Error, ErrorType, ErrorProperty, checkProjectInfo } from "./Utils/Error"
import { ProjectInfo } from "./MfDiff/ProjectInfo"
import when = require("when")
// import { RevisionInfo, BranchInfo } from "./views/ConfigurationBar/ConfigurationBar"
import { RevisionInfo, BranchInfo } from "./MfDiff/ProjectInterface"
// import { microflows as mfs } from "mendixmodelsdk"
// import { ProjectComparing } from "./MfDiff/ProjectComparing"

const MendixRestEndpoint = `https://deploy.mendix.com/api/1/apps/`;
// const MainlineRevisions = "/branches/trunk/revisions";

interface MendixApiParams {
    method: string,
    headers: {
        'Mendix-Username': string,
        'Mendix-ApiKey': string
    }
}

export class DataServices {

    static getErrorFromResponse(response: { errorCode: string }, projectId: string): Error[] {
        if (response.errorCode === "UNAUTHORIZED") {
            return [new Error(ErrorType.Invalid, ErrorProperty.UsernameOrAPIKey)];
        }
        else if (response.errorCode.includes("APP")) {
            return [new Error(ErrorType.Invalid, ErrorProperty.ProjectId, projectId)]
        }
        return [];
    }

    static getErrorFromResponse2(error: any): Error[] {
        if (error && error["message"]) {
            return [new Error(ErrorType.Invalid, ErrorProperty.Network)]
        }
        return [];
    }

    static generateGetRequest(username: string, apikey: string): MendixApiParams {
        let parameterRESTCall: MendixApiParams = {
            method: "GET",
            headers: {
                'Mendix-Username': username,
                'Mendix-ApiKey': apikey
            }
        }
        return parameterRESTCall;
    }

    static projectInfoValidationError(errors: Error[]): when.Promise<any> {
        return when.promise<any>((resolve, reject) => {
            if (errors.length > 0) {
                reject(errors[0]);
            } else {
                resolve();
            }
        })
    }

    static retrieveBranches(projectInfo: ProjectInfo): when.Promise<BranchInfo[]> {
        let errors = checkProjectInfo(projectInfo);
        if (errors.length > 0) {
            return this.projectInfoValidationError(errors);
        }
        let parameterRESTCall: MendixApiParams = this.generateGetRequest(projectInfo.username, projectInfo.apikey);
        return when.promise<any>((resolve, reject) => {
            fetch(`${MendixRestEndpoint}${projectInfo.projectName.toLowerCase()}/branches/`, parameterRESTCall)
                .then(result => result.json())
                .then((result: any) => {
                    let listOfBranches;
                    if (result['errorCode']) {
                        errors = this.getErrorFromResponse(result, projectInfo.projectId);
                    } else {
                        listOfBranches = (result as BranchInfo[])
                        // listOfBranches.forEach(branch => branch.Name = encodeURIComponent(branch.Name));
                    }
                    if (errors.length > 0) {
                        reject(errors[0])
                    } else {
                        resolve(listOfBranches);
                    }
                })
                .catch((e: Error[]) => {
                    if (e) {
                        reject(e[0]);
                    }
                });
        })
    }

    static getAppInfo(restParams: MendixApiParams): when.Promise<string> {
        return when.promise<string>((resolve, reject) =>
            fetch(MendixRestEndpoint, restParams)
                .then(result => result.json())
                .then((apps: any) => {
                    if (apps["errorCode"]) {
                        reject(DataServices.getErrorFromResponse(apps, ""))
                    }
                    else resolve(apps)
                })
                .catch((error: any) =>
                    reject(DataServices.getErrorFromResponse2(error))
                )
        );
    }

    static loadApp(projectInfo: ProjectInfo) {
        let errors = checkProjectInfo(projectInfo);//TODO: create class from ProjectInfo and place this method there
        if (errors.length > 0) {
            return DataServices.projectInfoValidationError(errors);
        }
        let parameterRESTCall: MendixApiParams = this.generateGetRequest(projectInfo.username, projectInfo.apikey);
        return when.promise<any>((resolve, reject) => {
            DataServices.getAppInfo(parameterRESTCall)
                .then(app => {
                    resolve(app)
                })
                .catch((e: Error[]) => {
                    if (e)
                        reject(e[0])
                });
        })
    }

    static getProjectName(appName: string, listOfApp: any): when.Promise<string> {
        return when.promise<string>((resolve, reject) => {
            if (listOfApp['errorCode']) {
                reject(this.getErrorFromResponse(listOfApp, appName))
            }
            else {
                let result = listOfApp.filter(app => app.ProjectId === appName)[0];
                if (result) {
                    resolve(result.AppId);
                }
                else {
                    resolve(undefined);
                }
            }
        });
    }

    static retrieveRevisions(projectInfo: ProjectInfo, branchInfo: BranchInfo): when.Promise<any> {
        let errors = checkProjectInfo(projectInfo);//TODO: create class from ProjectInfo and place this method there
        if (errors.length > 0) {
            return this.projectInfoValidationError(errors);
        }
        let parameterRESTCall: MendixApiParams = this.generateGetRequest(projectInfo.username, projectInfo.apikey);
        return when.promise<any>((resolve, reject) => {
            let branchName = encodeURIComponent(branchInfo.Name)
            // let branchName = branch.Name.includes("branches/") ? branch.Name.split("/")[1] : branch.Name
            fetch(`${MendixRestEndpoint}${projectInfo.projectName.toLowerCase()}/branches/${branchName}/revisions`, parameterRESTCall)
                .then(result => result.json())
                .then((result: any) => {
                    let revisionsInBranch;
                    if (result['errorCode']) {
                        errors = this.getErrorFromResponse(result, projectInfo.projectId);
                    } else {
                        revisionsInBranch = (result as RevisionInfo[]).map(revision => Object.assign(revision, {
                            projectInfo: projectInfo,
                            branchInfo: branchInfo
                        }));
                        let lengthArrResult = revisionsInBranch.length;
                        if (revisionsInBranch[lengthArrResult - 1] && revisionsInBranch[lengthArrResult - 1].Number > 0) {
                            let lengthUndefined = revisionsInBranch[lengthArrResult - 1].Number;
                            while (lengthUndefined != 1) {
                                let emptyObj: RevisionInfo = {
                                    projectInfo: projectInfo,
                                    branchInfo: branchInfo,
                                    Number: lengthUndefined - 1,
                                    Author: "Cannot retrieve author",
                                    Date: "",
                                    CommitMessage: "Cannot retrieve message",
                                    MendixVersion: "Cannot retrieve version"
                                }
                                revisionsInBranch.push(emptyObj)
                                lengthUndefined--;
                            }
                        }
                    }
                    if (errors.length > 0) {
                        reject(errors[0])
                    } else {
                        resolve(revisionsInBranch);
                    }
                })
                .catch((e: Error[]) => {
                    if (e) {
                        reject(e[0]);
                    }
                });
        })
    }

}