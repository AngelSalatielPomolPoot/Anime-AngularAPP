import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { buscarInt } from '@app/interfaces/buscar-int';
import { AnimeSerService } from '@app/services/anime-ser.service';
import { filter, take } from 'rxjs/operators';
import { AnimesModule } from '../animes.module';


import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { errorBusqueda } from '@app/interfaces/error-busqueda';

@Component({
  selector: 'app-anime-lista',
  templateUrl: './anime-lista.component.html',
  styleUrls: ['./anime-lista.component.css']
})
export class AnimeListaComponent implements OnInit {
  pauseOnHover1=false;
  page=1;
  paginasAnterior:number;
  espera:boolean;
  mostrar:boolean;

  animes: buscarInt;
  private query: string;
  consulta:string;
  errores:errorBusqueda;
  imagenesCarrosel:any[]=[
    {srcImagen:'/assets/Recursos/1.jpg',texto:"¿Buscas Algún Anime?"},
    {srcImagen:'/assets/Recursos/2.jpg',texto:"Mira Nuestra Lista"},
    {srcImagen:'/assets/Recursos/3.jpg',texto:"Encuentralo Por Su Nombre"}
  ];

  
  constructor(
    private animeServicio:AnimeSerService,
    private route: ActivatedRoute,
    private router:Router,
    private config:NgbCarouselConfig
  ) { 
    this.onUrlChanged();
  }

  ngOnInit(): void {
    this.mostrar=false;
    this.espera=true;
    this.getDataFromService();
  }

  loadPage(page: number) {
    this.page=page;

    this.router.navigate(['/anime-lista'],{
      queryParams:{q:this.query,page:this.page},
    });
    
    
  }
  
  private onUrlChanged():void{
    //router
    this.router.events
      .pipe(filter((event)=>event instanceof NavigationEnd))
      .subscribe(()=>{
        this.getAnimeByQuery();
    });
    
  }

  private getAnimeByQuery():void{
    this.route.queryParams.pipe(take(1)).subscribe((params:ParamMap)=>{
      this.query = params['q'];
      this.consulta=params['q'];
      if(params['page']!==undefined){
        this.page=params['page'];
      }
      this.animes=null;
      this.getDataFromService();
    });
  }


  private getDataFromService ():void{
    this.espera=true;
    this.animeServicio.searchAnime(this.query,this.page).then((Response)=>{
      if(Response?.results?.length){
        this.animes =Response;
        this.errores=null;
        this.mostrar=false;
        this.espera=false;
      } else{
        this.animes;
        this.errores=null;
        this.mostrar=true;
        this.espera=false;
      }   
    },(error) =>{
      this.espera=false;
      this.errores=error; 
      this.animes=null;
    });
  }
}
