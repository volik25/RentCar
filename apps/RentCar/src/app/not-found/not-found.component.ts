import { Component, OnDestroy, OnInit } from '@angular/core';
import { notFoundService } from '../services/notFound.service';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less']
})
export class NotFoundComponent implements OnInit, OnDestroy{

  constructor(private nf: notFoundService) { }

  ngOnInit() {
    setTimeout(() => this.nf.setNotFound(true));
  }

  ngOnDestroy() {
    this.nf.setNotFound(false);
  }
}
