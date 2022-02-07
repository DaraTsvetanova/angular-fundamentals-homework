import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Post } from '../../post';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css'],
})
export class PostUpdateComponent implements OnInit {
  @Input() post?: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe((post) => (this.post = post));
  }

  save(): void {
    if (this.post) {
      this.postService.updatePost(this.post).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
