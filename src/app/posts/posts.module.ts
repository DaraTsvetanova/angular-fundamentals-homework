import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsComponent } from './posts.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostService } from '../post.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ɵangular_packages_forms_forms_m } from '@angular/forms';

@NgModule({
  declarations: [
    PostDetailComponent,
    PostsComponent,
    AddPostComponent,
    PostUpdateComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [PostService],
})
export class PostsModule {}
