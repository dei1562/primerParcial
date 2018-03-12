import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the AnemiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-anemia',
  templateUrl: 'anemia.html',
})
export class AnemiaPage {

  arrData = [];

  nombre;
  cedula;
  nivel_hemoglobina;
  correo;
  fecha_nacimiento;
  sexo;
  edad;
  edad_texto;

  today = new Date().toJSON().split('T')[0];

  anemiaF: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private fdb: AngularFireDatabase) {
    this.fdb.list('anemia/').valueChanges().subscribe(data=>{
      this.arrData = data;
      console.log(this.arrData);
    })
  }

  ngOnInit(){
    this.anemiaF = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      cedula: new FormControl('', [Validators.required, Validators.min(1)]),
      nivel_hemoglobina: new FormControl('', [Validators.required, Validators.min(1)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      sexo: new FormControl('', [Validators.required]),
      fecha_nacimiento: new FormControl('', [Validators.required])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnemiaPage');
  }

  onSubmit(formObject){
    if(formObject.valid){
      this.fnCalcularEdad(this.fecha_nacimiento);
      console.log("formObject", this.edad);

      var estado = 'No tiene Anemia.';
      if((this.edad >= 0 && this.edad <= 0.1) && (this.nivel_hemoglobina >= 13 && this.nivel_hemoglobina <= 26)){
        estado = 'Tiene Anemia';
      }
      if((this.edad > 0.1 && this.edad <= 0.6) && (this.nivel_hemoglobina >= 10 && this.nivel_hemoglobina <= 18)){
        estado = 'Tiene Anemia';
      }
      if((this.edad > 0.6 && this.edad <= 1) && (this.nivel_hemoglobina >= 11 && this.nivel_hemoglobina <= 15)){
        estado = 'Tiene Anemia';
      }
      if((this.edad > 1 && this.edad <= 5) && (this.nivel_hemoglobina >= 11.5 && this.nivel_hemoglobina <= 15)){
        estado = 'Tiene Anemia';
      }
      if((this.edad > 5 && this.edad <= 10) && (this.nivel_hemoglobina >= 12.6 && this.nivel_hemoglobina <= 15.5)){
        estado = 'Tiene Anemia';
      }
      if((this.sexo == 'm' && this.edad > 15) && (this.nivel_hemoglobina >= 12 && this.nivel_hemoglobina <= 16)){
        estado = 'Tiene Anemia';
      }
      if((this.sexo == 'h' && this.edad > 15) && (this.nivel_hemoglobina >= 14 && this.nivel_hemoglobina <= 18)){
        estado = 'Tiene Anemia';
      }

      let alert = this.alertCtrl.create({
        title: 'Resultado Analisis',
        subTitle: estado,
        buttons: ['OK']
      });
      alert.present();

      this.fdb.list("/anemia/").push({
        'nombre': this.nombre,
        'cedula': this.cedula,
        'nivel_hemoglobina': this.nivel_hemoglobina,
        'correo': this.correo,
        'edad': this.edad,
        'sexo': this.sexo,
        'fecha_nacimiento': this.fecha_nacimiento
      });
    }
  }

  private fnCalcularEdad(fecha){

    var values = fecha.split("-");
    var dia = parseInt(values[2]);
    var mes = parseInt(values[1]);
    var ano = parseInt(values[0]);

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getFullYear();
    var ahora_mes = fecha_hoy.getMonth() + 1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    if (edad >= 1900) {
        edad -= 1900;
    }

    // calculamos los meses
    var meses = 0;

    if (ahora_mes > mes && dia > ahora_dia)
        meses = ahora_mes - mes - 1;
    else if (ahora_mes > mes)
        meses = ahora_mes - mes
    if (ahora_mes < mes && dia < ahora_dia)
        meses = 12 - (mes - ahora_mes);
    else if (ahora_mes < mes)
        meses = 12 - (mes - ahora_mes + 1);
    if (ahora_mes == mes && dia > ahora_dia)
        meses = 11;

    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
        dias = ahora_dia - dia;
    if (ahora_dia < dia) {
    // Si la fecha es correcta, calculamos la edad
        var ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }

    this.edad_texto = edad + " años, " + meses + " meses y " + dias + " días"

    this.edad = (edad > 0) ? edad : parseFloat('0.' + meses);
  }

}
