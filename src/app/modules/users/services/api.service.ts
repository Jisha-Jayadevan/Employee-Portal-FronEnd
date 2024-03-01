import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchema } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url:string = "https://employee-portal-server-mm3y.onrender.com"

  constructor(private http:HttpClient) { }

  //getallusers
  getallusersapi(){
      //api call to http://localhost:3000/users
      return this.http.get(`${this.base_url}/users`)
  }
  
  //adduser
  adduserapi(user:UserSchema){
    //api call to http://localhost:3000/users
    return this.http.post(`${this.base_url}/users`,user)
  }

  //getsingleuser
  getsingleuserapi(id:any){
    //api call to http://localhost:3000/users/id
    return this.http.get(`${this.base_url}/users/${id}`)
  }

  updateuserapi(id:any,data:UserSchema){
    //api call to http://localhost:3000/users/id
    return this.http.put(`${this.base_url}/users/${id}`,data)
  }

   //deleteuser
   deleteuserapi(id:any){
    //api call to http://localhost:3000/users/id
    return this.http.delete(`${this.base_url}/users/${id}`)
  }

}

