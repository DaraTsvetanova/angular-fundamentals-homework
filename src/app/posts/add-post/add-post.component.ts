import { Component, OnInit } from '@angular/core';
import { Post } from '../../post';
import { PostService } from '../../post.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  add(title: string, id: number, body: string, userId: number): void {
    title = title.trim();
    body = body.trim();
    if (!title && !body && !id && !userId) {
      return;
    }
    this.postService
      .addPost({ title, body, id, userId } as Post)
      .subscribe((post) => {
        this.posts.push(post) && this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

  // showPostDetails = () => {
  //   this.router.navigateByUrl('./details/:id');
  // };

  delete(post: Post): void {
    this.posts = this.posts.filter((p) => p !== post);
    this.postService.deletePost(post.id).subscribe();
  }
}
