import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../core/services/catalog.service';
import { IResponse } from '../../core/models/i-response.response';
import { ICatalog } from '../../core/models/i-catalog.model';
import { ICatalogDetail } from '../../core/models/i-catalog-detail.model';
import { UserService } from '../../core/services/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IUser } from '../../core/models/i-user.model';
import { FormValidationUtils } from '../../core/utils/form-validation.util';
import { Router } from '@angular/router';
import { CatalogConstants } from '../../core/utils/catalog.constant';
import { IErrorResponse } from '../../core/models/i-error-response';
import { MessageConstants } from '../../core/utils/message.constant';
import { ToastyService } from 'ng2-toasty';
import { ToastyConfigUtils } from '../../core/utils/toasty-config.util';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createForm: FormGroup;
  statusList: Array<ICatalogDetail>;

  constructor(
    private catalogService: CatalogService,
    private userService: UserService,
    private router: Router,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.loadCreateForm();
    this.loadStatusList();
  }

  private loadCreateForm(){
    this.createForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required]),
      'status': new FormControl('', [Validators.required])
    });
  }

  private loadStatusList(){
    this.catalogService.readByCode(CatalogConstants.CATALOG_LIST_STATUS)
      .subscribe(
        (response: IResponse<ICatalog>) => {
          this.statusList = response.data.catalogDetails;
        },(errorResponse: IErrorResponse) => {
        }
      );
  }

  public create(): void{
    if(this.createForm.valid){
      this.userService.create(this.getUserForm()).subscribe(
        (response: IResponse<IUser>) => {
          this.toastyService.success(ToastyConfigUtils.getConfig(response.message, MessageConstants.MESSAGE_TITLE_SUCCESS));
          this.goToList();
        },
        (errorResponse: IErrorResponse) => {
          this.toastyService.error(ToastyConfigUtils.getConfig(errorResponse.message, MessageConstants.MESSAGE_TITLE_ERROR));
        }
      );
    }else{
      FormValidationUtils.validateAllFormFields(this.createForm);
    }
  }

  private getUserForm(): IUser{
    let user: IUser = {
      name: this.createForm.controls.name.value,
      lastName: this.createForm.controls.lastName.value,
      email: this.createForm.controls.email.value,
      password: this.createForm.controls.password.value,
      status: this.createForm.controls.status.value
    }
    return user;
  }

  public goToList(): void{
    this.router.navigate(['/users']);
  }

}
