import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonajeDetailsComponent } from './personaje-details.component';

const routes: Routes = [{ path: '', component: PersonajeDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonajeDetailsRoutingModule { }
