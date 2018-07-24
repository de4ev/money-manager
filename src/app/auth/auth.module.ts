import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ]
})
export class AuthModule {}
