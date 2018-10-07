/// <reference path="./typings/index.d.ts" /> 
import { Menu } from 'electron';
let template: Electron.MenuItemOptions[] = [];
template.push({
    label: "Config",
    submenu: [{
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
    },
        // {
        //     label: "Open...",
        //     click: () => console.log("Open...")
        // }
    ]
})
export const menu = Menu.buildFromTemplate(template)
