import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ICatalogDetail } from '../../../core/models/i-catalog-detail.model';
import { CatalogService } from '../../../core/services/catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ChapterService } from '../../../core/services/chapter.service';
import { IChapter } from '../../../core/models/i-chapter.model';
import { IResponse } from '../../../core/models/i-response.response';
import { IErrorResponse } from '../../../core/models/i-error-response';
import { CatalogConstants } from '../../../core/utils/catalog.constant';
import { ICatalog } from '../../../core/models/i-catalog.model';
import { ToastyConfigUtils } from '../../../core/utils/toasty-config.util';
import { MessageConstants } from '../../../core/utils/message.constant';
import { FormValidationUtils } from '../../../core/utils/form-validation.util';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.css']
})
export class EditChapterComponent implements OnInit {

  updateForm: FormGroup;
  statusList: Array<ICatalogDetail>;
  chapterId: number;
  comicId: number;

  constructor(
    private catalogService: CatalogService,
    private chapterService: ChapterService,
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

  private loadParams(): void {
    this.activatedRoute.params.subscribe(params => {
      this.chapterId = params['id'];
      this.comicId = params['comicId'];
      this.loadComic();
    });
  }

  private loadComic() {
    this.chapterService.read(this.chapterId, [this.comicId]).subscribe(
      (response: IResponse<IChapter>) => {
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
      'number': new FormControl('', [Validators.required]),
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

  public update(): void {
    if (this.updateForm.valid) {
      this.chapterService.update(this.chapterId, this.getComicForm(), [this.comicId]).subscribe(
        (response: IResponse<IChapter>) => {
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

  private setComicForm(chapter: IChapter): void {
    this.updateForm.controls.name.setValue(chapter.name);
    this.updateForm.controls.number.setValue(chapter.number);
    this.updateForm.controls.image.setValue(chapter.image);
    this.updateForm.controls.status.setValue(chapter.status.toString());
  }

  private getComicForm(): IChapter {
    let chapter: IChapter = {
      name: this.updateForm.controls.name.value,
      image: this.updateForm.controls.image.value,
      number: parseInt(this.updateForm.controls.number.value),
      status: this.updateForm.controls.status.value
    }
    return chapter;
  }

  public goToList(): void {
    this.router.navigate([`/comics/${this.comicId}/chapters`]);
  }

}
