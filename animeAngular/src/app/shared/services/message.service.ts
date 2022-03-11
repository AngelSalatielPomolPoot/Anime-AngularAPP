import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage = (dato):Promise<any> =>{
    const filter= `http://localhost:3000/formulario`;
    let promise= new Promise<any>((resolve,reject) =>{
      this.http.post(
        filter,dato
      ).toPromise()
      .then((response)=>{
        console.log(response);
        resolve(response as any)
      },(error) =>{
        console.log(error);
        reject(error);
      })
    })
    return promise;
  }

}
