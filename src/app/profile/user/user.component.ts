import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  public user: User;
  public userImage: string;
  public closeResult: string;
  constructor( private auth: AuthService, private router: Router, private api: ApiService,
    private loadingService: LoadingService, private mS: NgbModal) {}

  public ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    const subscription = this.api.getUser().subscribe((user) => {
      this.user = user;
      if (user.image) {
        this.userImage = this.user.image;
      }
      else{
        this.userImage = this.api.userImage;
      }
      this.loadingService.removeSubscription(subscription);
    });
    this.loadingService.addSubscription(subscription);
  }

  modalOpen(){
    const modal = this.mS.open(EditUserComponent, {centered: true, size: 'xl', });
    modal.result.then((res)=>{
      this.closeResult = res;
      this.getUser();
    });
  }

  onUploadFileClick(event: PointerEvent): void {
    event.preventDefault();
    const fileInput = this.createUploadFileInput();
    fileInput.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files[0];
      const formData = new FormData();
      formData.append('CarImage', file, file.name.replace(' ', '_'));
      formData.append('path', 'avatars');
      const sub = this.api.uploadImg(formData).subscribe(img => {
        this.user['oldImg'] = this.user.image;
        this.user.image = img;
        this.api.updateUser(this.user).subscribe(() => {
          this.userImage = img;
        });
        this.loadingService.removeSubscription(sub);
      });
      this.loadingService.addSubscription(sub);
      fileInput.remove();
    });
    fileInput.click();
  }

  private createUploadFileInput(): HTMLInputElement {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <input hidden name="images" type="file" accept="image/*">
    `;
    return wrapper.firstElementChild as HTMLInputElement;
  }

  public revoeImg(){
    this.user['oldImg'] = this.user.image;
    this.user.image = null;
    this.userImage = this.api.userImage;
    this.api.updateUser(this.user).subscribe(res => {
      console.log(res);
      
    });
  }

  public exit() {
    this.auth.exit();
    this.router.navigate(['/sign-in']);
  }
}
