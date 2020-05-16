export class Item {
    constructor(
        public label: string,
        public amount: number,
        public unit: string,
        public checked: boolean,
        public max_price?: number,
        public id?: number,
        ){}
}
