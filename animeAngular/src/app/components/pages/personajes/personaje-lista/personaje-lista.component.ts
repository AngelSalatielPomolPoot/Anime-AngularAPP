import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonajesBusqueda } from '@app/interfaces/personajes-busqueda';
import { PersonajesSerService } from '@app/services/personajes-ser.service';
import { take } from 'rxjs/operators';

//imports jquery    
declare var $: any;

@Component({
  selector: 'app-personaje-lista',
  templateUrl: './personaje-lista.component.html',
  styleUrls: ['./personaje-lista.component.css']
})

export class PersonajeListaComponent implements OnInit {
  personajes: PersonajesBusqueda;
  private query: string;
  mostrar:boolean;
  espera:boolean;
  indexArreglo:number;
  mensaje:string;
  
  constructor(
    private personaServicio:PersonajesSerService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.mostrar=false;
    this.espera=false;
    this.query="kirigaya";
    this.router.navigate(['/personaje-lista'],{
      queryParams:{q:this.query},
    });
    this.indexArreglo=0;
    this.getDataPersonajeFromService();

    $(document).ready(function() {
      $('.toast').toast();
    })
  } 

  onSearchPersonaje(value: string){
    if(value && value.length>0){
      this.router.navigate(['/personaje-lista'],{
        queryParams:{q:value},
      });
      this.query= value;
      this.personajes=null;
      this.getDataPersonajeFromService();
    }
  }
  gerDatosPersonaje(indice:number){
    this.indexArreglo=indice;
  }

  
  private getDataPersonajeFromService ():void{
    this.espera=true;
    this.personaServicio.searchAnimePersonajes(this.query).then((Response)=>{
      if(Response?.data.length){
        this.personajes =Response;
        this.mostrar=false;
        this.espera=false;
      } else{
        this.personajes;
        this.espera=false;
        this.mostrar=true;
        
      }   
    },(error) =>{ 
      this.espera=false;
      this.personajes=null;
    });
  }

  getSiguiente(){
    let siguientesPersonajes:string;
    siguientesPersonajes=this.personajes.links.next;

    if(siguientesPersonajes!==undefined){
      this.personajes=null;
      this.getMoreDataPersonajeFromService(siguientesPersonajes);
    }else{
      this.mensaje="No hay personajes siguientes";
      $(document).ready(function() {
        $('.toast').toast('show');
      })
    }
  }

  getUltimos(){
    let ultimosPersonajes:string;
    ultimosPersonajes=this.personajes.links.last;

    if(ultimosPersonajes!==undefined){
      this.personajes=null;
      this.getMoreDataPersonajeFromService(ultimosPersonajes);
    }else{
      this.mensaje="No hay personajes ultimos";
      $(document).ready(function() {
        $('.toast').toast('show');
      })
    }
  }

  getAnterior(){
    let anterioresPersonajes:string;
    anterioresPersonajes=this.personajes.links.prev;

    if(anterioresPersonajes!==undefined){
      this.personajes=null;
      this.getMoreDataPersonajeFromService(anterioresPersonajes);
    }else{
      this.mensaje="No hay personajes anteriores";
      $(document).ready(function() {
        $('.toast').toast('show');
      })   
    }  
  }
  
  getPrimeros(){
    let primerosPersonajes:string;
    primerosPersonajes=this.personajes.links.first;

    if(primerosPersonajes!==undefined){
      this.personajes=null;
      this.getMoreDataPersonajeFromService(primerosPersonajes);
    }else{
      this.mensaje="No hay personajes primeros";
      $(document).ready(function() {
        $('.toast').toast('show');
      })   
    }  
  }

  private getMoreDataPersonajeFromService(busquedaPersonalizada:string):void{
    this.espera=true;
    this.personaServicio.searchAnimePersonajesMore(busquedaPersonalizada).then((Response)=>{
      if(Response?.meta.count>0){
        this.personajes =Response;
        this.mostrar=false;
        this.espera=false;
      } else{
        this.personajes;
        this.espera=false;
        this.mostrar=true;
        
      }   
    },(error) =>{
      this.espera=false;
      this.personajes=null;
    });
  }

}
