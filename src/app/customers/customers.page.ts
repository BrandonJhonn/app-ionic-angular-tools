import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CustomersPage implements OnInit {

  permission: boolean = true;
  users: any = [];

  searchedUser: any = [];
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getUsers().subscribe(response => {
      console.log("Response: ", response);
      this.users = response;
      this.searchedUser = this.users;
    });
  }

  goToHome() {
    this.router.navigate(['/home'])
  }

  getUsers() {
    console.log("Obteniendo usuarios...");
    
    return this.http
    .get("assets/files/customers.json")
    .pipe(
      map((response: any) => {
        return response.data;
      })
    )
  }

  searchCustomer(event: any) {
    const text = event.target.value.toLowerCase();
    this.searchedUser = this.users;
    if (text && text.trim() != '') {
        this.searchedUser = this.searchedUser.filter((user: any) => user.name.toLowerCase().indexOf(text) > -1);
    }
  }

  handleRefresh(event: any) {
    this.getUsers();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  };
}
