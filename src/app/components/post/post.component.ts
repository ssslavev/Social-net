import { Component, Input } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() postData = {
    name: '',
    content: '',
    user_id: '',
    created_at: ''
  };

  constructor(private postsService: PostsService) { }

}
