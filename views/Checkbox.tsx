import React = require("react")
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react'

@observer export class Checkbox extends React.Component<{ checked?: boolean, label: string, onClick: () => void }, {}> {
    @observable checked = this.props.checked ? this.props.checked : false;
    onClick() {
        this.props.onClick();
        this.checked = !this.checked
    }
    @computed get Checked() {
        return this.checked;
    }
    render() {
        return <div className="checkbox-wrapper" onClick={this.onClick.bind(this)}>
            <div className={`checkbox ${this.Checked && "checked"}`} >
                <span style={{ display: this.Checked ? "inline" : "none" }} className="checkbox-tick">{String.fromCharCode(0x2713)}</span>
            </div>
            <div className="checkbox-label">{this.props.label}</div>
        </div>
    }
}