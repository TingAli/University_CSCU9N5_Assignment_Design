import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    resolve: {
    }
  }
]);

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    homeRouting
  ],
  exports: [
  ],  
  providers: [
  ]
})
export class HomeModule {}