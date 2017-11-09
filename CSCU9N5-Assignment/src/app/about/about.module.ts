import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { SharedModule } from '../shared';

const aboutRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'about',
    component: AboutComponent,
    resolve: {
    }
  }
]);

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    aboutRouting
  ],
  exports: [
  ],  
  providers: [
  ]
})
export class AboutModule {}