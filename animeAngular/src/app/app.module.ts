import { LOCALE_ID,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HearderComponent } from './shared/components/header/header.component';
import { FormSearchComponent } from './shared/components/form-search/form-search.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimeSerService } from '@app/services/anime-ser.service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import localeEsAr from '@angular/common/locales/es-AR';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserGuardGuard } from './user-guard.guard';
import { UserGuard2Guard } from './user-guard2.guard';
registerLocaleData(localeEsAr, 'es-Ar')

@NgModule({
  declarations: [
    AppComponent,
    HearderComponent,
    FormSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    FormsModule,
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-Ar' },AnimeSerService,UserGuardGuard,UserGuard2Guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
