import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../core/services/catalog.service';
import { IResponse } from '../../core/models/i-response.response';
import { ICatalog } from '../../core/models/i-catalog.model';
import { ICatalogDetail } from '../../core/models/i-catalog-detail.model';
import { ComicService } from '../../core/services/comic.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IComic } from '../../core/models/i-comic.model';
import { FormValidationUtils } from '../../core/utils/form-validation.util';
import { Router } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { ICategory } from '../../core/models/i-category.model';
import { IPaginator } from '../../core/models/i-paginator.model';
import { IErrorResponse } from '../../core/models/i-error-response';
import { CatalogConstants } from '../../core/utils/catalog.constant';
import { MessageConstants } from '../../core/utils/message.constant';
import { ToastyService } from 'ng2-toasty';
import { ToastyConfigUtils } from '../../core/utils/toasty-config.util';

@Component({
  selector: 'app-create-comic',
  templateUrl: './create-comic.component.html',
  styleUrls: ['./create-comic.component.css']
})
export class CreateComicComponent implements OnInit {

  createForm: FormGroup;
  statusList: Array<ICatalogDetail>;
  categoryList: Array<ICategory>;

  constructor(
    private catalogService: CatalogService,
    private comicService: ComicService,
    private categoryService: CategoryService,
    private router: Router,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.loadCreateForm();
    this.loadStatusList();
    this.loadCategoryList();
  }

  private loadCreateForm(){
    this.createForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'categories': new FormControl('', [Validators.required]),
      'image': new FormControl('', [Validators.required]),
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

  private loadCategoryList(){
    var paginator = {
      page: 0,
      size: 10000,
      sort: 'name,asc'
    };
    this.categoryService.search({},paginator)
      .subscribe(
        (response: IResponse<IPaginator<ICategory>>) => {
          this.categoryList = response.data.content;
      },(errorResponse: any) => {
    });
  }

  public create(): void{
    if(this.createForm.valid){
      this.comicService.create(this.getComicForm()).subscribe(
        (response: IResponse<IComic>) => {
          this.toastyService.success(ToastyConfigUtils.getConfig(response.message, MessageConstants.MESSAGE_TITLE_SUCCESS));
          this.goToList();
        },
        (errorResponse: IErrorResponse) =>{
          this.toastyService.error(ToastyConfigUtils.getConfig(errorResponse.message, MessageConstants.MESSAGE_TITLE_ERROR));
        }
      );
    }else{
      FormValidationUtils.validateAllFormFields(this.createForm);
      if(!this.createForm.controls.image.valid){
        this.toastyService.warning(ToastyConfigUtils.getConfig(MessageConstants.MESSAGE_ERROR_IMAGE, MessageConstants.MESSAGE_TITLE_WARNING));
      }
    }
  }

  private getComicForm(): IComic{
    let comic: IComic = {
      name: this.createForm.controls.name.value,
      image: this.createForm.controls.image.value,
      categories: this.createForm.controls.categories.value,
      status: this.createForm.controls.status.value
    }
    return comic;
  }

  public goToList(): void{
    this.router.navigate(['/comics']);
  }

}
