import * as $ from "./"
import diff = require("../DiffInterface")
import single = require("../SingleInterface")

export function loadHttpConfiguration(object1: single.IHttpConfiguration, object2: single.IHttpConfiguration): diff.IHttpConfigurationDiff {
    return {
        authenticationPassword: $.loadToIBasicDiff(object1.authenticationPassword, object2.authenticationPassword),
        customLocation: $.loadToIBasicDiff(object1.customLocation, object2.customLocation),
        httpAuthenticationUserName: $.loadToIBasicDiff(object1.httpAuthenticationUserName, object2.httpAuthenticationUserName),
        overrideLocation: $.loadToIBasicDiff(object1.overrideLocation, object2.overrideLocation),
        customLocationTemplate: $.loadStringTemplateDiff(object1.customLocationTemplate, object2.customLocationTemplate),
        useAuthentication: $.loadToIBasicDiff(object1.useAuthentication, object2.useAuthentication),
        httpMethod: $.loadToIBasicDiff(object1.httpMethod, object2.httpMethod),
        headerEntries: $.loadArrayDiff(object1.headerEntries, object2.headerEntries,
            $.loadParameterDiff, $.compareTwoParametersById
        )
    }
}