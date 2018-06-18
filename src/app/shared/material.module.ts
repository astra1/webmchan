import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule
} from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatSidenavModule,
        MatSliderModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatTooltipModule,
        OverlayModule,
        PortalModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatSliderModule,
        MatToolbarModule,
        MatTooltipModule,
        OverlayModule,
        PortalModule
    ],
})
export class MaterialModule { }
