import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstCharUppercasPipe } from './first-char-uppercas.pipe';
import { SafeUrlPipe } from './safe-url.pipe';



@NgModule({
  declarations: [
    FirstCharUppercasPipe,
    SafeUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports :[
    FirstCharUppercasPipe,
    SafeUrlPipe
  ]

})
export class PipesModule { }
