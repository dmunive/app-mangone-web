import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ISignIn } from '../../core/models/i-signin.model';
import { AuthenticationService } from '../../core/services/authentication.service';
import { IResponse } from '../../core/models/i-response.response';
import { IErrorResponse } from '../../core/models/i-error-response';
import { MessageConstants } from '../../core/utils/message.constant';
import { ToastyConfigUtils } from '../../core/utils/toasty-config.util';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { FormValidationUtils } from '../../core/utils/form-validation.util';
import { IToken } from '../../core/models/i-token.model';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  signInForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private toastyService: ToastyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadSignInForm();
  }

  private loadSignInForm(){
    this.signInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    });
  }

  public signIn(){
    let signInRequest: ISignIn = {
      email: this.signInForm.controls.email.value,
      password: this.signInForm.controls.password.value,
    }
    if(this.signInForm.valid){
      this.authenticationService.signIn(signInRequest).subscribe(
        (response: IResponse<IToken>)=>{
          this.authenticationService.setToken(response.data);
          this.toastyService.success(ToastyConfigUtils.getConfig(response.message, MessageConstants.MESSAGE_TITLE_SUCCESS));
          this.router.navigate(['/users']);
        },
        (errorResponse: IErrorResponse) =>{
          console.log(errorResponse)
          this.toastyService.error(ToastyConfigUtils.getConfig(errorResponse.message, MessageConstants.MESSAGE_TITLE_ERROR));
        }
      )
    }else{
      FormValidationUtils.validateAllFormFields(this.signInForm);
    } 

  }

}
