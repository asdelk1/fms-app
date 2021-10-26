import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {getDeepFromObject, NB_AUTH_OPTIONS, NbAuthResult, NbAuthService} from '@nebular/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {ApiResponse} from '../../../model/api-model';
import {UserMessageService} from '../../../services/user-message.service';


@Component({
  selector: 'ngx-owerp-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  ngOnInit(): void {
  }

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              private route: ActivatedRoute,
              protected router: Router,
              private authService: AuthService,
              private userMessageService: UserMessageService) {

    // this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    // this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    // this.strategy = this.getConfigValue('forms.resetPassword.strategy');
  }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    const token: string = this.route.snapshot.queryParamMap.get('token');
    console.log(token);

    // this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
    //   this.submitted = false;
    //   if (result.isSuccess()) {
    //     this.messages = result.getMessages();
    //   } else {
    //     this.errors = result.getErrors();
    //   }

    //   const redirect = result.getRedirect();
    //   if (redirect) {
    //     setTimeout(() => {
    //       return this.router.navigateByUrl(redirect);
    //     }, this.redirectDelay);
    //   }
    //   this.cd.detectChanges();
    // });
    console.log(this.user.password);
    this.authService.resetPassword(token, this.user.password).subscribe({
      next: (res: ApiResponse) => {
        this.cd.detectChanges();
        this.userMessageService.success('Password changed successfully');
        this.router.navigateByUrl('/admin/login');
      },
      error: (err => {
        this.userMessageService.error(err.error.message);
      })
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
