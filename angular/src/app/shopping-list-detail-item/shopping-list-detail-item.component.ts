import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../shared/item";
import {AuthenticationService} from "../shared/authentication.service";
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
    selector: '.sl-shopping-list-detail',
    templateUrl: './shopping-list-detail-item.component.html',
    styles: []
})
export class ShoppingListDetailItemComponent implements OnInit {

    @Input() item: Item;
    @Input() isOwn: boolean;
    @Input() helperId: number;
    @Input() shoppingList = null;

    constructor(
        public authService: AuthenticationService,
        private sl: ShoppingListService,
    ) {
    }

    ngOnInit(): void {
    }

    deleteItem(e, id) {
        if (confirm('Artikel wirklich löschen?')) {
            let domItem = e.currentTarget.parentElement;
            this.sl.deleteItem(id).subscribe(() => {
                domItem.remove();
            });
        }

    }

    toggleCheckItem(itemId: number) {
        this.sl.toggleCheckItem(itemId).subscribe();
    }

    public isMyList() {
        return this.isOwn || this.authService.getCurrentUserId() == this.helperId;
    }
}
