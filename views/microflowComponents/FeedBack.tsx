/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import { Modal } from "react-bootstrap"
class TypeFeedBack extends React.Component<{}, { showIssue: string, showIdea: string, showQuestion: string }>{
    constructor(props) {
        super(props);
        this.state = {
            showIssue: "buttonIdea sprintrFeedbackActive",
            showIdea: "buttonIssue",
            showQuestion: "buttonQuestion"
        };
        this.openIssue = this.openIssue.bind(this);
        this.openIdea = this.openIdea.bind(this);
        this.openQuestion = this.openQuestion.bind(this);
    }
    openIssue() {
        this.setState({ showIssue: "buttonIdea sprintrFeedbackActive", showIdea: "buttonIssue", showQuestion: "buttonQuestion" });
    }
    openIdea() {
        this.setState({ showIssue: "buttonIdea", showIdea: "buttonIssue sprintrFeedbackActive", showQuestion: "buttonQuestion" });
    }
    openQuestion() {
        this.setState({ showIssue: "buttonIdea", showIdea: "buttonIssue", showQuestion: "buttonQuestion  sprintrFeedbackActive" });
    }
    render() {
        return (
            <div className="sprintrFeedbackOptions">
                <div onClick={this.openIssue} id="btnIssue" className={this.state.showIssue}>
                    <span>Issue</span>
                </div>
                <div onClick={this.openIdea} id="btnIdea" className={this.state.showIdea}>
                    <span>Idea</span>
                </div>
                <div onClick={this.openQuestion} id="btnQuestion" className={this.state.showQuestion}>
                    <span>Question</span>
                </div>
            </div>
        )
    }
}
export class FeedBack extends React.Component<{}, { showModal: boolean }>{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.sendFeedBack = this.sendFeedBack.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }
    sendFeedBack() {
        // var request = new Request('https://api.bitbucket.org/1.0/repositories/HaBui/mfdiff_electrons/issues', {
        //     method: 'POST',
        //     headers: new Headers({
        //         "Mendix-Username": "",
        //         "Mendix-Useremail": "",
        //     })
        // });
        // fetch(request).then(function () {
        //     console.log('mode: ', request.headers);
        // })
    }
    render() {
        return (
            <div className="feedback">
                <button className="sprintrFeedbackNodes" onClick={this.open}>
                    FeedBack
                </button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <div id="sprintrFeedbackWrapper" data-html2canvas-ignore="data-html2canvas-ignore">
                        <div className="sprintrFeedbackForm" id="formNode" >
                            <div className="sprintrFeedbackMessage" id="sprintrFeedbackMessage" style={{ display: "none" }}>
                                <span></span>
                                <span className="sprintrFocusWrapper">
                                    <input type="button" id="sprintrFeedbackBtn" value="Close" className="sprintrFeedbackBtn" />
                                </span>
                            </div>
                            <div className="sprintrFeedbackFormContent" id="sprintrFeedbackFormContent">
                                <div className="sprintrFeedbackFormHeader" >
                                    Provide your feedback
					            <small className="sprintrFeedbackCancel" id="cancelBtn">
                                        <img onClick={this.close} src="https://sprintr.home.mendix.com/feedback/ui/feedback_close.png" alt="Close" />
                                    </small>
                                </div>

                                <form id="formFormNode" encType="multipart/form-data" method="POST">
                                    <div className="sprintrFeedbackContentTable">
                                        <div className="form-group">
                                            <label>Your name</label>
                                            <input name="username" className="sprintrFeedbackInput" />
                                        </div>
                                        <div className="form-group">
                                            <label>Your email address</label>
                                            <input name="emailaddress" className="sprintrFeedbackInput" />
                                        </div>
                                        <div className="form-group">
                                            <label>What is the type of feedback?</label>
                                            <TypeFeedBack />
                                        </div>
                                        <div className="form-group">
                                            <label>What would you like to share with us?</label>
                                            <input placeholder="Short description" name="shortdescription" className="sprintrFeedbackInput" />
                                        </div>
                                        <div className="form-group">
                                            <label>Additional information (optional)</label>
                                            <textarea name="description" rows={4} className="sprintrFeedbackInput sprintrFeedbackTextInput"></textarea>
                                        </div>
                                        <div className="hide-row">
                                            <div className="form-group" id="fileuploaddiv" >
                                                <span>Attach a file (optional):</span>
                                                <input type="file" id="fileupload" name="fileupload" />
                                            </div>
                                        </div>
                                    </div>
                                    <span className="sprintrFocusWrapper" id="addShotBar">
                                        <input type="checkbox" id="addSshotBtn" />
                                        <span id="sshotLabel" style={{ cursor: "pointer" }}>Include a snapshot of this page</span>
                                        <span id="previewLabel" style={{ cursor: "pointer", display: "none" }}>Open preview</span>
                                    </span>
                                    <div className="sprintrFeedbackFooterWrapper">
                                        <span className="sprintrFocusWrapper sprintrFocusWrapperSubmit">
                                            <input onClick={this.sendFeedBack} type="button" id="submitBtn" className="sprintrFeedbackSubmit" value="Send feedback" />
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}