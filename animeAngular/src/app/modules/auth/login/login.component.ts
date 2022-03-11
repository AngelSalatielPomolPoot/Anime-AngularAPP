import {Component} from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AutentificacionService } from '@app/services/autentificacion.service';
import swal from'sweetalert2';
import jwt_decode from 'jwt-decode';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  show: boolean;
  mostrar:string;
  espera:boolean;

  isValidFormVal:boolean;
  titularAlerta="";
  public loginForm:{
    email: {
      val: string;
      error: string;
      isValid: () => boolean
    }, 
    password:{
      val: string;
      error: string;
      isValid: () => boolean
    }
  };

  constructor(
    private autentificacionServicio:AutentificacionService,
    private router: Router
  ) {
    // initialize variable value
    this.show = false;
    this.mostrar="mostrar";
    this.isValidFormVal=false;
    this.loginForm = {
      email: {
        val: '',
        error: '¡El email es requerido!',
        isValid() {
          //tslint: disable-next-line: max-line-length
          const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-A]{2,}))$/;
          const isValidEmail = pattern.test(this.val);
          if(this.val === ''){
            this.error = '¡El email es requerido!';
          }else{
            this.error= '¡El email no es valido!';
          }
          return isValidEmail;
        }
      },
      password: {
        val: '',
        error: '¡La contraseña es requerida!',
        isValid(){
          return (this.val.length > 0);
        }
      }
    };
  }

  ngOnInit(): void {
    this.espera=false;
    $(document).ready(function() {
      $('.carousel').carousel();
   })
  }


  isValidForm(){
    this.isValidFormVal=this.loginForm.email.isValid() && this.loginForm.password.isValid();
    return (this.loginForm.email.isValid() && this.loginForm.password.isValid());
  }

  authenticate():void{
    let validar=this.isValidForm();
    if(validar){
      let datos={correo:this.loginForm.email.val,contrasenia:this.loginForm.password.val}
    this.getDatosLogin(datos);
    }else{
      this.titularAlerta='Por favor, llene todos los campos';
      swal.fire('Datos incompletos', this.titularAlerta, 'error');
    }
    
    
  }

  private getDatosLogin(datos:any):void{
    this.espera=true;
    console.log(datos)
    this.autentificacionServicio.loginUsuario(datos).then((Response)=>{
      if(Response?.lError==false){
        var decoded = jwt_decode(Response.cToken); 
        console.log(decoded)
        sessionStorage.setItem('usuarioData', JSON.stringify(decoded));
        sessionStorage.setItem('token', JSON.stringify(Response.cToken));
        this.titularAlerta='Acesso Permitido';
        this.espera=false;
        swal.fire('Sesion Iniciada', this.titularAlerta, 'success').then((result) => {      
            this.router.navigate(["/home"]);
          } 
        );
      } else{
        if(Response?.cError==="El usuario no se encuentra"){
          this.espera=false;
          this.titularAlerta='El usuario proporcionado es incorrecto';
          swal.fire('Datos Incorrectos', this.titularAlerta, 'error');
        }else{
          if(Response?.cError==="El password es incorrecto"){
            this.espera=false;
            this.titularAlerta='La contraseña que proporcionó es incorrecta';
            swal.fire('Datos Incorrectos', this.titularAlerta, 'error');
          }else{
            this.espera=false;
            this.titularAlerta='Sucedió un error inesperado, intente de nuevo';
            swal.fire('Lo sentimos', this.titularAlerta, 'error');
          }
        } 
      }   
    },(error) =>{ 
      this.espera=false;
      this.titularAlerta='Sucedió un error inesperado, intente de nuevo';
      swal.fire('Lo sentimos', this.titularAlerta, 'error');
    });
    
  }

  // click event function toggle
  passwordMostrar():void{
    this.show = !this.show;
    if(this.show){
      this.mostrar="Ocultar"
    }else{
      this.mostrar="Mostrar"
    }
    console.log("Mostrar->",this.show);
  }

  registro():void{
    console.log("entra")
    this.router.navigate(["auth/registro"]);
  }

 
}
