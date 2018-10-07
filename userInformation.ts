/// <reference path="./typings/index.d.ts" />
import fs = require("file-system");
import when = require("when")
import jwt = require('jwt-simple');
export interface InfoUser {
    userName: string,
    //date: string
}
export class FileUserInfo {
    readFileUserName(): when.Promise<any> {
        if (fs.existsSync('userName.json')) {
            return when.promise<any>((resolve) => {
                fs.readFile('userName.json', 'utf8', (err, data) => {
                    if (err) throw err;
                    var secret = 'xxx';
                    let userName: InfoUser = jwt.decode(data, secret);
                    // let userName = JSON.stringify(data);
                    resolve(userName)
                })
            })
        } else {
            return when.promise<any>((resolve) => { resolve(undefined) })
        }
    }
    readFileAPIKey(userNameExisted: boolean): when.Promise<any> {
        if (userNameExisted) {
            if (fs.existsSync('apiKey.json')) {
                return when.promise<any>((resolve) => {
                    fs.readFile('apiKey.json', 'utf8', (err, data) => {
                        if (err) throw err;
                        var secret = 'xxx';
                        let listOfAPIKey = jwt.decode(data, secret);;
                        resolve(listOfAPIKey)
                    })
                })
            }
            else {
                return when.promise<any>((resolve) => { resolve([]) })
            }
        } else {
            this.writeFileAPIKEys([]);
            return when.promise<any>((resolve) => { resolve([]) })
        }
    }
    writeFileUserName(userName) {
        //var date = new Date();
        let info: InfoUser = {
            userName: userName,
            //date: date.toJSON()
        }
        var secret = 'xxx';
        // fs.writeFile('userName.json', JSON.stringify(info));
        fs.writeFile('userName.json', jwt.encode(info, secret));
    }
    writeFileAPIKEys(apiKey) {
        var secret = 'xxx';
        fs.writeFile('apiKey.json', jwt.encode(apiKey, secret));
    }
}