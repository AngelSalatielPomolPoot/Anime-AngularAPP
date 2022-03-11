import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListaMangaComponent } from './lista-manga/lista-manga.component';
import { MangaDetailsComponent } from './manga-details/manga-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [ListaMangaComponent,MangaDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    QRCodeModule,
  ],
  exports: [ListaMangaComponent,MangaDetailsComponent],
})

export class MangaModule { }
