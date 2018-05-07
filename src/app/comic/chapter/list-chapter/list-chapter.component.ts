import { Component, OnInit, ViewChild } from '@angular/core';
import { ICatalogDetail } from '../../../core/models/i-catalog-detail.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ApplicationConstants } from '../../../core/utils/application.constant';
import { IChapter } from '../../../core/models/i-chapter.model';
import { MatSort, MatPaginator } from '@angular/material';
import { CatalogService } from '../../../core/services/catalog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogConstants } from '../../../core/utils/catalog.constant';
import { ICatalog } from '../../../core/models/i-catalog.model';
import { IResponse } from '../../../core/models/i-response.response';
import { IErrorResponse } from '../../../core/models/i-error-response';
import { merge } from 'rxjs/observable/merge';
import { ChapterService } from '../../../core/services/chapter.service';

@Component({
  selector: 'app-list-chapter',
  templateUrl: './list-chapter.component.html',
  styleUrls: ['./list-chapter.component.css']
})
export class ListChapterComponent implements OnInit {

  comicId: number;
  statusList: Array<ICatalogDetail>;
  searchForm: FormGroup = new FormGroup({});
  numberRows: number = ApplicationConstants.DEFAULT_NUMBER_ROWS;
  isLoading: boolean;
  currentPage: number;
  displayedColumns = ['name', 'number', 'status', 'options'];
  dataSource: Array<IChapter>;
  totalElements: number;
  currentSort: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private catalogService: CatalogService,
    private chapterService: ChapterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.init();
  }

  ngOnInit() {
    this.loadParams();
    this.loadStatusList();
    this.loadSearchForm();
    this.search();
    this.initCurrentPage();
    this.sortTable();
  }

  private init() {
    this.isLoading = false;
    this.currentPage = 0;
    this.totalElements = 0;
    this.currentSort = 'name,asc';
  }

  private loadParams(): void {
    this.activatedRoute.params.subscribe(params => {
      this.comicId = params['comicId'];
    });
  }

  private loadSearchForm() {
    this.searchForm = new FormGroup({
      'name': new FormControl('', []),
      'status': new FormControl('', [])
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
    this.chapterService.search(this.generateSearchRequest(), this.generatePaginatorRequest(), [ this.comicId ]).subscribe(
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
      name: this.searchForm.controls.name.value,
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

  public goToUpdate(chapterId: number): void {
    this.router.navigate([`/comics/${this.comicId}/chapters/update/${chapterId}`]);
  }

  public goToCreate(): void {
    this.router.navigate([`/comics/${this.comicId}/chapters/create`]);
  }

  public goToListPage(chapterId: number): void {
    this.router.navigate([`/comics/${this.comicId}/chapters/${chapterId}/pages`]);
  }
}
