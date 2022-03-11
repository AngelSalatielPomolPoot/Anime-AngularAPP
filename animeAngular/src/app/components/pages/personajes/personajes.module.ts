import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajeListaComponent } from './personaje-lista/personaje-lista.component';
import { PersonajeDetailsComponent } from './personaje-details/personaje-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PersonajeListaComponent,PersonajeDetailsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[PersonajeListaComponent,PersonajeDetailsComponent]
})
export class PersonajesModule { }
