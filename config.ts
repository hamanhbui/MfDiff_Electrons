export const highlightClickStyle = {
    fill: "#ffa500",
    strokeWidth: 0
}
export const diffNewStyle = {
    fill: "#97f295",
    strokeWidth: 0
}
export const diffDeleteStyle = {
    fill: "#ffb6ba",
    strokeWidth: 0
}
export const diffEditStyle = {
    fill: "rgb(128, 188, 223)",
    strokeWidth: 0
}
export const backgroundVersion1 = {
    color: "rgb(234, 253, 234)"
}
export const backgroundVersion2 = {
    color: "rgb(255, 240, 241)"
}

export const defaultProjectInfo = {
    username: 'd.bui@capegroep.nl',
    apikey: '04027f25-980b-4c12-978f-8c5be75dea15',
    appId: '0bbea572-d0fc-4552-a62c-6fe0bdf4653f'
}

// export const defaultProjectInfo = {
//     username: 'thanhtung29497@yandex.com',
//     apikey: '38076341-6d3c-4a5c-8671-bc90c3dec0fb',
//     appId: 'a51aabef-61c8-4d0b-90ed-86759b914cb8'
// }
export const errorMessage = {
    usernameOrAPIKey: "Invalid username/API key",
    projectId: ((argument: string | number | undefined): string => {
        let message: string = "";
        message = "Project with id " + argument + " does not exist"
        return message;
    }),
    projectName: ((argument: string | number | undefined): string => {
        let message: string = "";
        message = "Project " + argument + " does not exist"
        return message;
    }),
    microflowName: ((argument1: string | number | undefined, argument2: string | number | undefined): string => {
        let message: string = "";
        message = "No such microflow " + argument1 + " in revision " + argument2
        return message;
    }),
    revision: ((revNo: string | number | undefined, branch: string | number | undefined): string => {
        let message: string = "";
        message = `No such revision ${revNo} in branch ${branch} `
        return message;
    }),
    netWork: "There is no Internet connection",
}