import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/car';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'car-comments',
  templateUrl: './car-comments.component.html',
  styleUrls: ['./car-comments.component.less']
})
export class CarCommentsComponent implements OnInit {

  comments: Comment[];
  constructor(private api: ApiService, private ls: LoadingService) { }

  ngOnInit(): void {
    const subs = this.api.getComments().subscribe(comments => {
      this.comments = comments;
      this.ls.removeSubscription(subs);
    });
    this.ls.addSubscription(subs);
  }

}
