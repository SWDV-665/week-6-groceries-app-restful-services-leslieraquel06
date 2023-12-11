import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroceriesServiceService } from './groceries-service.service';
import { HttpClientModule } from '@angular/common/http';
import { InputDialogServiceProvider } from './input-dialog-service.service';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: ErrorHandler, useClass: ErrorHandler},
     GroceriesServiceService, InputDialogServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
