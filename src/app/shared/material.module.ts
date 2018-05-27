import { NgModule } from '@angular/core';
import { MatButtonModule, MatGridListModule, MatCardModule, MatListModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatListModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatListModule
    ],
})
export class MaterialModule { }
