import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserSchema } from '../modules/users/models/users.model';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})

export class UpdateAdminComponent implements OnInit {
  profile: string = './assets/images/profile_dummy.png';
  editAdminStatus: boolean = false;
  adminDetails: UserSchema = {};
  @Output() onAdminChange=new EventEmitter()

  constructor(private adminAPI: AdminService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.adminAPI.getadmindetailsapi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.adminDetails = res
        if (res.profile) {
          this.profile = res.profile
        }
      }
    })
  }

  editadminbtnclick() {
    this.editAdminStatus = true;
  }

  cancelClick() {
    this.editAdminStatus = false;
  }

  getFile(event: any) {
    let file = event.target.files[0]
    let fileReaderObj=new FileReader()
    fileReaderObj.readAsDataURL(file)
    fileReaderObj.onload=(event:any)=>{
      this.profile=event.target.result
      this.adminDetails.profile=event.target.result
    }
  }
 
  updateAdminDetails(){
    this.adminAPI.updateadmindetailsapi(this.adminDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toastr.success("Admin details updated successfully...")
        sessionStorage.setItem('adminDetails',JSON.stringify(res))
        this.onAdminChange.emit(res.name)
        this.cancelClick()
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.info("Cannot perform the action now... Please try after some times!!!")
        this.cancelClick()
      }
    })
  }

}
