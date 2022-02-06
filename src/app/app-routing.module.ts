import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostUpdateComponent } from './posts/post-update/post-update.component';
import { AddPostComponent } from './posts/add-post/add-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PostDetailComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostUpdateComponent },
  { path: 'add', component: AddPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
