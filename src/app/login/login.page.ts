import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  token: string = 'b37e50cedcd3e3f1ff64f4afc0422084ae694253cf399326868e07a35f4a45fb';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    localStorage.setItem('_token', this.token);
    this.router.navigate(['/home'])
  }

}
