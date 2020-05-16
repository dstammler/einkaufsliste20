import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as decode from 'jwt-decode';
import {ShoppingListService} from "./shopping-list.service";

interface User{
  result: {
    created_at: Date,
    email: string,
    id: number,
    firstname: string,
    lastname: string,
    updated_at: Date
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private api:string = 'http://einkaufsliste20.s1710456031.student.kwmhgb.at/api/auth';

  constructor(private sl: ShoppingListService,private http : HttpClient) { }

  login(email:string, password:string){
    return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
  }

  public getCurrentUserId(){
    return Number.parseInt(localStorage.getItem('userId'))
  }

  public isSeeker(){
    return this.getUserRole() === "Seeker";
  }

  public isHelper(){
    return this.getUserRole() === "Helper";
  }

  public getUserRole(){
    return localStorage.getItem('role');
  }

  public getName(){
    return localStorage.getItem('name')
  }

  public setLocalStorage(token:string){
    const decodedToken = decode(token);

    localStorage.setItem('token',token);
    localStorage.setItem('userId',decodedToken.user.id);
    localStorage.setItem('role',decodedToken.user.role[0].label);
    this.sl.getUserById(decodedToken.user.id).subscribe( res => {
      localStorage.setItem('name',res.firstname + " " + res.lastname);
    });


    /*for(let i = 0; i <= decodedToken.user.role.length; i++){
      console.log(decodedToken.user.role[i]);
      localStorage.setItem('role_'+(i+1),decodedToken.user.role[i].label);
    }*/
  }

  logout(){
    this.http.post(`${this.api}/logout`,{});
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
  }

  public isLoggedIn(){
    if(localStorage.getItem('token')){
      let token : string = localStorage.getItem('token');
      const decodedToken = decode(token);
      let expirationDate : Date = new Date();
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()){
        // time expired
        localStorage.removeItem('token');
        return false;
      } return true;
    } return false;
  }
}
