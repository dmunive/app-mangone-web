import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICatalogDetail } from '../../core/models/i-catalog-detail.model';
import { CatalogService } from '../../core/services/catalog.service';
import { ComicService } from '../../core/services/comic.service';
import { IComic } from '../../core/models/i-comic.model';
import { IResponse } from '../../core/models/i-response.response';
import { ICatalog } from '../../core/models/i-catalog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationUtils } from '../../core/utils/form-validation.util';
import { CategoryService } from '../../core/services/category.service';
import { ICategory } from '../../core/models/i-category.model';
import { IPaginator } from '../../core/models/i-paginator.model';
import { CatalogConstants } from '../../core/utils/catalog.constant';
import { ToastyService } from 'ng2-toasty';
import { IErrorResponse } from '../../core/models/i-error-response';
import { ToastyConfigUtils } from '../../core/utils/toasty-config.util';
import { MessageConstants } from '../../core/utils/message.constant';

@Component({
  selector: 'app-edit-comic',
  templateUrl: './edit-comic.component.html',
  styleUrls: ['./edit-comic.component.css']
})
export class EditComicComponent implements OnInit {

  updateForm: FormGroup;
  statusList: Array<ICatalogDetail>;
  categoryList: Array<ICategory>;
  comicId: number;

  constructor(
    private catalogService: CatalogService,
    private comicService: ComicService,
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
    this.loadCategoryList();
  }

  private loadParams(): void {
    this.activatedRoute.params.subscribe(params => {
      this.comicId = params['id'];
      this.loadComic();
    });
  }

  private loadComic() {
    this.comicService.read(this.comicId).subscribe(
      (response: IResponse<IComic>) => {
        this.setComicForm(response.data);
      },
      (errorResponse: IErrorResponse) => {
      }
    );
  }

  private loadUpdateForm() {
    this.updateForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'image': new FormControl('', []),
      'categories': new FormControl('', [Validators.required]),
      'status': new FormControl('', [Validators.required])
    });
  }

  private loadStatusList() {
    this.catalogService.readByCode(CatalogConstants.CATALOG_LIST_STATUS)
      .subscribe(
        (response: IResponse<ICatalog>) => {
          this.statusList = response.data.catalogDetails;
        }, (errorResponse: IErrorResponse) => {
        }
      );
  }

  private loadCategoryList() {
    var paginator = {
      page: 0,
      size: 10000,
      sort: 'name,asc'
    };
    this.categoryService.search({}, paginator)
      .subscribe(
        (response: IResponse<IPaginator<ICategory>>) => {
          this.categoryList = response.data.content;
        }, (errorResponse: any) => {
        });
  }

  public update(): void {
    if (this.updateForm.valid) {
      this.comicService.update(this.comicId, this.getComicForm()).subscribe(
        (response: IResponse<IComic>) => {
          this.toastyService.success(ToastyConfigUtils.getConfig(response.message, MessageConstants.MESSAGE_TITLE_SUCCESS));
        },
        (errorResponse: IErrorResponse) => {
          this.toastyService.error(ToastyConfigUtils.getConfig(errorResponse.message, MessageConstants.MESSAGE_TITLE_ERROR));
        }
      );
    } else {
      FormValidationUtils.validateAllFormFields(this.updateForm);
    }
  }

  private setComicForm(comic: IComic): void {
    this.updateForm.controls.name.setValue(comic.name);
    this.updateForm.controls.categories.setValue(comic.categories);
    this.updateForm.controls.image.setValue(comic.image);
    this.updateForm.controls.status.setValue(comic.status.toString());
  }

  private getComicForm(): IComic {
    let comic: IComic = {
      name: this.updateForm.controls.name.value,
      image: this.updateForm.controls.image.value,
      categories: this.updateForm.controls.categories.value,
      status: this.updateForm.controls.status.value
    }
    return comic;
  }

  public goToList(): void {
    this.router.navigate(['/comics']);
  }

  public compareCategory(category1: ICategory, category2: ICategory): boolean {
    return category1 && category2 ? category1.categoryId === category2.categoryId : category1 === category2;
  }

}
