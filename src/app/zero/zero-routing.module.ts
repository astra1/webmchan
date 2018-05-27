import { ThreadComponent } from './thread/thread.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZeroComponent } from './zero.component';

const routes: Routes = [
    {
        path: '',
        component: ZeroComponent,
        // resolve: {
        //   isAuthenticated: ZeroAuthResolver
        // }
    },
    {
        path: 'thread',
        component: ThreadComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ZeroRoutingModule { }
