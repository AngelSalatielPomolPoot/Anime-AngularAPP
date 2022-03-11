import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'animeAngular';

  
  activarBarra=false;
  contador=0;
  
  constructor( private router: Router){
    
  }

  ngOnInit(): void {
    
    
    
    this.router.events.subscribe(value => {
      if(this.router.url.toString()!="/" && this.router.url.toString()!="/auth/login" && this.router.url.toString()!="/auth/registro"){
        this.activarBarra=true;
      }
      else{
        this.activarBarra=false;
      }
    });
  }


}
