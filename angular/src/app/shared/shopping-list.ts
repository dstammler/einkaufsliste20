import { Item } from './item';
export { Item } from './item';
import { User } from './user';
export { User } from './user';
import { Comment } from './comment';
export { Comment } from './comment';

export class ShoppingList {
    constructor(
        public id: number,
        public seeker_id: number,
        public helper_id: number,
        public seeker: User,
        public helper: User,
        public end_date: Date | string,
        public finalPrice: number,
        public items: Item[],
        public comments: Comment[]
    ){}
}
