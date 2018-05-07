import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICatalogDetail } from '../../core/models/i-catalog-detail.model';
import { CatalogService } from '../../core/services/catalog.service';
import { CategoryService } from '../../core/services/category.service';
import { ICategory } from '../../core/models/i-category.model';
import { IResponse } from '../../core/models/i-response.response';
import { ICatalog } from '../../core/models/i-catalog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationUtils } from '../../core/utils/form-validation.util';
import { IErrorResponse } from '../../core/models/i-error-response';
import { MessageConstants } from '../../core/utils/message.constant';
import { CatalogConstants } from '../../core/utils/catalog.constant';
import { ToastyService } from 'ng2-toasty';
import { ToastyConfigUtils } from '../../core/utils/toasty-config.util';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent  implements OnInit {

  updateForm: FormGroup;
  statusList: Array<ICatalogDetail>;
  categoryId: number;

  constructor(
    private catalogService: CatalogService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService
  ) { 
  }

  ngOnInit() {
    this.loadUpdateForm();
    this.loadParams();
    this.loadStatusList();
  }

  private loadParams(): void{
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = params['id'];
      this.loadCategory();
    });
  }

  private loadCategory(){
    this.categoryService.read(this.categoryId).subscribe(
      (response: IResponse<ICategory>) => { 
        this.setCategoryForm(response.data);
      },
      (errorResponse: IErrorResponse) => {
      }
    );
  }

  private loadUpdateForm(){
    this.updateForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'status': new FormControl('', [Validators.required])
    });
  }

  private loadStatusList(){
    this.catalogService.readByCode(CatalogConstants.CATALOG_LIST_STATUS)
      .subscribe(
        (response: IResponse<ICatalog>) => {
          this.statusList = response.data.catalogDetails;
      },(errorResponse: any) => {
    });
  }

  public update(): void{
    if(this.updateForm.valid){
      this.categoryService.update(this.categoryId, this.getCategoryForm()).subscribe(
        (response: IResponse<ICategory>) => {
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

  private setCategoryForm(category: ICategory): void{
    this.updateForm.controls.name.setValue(category.name);
    this.updateForm.controls.status.setValue(category.status.toString());
  }

  private getCategoryForm(): ICategory{
    let category: ICategory = {
      name: this.updateForm.controls.name.value,
      status: this.updateForm.controls.status.value
    }
    return category;
  }

  public goToList(): void{
    this.router.navigate(['/categories']);
  }

}
