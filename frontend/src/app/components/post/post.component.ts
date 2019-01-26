import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() postData = {
    name: '',
    content: '',
    user_id: '',
    created_at: ''
  }

  constructor(private postsService: PostsService) { }

  ngOnInit() {


  }

}
