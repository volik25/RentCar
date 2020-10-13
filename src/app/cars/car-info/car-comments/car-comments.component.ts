import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { Comment } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { AuthModalComponent } from 'src/app/profile/auth-modal/auth-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'car-comments',
  templateUrl: './car-comments.component.html',
  styleUrls: ['./car-comments.component.less']
})
export class CarCommentsComponent implements OnInit {
  @Input() carId: number;
  userId: number;
  user: User;
  public comments: Comment[] = [];
  public commentForm: FormGroup;
  constructor(private api: ApiService,
              private ls: LoadingService,
              private fb: FormBuilder,
              private auth: AuthService,
              private ms: NgbModal) {
    this.initForm();
  }

  ngOnInit(): void {
    const requests = [this.api.getComments(this.carId)]
    if (this.auth.getToken()) {
      requests.push(this.api.getUserId(), this.api.getUser());
    }
    const subs = forkJoin(requests).subscribe(([comments, userId, user]) => {
      this.comments = comments;
      this.userId = userId;
      this.user = user;
      this.ls.removeSubscription(subs);
    })
    this.ls.addSubscription(subs);
  }

  initForm(){
    this.commentForm = this.fb.group({
      pluses: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      minuses: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      comment: [null, Validators.required]
    })
  }

  addRow(control){
    switch (control){
      case 'plus':
        const plusControl = <FormArray>this.commentForm.get('pluses');
        plusControl.push(this.fb.control('', Validators.required));
        break;
      case 'minus':
        const minusControl = <FormArray>this.commentForm.get('minuses');
        minusControl.push(this.fb.control('', Validators.required));
        break;
    }
  }

  getFormControls(form: string) {
    return (<FormArray>this.commentForm.get(form)).controls;
  }

  removeControl(index: number, formName: string) {
    const form = <FormArray>this.commentForm.get(formName);
    form.removeAt(index);
  }

  addComment(){
    let comment= this.commentForm.getRawValue();
    comment['userId'] = this.userId;
    comment['carId'] = this.carId;
    console.log(comment);
    
    const subs = this.api.addComment(comment).subscribe(() => {
      this.commentForm.reset();
      this.ls.removeSubscription(subs)
    });
    this.ls.addSubscription(subs);
  }

  enter(){
    const modal = this.ms.open(AuthModalComponent, {centered: true, size: 'xl'});
    modal.result.then((res)=>{
      this.userId = res;
      // const userForm = this.orderForm.get('user') as FormGroup;
      // userForm.patchValue(this.user);
      // userForm.disable();
    });
  }
}
