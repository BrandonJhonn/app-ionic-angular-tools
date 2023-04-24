import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class CitiesPage implements OnInit {

  token = localStorage.getItem('_token');
  cities: any = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    console.log('token: ', this.token);
    
    /*Delete Item from LocalStorage*/
    // (1)
    //localStorage.removeItem('_token');
    // (2)
    //localStorage.clear();

    this.getCities().subscribe(response => {
      console.log("Response: ", response);
      this.cities = response;
    });
  }

  getCities() {
    return this.http
    .get("assets/files/cities.json")
    .pipe(
      map((response: any) => {
        return response.data;
      })
    )
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: "Ciudad Seleccionada",
      duration: 2000,
      position: "bottom"
    });
    toast.present()
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: "Elimnar",
      message: "Se ha eliinado la ciudad correctamente",
      buttons: ["OK"]
    });
    await alert.present()
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  async showAlert2() {
    const alert = await this.alertController.create({
      header: "Elimnar",
      message: "¿Está seguro de Eliminar la Ciudad?",
      buttons: [
        {
          text: "No",
          handler: () => {
              console.log("Cancelado")
          },
        },
        {
          text: "Si",
          handler: () => {
              console.log("Ciudad Eliminada")
          },
        }
      ]
    });
    await alert.present()
    let result = await alert.onDidDismiss();
  }
}
