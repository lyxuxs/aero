import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrafficComponent } from './components/traffic/traffic.component';
import { ChargingComponent } from './components/charging/charging.component';
import { ParkingComponent } from './components/parking/parking.component';
import { WebcamComponent } from './components/webcam/webcam.component';
import { WarningComponent } from './components/warning/warning.component';
import { ConstructionComponent } from './components/construction/construction.component';

const routes: Routes = [
  { path: '', component: TrafficComponent },
  { path: 'charging', component: ChargingComponent },
  { path: 'construction', component: ConstructionComponent },
  { path: 'warning', component: WarningComponent },
  { path: 'webcam', component: WebcamComponent },
  { path: 'parking', component: ParkingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
