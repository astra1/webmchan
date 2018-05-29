import { NgModule } from '@angular/core';
import { MatButtonModule, MatGridListModule, MatCardModule, MatListModule, MatToolbarModule } from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatToolbarModule,
        OverlayModule,
        PortalModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatToolbarModule,
        OverlayModule,
        PortalModule
    ],
})
export class MaterialModule { }
