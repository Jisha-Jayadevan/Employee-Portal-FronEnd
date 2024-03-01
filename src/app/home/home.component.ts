import { Component, OnInit } from '@angular/core';
import { ApiService } from '../modules/users/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sidebarstatus: boolean = false
  count: number = 0
  adminName: string = ''

  constructor(private api: ApiService, private homeRouter: Router) { }

  ngOnInit(): void {
    this.getEmployeeCount()
    if (sessionStorage.getItem('adminDetails')) {
      this.adminName = JSON.parse(sessionStorage.getItem('adminDetails') || '').name.toUpperCase()
    }
  }

  menubuttonclick() {
    this.sidebarstatus = !this.sidebarstatus
  }

  getEmployeeCount() {
    this.api.getallusersapi().subscribe((res: any) => {
      this.count = res.length-1
    })
  }

  logout() {
    //remove data from session storage
    sessionStorage.clear()
    //redirect to login page
    this.homeRouter.navigateByUrl('')
  }

  onAdminChange(event: any) {
    this.adminName = event
  }
}
