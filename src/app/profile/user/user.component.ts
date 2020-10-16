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
  closeResult: string;
  constructor( private auth: AuthService, private router: Router, private api: ApiService,
    private loadingService: LoadingService, private mS: NgbModal) {}

  public ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    const subscription = this.api.getUser().subscribe((user) => {
      this.user = user;
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
      this.api.uploadCarImg(formData).subscribe(img => {
        this.user['oldImg'] = this.user.image;
        this.user.image = img;
        this.api.updateUser(this.user).subscribe();
      })
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

  public exit() {
    this.auth.exit();
    this.router.navigate(['/sign-in']);
  }
}
