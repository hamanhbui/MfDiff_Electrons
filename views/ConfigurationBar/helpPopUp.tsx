import React = require("react")
export class HelpPopUp extends React.Component<{}, { show: boolean }> {
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
        if (this.state.show) {
            return (
                <div role="dialog" tabIndex={-1} className="fade in modal" style={{ display: "block" }}>
                    <div className="modal-dialog" style={{ width: 1000 }}>
                        <div className="modal-content" role="document">
                            <div className="modal-header"><button type="button" className="close" aria-label="Close">
                                <span onClick={this.onClose.bind(this)} aria-hidden="true">×</span></button>
                                <h4 className="modal-title">Help and Support</h4>
                            </div>
                            <div className="modal-body">
                                <img src="./data/introduction.gif" style={{ width: 800, height: 450 }} />
                            </div>
                            <div className="modal-footer"><button onClick={this.onClose.bind(this)} type="button" className="btn btn-default">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) 
        } else {
            return <div />
        }
    }
    componentDidUpdate() {
        this.state.show = true;
    }
}
