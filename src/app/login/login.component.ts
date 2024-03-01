import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private toastr: ToastrService,private api: AdminService, private _router:Router) {}
  email: string = ""
  password: string = ""
  login() {
    //admin login logic
    if (this.email && this.password) {
      // this.toastr.success("Proceed to API Call")
      this.api.getadmindetailsapi().subscribe({
        next: (res: any) => {
          console.log(res);
          const {email,password}=res
          if (this.email==email&&this.password==password) {
            this.toastr.success("Logged in successfully")
            sessionStorage.setItem('adminDetails',JSON.stringify(res))
            this.email=""
            this.password=""
            this._router.navigateByUrl('/dashboard')
          } 
          else {
            this.toastr.error("Invalid Username/Password")
          }
        },
        error: (err: any) => {
          console.log(err);
          this.toastr.info("Cannot perform the action now... Please try after some times!!!")
        }
      })
    }
    else {
      this.toastr.info("Please fill the form completely!!!")
    }
  }
}
