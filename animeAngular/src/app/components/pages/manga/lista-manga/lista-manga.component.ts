import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, ParamMap, Router } from '@angular/router';
import { errorBusqueda } from '@app/interfaces/error-busqueda';
import { MangaBusqueda } from '@app/interfaces/manga-busqueda';
import { MangaSerService } from '@app/services/manga-ser.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { filter, take } from 'rxjs/operators';
//imports jquery    
declare var $: any;

@Component({
  selector: 'app-lista-manga',
  templateUrl: './lista-manga.component.html',
  styleUrls: ['./lista-manga.component.css']
})
export class ListaMangaComponent implements OnInit {
  mostrar:boolean;
  espera:boolean;
  pauseOnHover1=false;
  page=1;
  paginasAnterior:number;
  mensaje:string;
  bandera=0;

  mangas: MangaBusqueda;
  private query: string;
  consulta:string;
  errores:errorBusqueda;
  imagenesCarrosel:any[]=[
    {srcImagen:'/assets/Recursos/1.jpg',texto:"¿Buscas Algún Manga?"},
    {srcImagen:'/assets/Recursos/2.jpg',texto:"Mira Nuestra Lista"},
    {srcImagen:'/assets/Recursos/3.jpg',texto:"Encuentralo Por Su Nombre"}
  ];
  
  constructor(
    private mangaServicio: MangaSerService,
    private router:Router,
    private config:NgbCarouselConfig,
    private route: ActivatedRoute,
    ) {
      
    }


    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
      this.onUrlChanged();
      this.bandera=0;
    }

  ngOnInit(): void {
    this.mostrar=false;
    this.espera=true;
    let dirrecion=document.location.href.split("?q=");
    if(dirrecion[1]===undefined){
      this.query="sword art online";
      this.consulta ="sword art online";
      this.onSearchManga(this.query);
    }else{
      this.getMangaByQuery();
    }
    $(document).ready(function() {
      $('.toast').toast();
    })
  }

  private onUrlChanged():void{
    //router
    this.router.events
      .pipe(filter((event)=>event instanceof NavigationEnd))
      .subscribe(()=>{
        if(this.bandera==0){
          this.getMangaByQuery();
          this.bandera=1;
        }    
    });
    
  }

  private getMangaByQuery():void{
 
      this.route.queryParams.pipe(take(1)).subscribe((params:ParamMap)=>{
        this.query = params['q'];
        this.consulta=params['q'];
        if(this.query===undefined){
          this.query="sword art online";
          this.consulta ="sword art online";
        }
      });

      this.mangas=null;
      this.getDataFromServiceMangas();
 
  }

  
  onSearchManga(value: string){
    if(value && value.length>2){
      this.router.navigate(['/lista-manga'],{
        queryParams:{q:value},
      });
      this.query=value;
    }
    this.query= value;
    this.consulta = value;
    this.mangas=null;
    this.getDataFromServiceMangas();
  }
 

  private getDataFromServiceMangas():void{
    this.espera=true;
    this.mangaServicio.mangasSer(this.query).then((Response)=>{
      if(Response?.data?.length){
        this.mangas=Response;
        this.mostrar=false;
        this.espera=false;
      } else{
        this.mangas;
        this.espera=false;
        this.mostrar=true;
      }   
    },(error) =>{
      this.espera=false;
      this.mangas=null;
    })
  }

  getSiguiente(){
    let siguientesMangas:string;
    siguientesMangas=this.mangas.links.next;

    if(siguientesMangas!==undefined){
      this.mangas=null;
      this.getMoreDataMangasFromService(siguientesMangas);
    }else{
      this.mensaje="No hay mangas siguientes";
      $(document).ready(function() {
        $('.toast').toast('show');
      })
    }
  }

  getUltimos(){
    let ultimosMangas:string;
    ultimosMangas=this.mangas.links.last;

    if(ultimosMangas!==undefined){
      this.mangas=null;
      this.getMoreDataMangasFromService(ultimosMangas);
    }else{
      this.mensaje="No hay mangas ultimos";
      $(document).ready(function() {
        $('.toast').toast('show');
      })
    }
  }

  getAnterior(){
    let anterioresMangas:string;
    anterioresMangas=this.mangas.links.prev;
    if(anterioresMangas!==undefined){
      this.mangas=null;
      this.getMoreDataMangasFromService(anterioresMangas);
    }else{
      this.mensaje="No hay mangas anteriores";
      $(document).ready(function() {
        $('.toast').toast('show');
      })   
    }  
  }
  
  getPrimeros(){
    let primerosMangas:string;
    primerosMangas=this.mangas.links.first;

    if(primerosMangas!==undefined){
      this.mangas=null;
      this.getMoreDataMangasFromService(primerosMangas);
    }else{
      this.mensaje="No hay mangas primeros";
      $(document).ready(function() {
        $('.toast').toast('show');
      })   
    }  
  }

  private getMoreDataMangasFromService(busquedaPersonalizada:string):void{
    this.espera=true;
    this.mangaServicio.searchMangasMore(busquedaPersonalizada).then((Response)=>{
      if(Response?.meta.count>0){
        this.mangas =Response;
        this.mostrar=false;
        this.espera=false;
      } else{
        this.mangas;
        this.espera=false;
        this.mostrar=true;
        
      }   
    },(error) =>{
      this.espera=false;
      this.mangas=null;
    });
  }

}
