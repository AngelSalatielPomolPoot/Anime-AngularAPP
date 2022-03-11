import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { AnimeListaComponent } from './anime-lista/anime-lista.component'
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [AnimeListaComponent,AnimeDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    QRCodeModule,
  ],
  exports:[AnimeListaComponent,AnimeDetailsComponent],
})

export class AnimesModule { }
