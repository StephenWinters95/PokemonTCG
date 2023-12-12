import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { LoginPage } from './LogIn/LogIn.page'; // Import your login page


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//added
import { MyService } from './services/card.service';

@NgModule({
  declarations: [AppComponent, LoginPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy,useClass: IonicRouteStrategy }, MyService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
