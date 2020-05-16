import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import {AppComponent} from './app.component';
import {ShoppingListsComponent} from './shopping-lists/shopping-lists.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingListService} from "./shared/shopping-list.service";
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {ShoppingListDetailComponent} from './shopping-list-detail/shopping-list-detail.component';
import {ShoppingListDetailItemComponent} from './shopping-list-detail-item/shopping-list-detail-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ShoppingListFormComponent } from './shopping-list-form/shopping-list-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        AppComponent,
        ShoppingListsComponent,
        ShoppingListComponent,
        HomeComponent,
        ShoppingListDetailComponent,
        ShoppingListDetailItemComponent,
        ShoppingListFormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [ShoppingListService, AuthenticationService,MatDatepickerModule,{
        provide: LOCALE_ID,
        useValue: 'de'
    }, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    },{
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptorService,
        multi: true
    }],

    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        registerLocaleData(localeDe);
    }
}
