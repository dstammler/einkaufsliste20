export class User {
    constructor(
        public id: number,
        public email: string,
        public firstname: string,
        public lastname: string,
        public street: string,
        public housenumber: number,
        public city: string,
        public zip: number
    ) {
    }
}
