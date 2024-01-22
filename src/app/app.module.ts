import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { TrafficComponent } from './components/traffic/traffic.component';
import { WebcamComponent } from './components/webcam/webcam.component';
import { ParkingComponent } from './components/parking/parking.component';
import { ChargingComponent } from './components/charging/charging.component';
import { WarningComponent } from './components/warning/warning.component';
import { ConstructionComponent } from './components/construction/construction.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TrafficComponent,
    WebcamComponent,
    ParkingComponent,
    ChargingComponent,
    WarningComponent,
    ConstructionComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    ButtonModule,
    DropdownModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }