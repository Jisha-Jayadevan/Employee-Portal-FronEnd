import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserSchema } from '../models/users.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  user:UserSchema={}
  constructor(private route:ActivatedRoute,private api:ApiService,private _router: Router,private toastr: ToastrService){
    
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const {id} = res
      console.log(id);
     this.getexistinguser(id)
    })
  }

  getexistinguser(id:any){
    this.api.getsingleuserapi(id).subscribe({
      next:(res:UserSchema)=>{
        this.user = res   
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.info("Cannot perform the action now.. Please try after some times!!!")
      }
    })
  }

  updateUser(){
    this.api.updateuserapi(this.user.id,this.user).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success("User details updated successfully...")
        this._router.navigateByUrl('/users'); 
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.info("Cannot perform the action now... Please try after some times!!!")
      }
    })
  }


  cancelUpdate(userId:any){
    console.log("cancel clicked");
   this.getexistinguser(userId) 
   this._router.navigateByUrl('/users'); 
  }
}
