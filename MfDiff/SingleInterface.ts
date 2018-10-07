
type IMicroflowExpression = string;

export class ElementType {
    constructor(public name: string) { }
    static IBasicDiff = new ElementType("IBasicDiff")
    static Undefined = new ElementType("Undefined")
    static CastAction = new ElementType("CastAction")
    static ChangeObjectAction = new ElementType("ChangeObjectAction")
    static CommitAction = new ElementType("CommitAction")
    static CreateObjectAction = new ElementType("CreateObjectAction")
    static DeleteAction = new ElementType("DeleteAction")
    static RetrieveAction = new ElementType("RetrieveAction")
    static RollbackAction = new ElementType("RollbackAction")
    static AggregateListAction = new ElementType("AggregateListAction")
    static ChangeListAction = new ElementType("ChangeListAction")
    static CreateListAction = new ElementType("CreateListAction")
    static ListOperationAction = new ElementType("ListOperationAction")
    static JavaActionCallAction = new ElementType("JavaActionCallAction")
    static MicroflowCallAction = new ElementType("MicroflowCallAction")
    static ChangeVariableAction = new ElementType("ChangeVariableAction")
    static CreateVariableAction = new ElementType("CreateVariableAction")
    static CloseAction = new ElementType("CloseAction")
    static DownloadFileAction = new ElementType("DownloadFileAction")
    static ShowHomePageAction = new ElementType("ShowHomePageAction")
    static ShowPageAction = new ElementType("ShowPageAction")
    static ShowMessageAction = new ElementType("ShowMessageAction")
    static ValidationFeedbackAction = new ElementType("ValidationFeedbackAction")
    static RestCallAction = new ElementType("RestCallAction")
    static WebServiceCallAction = new ElementType("WebServiceCallAction")
    static ExportXmlAction = new ElementType("ExportXmlAction")
    static ImportXmlAction = new ElementType("ImportXmlAction")
    static LogMessageAction = new ElementType("LogMessageAction")
    static GenerateDocumentAction = new ElementType("GenerateDocumentAction")
    static StartEvent = new ElementType("StartEvent")
    static EndEvent = new ElementType("EndEvent")
    static ContinueEvent = new ElementType("ContinueEvent")
    static BreakEvent = new ElementType("BreakEvent")
    static ErrorEvent = new ElementType("ErrorEvent")
    static LoopedActivity = new ElementType("LoopedActivity")
    static InheritanceSplit = new ElementType("InheritanceSplit")
    static ExclusiveMerge = new ElementType("ExclusiveMerge")
    static ExclusiveSplit = new ElementType("ExclusiveSplit")
    static Annotation = new ElementType("Annotation")
    static MicroflowParameterObject = new ElementType("MicroflowParameterObject")
    static SequenceFlow = new ElementType("SequenceFlow")
    static AnnotationFlow = new ElementType("AnnotationFlow")
    static Property = new ElementType("Property")
}

export interface ISingle {
    isSingle: boolean
}

export interface ISize extends ISingle {
    height: number,
    width: number
}

export interface IPoint extends ISingle {
    x: number,
    y: number
}

export interface IElement {
    id?: string;
}

export interface IDeleteElement extends IElement {
    parentElement: IElement
}

export interface INewElement extends IElement {
    parentElement: IElement
}

export interface IEditElement extends IElement, ISingle {
    parentElement?: IMfElementBase
}

export interface IMfElementBase extends IEditElement {
    typeName: ElementType;
}

export interface IFlow extends IMfElementBase {
    originConnectionIndex?: number,
    destinationConnectionIndex?: number
}
export interface IProperty extends IMfElementBase {
    name: string,
    errorMessage: string,
    documentation: string,
    allowConcurrentExecution: boolean,
    errorMicroflow: string,
    returnType: string,
    applyEntityAccess: boolean,
    allowedModuleRolesQualifiedNames: string[],
    markAsUsed: boolean,
}


export interface IMfObject extends IMfElementBase {
    size?: ISize;
    position?: IPoint;
}

export interface IActivity extends IMfObject { }

export interface ILoopedActivity extends IActivity {
    iteratedListVariableName?: string;
    loopVariableName?: string;
    objectCollection?: IElement[]
}

export interface IActionActivity extends IActivity {
    caption?: string
}

export interface IMemberChange extends IParameterMapping {
    operation?: string;
}

export interface IMemberChange extends IParameterMapping {
    operation?: string
}

export interface IPoint {
    x: number,
    y: number
}

export interface ISize {
    height: number,
    width: number
}


export interface IChangeMembersAction extends IActionActivity {
    items?: IMemberChange[];
    commit?: string;
    refreshInClient?: boolean;
}

export interface ICreateObjectAction extends IChangeMembersAction {
    entityName?: string;
    outputVariableName?: string;
}

export interface IChangeObjectAction extends IChangeMembersAction {
    changeVariableName?: string;
}

export interface ICastAction extends IActionActivity {
    outputVariableName?: string;
}

export interface ICommitAction extends IActionActivity {
    commitVariableName?: string;
    refreshInClient?: boolean;
    withEvents?: boolean;
}

export interface IDeleteAction extends IActionActivity {
    deleteVariableName?: string;
    refreshInClient?: boolean;
}

export interface IRollbackAction extends IActionActivity {
    rollbackVariableName?: string;
    refreshInClient?: boolean;
}

export interface ISortItem {
    attributePath?: string;
    sortOrder?: string;
}

export interface IRange {
    typeName: string
}

export interface IConstantRange extends IRange {
    singleObject: boolean
}

export interface ICustomRange extends IRange {
    limitExpression: string;
    offsetExpression: string;
}


export interface IRetrieveSource {
    typeName: string
}

export interface IRetrieveSource {
    typeName: string;
}

export interface IAssociationRetrieveSource extends IRetrieveSource {
    associationName?: string;
}

export interface IDatabaseRetrieveSource extends IRetrieveSource {
    entityName?: string;
    range: IRange
    xPathConstraint?: string;
    sortItemList?: IAttribute[];
}

export interface IRetrieveAction extends IActionActivity {
    outputVariableName?: string;
    retrieveSource: IRetrieveSource;
    returnType?: string;
}

export interface IAggregateListAction extends IActionActivity {
    aggregateFunction?: string;
    outputVariableName?: string;
    inputListVariableName?: string;
    attributeName?: string;
}

export interface IChangeListAction extends IActionActivity {
    changeVariableName?: string;
    value?: IMicroflowExpression;
    type?: string;
}

export interface ICreateListAction extends IActionActivity {
    outputVariableName?: string;
    entityName?: string;
}

export interface IListOperation {
    typeName: string,
}

export interface ISort extends IListOperation {
    sortItemList?: IAttribute[];
}

export interface IHeadOrTail extends IListOperation {
    type: string
}

export interface IListOperation {
    typeName: string;
}

export interface IBinaryListOperation extends IListOperation {
    type: string;
    secondListOrObjectVariableName: string;
}

export interface IInspectAttribute extends IListOperation {
    type?: string;
    expression: IMicroflowExpression;
    attributeName: string;
}

export interface IHeadOrTail extends IListOperation {
    type: string
}

export interface IListOperationAction extends IActionActivity {
    listVariableName?: string;
    outputVariableName?: string;
    operation: IListOperation;
}

export interface IChangeVariableAction extends IActionActivity {
    changeVariableName?: string;
    value?: string;
}

export interface ICreateVariableAction extends IActionActivity {
    initialValue?: string;
    variableDataType?: string;
    variableName?: string;
}

export interface IJavaActionCallAction extends IActionActivity {
    outputVariableName?: string;
    javaActionName?: string;
    returnType?: string;
    parameters?: IParameterMapping[];
}

export interface IParameterMapping extends IAttribute {
    type?: string,
}

export interface IMicroflowCallAction extends IActionActivity {
    microflowCallName?: string;
    outputVariableName?: string;
    useReturnVariable?: boolean;
    returnType?: string
    parameters?: IParameterMapping[] | undefined;
}

export interface ICloseAction extends IActionActivity { }

export interface IDownloadFileAction extends IActionActivity {
    fileDocumentVariableName?: string;
    showFileInBrowser?: boolean;
}

export interface IShowHomePageAction extends IActionActivity { }

export interface IShowMessageAction extends IActionActivity {
    blocking?: boolean;
    type?: string;
    template: ITemplate;
}

export interface IShowPageAction extends IActionActivity {
    passedObjectVariableName?: string;
    pageName?: string;
    pageTitle?: string;
    overridePageTitle?: boolean;
}

export interface IValidationFeedbackAction extends IActionActivity {
    objectVariableName?: string;
    feedbackTemplate: ITemplate;
    memberName?: string;
}

export interface IAnnotation extends IMfElementBase {
    caption?: string;
}

export interface IMicroflowParameterObject extends IMfElementBase {
    name?: string;
    type?: string;
    documentation?: string;
}

export interface ILogMessageAction extends IMfObject {
    level?: string;
    nodeName?: string;
    messageTemplate: ITemplate;
    includeLatestStackTrace?: boolean;
}

export interface IAttribute {
    id: string
    name: string
    value?: string
}

export interface IGenerateDocumentAction extends IMfObject {
    fileVariableName?: string
    documentType?: string
    documentTemplateName?: string
    marginBottomInInch?: string
    marginLeftInInch?: string
    marginRightInInch?: string
    marginTopInInch?: string
    overrideBottomMargin?: boolean
    overrideLeftMargin?: boolean
    overrideRightMargin?: boolean
    overrideTopMargin?: boolean
    parameterMappings?: IAttribute[]
    languageType?: string
}

export interface IImportXmlAction extends IMfObject {
    xmlDocumentVariableName?: string
    isValidationRequired?: boolean
    resultHandling: IResultHandling
}

export interface IOutputMethod {
    typeName: string
}

export interface IFileDocumentExport extends IOutputMethod {
    targetDocumentVariableName?: string
}

export interface IVariableExport extends IOutputMethod {
    outputVariableName?: string
}

export interface IOutputMethod {
    typeName: string
}

export interface IFileDocumentExport extends IOutputMethod {
    targetDocumentVariableName?: string
}

export interface IVariableExport extends IOutputMethod {
    outputVariableName?: string
}

export interface IExportXmlAction extends IMfObject {
    mappingName?: string
    mappingArgumentVariableName?: string
    isValidationRequired?: boolean
    outputMethod: IOutputMethod
}

export interface IStartEvent extends IMfObject { }

export interface IEndEvent extends IMfObject {
    returnValue?: string;
    returnType?: string;
}

export interface IBreakEvent extends IMfObject { }

export interface IContinueEvent extends IMfObject { }

export interface ISplitCondition {
    typeName: string;
}

export interface IRule extends ISplitCondition {
    ruleName?: string;
    parameters?: IParameterMapping[]
}

export interface IExpressionSplitCondition extends ISplitCondition {
    expression: string
}

export interface IRuleSplitCondition extends ISplitCondition {
    ruleName: string,
    parameters?: IParameterMapping[]
}

export interface IExclusiveSplit extends IMfObject {
    caption?: string;
    splitCondition: ISplitCondition;
}

export interface IInheritanceSplit extends IMfObject {
    caption?: string;
    splitVariableName?: string;
}

export interface IExclusiveMerge extends IMfObject { }

export interface ISequenceFlow extends IFlow {
    caseValue?: string
}

export interface ITemplate {
    text?: string
    parameters?: IAttribute[]
}

export interface IHttpConfiguration {
    overrideLocation?: boolean
    customLocation?: string
    customLocationTemplate: ITemplate
    useAuthentication?: boolean
    httpAuthenticationUserName?: string
    authenticationPassword?: string
    headerEntries?: IAttribute[]
    httpMethod?: string
}

export interface IRequestHandling {
    typeName: string
}

export interface ISimpleRequestHandling extends IRequestHandling {
    nullValueOption: string
    paramterMappings: IParameterMapping[]
}

export interface IBinaryRequestHandling extends IRequestHandling {
    expression: string
}

export interface ITemplate {
    text?: string
    parameters?: IAttribute[]
}

export interface ICustomRequestHandling extends IRequestHandling {
    template: ITemplate
}

export interface IMappingRequestHandling extends IRequestHandling {
    mappingName: string
    parameterName: string
    parameterType?: string
}

export interface IAdvancedRequestHandling extends IRequestHandling {
    nullValueOption: string
    parameterMappings: IAttribute[]
}

export interface IResultHandling {
    typeName: string;
    outputVariableName?: string
    storeInVariable?: boolean
    variableDataType?: string
    importMappingCall?: IImportMappingCall
}


export interface IImportMappingCall {
    mappingArgumentVariableName?: string
    mappingName?: string
    range: IRange;
}

export interface IWebServiceCallAction extends IMfObject {
    httpConfiguration: IHttpConfiguration
    isValidationRequired?: boolean
    operationName?: string
    requestBodyHandling: IRequestHandling
    requestHeaderHandling: IRequestHandling
    resultHandling: IResultHandling
    sendNullValueChoice?: string
    timeOut?: number
    useRequestTimeOut?: boolean
}


export interface IRestCallAction extends IMfObject {
    timeout?: number,
    useRequestTimeOut?: boolean,
    httpConfiguration: IHttpConfiguration
    resultHandlingType: string
    requestHandling: IRequestHandling
    requestHandlingType?: string
    resultHandling: IResultHandling
}
export interface IMfCpnBasicInfo {
    name: string,
    type: string
}