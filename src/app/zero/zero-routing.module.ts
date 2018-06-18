import { NotfoundComponent } from './../notfound/notfound.component';
import { BoardListComponent } from './../board-list/board-list.component';
import { ThreadComponent } from './thread/thread.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZeroComponent } from './zero.component';

const routes: Routes = [
    {
        path: 'board/:board_id',
        component: ZeroComponent,

    },
    {
        path: 'board/:board_id/thread/:thread_id',
        component: ThreadComponent
    },
    {
        path: '',
        component: BoardListComponent
    },
    {
        path: '**',
        component: NotfoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ZeroRoutingModule { }
