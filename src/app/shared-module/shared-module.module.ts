/**
 * Creating shared modules allows you to organize and streamline your code. 
 * You can put commonly used directives, pipes, and components into one module and 
 * then import just that module wherever you need it in other parts of your app.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from '../directives/highlight.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HighlightDirective
  ],
  exports: [
    HighlightDirective
  ]
})
export class SharedModule { }
