import { Component } from '@angular/core';

import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { __values } from 'tslib';



@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent {

  listTarjetas: any[] = [];

form: FormGroup;
accion = "AGREGAR";
id: number | undefined;

constructor(private fb: FormBuilder,private toastr: ToastrService, private _TarjetaServices: TarjetaService){
this.form = this.fb.group({
     Titular: ['',Validators.required],
     NumeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
     FechaExpiracion: ['',[Validators.required, Validators.minLength(5),Validators.maxLength(5)]],
     cvv: ['', [Validators.required, Validators.maxLength(3),Validators.minLength(3)]]
    })
}

ngOnInit(): void{
  this.obtenerTarjetas();
}

obtenerTarjetas(){
  this._TarjetaServices.getListTarjetas().subscribe(data => {    
    console.log(data); 
   this.listTarjetas = data;
  })      
       
}

agregarTarjeta(){
  console.log(this.form);

  const Tarjeta: any = {
    Titular: this.form.get('Titular')?.value,
    NumeroTarjeta: this.form.get('NumeroTarjeta')?.value,
    FechaExpiracion: this.form.get('FechaExpiracion')?.value,
    cvv: this.form.get('cvv')?.value,

  }

  //this.listTarjetas.push(Tarjeta);
  if(this.id == undefined){
    this._TarjetaServices.saveTarjeta(Tarjeta).subscribe( data =>{
      console.log(data);
      this.toastr.success('La tarjeta fue registrada con exito!', 'REGISTRO TARJEJA');
      this.listTarjetas = [];
      this.obtenerTarjetas();
      this.form.reset();
    })    
  } else{
    Tarjeta.id = this.id;
    this._TarjetaServices.updateTajeta(this.id,Tarjeta).subscribe( data =>{
      console.log(data);
      this.toastr.info('La tarjeta fue modificada con exito','EDITAR TARJETA');
      this.id = undefined;
      this.accion = 'AGREGAR'
      this.listTarjetas = [];
      this.obtenerTarjetas();
      this.form.reset();     
     })
  }
}

eliminar(index: number){
  console.log(this.form);
  this._TarjetaServices.DeleteTarjeta(index).subscribe( data => {
    
    console.log(data);
    this.listTarjetas = [];
    this.toastr.error('La tarjeta fue eliminada con exito!', 'REGISTRO TARJEJA');
    this.obtenerTarjetas();
  })
  //this.listTarjetas.splice(index,1);
  

}

editarTarjeta(tarjeta: any){

  console.log(tarjeta);

  this.accion = "EDITAR";
  this.id = tarjeta.id;

  this.form.patchValue({
       Titular : tarjeta.titular,
       NumeroTarjeta : tarjeta.numeroTarjeta,
       FechaExpiracion : tarjeta.fechaExpiracion,
       cvv: tarjeta.cvv
    }
  );
}

}


  