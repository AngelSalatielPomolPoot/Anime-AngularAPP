import { Component, OnInit } from '@angular/core';
import { MessageService } from '@app/services/message.service';

import swal from 'sweetalert2';

//imports jquery
declare var $: any;

interface IRegisterForm{
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  titularAlerta="";
  espera:boolean;
  inicioSecionValue:number;
  register: IRegisterForm={
    nombre: "",
    email: "",
    asunto: "",
    mensaje: ""
  };

  constructor(public _MessageService: MessageService) { }

  ngOnInit(): void {
    this.espera=false;
    $(document).ready(function() {
      $('.carousel').carousel();
    })
  }


  contactForm(form) {
    this.espera=true;
    this._MessageService.sendMessage(form).then((Response)=>{
      console.log(Response);
      if(Response?.lError==false){
        this.espera=false;
        swal.fire("Formulario de contacto", "Mensaje enviado correctamente", 'success');
      }else{
        this.espera=false;
        this.titularAlerta='No se puedo enviar el correo, intente de nuevo';
        swal.fire('Error Al Enviar', this.titularAlerta, 'error');
      }
    },(error) =>{ 
      this.espera=false;
      this.titularAlerta='Sucedió un error inesperado, intente de nuevo';
      swal.fire('Lo sentimos', this.titularAlerta, 'error');
    });
  }

  
}
