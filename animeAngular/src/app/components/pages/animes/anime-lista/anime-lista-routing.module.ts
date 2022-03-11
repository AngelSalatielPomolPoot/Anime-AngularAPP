import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeListaComponent } from './anime-lista.component';

const routes: Routes = [{ path: '', component: AnimeListaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimeListaRoutingModule { }
