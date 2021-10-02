import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {ShowcaseDialogComponent} from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProviderService} from '../../../services/provider.service';
import {UserService} from '../user.service';
import {ApiResponse} from '../../../model/api-model';
import {UserMessageService} from '../../../services/user-message.service';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public userForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    epfNo: ['', Validators.required],
    email: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private userMessageService: UserMessageService) {
  }

  ngOnInit(): void {

  }


  public saveUser(): void {
    console.log(this.userForm.value);
    this.userService.addUser(this.userForm.value).subscribe(
      (apiResponse: ApiResponse) => {
        this.userMessageService.success(`New User ${apiResponse.data['username']} created successfully`);
        this.router.navigate(['/pages/users']);
      }
    );
  }

  public cancel(): void {
    this.router.navigate(['/pages/users']);
  }

}
