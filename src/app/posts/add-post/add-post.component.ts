import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../post';
import { PostService } from '../../post.service';
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

  add(title: string, body: string, userId: number): void {
    title = title.trim();
    body = body.trim();
    if (!title && !body && !userId) {
      return;
    }
    this.postService
      .addPost({ title, body, userId } as Post)
      .subscribe((post) => {
        this.postService.posts.push(post) && this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }
}
