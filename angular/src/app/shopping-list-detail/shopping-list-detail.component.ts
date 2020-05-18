import {Component, Input, OnInit} from '@angular/core';
import {ShoppingListService} from "../shared/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Comment, ShoppingList} from "../shared/shopping-list";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

interface AfterContentInit {
    ngAfterContentInit(): void
}


@Component({
    selector: 'sl-shopping-list-detail',
    templateUrl: './shopping-list-detail.component.html',
    styles: []
})

export class ShoppingListDetailComponent implements OnInit, AfterContentInit {


    commentForm: FormGroup;
    finalPriceForm: FormGroup;
    comment: Comment = ShoppinglistFactory.emptyComment();
    shoppingList: ShoppingList = ShoppinglistFactory.empty();

    users = [];

    constructor(
        private fb: FormBuilder,
        private sl: ShoppingListService,
        private router: Router,
        private route: ActivatedRoute,
        public authService: AuthenticationService
    ) {
    }

    ngAfterContentInit() {
        this.initComment();
        this.initFinalPriceForm();
    }

    ngOnInit() {
        const params = this.route.snapshot.params;
        this.sl.getShoppinglistById(params['id']).subscribe(shoppingList => {
            this.shoppingList = shoppingList;
            if (this.shoppingList.helper_id) {
                this.users[this.shoppingList.helper_id] = this.shoppingList.helper.firstname + " " + this.shoppingList.helper.lastname;
            }
            this.users[this.shoppingList.seeker_id] = this.shoppingList.seeker.firstname + " " + this.shoppingList.seeker.lastname;
            if (this.shoppingList.finalPrice) {
                this.updateFinalPriceForm();
            }

            this.getCommentAuthors();
        });

    }



    // helper user methods

    registerHelper(event) {
        let messageContainer = event.currentTarget.parentElement;
        this.sl.registerHelper(this.authService.getCurrentUserId(), this.shoppingList.id).subscribe(res => {
            this.addHelperMessageToDOM(messageContainer, 'Erfolgreich als Helfer eingetragen. 👏🏻 🎉');
        });
    }

    unregisterHelper(event) {
        let messageContainer = event.currentTarget.parentElement;
        this.sl.unregisterHelper(this.shoppingList.id).subscribe(res => {
            this.addHelperMessageToDOM(messageContainer, 'Als Helfer ausgetragen...');
            this.postFinalPrice(true);
        });
    }

    isHelper() {
        if (this.shoppingList.helper_id)
            return this.authService.getCurrentUserId() == this.shoppingList.helper_id;
        return false;
    }

    isSeeker() {
        return this.authService.getCurrentUserId() == this.shoppingList.seeker_id;
    }

    isInvolved() {
        return this.isHelper() || this.isSeeker();
    }

    isOwn(){
        return this.authService.getCurrentUserId() === this.shoppingList.seeker_id;
    }

    async getNameById(id: number){
        let name: string = "";
        this.sl.getUserById(id).subscribe( (user) => {
           name = user.firstname + " " + user.lastname;
        });
        return name;
    }

    addHelperMessageToDOM(target, message) {
        target.innerHTML = message;
    }

    initFinalPriceForm() {
        this.finalPriceForm = this.fb.group({
            price: ['', [Validators.required]]
        })
    }

    updateFinalPriceForm() {
        this.finalPriceForm.setValue({price: this.shoppingList.finalPrice});
    }

    escapeURI(uri) {
        return encodeURIComponent(uri).replace('%20', '+');
    }

    postFinalPrice(reset = false) {
        if(!reset){
            this.sl.postFinalPrice(this.shoppingList.id, this.finalPriceForm.value.price).subscribe();
        } else{
            this.sl.postFinalPrice(this.shoppingList.id,null).subscribe();
        }
    }

    // comment methods

    initComment() {
        this.commentForm = this.fb.group({
            content: ['', [Validators.required]]
        });
    }

    getCommentAuthors(){
        this.shoppingList.comments.forEach((comment) =>{
            if(!this.users[comment.user_id]){
                this.sl.getUserById(comment.user_id).subscribe( (user) => {
                    this.users[comment.user_id] = user.firstname + " " + user.lastname;
                });
            }
        });

    }

    postComment() {
        let comment: Comment = ShoppinglistFactory.commentFromObject(this.commentForm.value);
        comment.shopping_list_id = this.shoppingList.id;
        comment.user_id = this.authService.getCurrentUserId();
        this.sl.postComment(comment).subscribe(res => {
            this.comment = ShoppinglistFactory.emptyComment();
            this.commentForm.reset(ShoppinglistFactory.empty());
            this.addCommentToDOM(res);
        });
    }

    addCommentToDOM(res) {
        let commentsList = document.querySelector('.comments ul');

        let comment = document.createElement('li');
        comment.classList.add('shopping-list__comment');

        let commentDiv = document.createElement('div');
        commentDiv.classList.add('comment--own');

        let commentAuthor = document.createElement('span');
        commentAuthor.classList.add('comment__author');
        commentAuthor.appendChild(document.createTextNode(this.users[res.user_id]));

        let commentDate = document.createElement('div');
        commentDate.classList.add('comment__date');

        let date = new Date(res.created_at);
        let fullMonths = ["Jänner", "Februar", "März", "April", "Mai", "Juni",
            "Juli", "August", "September", "Oktober", "November", "Dezember"];

        let commentDateTime = document.createElement('span');
        commentDateTime.classList.add('comment__date__time');

        commentDateTime.appendChild(document.createTextNode((date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()));

        let commentDateDay = document.createElement('span');
        commentDateDay.classList.add('comment__date__day');
        commentDateDay.appendChild(document.createTextNode((date.getDate() < 10 ? "0" : "") + date.getDate() + ". " + fullMonths[date.getMonth()] + " " + date.getFullYear()));

        let commentContent = document.createElement('p');
        commentContent.classList.add('comment__content');
        commentContent.appendChild(document.createTextNode(res.content));


        commentDate.appendChild(commentDateTime);
        commentDate.appendChild(commentDateDay);

        commentDiv.appendChild(commentAuthor);
        commentDiv.appendChild(commentDate);
        commentDiv.appendChild(commentContent);

        comment.appendChild(commentDiv);

        commentsList.appendChild(comment);
    }


    deleteComment(commentId: number, event) {
        if (confirm('Kommentar wirklich löschen?')) {
            let target = event.currentTarget.parentElement.parentElement;
            //target.remove();
            target.style.transitionDuration = ".3s";
            target.style.opacity = 0;
            target.style.padding = 0;
            target.style.transform = "translateY(-100%)";
            this.sl.deleteComment(commentId).subscribe();
        }

    }


    // shoppinglist methods


    removeShoppingList() {
        if (confirm('Shoppingliste wirklich löschen?')) {
            this.sl.deleteShoppinglist(this.shoppingList.id).subscribe(res => this.router.navigate(['../'], {
                relativeTo: this.route
            }));
        }
    }

}
