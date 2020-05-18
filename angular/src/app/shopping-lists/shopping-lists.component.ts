import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShoppingList} from "../shared/shopping-list";
import {ShoppingListService} from "../shared/shopping-list.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
    selector: 'sl-shopping-lists',
    templateUrl: './shopping-lists.component.html',
    styles: []
})
export class ShoppingListsComponent implements OnInit {


    shoppingList: ShoppingList;
    shoppingLists: ShoppingList[];
    //@Output() showDetailsEvent = new EventEmitter<ShoppingList>();

    constructor(private sl: ShoppingListService,
                public authService: AuthenticationService,) {
    }


    ngOnInit() {
        this.sl.getOpenLists().subscribe(res => {
            console.log(res);
            this.shoppingLists = res;
        });
    }

    showDetails(shoppingList: ShoppingList) {

    }

}
