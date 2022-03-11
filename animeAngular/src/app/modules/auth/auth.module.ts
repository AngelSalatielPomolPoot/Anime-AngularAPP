import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

import { FormsModule } from "@angular/forms";
import { RegistroComponent } from './registro/registro.component';
import { UserGuardGuard } from 'src/app/user-guard.guard';
import { UserGuard2Guard } from 'src/app/user-guard2.guard';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
  ],
})
export class AuthModule { }

