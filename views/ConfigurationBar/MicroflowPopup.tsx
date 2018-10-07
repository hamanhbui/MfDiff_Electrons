import React = require("react")
import { MicroflowInfo } from "./ConfigurationBar"
import { LoadingStatus } from "../layout"
import { Modal, Button } from "react-bootstrap"
import { List, AutoSizer } from "react-virtualized"
import JsSearch = require("js-search")
import { diffEditStyle, diffNewStyle, diffDeleteStyle } from "../../config"
import { compareTwoMfsByNameAndState } from "./MicroflowDropdown"
import { LimitedString } from "../../Utils/FormatString"

export class MicroflowPopup extends React.Component<{ close: () => void, setItem: (mf: MicroflowInfo) => void, listOfMicroflows: MicroflowInfo[] | undefined }, { show: boolean, microflowList: MicroflowInfo[] | undefined }> {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            microflowList: this.props.listOfMicroflows && this.props.listOfMicroflows.sort(compareTwoMfsByNameAndState)
        }
        // this.initSearchManager(this.props.listOfMicroflows)
    }

    initSearchManager(listOfMicroflows: MicroflowInfo[] | undefined) {
        this._searchManager = new JsSearch.Search("qualifiedName");
        this._searchManager.tokenizer = {
            tokenize(text: string) {
                let output: string[] = [];
                for (let i = 0; i < text.length; ++i) {
                    let subString = "";
                    let j = i;
                    while (j < text.length) {
                        subString += text[j];
                        output.push(subString);
                        j++;
                    }
                }
                return output;
            }
        }
        this._searchManager.addIndex("qualifiedName");
        this._searchManager.addDocuments(listOfMicroflows)
    }


    // componentWillReceiveProps(nextProps: { listOfMicroflows: MicroflowInfo[] | undefined }) {
    //     if (nextProps.listOfMicroflows !== this.props.listOfMicroflows) {
    //         this.initSearchManager(nextProps.listOfMicroflows);
    //     }
    // }

    _searchManager: JsSearch;
    _input: HTMLInputElement;

    onClose() {
        this.props.close();
        this.setState({
            show: false,
            microflowList: this.props.listOfMicroflows
        })
    }

    rowRenderer(props: {
        key: string,
        index: string
        isScrolling: boolean,
        isVisible: boolean,
        style: {}
    }) {
        let microflowInfo = this.state.microflowList && this.state.microflowList[props.index];
        return <div
            key={props.key}
            style={props.style}
            onClick={() => {
                microflowInfo && this.props.setItem(microflowInfo)
                this.onClose();
            }}
            className="popup-item">
            {microflowInfo && new LimitedString(microflowInfo.qualifiedName && microflowInfo.qualifiedName.split(".")[1], 100).toString()}
            {microflowInfo && (microflowInfo.state === 1 ? <span className="state"><LoadingStatus className="dropdown-item-spinner" /></span> :
                microflowInfo.state === 5 ? <span className="state" style={{ color: diffEditStyle.fill }}>Edited</span> :
                    microflowInfo.state === 3 ? <span className="state" style={{ color: diffNewStyle.fill }}>Added</span> :
                        microflowInfo.state === 4 ? <span className="state" style={{ color: diffDeleteStyle.fill }}>Deleted</span> :
                            <span className="state" style={{ color: "darkgray" }}>No change</span>)}
        </div>
    }

    filter() {
        if (!this.state.microflowList) return;
        if (!this._input || !this._input.value) {
            this.setState({
                show: true,
                microflowList: this.props.listOfMicroflows
            })
        } else {
            this.setState({
                show: true,
                microflowList: this.props.listOfMicroflows && this.props.listOfMicroflows.filter(element => element.qualifiedName.toLowerCase().includes(this._input.value.toLowerCase()))
            })
        }
    }

    componentWillReceiveProps(nextProps: { listOfMicroflows: MicroflowInfo[] | undefined }) {
        this.state.microflowList = nextProps.listOfMicroflows && nextProps.listOfMicroflows.sort(compareTwoMfsByNameAndState)
    }

    render() {
        return <Modal bsSize="large" show={this.state.show} onHide={this.onClose.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>List of Microflows</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ height: "100%" }}>
                    <div style={{ width: "100%", height: "50px", border: "1px solid #bbb", display: "table", position: "relative" }}>
                        <div style={{ display: "table-cell", verticalAlign: "middle", textAlign: "center" }}>
                            <input className="well-input" type="text" ref={ref => this._input = ref} style={{ width: "98%" }} onChange={this.filter.bind(this)} />
                        </div>
                    </div>
                    <div style={{ width: "100%", border: "1px solid #bbb" }}>
                        <AutoSizer disableHeight>
                            {() => <List
                                width={867}
                                height={400}
                                rowCount={this.props.listOfMicroflows && this.props.listOfMicroflows.length}
                                rowHeight={50}
                                rowRenderer={this.rowRenderer.bind(this)} />}
                        </AutoSizer>
                    </div>
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