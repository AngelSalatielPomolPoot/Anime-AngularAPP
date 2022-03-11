import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopAnimeComponent } from './top-anime.component';

const routes: Routes = [{ path: '', component: TopAnimeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopAnimeRoutingModule { }
