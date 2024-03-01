import { Component } from '@angular/core';
import { UserSchema } from '../models/users.model';
import { ApiService } from 'src/app/modules/users/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: UserSchema = {}

  constructor(private api: ApiService,private _router: Router,private toastr: ToastrService) { }

  addUser() {
    this.api.adduserapi(this.user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success("New user added successfully")
        this.user={}
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.info("Cannot perform the action now... Please try after some times!!!")
      }
    })
  }

  cancel(){
    this.user = {}
    this._router.navigateByUrl('/users'); 
  }
  
}
