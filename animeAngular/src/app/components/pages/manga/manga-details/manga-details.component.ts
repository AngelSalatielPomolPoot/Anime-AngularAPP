import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MangaBusqueda } from '@app/interfaces/manga-busqueda';
import { MangaSerService } from '@app/services/manga-ser.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  styleUrls: ['./manga-details.component.css']
})
export class MangaDetailsComponent implements OnInit {

  mangas: MangaBusqueda;
  private query: string;
  index: number;
  public qrdata: string = "";
  public url: string= "http://localhost:4200";

  constructor(
    private mangaServicio: MangaSerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.qrdata = this.url + this.router.url;
    this.route.params.pipe(take(1)).subscribe((params)=>{
      this.index=params['id'];
      this.query=params['query'];
      this.getDataFromService();
    });
  }

  private getDataFromService ():void{
    this.mangaServicio.mangasSer(this.query).then((Response)=>{
      if(Response?.data?.length){
        this.mangas =Response;
      } else{
        this.mangas;
      }
    },(error) =>{
      console.log("Error: " + error.statusText)
    })
  }

}
