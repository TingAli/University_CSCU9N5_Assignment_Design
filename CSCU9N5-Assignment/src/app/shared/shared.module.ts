import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortablejsModule } from 'angular-sortablejs';
import { SortablejsOptions } from 'angular-sortablejs';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
  ],
  exports: [
    RouterModule,
    SortablejsModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
