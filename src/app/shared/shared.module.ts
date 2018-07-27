import { NgModule } from '../../../node_modules/@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule ({
    imports: [ReactiveFormsModule, FormsModule],
    exports: [ReactiveFormsModule, FormsModule]
})
export class SharedModule {}
