export interface ProjectInfo {
    apikey: string;
    username: string;
    projectId: string;
    projectName: string;
    branchName: string;
}

export interface RevisionInfo {
    projectInfo: ProjectInfo,
    branchInfo: BranchInfo
    MendixVersion?: string;
    CommitMessage?: string;
    Date?: string;
    Number: number;
    Author?: string;
}
export interface AppInfo {
    AppId: string,
    Name: string,
    ProjectId: string,
    Url: string
}

export interface BranchInfo {
    Name: string,
    LatestRevisionNumber: number,
    LatestRevisionMendixVersion: string,
    DisplayName: string
}