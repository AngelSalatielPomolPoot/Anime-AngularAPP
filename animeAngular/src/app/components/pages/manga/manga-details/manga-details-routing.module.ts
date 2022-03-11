import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangaDetailsComponent } from './manga-details.component';

const routes: Routes = [{ path: '', component: MangaDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangaDetailsRoutingModule { }
