import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ICatalogDetail } from '../../../../core/models/i-catalog-detail.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApplicationConstants } from '../../../../core/utils/application.constant';
import { IPage } from '../../../../core/models/i-page.model';
import { MatSort, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService } from '../../../../core/services/page.service';
import { CatalogService } from '../../../../core/services/catalog.service';
import { CatalogConstants } from '../../../../core/utils/catalog.constant';
import { IResponse } from '../../../../core/models/i-response.response';
import { ICatalog } from '../../../../core/models/i-catalog.model';
import { IErrorResponse } from '../../../../core/models/i-error-response';
import { merge } from 'rxjs/observable/merge';
import { ToastyConfigUtils } from '../../../../core/utils/toasty-config.util';
import { MessageConstants } from '../../../../core/utils/message.constant';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  comicId: number;
  chapterId: number;
  statusList: Array<ICatalogDetail>;
  searchForm: FormGroup = new FormGroup({});
  createForm: FormGroup = new FormGroup({});
  numberRows: number = ApplicationConstants.DEFAULT_NUMBER_ROWS;
  isLoading: boolean;
  currentPage: number;
  displayedColumns = ['number', 'image', 'status', 'options'];
  dataSource: Array<IPage>;
  totalElements: number;
  currentSort: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private catalogService: CatalogService,
    private pageService: PageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastyService: ToastyService,
    public dialog: MatDialog
  ) {
    this.init();
  }

  ngOnInit() {
    this.loadParams();
    this.loadStatusList();
    this.loadSearchForm();
    this.loadCreateForm();
    this.search();
    this.initCurrentPage();
    this.sortTable();
  }

  private init() {
    this.isLoading = false;
    this.currentPage = 0;
    this.totalElements = 0;
    this.currentSort = 'number,asc';
  }

  private loadParams(): void {
    this.activatedRoute.params.subscribe(params => {
      this.comicId = params['comicId'];
      this.chapterId = params['chapterId'];
    });
  }

  private loadSearchForm() {
    this.searchForm = new FormGroup({
      'number': new FormControl('', []),
      'status': new FormControl('', [])
    });
  }

  private loadCreateForm() {
    this.createForm = new FormGroup({
      'image': new FormControl('', [Validators.required])
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

  public search() {
    this.isLoading = true;
    this.pageService.search(this.generateSearchRequest(), this.generatePaginatorRequest(), [ this.comicId, this.chapterId ]).subscribe(
      (response) => {
        this.dataSource = response.data.content;
        this.totalElements = response.data.totalElements;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  public clean(): void {
    this.searchForm.reset()
    this.loadSearchForm();
    this.init();
    this.search();
  }

  private generateSearchRequest(): any {
    let params = {
      number: this.searchForm.controls.number.value,
      status: this.searchForm.controls.status.value
    };
    return params;
  }

  private generatePaginatorRequest(): any {
    var paginator = {
      page: this.paginator.pageIndex,
      size: this.numberRows,
      sort: this.currentSort,
    }
    return paginator;
  }

  private initCurrentPage() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  private sortTable(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .subscribe(() => {
        this.currentSort = this.sort.direction ? this.sort.active + ',' + this.sort.direction : '';
        this.search();
      });
  }

  public create(comicId: number, chapterId: number): void {
    let page: IPage = {
      number: this.dataSource.length + 1,
      image: this.createForm.controls.image.value,
      status: CatalogConstants.CATALOG_STATUS_ACTIVE
    };
    if(this.createForm.valid){
      this.pageService.create(page, [ this.comicId, this.chapterId ]).subscribe(
        (response: IResponse<IPage>) => {
          this.toastyService.success(ToastyConfigUtils.getConfig(response.message, MessageConstants.MESSAGE_TITLE_SUCCESS));
          this.search();
          this.cleanCreate();
        },
        (errorResponse: IErrorResponse) => {
          this.toastyService.error(ToastyConfigUtils.getConfig(errorResponse.message, MessageConstants.MESSAGE_TITLE_ERROR));
        }
      );
    }else{
      if(!this.createForm.controls.image.valid){
        this.toastyService.warning(ToastyConfigUtils.getConfig(MessageConstants.MESSAGE_ERROR_IMAGE, MessageConstants.MESSAGE_TITLE_WARNING));
      }
    }
  }

  public cleanCreate(): void {
    this.createForm.controls.image.setValue("");
  }

  public delete(pageId: number): void {
    this.pageService.delete(pageId, [ this.comicId, this.chapterId ]).subscribe(
      (response: IResponse<IPage>) => {
        this.toastyService.success(ToastyConfigUtils.getConfig(response.message, MessageConstants.MESSAGE_TITLE_SUCCESS));
        this.search();
      },
      (errorResponse: IErrorResponse) => {
        this.toastyService.error(ToastyConfigUtils.getConfig(errorResponse.message, MessageConstants.MESSAGE_TITLE_ERROR));
      }
    );
  }

  public showImage(image: string): void{
    let dialogRef = this.dialog.open(ShowImageDialog, {
      width: '40%',
      maxWidth: '450px',
      minWidth: '300px',
      data: { image: image }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

@Component({
  selector: 'file-image-dialog',
  template: '<div fxFlex fxFlexAlign="center center"><img [src]=data.image width="100%"></div>',
})
export class ShowImageDialog {

  constructor(
    public dialogRef: MatDialogRef<ShowImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
