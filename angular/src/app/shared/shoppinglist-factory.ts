import {Comment, ShoppingList} from "./shopping-list";
import { User } from "./user";

export class ShoppinglistFactory {

    static empty() : ShoppingList {
        return new ShoppingList(null,null,null,null, null, null, null,[], [])
    }

    static fromObject(rawList: any) : ShoppingList{
        let date: Date | string = new Date(rawList.end_date);
        date = date.toISOString().slice(0, 19).replace('T', ' ');
        return new ShoppingList(
            rawList.id, rawList.seeker_id, rawList.helper_id, rawList.seeker, rawList.helper, date, rawList.finalPrice, rawList.items, rawList.comments
        );
    }

    static commentFromObject(rawComment: any) : Comment {
        return new Comment (rawComment.content,rawComment.user_id, rawComment.shopping_list_id, null, null);
    }

    static emptyComment() : Comment{
        return new Comment("",1,1, null, null);
    }
}

