export class Comment {
    constructor(
        public content: string,
        public user_id: number,
        public shopping_list_id: number,
        public created_at: Date,
        public id: number,
    ) {}
}
