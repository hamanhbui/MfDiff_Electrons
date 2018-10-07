/// <reference path="./typings/index.d.ts" /> 
import * as React from "react";
import { observer } from "mobx-react";
import { AppState } from "./ApplicationState";
import { DiffLayout } from "./views/layout";
let AppData = new AppState();
@observer
export class Application extends React.Component<{}, {}>{
    render() {
        return <div>
            <DiffLayout microflow={AppData} />
            <div id="popupContainer" />
        </div>
    }
}
export default Application;
