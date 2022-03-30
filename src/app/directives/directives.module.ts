import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseInputDirective } from './uppercase-input.directive';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    UppercaseInputDirective
  ],
  imports: [
    CommonModule,


  ],
  exports:[
    UppercaseInputDirective
  ]

})
export class DirectivesModule { }
