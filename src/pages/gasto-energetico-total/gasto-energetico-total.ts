import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the GastoEnergeticoTotalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gasto-energetico-total',
  templateUrl: 'gasto-energetico-total.html',
})
export class GastoEnergeticoTotalPage {

  arrData = [];

  nombre;
  cedula;
  peso;
  estatura;
  edad;
  sexo;
  actividad_fisica;
  gasto_energetico_total;

  gastoET: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
    this.fdb.list('gastoEnergeticoTotal/').valueChanges().subscribe(data=>{
      this.arrData = data;
      console.log(this.arrData);
    })
  }

  ngOnInit(){
    this.gastoET = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      cedula: new FormControl('', [Validators.required, Validators.min(1)]),
      peso: new FormControl('', [Validators.required, Validators.min(1)]),
      estatura: new FormControl('', [Validators.required, Validators.min(1)]),
      edad: new FormControl('', [Validators.required, Validators.min(1)]),
      sexo: new FormControl('', [Validators.required]),
      actividad_fisica: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  ionViewDidLoad() {
  }

  onSubmit(formObject){

    if(formObject.valid){
      this.peso = parseFloat(this.peso);
      this.estatura = parseFloat(this.estatura);
      this.edad = parseFloat(this.edad);

      if(this.sexo == 'm'){
        this.gasto_energetico_total = 665.1 + (9.56 + this.peso) + (1.85 * this.estatura) - (4.7 * this.edad);     
      }else{
        this.gasto_energetico_total = 66.5 + (13.7 + this.peso) + (5 * this.estatura) - (6.8 * this.edad);
      }

      switch(parseFloat(this.actividad_fisica)){
        case 1:
          this.gasto_energetico_total = this.gasto_energetico_total / ( 20 / 100);
          break;
        case 2:
          this.gasto_energetico_total = this.gasto_energetico_total / ( 30 / 100);
          break;
        case 3:
          this.gasto_energetico_total = this.gasto_energetico_total / ( 40 / 100);
          break;
        case 4:
          this.gasto_energetico_total = this.gasto_energetico_total / ( 50 / 100);
          break;
        case 5:
          this.gasto_energetico_total = this.gasto_energetico_total / ( 70 / 100);
          break;
        case 6:
          this.gasto_energetico_total = this.gasto_energetico_total / ( 10 / 100);
          break;
      }

      this.fdb.list("/gastoEnergeticoTotal/").push({
        'nombre': this.nombre,
        'cedula': this.cedula,
        'peso': this.peso,
        'estatura': this.estatura,
        'edad': this.edad,
        'sexo': this.sexo,
        'actividad_fisica': this.actividad_fisica,
        'gasto_energetico_total': this.gasto_energetico_total
      });
    }
  }

}
