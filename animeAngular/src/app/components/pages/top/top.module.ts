import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { TopAnimeComponent } from './top-anime/top-anime.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TopAnimeComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule,
    NgbModule,
  ],
  exports:[TopAnimeComponent]
})
export class TopModule { }
