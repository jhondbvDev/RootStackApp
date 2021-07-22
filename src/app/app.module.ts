import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import {MaterialModule } from './material.module';
import { LoginModule } from './pages/auth/login/login.module';

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from './auth.guard';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JobComponent } from './pages/job/job.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    JobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    LoginModule,
    NgxSpinnerModule,
    ScrollingModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCxsrzARKqUIbNDjXExJjfvIdVpCcR5k9U'
    }),
    AgmSnazzyInfoWindowModule,
    
  ],
  providers: [AuthGuard,authInterceptorProviders,AuthService,TokenStorageService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
