import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent } from './home.component'
import { AnimesModule } from 'pages/animes/animes.module';
import { PersonajesModule } from 'pages/personajes/personajes.module';
import { TopModule } from 'pages/top/top.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MangaModule } from 'pages/manga/manga.module';
import { MessageService } from '@app/services/message.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AnimesModule,
    PersonajesModule,
    TopModule,
    MangaModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],
})
export class HomeModule { }
