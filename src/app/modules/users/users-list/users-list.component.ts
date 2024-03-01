import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/modules/users/services/api.service';
import { UserSchema } from '../models/users.model';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  allUsers: UserSchema[] = []
  searchKey: string = ""
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  constructor(private api: ApiService) { }
  //when UsersListComponent page is open call getUserList()
  ngOnInit(): void {
    this.getUserList()
  }

  getUserList() {
    //When Users List page open, display all users list from json file by making an api call: http://localhost:3000/users
    this.api.getallusersapi().subscribe({
      next: (result: any) => {
        console.log(result);
        this.allUsers = result
        // this.sortByName()
        this.count = this.allUsers.length
      },
      error: (result: any) => {
        console.log(result);
        alert("Error while fetching the data... Please try after some time!!!")
      }
    })
  }

  deleteuser(id: any) {
    this.api.deleteuserapi(id).subscribe({
      next: (res: any) => {
        console.log("deleted successfully");
        this.getUserList()
      },
      error: (err: any) => {
        console.log(err);
        alert("Cannot perform the action now... Please try after some times!!!")
      }
    })
  }

  generatePDF() {
    let pdf = new jspdf()
    let head = [['User Id', 'Username', 'Email', 'Status']]
    let body: any = []
    this.allUsers.forEach((item: any) => {
     if(item.id!='1'){
      body.push([item.id, item.name, item.email, item.active])
     }
    })
    pdf.setFontSize(16)
    pdf.text("All Employee List", 15, 10)
    autoTable(pdf, { head, body })
    pdf.output('dataurlnewwindow')
    pdf.save("allUsers.pdf")
  }

  sortById(){
    // this.allUsers.sort((a:any,b:any)=>a.id-b.id)
    //if string use below code
    this.allUsers.sort((a:any,b:any)=>a["id"].localeCompare(b["id"]))
  }
 
  sortByName(){
    this.allUsers.sort((a:any,b:any)=>a["name"].localeCompare(b["name"]) )
  }
}
