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
  @Input() shoppingList = null;
  constructor(
      public authService: AuthenticationService,
      private sl: ShoppingListService,
  ) { }

  ngOnInit(): void {
  }

  toggleCheckItem(itemId: number){
    this.sl.toggleCheckItem(itemId).subscribe();
  }

  public isMyList(){
    if(this.shoppingList){
      return this.authService.getCurrentUserId() == this.shoppingList.seeker_id ||
          (this.shoppingList.helper_id !== null && this.authService.getCurrentUserId() == this.shoppingList.helper_id);
    } return false;
  }
}
