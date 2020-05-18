import { Component } from '@angular/core';
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'sl-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'einkaufsliste20';

  constructor(private authService: AuthenticationService){}

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  isSeeker(){
    return this.authService.isSeeker();
  }

  isHelper(){
    return this.authService.isHelper();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else{
      return "Login";
    }
  }
}
