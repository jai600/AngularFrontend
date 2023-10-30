import { Injectable } from '@angular/core';

import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  myAppurl = "http://localhost:30844/api/Tarjeta/";
  myApiurl = "api/Tarjeta/"
  constructor(private http: HttpClient) { 



  }

  getListTarjetas(): Observable<any>{
    return this.http.get(this.myAppurl);
  }

  DeleteTarjeta(id: number): Observable<any>{
    return this.http.delete(this.myAppurl+id);
  }

  saveTarjeta(tarjeta:object): Observable<any>{
    return this.http.post(this.myAppurl,tarjeta);
  }

  updateTajeta(id:number,tarjeta:object): Observable<any>{
    return this.http.put(this.myAppurl + id,tarjeta)
  }
}
