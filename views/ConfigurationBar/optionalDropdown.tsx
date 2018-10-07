import React = require("react");
import { ProcessState } from "../../ApplicationState";
import { LoadingStatus } from "./../layout";
import VirtualizedSelect = require("react-virtualized-select");
import ReactDOM = require("react-dom")

interface IDropdownOption<T> {
    label: T,
    value: T
}

export class OptionalDropdown extends React.Component<{
    disabled?: boolean
    disabledStates?: ProcessState[]
    dropdownItem?: Object,
    displayedValue?: Object,
    value?: any,
    appState: ProcessState,
    id: string,
    setItem: (item: any) => void,
    listOfItems: Array<any> | undefined
    loadingState: ProcessState[],
    compareFunction?: ((first, second) => number),
    style?: {}
    noResultsText: string,
    filterOption: (any, string: string) => boolean,
    loadingItems?: (items: any[] | undefined) => void;
    nameProperty?: string;
    placeholder?: string;
}, {}> {
    constructor(props) {
        super(props);
    }
    compareTwoOptions(option1: IDropdownOption<any>, option2: IDropdownOption<any>): number {
        if (!this.props.compareFunction) return -2;
        return this.props.compareFunction(option1.value, option2.value)
    }
    _dropdown;
    _scrollingDiv: HTMLDivElement
    _isNewMicroflow: boolean = false;

    getVisibleItems() {
        return this._scrollingDiv && this.props.listOfItems && this.props.listOfItems.filter(item => {
            let found = false;
            this._scrollingDiv.children[0] && this._scrollingDiv.children[0].childNodes.forEach((element, index) => {
                if (index < 6 && item.state === 0 && (element as HTMLDivElement).id === item[this.props.nameProperty as string]) {
                    found = true;
                }
            })
            return found;
        })
    }


    componentWillUpdate() {
        if (!this.props.loadingItems || !this._isNewMicroflow) return;
        let dropdown = ReactDOM.findDOMNode(this._dropdown);
        dropdown && dropdown.addEventListener("click", () => {
            if (!dropdown.children[1] || !dropdown.children[1].children[0]) return;
            this._scrollingDiv = dropdown.children[1].children[0] && dropdown.children[1].children[0].children[0] && dropdown.children[1].children[0].children[0].children[0] as HTMLDivElement;
            this._scrollingDiv && this._scrollingDiv.addEventListener("scroll", (e) => {
                let scrollingDiv = e.target as HTMLDivElement
                let currentScrollTop = scrollingDiv.scrollTop;
                setTimeout(() => {
                    if (this._scrollingDiv.scrollTop === currentScrollTop && this._scrollingDiv.style.display !== "none") {
                        this.props.loadingItems && this.props.loadingItems(this.getVisibleItems())
                    }
                }, 200)
            });
        })
    }
    render() {
        let options = this.props.listOfItems && this.props.listOfItems.map(item => ({
            value: item,
            label: item
        }))
        if (options && this.props.compareFunction) {
            options.sort(this.compareTwoOptions.bind(this))
        }
        if (this.props.loadingState.indexOf(this.props.appState) >= 0) {
            this._isNewMicroflow = true;
        } else if (this.props.loadingState.indexOf(this.props.appState - 1)) {
            this._isNewMicroflow = false;
        }
        return <span className="Select-wrapper" style={this.props.style} id={this.props.id}>
            {this.props.loadingState.indexOf(this.props.appState) >= 0 ?
                <span className="Select-spinner">
                    <LoadingStatus className="dropdown-spinner" />
                </span> :
                <VirtualizedSelect
                    disabled={this.props.disabledStates && this.props.disabledStates.indexOf(this.props.appState) >= 0}
                    value={this.props.value}
                    options={options}
                    optionHeight={50}
                    ref={ref =>
                        this._dropdown = ref}
                    onChange={(val) => val && this.props.setItem(val)}
                    simpleValue={false}
                    optionRenderer={this.props.dropdownItem}
                    noResultsText={this.props.noResultsText}
                    valueComponent={this.props.displayedValue}
                    filterOption={this.props.filterOption}
                    placeholder={this.props.placeholder}
                />
            }
        </span>
    }
}
