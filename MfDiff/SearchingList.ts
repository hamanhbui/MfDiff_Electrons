export interface compare<T> {
    (first: T, second: T): number;
}

export class SearchingList<T> {
    /**
     * store a list of T elements and check if an element or a list of elements (type T) appears in this list
     * use Quicksort to store list and use BinarySearch to search
     * param1: an array of T elements
     * param2: a function indicates greater relation between two elements (just for sorting)
     * param3: a function sepecifies if two elements are equal
     */
    private _list: T[];
    private static IS_GREATER = 1;
    private static IS_EQUAL = 0;
    private _compare: compare<T>;
    constructor(array: (T | undefined)[], compare: compare<T>) {
        this._list = [];
        array.forEach(element => {
            if (element) this._list.push(element)
        })
        this._compare = compare;
        this._sort(0, this._list.length - 1);
    }

    private _sort(start: number, end: number): void {
        if (start >= end) return;
        let i = start, j = end;
        let pivot = this._list[start];
        do {
            while (this._compare(this._list[j], pivot) === SearchingList.IS_GREATER) j--;
            while (this._compare(pivot, this._list[i]) === SearchingList.IS_GREATER) i++;
            if (i <= j) {
                let tmp = this._list[i];
                this._list[i] = this._list[j];
                this._list[j] = tmp;
                i++;
                j--;
            }
        } while (i <= j);
        this._sort(start, j);
        this._sort(i, end);
    }

    contain(element: T): boolean {
        let start = 0, end = this._list.length - 1;
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (this._compare(element, this._list[mid]) === SearchingList.IS_EQUAL) return true;
            if (this._compare(this._list[mid], element) === SearchingList.IS_GREATER) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
        return false;
    }

    getList(): T[] {
        return this._list;
    }

    missingList(listToCompare: SearchingList<T> | T[]): T[] {
        // return a list includes all elements that appears in listToCompare but not in this list
        let missingList: T[] = [];
        if (listToCompare instanceof SearchingList) listToCompare = listToCompare.getList();
        listToCompare.forEach((element: T) => {
            if (!this.contain(element)) {
                missingList.push(element);
            }
        })
        return missingList;
    }

    commonList(listToCompare: SearchingList<T> | T[]): SearchingList<T> {
        // return a list includes all elements that appears in both listToCompare and this list
        let commonList: T[] = [];
        if (listToCompare instanceof SearchingList) listToCompare = listToCompare.getList();
        listToCompare.forEach(element => {
            if (this.contain(element)) {
                commonList.push(element);
            }
        })
        return new SearchingList<T>(commonList, this._compare);
    }
    find(elementToFind: T): T | null {
        // return the element in this list that is equal to elementToFind
        let start = 0, end = this._list.length - 1;
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (this._compare(elementToFind, this._list[mid]) === SearchingList.IS_EQUAL) return this._list[mid];
            if (this._compare(this._list[mid], elementToFind) === SearchingList.IS_GREATER) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
        return null;
    }

    /**
     * combine two SearchingList to an array that contains all elements appears in at least one of two SearchingLists
     * @param first SearchingList
     * @param second SearchingList
     * @return an array of type {member1: T, member2: T} with member1 is the element appears in first SearchingList
     *         and member2 is the element appears in second SearchingList (assign to null if it doesn't appear)
     */
    static combine<T>(first: SearchingList<T>, second: SearchingList<T>): { member1: T | undefined, member2: T | undefined }[] {
        let output: { member1: T | undefined, member2: T | undefined }[] = [];
        first.getList().forEach(item1 => {
            let item2 = second.find(item1);
            output.push({ member1: item1, member2: (item2 === null) ? undefined : item2 });
        });
        second.getList().forEach(item2 => {
            let item1 = first.find(item2);
            if (item1 === null) output.push({ member1: undefined, member2: item2 });
        })
        return output;
    }

    getLength(): number {
        return this._list.length
    }

    push(newElement: T): void {
        this._list.push(newElement)
        this._sort(0, this._list.length - 1)
    }

    add(newElements: T | T[]): void {
        if (newElements instanceof Array) {
            this._list = this._list.concat(newElements);
        } else {
            this._list.push(newElements)
        }
        this._sort(0, this._list.length - 1)
    }

}