import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CatalogService } from '../../core/services/catalog.service';
import { IResponse } from '../../core/models/i-response.response';
import { ICatalog } from '../../core/models/i-catalog.model';
import { ICatalogDetail } from '../../core/models/i-catalog-detail.model';
import { CategoryService } from '../../core/services/category.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ICategory } from '../../core/models/i-category.model';
import { FormValidationUtils } from '../../core/utils/form-validation.util';
import { Router } from '@angular/router';
import { IErrorResponse } from '../../core/models/i-error-response';
import { MessageConstants } from '../../core/utils/message.constant';
import { CatalogConstants } from '../../core/utils/catalog.constant';
import { ToastyService } from 'ng2-toasty';
import { ToastyConfigUtils } from '../../core/utils/toasty-config.util';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  createForm: FormGroup;
  statusList: Array<ICatalogDetail>;

  constructor(
    private catalogService: CatalogService,
    private categoryService: CategoryService,
    private router: Router,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.loadCreateForm();
    this.loadStatusList();
  }

  private loadCreateForm() {
    this.createForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'status': new FormControl('', [Validators.required])
    });
  }

  private loadStatusList() {
    this.catalogService.readByCode(CatalogConstants.CATALOG_LIST_STATUS)
      .subscribe(
        (response: IResponse<ICatalog>) => {
          this.statusList = response.data.catalogDetails;;
        }, (errorResponse: IErrorResponse) => {
          this.toastyService.error(ToastyConfigUtils.getConfig(errorResponse.message, MessageConstants.MESSAGE_TITLE_ERROR));
        }
      );
  }

  public create(): void {
    if (this.createForm.valid) {
      this.categoryService.create(this.getCategoryForm()).subscribe(
        (response: IResponse<ICategory>) => {
          this.toastyService.success(ToastyConfigUtils.getConfig(response.message, MessageConstants.MESSAGE_TITLE_SUCCESS));
          this.goToList();
        },
        (errorResponse: IErrorResponse) => {
          this.toastyService.error(ToastyConfigUtils.getConfig(errorResponse.message, MessageConstants.MESSAGE_TITLE_ERROR));
        }
      );
    } else {
      FormValidationUtils.validateAllFormFields(this.createForm);
    }
  }

  private getCategoryForm(): ICategory {
    let category: ICategory = {
      name: this.createForm.controls.name.value,
      status: this.createForm.controls.status.value
    }
    return category;
  }

  public goToList(): void {
    this.router.navigate(['/categories']);
  }

}
