import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {getDeepFromObject, NB_AUTH_OPTIONS, NbAuthResult, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {ApiResponse} from '../../../model/api-model';
import {UserMessageService} from '../../../services/user-message.service';

@Component({
  selector: 'ngx-owerp-reset-password',
  templateUrl: './request-password-reset.component.html'
})
export class RequestPasswordResetComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  public form: FormGroup = new FormGroup({
    username: new FormControl('')
  });

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router,
              private authService: AuthService,
              private userMessageService: UserMessageService) {

    this.redirectDelay = this.getConfigValue('forms.requestPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.requestPassword.showMessages');
    this.strategy = this.getConfigValue('forms.requestPassword.strategy');
  }

  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    const email: string = this.form.controls['username'].value;
    this.authService.requestPassword(email).subscribe({
      next: (res: ApiResponse) => {
        this.cd.detectChanges();
        this.userMessageService.success('Email is sent with password reset token');
        return this.router.navigateByUrl('/auth/login');
      },
      error: (error: any) => {
        this.userMessageService.error(error.error.message);
        return this.router.navigateByUrl('/auth/login');
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
