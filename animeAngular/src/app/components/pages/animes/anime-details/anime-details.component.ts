import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AnimeSerService } from '@app/services/anime-ser.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common'
import { buscarInt } from '@app/interfaces/buscar-int';
import { filter, take } from 'rxjs/operators';
import { AnimeDetalles } from '@app/interfaces/anime-detalles';
import { AnimeEspisodios } from '@app/interfaces/anime-espisodios';

@Component({
  selector: 'app-anime-details',
  templateUrl: './anime-details.component.html',
  styleUrls: ['./anime-details.component.css']
})
export class AnimeDetailsComponent implements OnInit {

  animes: buscarInt;
  private query: string;
  index: number;
  page:number;
  public qrdata: string = "";
  public url: string= "http://localhost:4200";
  
  constructor(
    private animeServicio:AnimeSerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    
  }


  ngOnInit(): void {
    this.qrdata = this.url + this.router.url;
    this.route.params.pipe(take(1)).subscribe((params)=>{
      this.index=params['id'];
      this.query=params['query'];
      this.page=params['page'];
      this.getDataFromService();
    });
    
  }

  
  private getDataFromService ():void{
    this.animeServicio.searchAnime(this.query,this.page).then((Response)=>{
      if(Response?.results?.length){
        this.animes =Response;
      } else{
        this.animes;
      }   
    }, (error) =>{
      console.log("Error: " + error.statusText)  
    })
  }


}
