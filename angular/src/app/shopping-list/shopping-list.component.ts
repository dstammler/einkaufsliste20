import {Component, Input, OnInit} from '@angular/core';
import { ShoppingList} from "../shared/shopping-list";
import {ShoppingListService} from "../shared/shopping-list.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'div.sl-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit {

  @Input() shoppingList: ShoppingList;

  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {

  }

  isHome(){
    return this.route.snapshot.url[0].path == "home";
  }

}
