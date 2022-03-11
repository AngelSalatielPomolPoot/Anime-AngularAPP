import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMangaComponent } from './lista-manga.component';

const routes: Routes = [{ path: '', component: ListaMangaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaMangaRoutingModule { }
