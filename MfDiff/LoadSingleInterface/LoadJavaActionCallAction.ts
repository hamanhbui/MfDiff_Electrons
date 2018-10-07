import { microflows as mfs, javaactions } from "mendixmodelsdk"
import single = require("../SingleInterface")

export function convertJavaParameterToParameterMapping(object: mfs.JavaActionParameterMapping): single.IParameterMapping {
    return {
        id: object.parameter.id,
        name: object.parameterQualifiedName.split(".")[2],
        value: getJavaActionParameterValue(object),
        type: getJavaActionParameterType(object)
    }
}

export function getJavaActionParameterValue(parameter: mfs.JavaActionParameterMapping): string | undefined {
    try {
        if (!parameter) return undefined
        if (parameter.value instanceof mfs.BasicJavaActionParameterValue) {
            return parameter.value.argument
        } else if (parameter.value instanceof mfs.EntityTypeJavaActionParameterValue) {
            return parameter.value.entityQualifiedName
        } else {
            return (parameter.value as mfs.MicroflowJavaActionParameterValue).microflowQualifiedName
        }
    } catch (e) {
        console.log(e);
    }
}

export function getJavaActionParameterType(parameter: mfs.JavaActionParameterMapping): string | undefined {
    try {
        if (!parameter.parameter) return undefined;
        let parameterType = parameter.parameter.parameterType;
        if (parameterType instanceof javaactions.BasicParameterType) {
            let type = parameterType.type;
            if (type instanceof javaactions.StringType) {
                return "String"
            } else if (type instanceof javaactions.BooleanType) {
                return "Boolean"
            } else if (type instanceof javaactions.IntegerType) {
                return "Integer/Long"
            } else if (type instanceof javaactions.DateTimeType) {
                return "Date and time"
            } else if (type instanceof javaactions.DecimalType) {
                return "Decimal"
            } else if (type instanceof javaactions.FloatType) {
                return "Float"
            } else if (type instanceof javaactions.ConcreteEntityType) {
                return type.entityQualifiedName
            } else if (type instanceof javaactions.EnumerationType) {
                return "Enumeration " + type.enumerationQualifiedName
            } else if (type instanceof javaactions.ParameterizedEntityType) {
                return "Type Parameter " + type.typeParameter.qualifiedName
            } else {
                let listType = type as javaactions.ListType;
                if (listType.parameter instanceof javaactions.ConcreteEntityType) {
                    return "List of " + listType.parameter.entityQualifiedName
                } else {
                    return "List of type parameter " + (listType.parameter as javaactions.ParameterizedEntityType).typeParameter.name
                }
            }
        } else if (parameterType instanceof javaactions.EntityTypeParameterType) {
            if (parameterType.typeParameter) {
                return "Entity of type parameter " + parameterType.typeParameter.name
            } else {
                return "Entity"
            }
        } else {
            return "Microflow"
        }
    } catch (e) {
        console.log(e);
    }
}

export function getJavaActionReturnType(javaAction: mfs.JavaActionCallAction) {
    try {
        if (javaAction.javaAction.javaReturnType instanceof javaactions.ParameterizedEntityType) {
            for (let parameter of javaAction.parameterMappings) {
                if (parameter.parameter && parameter.parameter.parameterType instanceof javaactions.BasicParameterType) {
                    if ((parameter.parameter.parameterType.type as javaactions.ParameterizedEntityType).typeParameter.name === javaAction.javaAction.javaReturnType.typeParameter.name) {
                        // return getJavaActionParameterValue(parameter) + "";
                        return "TODO"
                    }
                }
            }
        }
        if (javaAction.javaAction.javaReturnType instanceof javaactions.ListType) {
            if (javaAction.javaAction.javaReturnType.parameter instanceof javaactions.ParameterizedEntityType) {
                for (let parameter of javaAction.parameterMappings) {
                    if (parameter.parameter && parameter.parameter.parameterType instanceof javaactions.BasicParameterType) {
                        if ((parameter.parameter.parameterType.type as javaactions.ParameterizedEntityType).typeParameter.name === javaAction.javaAction.javaReturnType.parameter.typeParameter.name) {
                            // return "List of " + getJavaActionParameterValue(parameter);
                            return "TODO"
                        }
                    }
                }
            }
            return "List of " + (javaAction.javaAction.javaReturnType.parameter as javaactions.ConcreteEntityType).entityQualifiedName.split(".")[1];
        }
        else if (javaAction.javaAction.javaReturnType instanceof javaactions.IntegerType) {
            return "Integer/Long";
        }
        else if (javaAction.javaAction.javaReturnType instanceof javaactions.DateTimeType) {
            return "Date and time";
        }
        else if (javaAction.javaAction.javaReturnType instanceof javaactions.EnumerationType) {
            return "Enumeration " + javaAction.javaAction.javaReturnType.enumerationQualifiedName.split(".")[1];
        }
        else if (javaAction.javaAction.javaReturnType instanceof javaactions.ConcreteEntityType) {
            return javaAction.javaAction.javaReturnType.entityQualifiedName.split(".")[1];
        }
        else {
            let output = javaAction.javaAction.javaReturnType.structureTypeName.split("$")[1];
            return output.slice(0, output.length - 4)
        }
    } catch (e) {
        console.log(e);
    }

}

export function loadJavaActionCallAction(object: mfs.JavaActionCallAction): single.IJavaActionCallAction {
    return {
        isSingle: true,
        typeName: single.ElementType.JavaActionCallAction,
        outputVariableName: object.outputVariableName,
        javaActionName: object.javaActionQualifiedName,
        parameters: object.parameterMappings.filter(element => element.parameter !== null).map(element => convertJavaParameterToParameterMapping(element)),
    }
}