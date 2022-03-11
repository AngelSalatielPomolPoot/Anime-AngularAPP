import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '@environment/environment';
import { buscarInt } from '@shared/interfaces/buscar-int'
import { AnimeDetalles } from '@app/interfaces/anime-detalles';
import { PersonajesBusqueda } from '@app/interfaces/personajes-busqueda';

import { SubscribableOrPromise } from 'rxjs'
import { TopAnime } from '@app/interfaces/top-anime';


@Injectable({
  providedIn: 'root'
})
export class AnimeSerService {

  cachedValues:Array<{
    [animes:string]:buscarInt
  }>=[];
  
  cachedValues2:Array<{
    [top:string]:TopAnime
  }>=[];
  constructor(private http: HttpClient) { }

  searchAnime = (query:string,page:number):Promise<buscarInt> =>{
    const filter= `${environment.baseUrlAPI}search/anime?q=${query}&page=${page}`;
    let promise= new Promise<buscarInt>((resolve,reject) =>{
      if (this.cachedValues[<string>query]){
        resolve(this.cachedValues[query])
      }else{
        this.http.get(
          filter,
          {headers:
            {
              "x-rapidapi-key": "ce1e1cb3c1msh4cb7ce30fee0c7ap156976jsn429a7be80514",
              "x-rapidapi-host": "jikan1.p.rapidapi.com",
              "useQueryString": "true"
            }
          }
        ).toPromise()
        .then((response)=>{
          resolve(response as buscarInt)
        },(error) =>{
          reject(error);
        })
      }
    })
    return promise;
  }

  getTopAnime = (query:string):Promise<TopAnime> =>{
    const filter= `${environment.topUrlAPI}${query}`;
    let promise= new Promise<TopAnime>((resolve,reject) =>{
      if (this.cachedValues2[<string>query]){
        resolve(this.cachedValues2[query])
      }else{
        this.http.get(
          filter,
          {headers:
            {
              "x-rapidapi-key": "ce1e1cb3c1msh4cb7ce30fee0c7ap156976jsn429a7be80514",
              "x-rapidapi-host": "jikan1.p.rapidapi.com",
              "useQueryString": "true"
            }
          }
        ).toPromise()
        .then((response)=>{
          resolve(response as TopAnime)
        },(error) =>{
          reject(error);
        })
      }
    })
    return promise;
  }

  


  
}
