export class DateString {
    private _date: Date;
    constructor(inputString: string) {
        this._date = new Date(inputString);
    }
    toString() {
        return `${this._date.getFullYear()}/${this._date.getMonth() + 1}/${this._date.getDate()}`
    }
}

export class LimitedString {
    constructor(private _string: string, private _limitCharNum: number) { }
    toString() {
        if (this._string.length > this._limitCharNum) {
            return this._string.slice(0, this._limitCharNum - 3) + '...'
        }
        return this._string;
    }
}

export class StandardString {
    static toStandardString(inputString: string): string {
        let outputString = "";
        inputString.split(" ").forEach(subString => outputString += subString);
        return outputString.toLowerCase();
    }
    static compareTwoStrings(firstString: string, secondString: string): boolean {
        return StandardString.toStandardString(firstString) === StandardString.toStandardString(secondString);
    }
}