import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchema } from '../modules/users/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  base_url:string = "https://employee-portal-server-mm3y.onrender.com"

  constructor(private http:HttpClient) { }
  
  //get admin details
  getadmindetailsapi(){
    //api call to http://localhost:3000/users/1
    return this.http.get(`${this.base_url}/users/1`)
  }

  updateadmindetailsapi(data:UserSchema){
    //api call to http://localhost:3000/users/1
    return this.http.put(`${this.base_url}/users/1`,data)
  }

  isloggedin(){
    return !!sessionStorage.getItem('adminDetails')
  }
}
