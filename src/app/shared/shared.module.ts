import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

const MODULES = [
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
  FlexLayoutModule,
  CommonModule
];

@NgModule({
  imports: [
    MODULES
  ],
  exports: [
    MODULES
  ]
})

export class SharedModule {}
