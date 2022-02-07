import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.loadPosts();
  }

  // getPosts(): void {
  //   this.postService.posts.slice(1, 5);
  //   // .loadPosts()
  //   // .subscribe((posts) => (this.posts = posts.slice(1, 5)));
  // }
}
