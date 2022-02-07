import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  add(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.postService.addPost({ title } as Post).subscribe((post) => {
      this.posts.push(post);
    });
  }

  delete(post: Post): void {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.posts = this.posts.filter((p) => p !== post);
      this.postService.deletePost(post.id).subscribe();
    }
  }
}
