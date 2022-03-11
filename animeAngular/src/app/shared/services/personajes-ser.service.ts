import { Injectable } from '@angular/core';
import { PersonajesBusqueda } from '@app/interfaces/personajes-busqueda';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PersonajesSerService {

  constructor(private http: HttpClient) { }
  cachedValues:Array<{
    [personajes:string]:PersonajesBusqueda
  }>=[];

  //Segundo API de personajes anime

  searchAnimePersonajes = (query:string):Promise<PersonajesBusqueda> =>{
    const filter= `${environment.kitsuAPI}/characters?filter[name]=${query}`;
    let promise= new Promise<PersonajesBusqueda>((resolve,reject) =>{
      if (this.cachedValues[<string>query]){
        resolve(this.cachedValues[query])
      }else{
        this.http.get(
          filter
        ).toPromise()
        .then((response)=>{
          resolve(response as PersonajesBusqueda)
        },(error) =>{
          reject(error);
        })
      }
    })
    return promise;
  }

  searchAnimePersonajesMore = (query:string):Promise<PersonajesBusqueda> =>{
    let promise= new Promise<PersonajesBusqueda>((resolve,reject) =>{
      if (this.cachedValues[<string>query]){
        resolve(this.cachedValues[query])
      }else{
        this.http.get(
          query
        ).toPromise()
        .then((response)=>{
          resolve(response as PersonajesBusqueda)
        },(error) =>{
          reject(error);
        })
      }
    })
    return promise;
  }


}
