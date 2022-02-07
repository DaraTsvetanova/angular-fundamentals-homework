import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'body', 'userId', 'actions'];

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.postService.loadPosts();
  }

  add(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.postService.addPost({ title } as Post).subscribe((post) => {
      this.postService.posts.push(post);
    });
  }

  delete(post: Post): void {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.postService.posts = this.postService.posts.filter((p) => p !== post);
      this.postService.deletePost(post.id).subscribe();
    }
  }
}
