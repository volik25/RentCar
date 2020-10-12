import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Comment } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'car-comments',
  templateUrl: './car-comments.component.html',
  styleUrls: ['./car-comments.component.less']
})
export class CarCommentsComponent implements OnInit {
  @Input() carId: number;
  user: User;
  public comments: Comment[] = [];
  public commentForm: FormGroup;
  constructor(private api: ApiService, private ls: LoadingService, private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    const requests = [this.api.getUser(), this.api.getComments(this.carId)]
    const subs = forkJoin(requests).subscribe(([user, comments]) => {
      this.comments = comments;
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

  }
}
