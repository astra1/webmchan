import { SettingsComponent } from "./../settings/settings.component";
import { NotfoundComponent } from "./../notfound/notfound.component";
import { ThreadComponent } from "./thread/thread.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ZeroComponent } from "./zero.component";
import { BoardListComponent } from "../board-list/board-list.component";
import { PostsResolver } from "app/core/resolvers/posts.resolver";
import { ThreadsResolver } from "app/core/resolvers/threads.resolver";

const routes: Routes = [
  {
    path: ":board_id",
    component: ZeroComponent,
    resolve: {
      threads: ThreadsResolver,
    },
  },
  {
    path: ":board_id/:thread_id",
    component: ThreadComponent,
    resolve: {
      posts: PostsResolver,
    },
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "",
    component: BoardListComponent,
  },
  {
    path: "**",
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PostsResolver, ThreadsResolver],
})
export class ZeroRoutingModule {}
