import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {ShoppingListService} from "../shared/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppingListErrorMessages} from "./shopping-list-form-error-messages";
import {Item, ShoppingList} from "../shared/shopping-list";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
    selector: 'sl-shopping-list-form',
    templateUrl: './shopping-list-form.component.html'
})
export class ShoppingListFormComponent implements OnInit {

    shoppingListForm: FormGroup;
    shoppingList = ShoppinglistFactory.empty();
    errors: { [key: string]: string } = {};
    isUpdatingShoppingList = false;
    items: FormArray;
    //todayFormatted = this.formatDateHTMLInput();
    todayFormatted = new Date();
    constructor(
        private fb: FormBuilder,
        public authService: AuthenticationService,
        private sl: ShoppingListService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.isUpdatingShoppingList = true;
            this.sl.getShoppinglistById(id).subscribe(list => {
                this.shoppingList = list;
                this.initList();
            })
        }
        this.initList();
    }

    /*formatDateHTMLInput(){
        let today = new Date();
        let year = today.getFullYear();
        console.log(today.getMonth()+1);
        let month = today.getMonth()+1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth()+1 ;
        let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
        return year + "-" + month + "-" + day;
    }*/

    initList() {
        this.buildItemsArray();
        console.log(this.shoppingList);
        this.shoppingListForm = this.fb.group({
            id: this.shoppingList.id,
            seeker_id: this.shoppingList.seeker_id,
            helper_id: this.shoppingList.helper_id,
            seeker: this.shoppingList.seeker,
            helper: this.shoppingList.helper,
            end_date: [this.shoppingList.end_date, [Validators.required]],
            items: this.items,
        });
        this.shoppingListForm.statusChanges.subscribe(() => this.updateErrorMessages());
    }

    buildItemsArray() {
        if (this.shoppingList.items.length == 0) {
            this.shoppingList.items.push(new Item(null, null, null, null,null));
        }

        this.items = this.fb.array(
            this.shoppingList.items.map(
                i => this.fb.group({
                    label: this.fb.control(i.label, Validators.required),
                    amount: this.fb.control(i.amount, Validators.required),
                    unit: this.fb.control(i.unit, Validators.required),
                    max_price: this.fb.control(i.max_price)
                })
            )
        );
    }

    addItemControl() {
        this.items.push(this.fb.group({label: "", amount: "", unit: "", max_price: ""}))
    }



    submitForm(): void {
        // filter empty values
        this.shoppingListForm.value.seeker_id = this.authService.getCurrentUserId();
        this.shoppingListForm.value.items = this.shoppingListForm.value.items.filter(item => item.label);
        const shoppingList: ShoppingList = ShoppinglistFactory.fromObject(this.shoppingListForm.value);

        console.log(shoppingList.end_date);

        if (this.isUpdatingShoppingList) {
            this.sl.updateShoppinglist(shoppingList).subscribe(res => {
                this.router.navigate(['../../home', shoppingList.id], {
                    relativeTo: this.route
                });
            });
        } else {
            this.sl.createShoppinglist(shoppingList).subscribe(res => {
                this.shoppingList = ShoppinglistFactory.empty();
                this.shoppingListForm.reset(ShoppinglistFactory.empty());
                this.router.navigate(['../lists'], {relativeTo: this.route})
            });
        }
    }

    updateErrorMessages() {
        this.errors = {};
        for (const message of ShoppingListErrorMessages) {
            const control = this.shoppingListForm.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors [message.forValidator] &&
                !this.errors [message.forControl]) {
                    this.errors [message.forControl] = message.text;
            }
        }
    }

}
