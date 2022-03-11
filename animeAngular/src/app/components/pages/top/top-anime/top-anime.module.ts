import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopAnimeRoutingModule } from './top-anime-routing.module';
import { TopAnimeComponent } from './top-anime.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TopAnimeRoutingModule,
    NgbModule,
  ]
})
export class TopAnimeModule { }
