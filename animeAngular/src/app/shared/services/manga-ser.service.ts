import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MangaBusqueda } from '@app/interfaces/manga-busqueda';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MangaSerService {

  cachedValues:Array<{
    [mangas:string]:MangaBusqueda
  }>=[];

  constructor(private http: HttpClient) { }

  mangasSer = (query:string):Promise<MangaBusqueda> =>{
    const filter= `${environment.kitsuAPI}/manga?filter[text]=${query}`;
    let promise= new Promise<MangaBusqueda>((resolve,reject) =>{
      if (this.cachedValues[<string>query]){
        resolve(this.cachedValues[query])
      }else{
        this.http.get(filter).toPromise()
        .then((response)=>{
          resolve(response as MangaBusqueda)
        },(error) =>{
          reject(error);
        })
      }
    })
    return promise;
  }

  searchMangasMore = (query:string):Promise<MangaBusqueda> =>{
    let promise= new Promise<MangaBusqueda>((resolve,reject) =>{
      if (this.cachedValues[<string>query]){
        resolve(this.cachedValues[query])
      }else{
        this.http.get(
          query
        ).toPromise()
        .then((response)=>{
          resolve(response as MangaBusqueda)
        },(error) =>{
          reject(error);
        })
      }
    })
    return promise;
  }
}
