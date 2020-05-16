import {Injectable} from '@angular/core';
import {Comment,Item, ShoppingList} from "./shopping-list";
import { HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class ShoppingListService {

    private api = 'http://einkaufsliste20.s1710456031.student.kwmhgb.at/api' ;


    constructor(private http: HttpClient) {
    }

    getAll() : Observable<Array<ShoppingList>> {
        return this.http.get(`${this.api}/lists`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getOpenLists() : Observable<Array<ShoppingList>> {
        return this.http.get(`${this.api}/openlists`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getOpenListsByUserId(userId: number): Observable<Array<ShoppingList>>{
        return this.http.get(`${this.api}/openlists/${userId}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getDoneListsByUserId(userId: number): Observable<Array<ShoppingList>>{
        return this.http.get(`${this.api}/donelists/${userId}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getListsByHelperId(id: number): Observable<Array<ShoppingList>> {
        return this.http.get(`${this.api}/helperlists/${id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getListsBySeekerId(id: number): Observable<Array<ShoppingList>> {
        return this.http.get(`${this.api}/seekerlists/${id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getUserById(id: number){
        return this.http.get(`${this.api}/users/${id}`).pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getSingle(id: number): Observable<ShoppingList> {
        return this.http.get<ShoppingList>(`${this.api}/lists/${id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    private errorHandler(error: Error | any) : Observable<any>{
        return throwError(error);
    }

    update(shoppingList: ShoppingList) : Observable<any>{
        return this.http.put(`${this.api}/lists/${shoppingList.id}`, shoppingList)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    create(shoppingList: ShoppingList) : Observable<any>{
        return this.http.post(`${this.api}/lists`, shoppingList)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    remove(id: number): Observable<any> {
        return this.http.delete(`${this.api}/lists/${id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    postComment(comment: Comment) : Observable<any> {
        return this.http.post(`${this.api}/lists/${comment.shopping_list_id}/comment`, comment)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    toggleCheckItem(itemId: number):Observable<any> {
        return this.http.put(`${this.api}/item/${itemId}/togglecheck`, '')
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    checkItem(itemId: number):Observable<any> {
        return this.http.put(`${this.api}/item/${itemId}/check`, '')
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    uncheckItem(itemId: number):Observable<any> {
        return this.http.put(`${this.api}/item/${itemId}/uncheck`, '')
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    deleteComment(comment_id: number) : Observable<any>{
        return this.http.delete(`${this.api}/comment/${comment_id}`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    registerHelper(helper_id: number, shopping_list_id: number) : Observable<any>{
        return this.http.put(`${this.api}/lists/${shopping_list_id}/helper/${helper_id}`,'')
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    unregisterHelper(shopping_list_id: number): Observable<any>{
        return this.http.put(`${this.api}/lists/${shopping_list_id}/unregisterhelper`,'')
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    getCommentsOfShoppinglist(listId: number): Observable<any>{
        return this.http.get(`${this.api}/lists/${listId}/comments`)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }


    getNamesOfShoppinglist(sl: ShoppingList): string[]{
        let users = [];
        if(sl.helper){
            users[sl.helper_id] = sl.helper.firstname + " " + sl.helper.lastname;
        }
        users[sl.seeker_id] = sl.seeker.firstname + " " + sl.seeker.lastname;
        return users;
    }


}
