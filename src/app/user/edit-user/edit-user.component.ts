import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICatalogDetail } from '../../core/models/i-catalog-detail.model';
import { CatalogService } from '../../core/services/catalog.service';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../core/models/i-user.model';
import { IResponse } from '../../core/models/i-response.response';
import { ICatalog } from '../../core/models/i-catalog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationUtils } from '../../core/utils/form-validation.util';
import { IErrorResponse } from '../../core/models/i-error-response';
import { MessageConstants } from '../../core/utils/message.constant';
import { CatalogConstants } from '../../core/utils/catalog.constant';
import { ToastyConfigUtils } from '../../core/utils/toasty-config.util';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent  implements OnInit {

  updateForm: FormGroup;
  statusList: Array<ICatalogDetail>;
  userId: number;
  isPasswordDisabled: boolean;

  constructor(
    private catalogService: CatalogService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService
  ) { 
    this.isPasswordDisabled = true;
  }

  ngOnInit() {
    this.loadUpdateForm();
    this.loadParams();
    this.loadStatusList();
  }

  private loadParams(): void{
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      this.loadUser();
    });
  }

  private loadUser(){
    this.userService.read(this.userId).subscribe(
      (response: IResponse<IUser>) => { 
        this.setUserForm(response.data);
      },
      (errorResponse: IErrorResponse) => {
      }
    );
  }

  private loadUpdateForm(){
    this.updateForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl({value: '', disabled: true}, []),
      'status': new FormControl('', [Validators.required])
    });
  }

  private loadStatusList(){
    this.catalogService.readByCode(CatalogConstants.CATALOG_LIST_STATUS)
      .subscribe(
        (response: IResponse<ICatalog>) => {
          this.statusList = response.data.catalogDetails;
        },
        (errorResponse: IErrorResponse) => {
        }
      );
  }

  public update(): void{
    if(this.updateForm.valid){
      this.userService.update(this.userId, this.getUserForm()).subscribe(
        (response: IResponse<IUser>) => {
          this.toastyService.success(ToastyConfigUtils.getConfig(response.message, MessageConstants.MESSAGE_TITLE_SUCCESS));
        },
        (errorResponse: IErrorResponse) => {
          this.toastyService.error(ToastyConfigUtils.getConfig(errorResponse.message, MessageConstants.MESSAGE_TITLE_ERROR));
        }
      );
    }else{
      FormValidationUtils.validateAllFormFields(this.updateForm);
    }
  }

  private setUserForm(user: IUser): void{
    this.updateForm.controls.name.setValue(user.name);
    this.updateForm.controls.lastName.setValue(user.lastName);
    this.updateForm.controls.email.setValue(user.email);
    this.updateForm.controls.status.setValue(user.status.toString());
  }

  private getUserForm(): IUser{
    let user: IUser = {
      name: this.updateForm.controls.name.value,
      lastName: this.updateForm.controls.lastName.value,
      email: this.updateForm.controls.email.value,
      status: this.updateForm.controls.status.value
    }
    if(!this.isPasswordDisabled){
      user.password = this.updateForm.controls.password.value;
    }
    return user;
  }

  public goToList(): void{
    this.router.navigate(['/users']);
  }

  public tooglePassword(): void{
    if(!this.isPasswordDisabled){
      this.updateForm.removeControl('password');
      this.updateForm.addControl('password', new FormControl({value: '', disabled: true}, [Validators.required]));
    }else{ 
      this.updateForm.removeControl('password');
      this.updateForm.addControl('password', new FormControl('', [Validators.required]));
    }
    this.isPasswordDisabled = !this.isPasswordDisabled;
  }

}
