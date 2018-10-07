import { ISize, IPosition, IColor } from "./baseInterfaces";
export interface IGeometry extends ISize, IPosition, IColor { }
import { microflows } from "./../../../node_modules/mendixmodelsdk/dist/gen/microflows";
import { TypeEnum } from "./TypeEnum";
enum DataType {
}
export enum CommitEnum {
    Yes,
    YesWithoutEvents,
    No
}
export class IObjectDict {
    constructor() { }
    [id: string]: {
        caption?: string,
        returnType?: string,
        returnName?: string
    }
}
export enum ErrorHandlerCustomType {
    WithRollBack,
    WithoutRollBack
}
export enum AssociationType {
    Reference,
    ReferenceSet,
}
export enum AssociationOwner {
    Default,
    Both,
}
export class ShowMessageType {
    static Information: ShowMessageType;
    static Warning: ShowMessageType;
    static Error: ShowMessageType;
}
export interface IMicroflowBase {
    flows: IFlow[];
    objectCollection: IMicroflowObjectCollection;
    returnType: DataType;
}
export interface Microflow extends IMicroflowBase {
    paramters: IMicroflowParameter[];
    allowedModuleRoles: IModuleRole[];
    concurrencyErrorMessage: string;
    concurrencyErrorMicroflow: Microflow;
}
export interface IRule extends IMicroflowBase {
    paramters: IRuleParameter[];
}
export interface IRuleParameter { };
export interface IMicroflowObjectCollection {
    objects: IMicroflowObject[]
}
//paramter
export interface IMicroflowParameter extends IMicroflowObject {
    typeName: string;
    Name: string;
}
//microflowobject
//Event
export interface IMicroflowObject {
    id?: string,
    geometry: IGeometry,
    type?: TypeEnum,
    errorHandlingType?: string;
}
export interface IStartEvent extends IMicroflowObject {
}
export interface IEndEvent extends IMicroflowObject {
    returnValue?: IMicroflowExpression;
    returnType?: string;
}
export interface IErrorEvent extends IMicroflowObject {
}
export interface IBreakEvent extends IMicroflowObject {
}
export interface IContinueEvent extends IMicroflowObject {
}
//Split 
export interface IExclusiveMerge extends IMicroflowObject { }
export interface IInheritanceSplit extends IMicroflowObject {
    documentation: string;
}
export interface IExclusiveSplit extends IMicroflowObject {
    documentation: string;
}
export interface IAnnotation extends IMicroflowObject {
    documentation: string;
}
//working with object in ImicroflowObject
export interface IMicroflowAction extends IMicroflowObject {
    caption?: string,
    backgroundColor?: string
}
export interface ICastAction extends IMicroflowAction {
    value: string;
    returnType: string | undefined;
}
export interface IDeleteAction extends IMicroflowAction {
    refreshInClient: boolean;
}
export interface ICommitAction extends IMicroflowAction {
    withEvents: boolean;
    refreshInClient: boolean;
}
export interface IRollbackAction extends IMicroflowAction {
    refreshInClient: boolean;
}
export interface IRetrieveAction extends IMicroflowAction {
    returnName: IMicroflowExpression;
    returnType: string;
}
export interface IMicroflowCallAction extends IMicroflowAction {
    returnName?: IMicroflowExpression;
    returnType?: string;
}
interface IChangeMemberAction extends IMicroflowAction {
    commit: CommitEnum;
    refreshInClient: boolean;
    geometry: IGeometry;
}
export interface ICreateObjectAction extends IChangeMemberAction {
    returnName?: IMicroflowExpression;
    returnType?: string;
}
export interface IChangeObjectAction extends IChangeMemberAction {
}
export interface IDownloadFileAction extends IMicroflowAction {
}
export interface IValidationFeedbackAction extends IMicroflowAction {
}
export interface IShowMessageAction extends IMicroflowAction {
    messagetype: ShowMessageType,
}
export interface IShowHomePageAction extends IMicroflowAction {
}
export interface IShowPageAction extends IMicroflowAction {
}
export interface IClosePageAction extends IMicroflowAction { }
export interface IJavaAction extends IMicroflowAction {
    icon?: string | undefined,
    returnType: string | undefined;
    returnValue: IMicroflowExpression;
}
export interface IGenerateDocumentAction extends IMicroflowAction { }
type IMicroflowExpression = string;
//variables
export interface IChangeVariableAction extends IMicroflowAction {
}
export interface ICreateVariableAction extends IMicroflowAction {
    initialValue: IMicroflowExpression;
    variableName: string;
}
export interface IChangeListAction extends IMicroflowAction {
}
export interface IAggregateListAction extends IMicroflowAction {
    returnValue: string,
    returnType: string
}
export interface ICreateListAction extends IMicroflowAction {
    initialValue: IMicroflowExpression;
    variableName: string;
}
export interface IListOperation extends IMicroflowAction {
    returnType: string;
    variableName: string;
}
//
export interface ILogMessageAction extends IMicroflowAction {
}
export interface IRestCallAction extends IMicroflowAction {
    variableName: string,
    returnType: string
}
export interface IWebServiceCallAction extends IMicroflowAction {
    variableName: string,
    returnType: string
}
export interface IExportXmlAction extends IMicroflowAction {
    variableName: string,
    returnType: string
}
export interface IImportXmlAction extends IMicroflowAction {
    variableName: string,
    returnType: string,
}
//activitiy
export interface IActivity extends IMicroflowObject {
}
export interface IActivity {
}
export interface IActionActivity extends IActivity {
    action: IMicroflowAction;
}
export interface ILoopedActivity extends IActivity {
    objectCollection?: microflows.MicroflowObjectCollection,
    iteratedListVariableName?: string,
    loopVariableName?: string
}
//flow 
export interface IFlow {
    id: string,
    origin: IMicroflowObject;
    originConnectionIndex: number;
    originBezierVector: ISize;
    destination: IMicroflowObject;
    destinationConnectionIndex: number;
    destinationBezierVector: ISize;
    type?: TypeEnum
}
export interface IAnnotationFlow extends IFlow {
}
export interface ISequenceFlow extends IFlow {
    caseValue?: IEntity;
    isErrorHandler: boolean;
}
//??case
export interface IEntity {
}
export interface IEnumerationCase extends IEntity {
}
export interface INoCase extends IEntity { }
export interface IInheritanceCase extends IEntity {
    value: IEntity;
}
export interface IEntity {
    geometry: IGeometry,
    caption: string | undefined,
    type?: TypeEnum,
    id?: string
}
//??split
export interface ISplitCondition {
    //TODO
}

//??retrieving objects

export interface IMemberChange {
    attribute?: IAttribute;
    association?: IAssocationBase;
    value: IMicroflowExpression;
    type: IValueType;
}

export interface IChangeActionItemType {
    name: string;//"set" 
}
export interface IAssocationBase {
    name: string;
    type: AssociationType;
    owner: AssociationOwner;
}
export interface IAttribute {
    name: string;
    type: IAttributeType;
    value: IValueType;
}
interface IAttributeType {
    //TODO
}
interface IValueType {

}
export interface IModuleRole { }

export interface IReturnValue {
    expression: IMicroflowExpression;
}
export interface ILabel {
    top: number,
    left: number,
    caption: string | undefined,
    numbercap?: string | undefined
}
export interface IErrorHandler {
    top: number,
    left: number,
    type: ErrorHandlerCustomType
}
//web client activities
//log
//import/export