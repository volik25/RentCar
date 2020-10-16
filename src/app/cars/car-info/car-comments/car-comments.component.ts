import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
export class CarCommentsComponent implements OnInit, OnChanges {
  @Input() carId: number;
  @ViewChild('form') form: ElementRef<HTMLElement>;
  edit: boolean = false;
  userId: number;
  user: User;
  public userImage: string = 'http://vdknf.beget.tech/RentCarBack/Files/user.jpg';
  public commentId: number;
  public isAdmin = false;
  public comments: Comment[] = [];
  public userName: FormControl;
  public commentForm: FormGroup;
  public submitted = false;
  constructor(private api: ApiService,
              private ls: LoadingService,
              private fb: FormBuilder,
              private auth: AuthService,
              private ms: NgbModal) {
    this.userName = this.fb.control('');
    this.initForm();
  }

  ngOnInit(): void {
    const requests = [this.api.getComments(this.carId), this.api.checkAccess()]
    if (this.auth.getToken()) {
      requests.push(this.api.getUserId(), this.api.getUser());
    }
    const subs = forkJoin(requests).subscribe(([comments, isAdmin, userId, user]) => {
      this.comments = comments;
      this.isAdmin = isAdmin;
      this.userId = userId;
      this.user = user;
      this.userName.setValue(this.user.surname + ' ' + this.user.name);
      this.userName.disable();
      if (this.userId) this.setLikes(this.userId);
      if (this.user.image) this.userImage = this.user.image;
      this.ls.removeSubscription(subs);
    })
    this.ls.addSubscription(subs);
  }

  ngOnChanges(changes: SimpleChanges){
    this.carId = changes.carId.currentValue;
    const subs = this.api.getComments(this.carId).subscribe(comments => {
      this.comments = comments;
      this.ls.removeSubscription(subs)
    });
    this.ls.addSubscription(subs);
  }

  setLikes(id){
    const sub = this.api.isUserLike(id).subscribe(likes => {
      likes.forEach(like => {
        this.comments.forEach(comment => {
          if (comment.id == like.commentId) {
            if (like.isLike == 1) {
              comment.isLike = 1;
            }
            if (like.isLike == 0){
              comment.isLike = 0;
            }
          }
        });
      });
      this.ls.removeSubscription(sub)
    });
    this.ls.addSubscription(sub);
  }

  initForm(){
    this.submitted = false;
    this.commentForm = this.fb.group({
      pluses: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      minuses: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      comment: [null, Validators.required],
      rating: this.fb.control(null, Validators.required)
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

  sendComment(){
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }
    let comment= this.commentForm.getRawValue();
    comment['userId'] = this.userId;
    comment['carId'] = this.carId;
    if (this.edit) {
      this.editComment(comment);
    }
    else{
      this.addComment(comment);
    }
    this.edit = false;
  }

  addComment(comment){
    const subs = this.api.addComment(comment).subscribe(() => {
      const sub = this.api.getComments(this.carId).subscribe(comments => {
        this.comments = comments;
        this.initForm();
        this.ls.removeSubscription(sub);
      });
      this.ls.addSubscription(sub);
      this.ls.removeSubscription(subs)
    });
    this.ls.addSubscription(subs);
  }

  scrollToForm(comment: Comment) {
    this.initForm();
    this.form.nativeElement.scrollIntoView({block: 'nearest', behavior: 'smooth'});
    for (let i = 0; i < comment.pluses.length; i++) {
      if (i > 0) {
        const plusControl = <FormArray>this.commentForm.get('pluses');
        plusControl.push(this.fb.control('', Validators.required));
      }
    }
    for (let i = 0; i < comment.minuses.length; i++) {
      if (i > 0) {
        const minusControl = <FormArray>this.commentForm.get('minuses');
        minusControl.push(this.fb.control('', Validators.required));
      }
    }
    this.edit = true;
    this.commentId = comment.id;
    this.commentForm.patchValue(comment);
  }

  clearForm(){
    this.edit = false;
    this.initForm();
  }

  editComment(comment: Comment){
    comment['id'] = this.commentId;
    const subs = this.api.updateComment(comment).subscribe(() => {
      const sub = this.api.getComments(this.carId).subscribe(comments => {
        this.comments = comments;
        this.initForm();
        this.ls.removeSubscription(sub);
      });
      this.ls.addSubscription(sub);
      this.ls.removeSubscription(subs);
    });
    this.ls.addSubscription(subs);
  }

  removeComment(id){
    const subs = this.api.deleteComment(id).subscribe(() => {
      for (let i = 0; i < this.comments.length; i++) {
        const comment = this.comments[i];
        if (comment.id === id) {
          this.comments.splice(i, 1);
          break;
        }
      }
      this.ls.removeSubscription(subs);
    })
    this.ls.addSubscription(subs);
  }

  likeAction(comment: Comment, action: string){
    let data = {
      commentId: comment.id,
      userId: this.userId
    }
    switch (action) {
      case 'like':
        if (comment.isLike == 1) {
          data['isLike'] = null;
          comment.isLike = null;
        }
        else{
          data['isLike'] = 1;
          comment.isLike = 1;
        }
        break;
      case 'disLike':
        if (comment.isLike == 0) {
          data['islike'] = null;
          comment.isLike = null;
        }
        else{
          data['islike'] = 0;
          comment.isLike = 0;
        }
        break;
      default:
        break;
    }
    this.api.likeAction(data).subscribe(() => {
      this.api.getLikes(comment.id).subscribe(likes => {
        let id = comment.id;
        this.comments.forEach(comment => {
          if (comment.id == id) {
            comment.likes = likes.likes;
            comment.disLikes = likes.disLikes;
          }
        })
      })
    })
  }

  enter(){
    const modal = this.ms.open(AuthModalComponent, {centered: true, size: 'lg'});
    modal.result.then(()=>{
      const sub = this.api.getUserId().subscribe(id => {
        this.userId = id;
        this.ls.removeSubscription(sub);
      })
      this.ls.addSubscription(sub);
    });
  }

  get f() { return this.commentForm.controls; };
}
