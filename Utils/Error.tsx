/// <reference path="./../typings/index.d.ts" /> 
import { ProjectInfo } from "../MfDiff/ProjectInfo"
import { Modal, Button } from "react-bootstrap"
import React = require("react")
import ReactDOM = require("react-dom")
import { errorMessage } from "./../config"
export function checkProjectInfo(projectInfo: ProjectInfo): Error[] {
    if (!projectInfo.apikey || !projectInfo.username) {
        return [new Error(ErrorType.Missing, ErrorProperty.UsernameOrAPIKey, "")]
    }
    // if (!projectInfo.projectId) {
    //     return [new Error(ErrorType.Missing, ErrorProperty.ProjectId, "")]
    // }
    return [];
}
export function checkError(projectInfo: ProjectInfo, microflowName: string): Error[] {
    if (!projectInfo.apikey || !projectInfo.username) {
        return [new Error(ErrorType.Missing, ErrorProperty.UsernameOrAPIKey, "")]
    }
    if (!projectInfo.projectId) {
        return [new Error(ErrorType.Missing, ErrorProperty.ProjectId, "")]
    }
    if (!projectInfo.projectName) {
        return [new Error(ErrorType.Missing, ErrorProperty.ProjectName, "")]
    }
    if (!microflowName) {
        return [new Error(ErrorType.Missing, ErrorProperty.MicroflowName, "")]
    }
    return []
}
export enum ErrorType {
    Missing,
    Invalid,
    NotSupported,
    Undetectable,
    Duplicate,
    Fail,
    Expired,
}
export enum ErrorProperty {
    UsernameOrAPIKey,
    ProjectId,
    MicroflowName,
    BranchName,
    ProjectName,
    Network,
    MendixVersion,
    Undetectable,
    OpenOnlineWorkingCopy,
    Expired,
    Revision
}
export class Error {
    constructor(private _type: ErrorType, private _property: ErrorProperty, private _argument1?: string | number, private _argument2?: string | number) {
    }
    getType() {
        return this._type;
    }
    getProperty() {
        return this._property
    }
    getName(): string {
        let name: string = ""
        switch (this._type) {
            case ErrorType.Invalid: {
                name = "Invalid "
                switch (this._property) {
                    case ErrorProperty.UsernameOrAPIKey: return errorMessage.usernameOrAPIKey
                    case ErrorProperty.ProjectId: return errorMessage.projectId(this._argument1)
                    case ErrorProperty.ProjectName: return errorMessage.projectName(this._argument1)
                    case ErrorProperty.MicroflowName: return errorMessage.microflowName(this._argument1, this._argument2)
                    case ErrorProperty.Network: return errorMessage.netWork
                    case ErrorProperty.Revision: return errorMessage.revision(this._argument1, this._argument2)
                }
                break;
            }
            case ErrorType.Missing: {
                name = "Missing "
                switch (this._property) {
                    case ErrorProperty.ProjectId: {
                        name += "AppId " + this._argument1
                        break
                    }
                    case ErrorProperty.UsernameOrAPIKey: {
                        name += "username/API key"
                        break
                    }
                    case ErrorProperty.MicroflowName: {
                        name += "microflow " + this._argument1
                        break
                    }
                    case ErrorProperty.Revision: {
                        name += "revision(s)"
                        break
                    }
                    case ErrorProperty.ProjectName: {
                        name += "Appname"
                    }
                }
                break;
            }
            case ErrorType.NotSupported: {
                switch (this._property) {
                    case ErrorProperty.MendixVersion: {
                        let errorString = (this._argument1 as string)
                        name = errorString.substring(errorString.lastIndexOf("400 Bad Request\n") + 16, errorString.lastIndexOf("\n\n	at ModelApiClient.CreateModelApiWorkingCopy"))
                        break;
                    }
                }
                break;
            }
            case ErrorType.Undetectable: {
                name = "Error can not be detected"
                break;
            }
            case ErrorType.Duplicate: {
                name = "You selected two similar revisions";
                break;
            }
            case ErrorType.Fail: {
                name = `Failed to open new online working copy.
                Please try again.`;
                break;
            }
            case ErrorType.Expired: {
                name = `Your license has expired, you must have a valid license`;
                break;
            }
        }
        return name;
    }
    showOnConsole() {
        console.log(this.getName());
    }
    showPopUp() {
        ReactDOM.render(<ErrorPopUp error={this} />, document.getElementById("popupContainer") as Element)
    }
    setArgument2(argument: string | number) {
        this._argument2 = argument;
    }
}


export class ErrorPopUp extends React.Component<{ error: Error }, { show: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        }
    }
    onClose() {
        this.setState({
            show: false
        })
    }
    showOrHide() {
        return !this.state.show
    }
    render() {
        return <Modal show={this.state.show} onHide={this.onClose.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ fontSize: "14px" }}>
                    {this.props.error.getName()}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.onClose.bind(this)}>Close</Button>
            </Modal.Footer>
        </Modal>
    }
    componentDidUpdate() {
        this.state.show = true;
    }
}
