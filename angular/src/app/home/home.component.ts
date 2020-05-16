import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ShoppingList} from "../shared/shopping-list";
import {ShoppingListService} from "../shared/shopping-list.service";

interface Response {
    response: string;
    result: {
        token: string
    }
}

@Component({
    selector: 'sl-home',
    templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

    loginForm: FormGroup;
    shoppingLists: ShoppingList[];
    doneLists: ShoppingList[];
    openLists: ShoppingList[];

    constructor(private fb: FormBuilder,
                public authService: AuthenticationService,
                private router: Router,
                private sl: ShoppingListService) {
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        if (this.isLoggedIn()) {
          this.parseLists();
        }
    }

    parseLists() {
        this.getOpenListsByUserId();
        this.getDoneListsByUserId();
    }

    getOpenListsByUserId() {
        this.sl.getOpenListsByUserId(this.authService.getCurrentUserId()).subscribe(res => {
            this.openLists = res;
            console.log(res);
        });
    }

    getDoneListsByUserId() {
        this.sl.getDoneListsByUserId(this.authService.getCurrentUserId()).subscribe(res => {
            this.doneLists = res;
        });
    }

    showDoneLists(event){
        let element = event.currentTarget;
        element.remove();
        let donelist = <HTMLElement>document.querySelector('.shopping-lists--done');
        donelist.style.display = 'flex';
    }

    login() {
        const val = this.loginForm.value;
        if (val.username && val.password) {
            this.authService.login(val.username, val.password).subscribe(res => {
                const resObj = res as Response;

                if (resObj.response === 'success') {
                    this.authService.setLocalStorage(resObj.result.token);
                    this.router.navigateByUrl('/');
                    this.parseLists();
                }
            });
        }
    }

    getName(){
        return this.authService.getName();
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    logout() {
        this.authService.logout();
    }

}
