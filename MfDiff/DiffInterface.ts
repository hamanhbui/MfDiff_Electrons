import { microflows } from "mendixmodelsdk";
import single = require("./SingleInterface")
import _cpnInterface = require("../views/microflowComponents/interfaces")
import { SearchingList } from "./SearchingList"

type IMicroflowExpression = string;


export interface IDiff {
    isDiff?: boolean
}

export interface ISize extends IDiff {
    height: number,
    width: number
}

export interface IPoint extends IDiff {
    x: number,
    y: number
}

export interface IMicroflow {
    microflow1: microflows.Microflow | undefined;
    microflow2: microflows.Microflow | undefined;
    mfDiff: IMfDiff;
}

export interface IMfDiff {
    deleteElementList: IDeleteElement[];
    newElementList: INewElement[];
    editElementList: IEditElement[];
    checkIfEditedElement?: (element: IElement) => boolean;
    updateCaption?: (captions: _cpnInterface.microflow.IObjectDict[]) => void;
    ignorePositionAndSize?: () => void;
    considerPosition?: () => void;
    isDiff?: () => boolean;
}

export class MfDiff implements IMfDiff {
    private _isChanged: boolean;
    constructor(public deleteElementList: IDeleteElement[], public newElementList: INewElement[], public editElementList: IEditElement[]) {
        this._isChanged = false;
        if (deleteElementList.length > 0 || newElementList.length > 0) this._isChanged = true;
        editElementList.map(element => {
            if (element.isDiff) {
                this._isChanged = true;
            }
        })
    }
    static compareTwoObjectsByEditedOrNot(object1: IMfElementDiffBase, object2: IMfElementDiffBase): number {
        if (object1.isDiff) {
            if (!object2.isDiff) return -1;
            return 0;
        }
        if (object2.isDiff) return 1;
        return 0;
    }
    checkIfEditedElement(elementToCheck: IElement): boolean {
        for (let element of this.editElementList) {
            if (element.id = elementToCheck.id) {
                return true;
            }
        }
        return false
    }
    checkIfNewElement(elementToCheck: IElement): boolean {
        for (let element of this.newElementList) {
            if (element.id = elementToCheck.id) {
                return true;
            }
        }
        return false
    }
    checkIfDeleteElement(elementToCheck: IElement): boolean {
        for (let element of this.deleteElementList) {
            if (element.id = elementToCheck.id) {
                return true;
            }
        }
        return false
    }
    updateCaption(captions: _cpnInterface.microflow.IObjectDict[]) {
        if (captions[0] !== {}) {
            this.editElementList.forEach(element => {
                if (element['caption']) {
                    element['caption'] = {
                        member1: captions[0][element.id as string] && captions[0][element.id as string].caption,
                        member2: captions[1][element.id as string] && captions[1][element.id as string].caption,
                        isDiff: (captions[0][element.id as string] && captions[0][element.id as string].caption) !==
                        (captions[1][element.id as string] && captions[1][element.id as string].caption)
                    } as IBasicDiff<any>
                }
            })
            this.newElementList.forEach(element => {
                if (element['caption']) {
                    element['caption'] = captions[0][element.id as string].caption
                }
            })
            this.deleteElementList.forEach(element => {
                if (element['caption']) {
                    element['caption'] = captions[1][element.id as string].caption
                }
            })
        }
    }
    ignorePositionAndSize(): void {
        this.editElementList.forEach(element => {
            element.isDiff = false;
            for (let property in element) {
                if (property === 'position' || property === 'size' || !element[property]) continue;
                if (element[property] instanceof Array) {
                    element[property].forEach(prop => {
                        prop.isDiff && (element.isDiff = true);
                    })
                } else if (element[property]['isDiff']) {
                    element.isDiff = true;
                }
            }
        })
        this.editElementList = new SearchingList(this.editElementList, MfDiff.compareTwoObjectsByEditedOrNot).getList();
    }
    considerPosition(): void {
        this.editElementList.forEach(element => {
            element.isDiff = false;
            for (let property in element) {
                if (element[property] && element[property]['isDiff']) {
                    element.isDiff = true;
                }
            }
        })
        this.editElementList = new SearchingList(this.editElementList, MfDiff.compareTwoObjectsByEditedOrNot).getList();
    }
    isDiff() {
        return this._isChanged;
    }
}

export interface IElement {
    id?: string;
    typeName: single.ElementType;
}

export interface IDeleteElement extends IElement {
}

export interface INewElement extends IElement {
}

export interface IEditElement extends IElement, IDiff {
    parentElement?: IBasicDiff<IMfElementDiffBase>
}

export interface IBasicDiff<T> extends IDiff {
    member1?: T;
    member2?: T;
    typeName?: single.ElementType;
}

export interface IMfElementDiffBase extends IEditElement {
}

export interface IFlowDiff extends IMfElementDiffBase {
    originConnectionIndex?: IBasicDiff<number>,
    destinationConnectionIndex?: IBasicDiff<number>
}

export interface IMfObjectDiff extends IMfElementDiffBase {
    size?: ISizeDiff;
    position?: IPointDiff;
}
export interface IProperty extends IMfElementDiffBase {
    name: IBasicDiff<string>,
    errorMessage: IBasicDiff<string>,
    documentation: IBasicDiff<string>,
    applyEntityAccess: IBasicDiff<boolean>,
    allowConcurrentExecution: IBasicDiff<boolean>,
    errorMicroflow: IBasicDiff<string>,
    allowedModuleRolesQualifiedNames: IBasicDiff<string[]>,
    markAsUsed: IBasicDiff<boolean>,
    returnType: IBasicDiff<string>
}
export interface IActivityDiff extends IMfObjectDiff { }

export interface ILoopedActivity extends IActivityDiff {
    iteratedListVariableName?: IBasicDiff<string>;
    loopVariableName?: IBasicDiff<string>;
    objectCollection?: IMfDiff
}

export interface IActionActivityDiff extends IActivityDiff {
    caption?: IBasicDiff<string>
}

export interface IMemberChangeDiff extends IParameterMappingDiff {
    operation?: IBasicDiff<string>;
}

export interface IMemberChange extends IParameterMapping {
    operation?: string
}

export interface IPointDiff extends IDiff {
    x: IBasicDiff<number>,
    y: IBasicDiff<number>
}

export interface ISizeDiff extends IDiff {
    height: IBasicDiff<number>,
    width: IBasicDiff<number>
}


export interface IChangeMembersActionDiff extends IActionActivityDiff {
    items?: (IMemberChangeDiff | undefined)[] | IBasicDiff<(IMemberChange | undefined)[] | undefined>;
    commit?: IBasicDiff<string>;
    refreshInClient?: IBasicDiff<boolean>;
}

export interface ICreateObjectActionDiff extends IChangeMembersActionDiff {
    entityName?: IBasicDiff<string>;
    outputVarialeName?: IBasicDiff<string>;
}

export interface IChangeObjectActionDiff extends IChangeMembersActionDiff {
    changeVariableName?: IBasicDiff<string>;
}

export interface ICastActionDiff extends IActionActivityDiff {
    outputVariableName?: IBasicDiff<string>;
}

export interface ICommitActionDiff extends IActionActivityDiff {
    commitVariableName?: IBasicDiff<string>;
    refreshInClient?: IBasicDiff<boolean>;
    withEvents?: IBasicDiff<boolean>;
}

export interface IDeleteActionDiff extends IActionActivityDiff {
    deleteVariableName?: IBasicDiff<string>;
    refreshInClient?: IBasicDiff<boolean>;
}

export interface IRollbackActionDiff extends IActionActivityDiff {
    rollbackVariableName?: IBasicDiff<string>;
    refreshInClient?: IBasicDiff<boolean>;
}

export interface IRangeDiff extends IDiff {
    typeName?: string
}

export interface IConstantRangeDiff extends IRangeDiff {
    singleObject?: IBasicDiff<boolean>;
}

export interface ICustomRangeDiff extends IRangeDiff {
    limitExpression?: IBasicDiff<IMicroflowExpression>;
    offsetExpression?: IBasicDiff<IMicroflowExpression>;
}


export interface ISortItemDiff extends IDiff {
    attributePath?: IBasicDiff<string>;
    sortOrder?: IBasicDiff<string>;
}

export interface IRetrieveSourceDiff extends IDiff {
    typeName: string;
}

export interface IAssociationRetrieveSourceDiff extends IRetrieveSourceDiff {
    associationName?: IBasicDiff<string>;
}

export interface IDatabaseRetrieveSourceDiff extends IRetrieveSourceDiff {
    entityName?: IBasicDiff<string>;
    range?: IBasicDiff<single.IRange> | IRangeDiff;
    xPathConstraint?: IBasicDiff<string>;
    sortItemList?: IAttributeDiff[] | IBasicDiff<(IAttribute | undefined)[] | undefined>;
}

export interface IRetrieveActionDiff extends IActionActivityDiff {
    outputVariableName?: IBasicDiff<string>;
    retrieveSource?: IRetrieveSourceDiff | IBasicDiff<single.IRetrieveSource>;
    returnType?: IBasicDiff<string>;
}

export interface IAggregateListActionDiff extends IActionActivityDiff {
    aggregateFunction?: IBasicDiff<string>;
    outputVariableName?: IBasicDiff<string>;
    inputListVariableName?: IBasicDiff<string>;
    attributeName?: IBasicDiff<string>;
}

export interface IChangeListActionDiff extends IActionActivityDiff {
    changeVariableName?: IBasicDiff<string>;
    value?: IBasicDiff<IMicroflowExpression>;
    type?: IBasicDiff<string>;
}

export interface ICreateListActionDiff extends IActionActivityDiff {
    outputVariableName?: IBasicDiff<string>;
    entityName?: IBasicDiff<string>;
}

export interface IListOperationDiff extends IDiff {
    typeName: string,
}

export interface IBinaryListOperationDiff extends IListOperationDiff {
    type?: IBasicDiff<string>;
    secondListOrObjectVariableName?: IBasicDiff<string>;
}

export interface IInspectAttributeDiff extends IListOperationDiff {
    type?: IBasicDiff<string>;
    expression?: IBasicDiff<IMicroflowExpression>;
    attributeName?: IBasicDiff<string>;
}

export interface ISortDiff extends IListOperationDiff {
    sortItemList?: IAttributeDiff[] | IBasicDiff<(IAttribute | undefined)[] | undefined>;
}

export interface IHeadOrTailDiff extends IListOperationDiff {
    type: IBasicDiff<string>
}

export interface IListOperationActionDiff extends IActionActivityDiff {
    listVariableName?: IBasicDiff<string>;
    outputVariableName?: IBasicDiff<string>;
    operation?: IListOperationDiff | IBasicDiff<single.IListOperation>;
}

export interface IChangeVariableActionDiff extends IActionActivityDiff {
    changeVariableName?: IBasicDiff<string>;
    value?: IBasicDiff<string>;
}

export interface ICreateVariableActionDiff extends IActionActivityDiff {
    initialValue?: IBasicDiff<string>;
    variableDateType?: IBasicDiff<string>;
    variableName?: IBasicDiff<string>;
}

export interface IJavaActionCallActionDiff extends IActionActivityDiff {
    outputVariableName?: IBasicDiff<string>;
    javaActionName?: IBasicDiff<string>;
    returnType?: IBasicDiff<string>;
    parameters?: (IParameterMappingDiff | undefined)[] | IBasicDiff<IParameterMapping[] | undefined>;
}

export interface IParameterMapping extends IAttribute {
    type?: string;
}

export type IParameterMappingDiff = IBasicDiff<IParameterMapping>

export interface IMicroflowCallActionDiff extends IActionActivityDiff {
    microflowCallName?: IBasicDiff<string>;
    outputVariableName?: IBasicDiff<string>;
    useReturnVariable?: IBasicDiff<boolean>;
    returnType?: IBasicDiff<string>
    parameters?: (IParameterMappingDiff | undefined)[] | IBasicDiff<IParameterMapping[]>;
}

export interface ICloseActionDiff extends IActionActivityDiff { }

export interface IDownloadFileActionDiff extends IActionActivityDiff {
    fileDocumentVariableName?: IBasicDiff<string>;
    showFileInBrowser?: IBasicDiff<boolean>;
}

export interface IShowHomePageActionDiff extends IActionActivityDiff { }

export interface IShowMessageActionDiff extends IActionActivityDiff {
    blocking?: IBasicDiff<boolean>;
    type?: IBasicDiff<string>;
    template?: ITemplateDiff;
}

export interface IShowPageActionDiff extends IActionActivityDiff {
    passedObjectVariableName?: IBasicDiff<string>;
    pageName?: IBasicDiff<string>;
    pageTitle?: IBasicDiff<string>;
    overridePageTitle?: IBasicDiff<boolean>;
}

export interface IValidationFeedbackActionDiff extends IActionActivityDiff {
    objectVariableName?: IBasicDiff<string>;
    feedBackTemplate?: IBasicDiff<string>;
    memberName?: IBasicDiff<string>;
}

export interface IAnnotationDiff extends IMfElementDiffBase {
    caption?: IBasicDiff<string>;
}

export interface IMicroflowParameterObjectDiff extends IMfElementDiffBase {
    name?: IBasicDiff<string>;
    type?: IBasicDiff<string>;
    documentation?: IBasicDiff<string>;
}

export interface ILogMessageActionDiff extends IMfObjectDiff {
    level?: IBasicDiff<string>;
    nodeName?: IBasicDiff<string>;
    messageTemplate?: ITemplateDiff;
    includeLatestStackTrace?: IBasicDiff<boolean>;
}

export type IAttributeDiff = IBasicDiff<IAttribute>

export interface IAttribute {
    id: string
    name: string
    value?: string
}

export interface IGenerateDocumentActionDiff extends IMfObjectDiff {
    fileVariableName?: IBasicDiff<string>
    documentType?: IBasicDiff<string>
    documentTemplateName?: IBasicDiff<string>
    marginBottomInInch?: IBasicDiff<string>
    marginLeftInInch?: IBasicDiff<string>
    marginRightInInch?: IBasicDiff<string>
    marginTopInInch?: IBasicDiff<string>
    overrideBottomMargin?: IBasicDiff<boolean>
    overrideLeftMargin?: IBasicDiff<boolean>
    overrideRightMargin?: IBasicDiff<boolean>
    overrideTopMargin?: IBasicDiff<boolean>
    parameterMappings?: (IAttributeDiff | undefined)[] | IBasicDiff<IAttribute[]>
    languageType?: IBasicDiff<string>
}

export interface IImportXmlActionDiff extends IMfObjectDiff {
    xmlDocumentVariableName?: IBasicDiff<string>
    isValidationRequired?: IBasicDiff<boolean>
    resultHandling?: IResultHandlingDiff | IBasicDiff<single.IResultHandling>
}

export interface IOutputMethodDiff extends IDiff {
    typeName: string
}

export interface IFileDocumentExportDiff extends IOutputMethodDiff {
    targetDocumentVariableName?: IBasicDiff<string>
}

export interface IVariableExportDiff extends IOutputMethodDiff {
    outputVariableName?: IBasicDiff<string>
}

export interface IExportXmlActionDiff extends IMfObjectDiff {
    mappingName?: IBasicDiff<string>
    mappingArgumentVariableName?: IBasicDiff<string>
    isValidationRequired?: IBasicDiff<boolean>
    outputMethod?: IOutputMethodDiff | IBasicDiff<single.IOutputMethod>
}

export interface IStartEventDiff extends IMfObjectDiff { }

export interface IEndEventDiff extends IMfObjectDiff {
    returnValue?: IBasicDiff<string>;
    returnType?: IBasicDiff<string>;
}

export interface IBreakEventDiff extends IMfObjectDiff { }

export interface IContinueEventDiff extends IMfObjectDiff { }

export interface ISplitConditionDiff extends IDiff {
    typeName: string;
}

export interface IRuleDiff extends ISplitConditionDiff {
    ruleName?: IBasicDiff<string>;
    parameters?: (IParameterMappingDiff | undefined)[] | IBasicDiff<IParameterMapping[] | undefined>;
}

export interface IExpressionSplitConditionDiff extends ISplitConditionDiff {
    expression?: IBasicDiff<string>;
}

export interface IExclusiveSplitDiff extends IMfObjectDiff {
    caption?: IBasicDiff<string>;
    splitCondition?: ISplitConditionDiff | IBasicDiff<single.ISplitCondition | undefined>;
}

export interface IInheritanceSplitDiff extends IMfObjectDiff {
    caption?: IBasicDiff<string>;
    splitVariableName?: IBasicDiff<string>;
}

export interface IExclusiveMergeDiff extends IMfObjectDiff { }

export interface ISequenceFlowDiff extends IFlowDiff {
    caseValue?: IBasicDiff<string>
}

export interface ITemplateDiff extends IDiff {
    text?: IBasicDiff<string>
    parameters?: IAttributeDiff[]
}

export interface IHttpConfigurationDiff extends IDiff {
    overrideLocation?: IBasicDiff<boolean>
    customLocation?: IBasicDiff<string>
    customLocationTemplate?: ITemplateDiff
    useAuthentication?: IBasicDiff<boolean>
    httpAuthenticationUserName?: IBasicDiff<string>
    authenticationPassword?: IBasicDiff<string>
    headerEntries?: IAttributeDiff[]
    httpMethod?: IBasicDiff<string>
}

export interface IRequestHandlingDiff extends IDiff {
    typeName: string
}

export interface ISimpleRequestHandlingDiff extends IRequestHandlingDiff {
    nullValueOption?: IBasicDiff<string>
    paramterMappings?: (IAttributeDiff | undefined)[]
}

export interface IBinaryRequestHandlingDiff extends IRequestHandlingDiff {
    expression?: IBasicDiff<string>
}

export interface ICustomRequestHandlingDiff extends IRequestHandlingDiff {
    template?: ITemplateDiff
}

export interface IMappingRequestHandlingDiff extends IRequestHandlingDiff {
    mappingName?: IBasicDiff<string>
    parameterName?: IBasicDiff<string>
}

export interface IAdvancedRequestHandlingDiff extends IRequestHandlingDiff {
    nullValueOption?: IBasicDiff<string>
    parameterMappings?: (IAttributeDiff | undefined)[]
}

export interface IResultHandlingDiff extends IDiff {
    typeName: string;
    outputVariableName?: IBasicDiff<string>
    storeInVariable?: IBasicDiff<boolean>
    variableDataType?: IBasicDiff<string>
    importMappingCall?: IImportMappingCallDiff
    type: string
}

export interface IWebServiceCallActionDiff extends IMfObjectDiff {
    httpConfiguration?: IHttpConfigurationDiff
    isValidationRequired?: IBasicDiff<boolean>
    operationName?: IBasicDiff<string>
    requestBodyHandling?: IRequestHandlingDiff | IBasicDiff<single.IRequestHandling>
    requestHeaderHandling?: IRequestHandlingDiff | IBasicDiff<single.IRequestHandling>
    resultHandling?: IResultHandlingDiff | IBasicDiff<single.IResultHandling>
    sendNullValueChoice?: IBasicDiff<string>
    timeOut?: IBasicDiff<number>
    useRequestTimeOut?: IBasicDiff<boolean>
}

export interface IImportMappingCallDiff extends IDiff {
    mappingArgumentVariableName?: IBasicDiff<string>
    mappingName?: IBasicDiff<string>
    range?: IRangeDiff | IBasicDiff<single.IRange>;
}

export interface IRestCallActionDiff extends IMfObjectDiff {
    timeOut?: IBasicDiff<number>,
    useRequestTimeOut?: IBasicDiff<boolean>,
    httpConfiguration?: IHttpConfigurationDiff
    requestHandling?: IRequestHandlingDiff | IBasicDiff<single.IRequestHandling>
    requestHandlingType?: IBasicDiff<string>
    resultHandling?: IResultHandlingDiff | IBasicDiff<single.IResultHandling>
}