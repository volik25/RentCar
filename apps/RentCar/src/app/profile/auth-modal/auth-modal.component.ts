import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.less']
})
export class AuthModalComponent implements OnInit {
  onDisplay = 'sign-in';
  constructor(private activeModal: NgbActiveModal, private api: ApiService,
    private loadingService: LoadingService) { }

  ngOnInit() {
  }

  close(){
    const subscription = this.api.getUser().subscribe(user => {
      this.activeModal.close(user);
      this.loadingService.removeSubscription(subscription);
    })
    this.loadingService.addSubscription(subscription);
  }

  changeForm(form: string){
    this.onDisplay = form;
  }
}
