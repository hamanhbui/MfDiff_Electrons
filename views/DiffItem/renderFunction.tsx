/// <reference path="../../typings/index.d.ts" /> 
import * as React from "react";
import * as $ from "./"
import Diff = require("../../MfDiff/DiffInterface");
import { DisplayArrayItemOption } from "./BasicItem"

export function renderDiffContainer(name: string, children: JSX.Element) {
    let isUndefined = true;
    let listOfComponent: JSX.Element[] = [];
    listOfComponent = listOfComponent.concat(children.props.children);

    listOfComponent.forEach(component => {
        if (component) {
            isUndefined = false;
        }
    });
    if (!isUndefined) {
        return <$.DiffContainer name={name}>
            {children}
        </$.DiffContainer>
    }
}

export function renderEnumItem(name: string, diff: Diff.IBasicDiff<string> | undefined, showCommonInfo: boolean, values: string[]) {
    if (!diff) return;
    if (diff.isDiff) {
        return <$.PairEnumItem name={name} values={values} diff={diff} />
    }
    if (showCommonInfo) {
        return <$.EnumItem name={name} values={values} checkedValue={diff.member1 as string} />
    }
    return;
}

export function renderPairBooleanItem(name: string, diff: Diff.IBasicDiff<boolean> | undefined, revNos: number[], showCommonInfo: boolean) {
    if (diff) {
        if (diff.isDiff) {
            return <$.PairBooleanItem name={name} diff={diff} revNos={revNos} />
        } else {
            if (!showCommonInfo) return;
            return <$.SingleBooleanItem name={name} value={diff.member1 as boolean} />
        }
    }
}

export function renderPairTextAreaItem(name: string, diff: Diff.IBasicDiff<string> | undefined, showCommonInfo: boolean) {
    if (!diff) return;
    if (diff.isDiff) {
        return <$.PairTextAreaItem name={name} diff={diff} />
    } else {
        if (!showCommonInfo) return;
        return <$.SingleTextAreaItem name={name} value={diff.member1 as string} />
    }
}

export function renderPairItem(name: string | undefined, diff: Diff.IBasicDiff<string | number> | undefined, revNos: number[], showCommonInfo: boolean) {
    if (diff) {
        if (diff.isDiff) {
            return <$.PairItem name={name} diff={diff} revNos={revNos} />
        } else {
            if (!showCommonInfo) return;
            return <$.SingleItem name={name} value={diff.member1 as string} />
        }
    }
}
export function renderPairCheckBox(name: string, title: string, diff: Diff.IBasicDiff<string | number> | undefined, isChecked: Diff.IBasicDiff<boolean> | undefined, revNos: number[], showCommonInfo: boolean) {
    if (diff && isChecked) {
        if (diff.isDiff || isChecked.isDiff) {
            return <$.PairCheckBox name={name} diff={diff} revNos={revNos} tittle={title} isChecked={isChecked} />
        } else {
            if (!showCommonInfo) return;
            return <$.SingleCheckBox name={name} tittle={title} value={diff.member1 as string} isChecked={isChecked.member1 as boolean} />
        }
    }
}

export function renderVerticalEnumItem(name: string, values: string[], showCommonInfo, diff: Diff.IBasicDiff<string> | undefined) {
    if (diff) {
        if (diff.isDiff) {
            return <$.PairContainer>
                <$.VerticalEnumItem name={name} values={values.map(value => value.split("_")[0])}
                    optionalValues={values.map(value => value.includes("_"))}
                    checkedValue={(diff.member1 as string)} />
                <$.VerticalEnumItem name={name} values={values.map(value => value.split("_")[0])}
                    optionalValues={values.map(value => value.includes("_"))}
                    checkedValue={(diff.member2 as string)} />
            </$.PairContainer>
        }
        if (showCommonInfo) {
            return <$.VerticalEnumItem name={name} values={values.map(value => value.split("_")[0])}
                optionalValues={values.map(value => value.includes("_"))}
                checkedValue={(diff.member1 as string)} />
        }
    }
}

export function renderArrayItem(name: string, diff: Array<Diff.IBasicDiff<any>> | Diff.IBasicDiff<Array<any>> | undefined, revNos: number[], showCommonInfo: boolean, itemOptions: DisplayArrayItemOption) {
    if (!diff) return;
    if (diff instanceof Array) {
        return <$.ArrayItem name={name} diff={diff} revNos={revNos} showCommonInfo={showCommonInfo} displayOptions={itemOptions} />
    }
    return <$.PairContainer>
        <$.ArrayItem name={name} diff={diff.member1 as Array<any>} revNos={revNos} showCommonInfo={showCommonInfo} displayOptions={itemOptions} />
        <$.ArrayItem name={name} diff={diff.member2 as Array<any>} revNos={revNos} showCommonInfo={showCommonInfo} displayOptions={itemOptions} />
    </$.PairContainer>
}