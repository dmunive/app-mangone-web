import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICatalogDetail } from '../../../core/models/i-catalog-detail.model';
import { CatalogService } from '../../../core/services/catalog.service';
import { ComicService } from '../../../core/services/comic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { CatalogConstants } from '../../../core/utils/catalog.constant';
import { IResponse } from '../../../core/models/i-response.response';
import { ICatalog } from '../../../core/models/i-catalog.model';
import { IErrorResponse } from '../../../core/models/i-error-response';
import { IPaginator } from '../../../core/models/i-paginator.model';
import { ToastyConfigUtils } from '../../../core/utils/toasty-config.util';
import { IComic } from '../../../core/models/i-comic.model';
import { MessageConstants } from '../../../core/utils/message.constant';
import { FormValidationUtils } from '../../../core/utils/form-validation.util';
import { ChapterService } from '../../../core/services/chapter.service';
import { IChapter } from '../../../core/models/i-chapter.model';

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.css']
})
export class CreateChapterComponent implements OnInit {

  comicId: number;
  createForm: FormGroup;
  statusList: Array<ICatalogDetail>;

  constructor(
    private catalogService: CatalogService,
    private chapterService: ChapterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.loadParams();
    this.loadCreateForm();
    this.loadStatusList();
  }

  private loadParams(): void {
    this.activatedRoute.params.subscribe(params => {
      this.comicId = params['comicId'];
    });
  }

  private loadCreateForm(){
    this.createForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'number': new FormControl('', [Validators.required]),
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

  public create(): void{
    if(this.createForm.valid){
      this.chapterService.create(this.getChapterForm(), [this.comicId]).subscribe(
        (response: IResponse<IChapter>) => {
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

  private getChapterForm(): IChapter{
    let chapter: IChapter = {
      name: this.createForm.controls.name.value,
      image: this.createForm.controls.image.value,
      number: parseInt(this.createForm.controls.number.value),
      status: this.createForm.controls.status.value
    }
    return chapter;
  }

  public goToList(): void{
    this.router.navigate([`/comics/${this.comicId}/chapters`]);
  }

}
