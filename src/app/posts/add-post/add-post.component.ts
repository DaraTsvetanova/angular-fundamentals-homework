import { Component, OnInit, ViewChild } from '@angular/core';
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
  constructor(private postService: PostService, private location: Location) {}

  ngOnInit(): void {
    this.postService.loadPosts();
  }

  add(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.postService.addPost({ title } as Post).subscribe((post) => {
      this.postService.posts.push(post) && this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }

  // showPostDetails = () => {
  //   this.router.navigateByUrl('./details/:id');
  // };

  delete(post: Post): void {
    this.postService.posts = this.postService.posts.filter((p) => p !== post);
    this.postService.deletePost(post.id).subscribe();
  }
}
