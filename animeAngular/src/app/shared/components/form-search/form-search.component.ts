import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})
export class FormSearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  
  onSearch(value: string){
    if(value && value.length>2){
      this.router.navigate(['/anime-lista'],{
        queryParams:{q:value,page:"1"},
      });
      
    }
  }

}
