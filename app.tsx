/// <reference path="./typings/index.d.ts" /> 
import { render } from 'react-dom';
import * as React from "react";

import Application from "./Application"
// import { ProjectInfo } from "./MfDiff/ProjectInfo";

// let project: ProjectInfo = {
//     projectName: "TestMfDiff",
//     projectId: "a51aabef-61c8-4d0b-90ed-86759b914cb8",
//     username: "thanhtung29497@yandex.com",
//     apikey: "38076341-6d3c-4a5c-8671-bc90c3dec0fb",
//     branchName: ""
// }

// let project: ProjectInfo = {
//     projectName: "ThirdProject",
//     projectId: "1c790420-2f3f-4559-bce4-11a8af4be8b8",
//     username: "thanhtung29497@yandex.com",
//     apikey: "38076341-6d3c-4a5c-8671-bc90c3dec0fb",
//     branchName: ""
// }

// let project: ProjectInfo = {
//     username: 'd.bui@capegroep.nl',
//     apikey: '04027f25-980b-4c12-978f-8c5be75dea15',
//     projectId: '0bbea572-d0fc-4552-a62c-6fe0bdf4653f',
//     projectName: 'TestMx7',
//     branchName: "",// for mainline   
// }

render(
    <div>
        <Application />
    </div>
    , document.getElementById("app")!)
