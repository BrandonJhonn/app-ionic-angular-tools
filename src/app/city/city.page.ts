import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CityPage implements OnInit {

  id: any;
  cities: any = [];
  model: City = {
    id: undefined,
    image: undefined,
    name: undefined,
    desc: undefined
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("id: ", this.id)

    this.getCities().subscribe(response => {
      this.cities = response;
      this.model = Object.assign({}, this.cities[this.id - 1]);
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

  convertArrayToObject = (array: [], key: string) => {
    const initialValue = {};
    return array.reduce((obj: any, item: any) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };
}

export class City {
  id: number | undefined;
  image: string | undefined;
  name: string | undefined;
  desc: string | undefined;
}
