import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ComicService } from '../../core/services/comic.service';
import { IComic } from '../../core/models/i-comic.model';
import { IResponse } from '../../core/models/i-response.response';
import { IPaginator } from '../../core/models/i-paginator.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { Router } from '@angular/router';
import { ApplicationConstants } from '../../core/utils/application.constant';
import { CategoryService } from '../../core/services/category.service';
import { IErrorResponse } from '../../core/models/i-error-response';
import { ICatalogDetail } from '../../core/models/i-catalog-detail.model';
import { CatalogService } from '../../core/services/catalog.service';
import { ICatalog } from '../../core/models/i-catalog.model';
import { CatalogConstants } from '../../core/utils/catalog.constant';

@Component({
  selector: 'app-list-comic',
  templateUrl: './list-comic.component.html',
  styleUrls: ['./list-comic.component.css']
})
export class ListComicComponent implements OnInit {

  statusList: Array<ICatalogDetail>;
  searchForm: FormGroup = new FormGroup({});
  numberRows: number = ApplicationConstants.DEFAULT_NUMBER_ROWS;
  isLoading: boolean;
  currentPage: number;
  displayedColumns = ['name', 'categories', 'status', 'options'];
  dataSource: Array<IComic>;
  totalElements: number;
  currentSort: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private catalogService: CatalogService,
    private comicService: ComicService,
    private router: Router
  ) {
    this.init();
  }

  ngOnInit() {
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
    this.comicService.search(this.generateSearchRequest(), this.generatePaginatorRequest()).subscribe(
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

  public goToUpdate(comicId: number): void {
    this.router.navigate([`/comics/update/${comicId}`]);
  }

  public goToCreate(comicId: number): void {
    this.router.navigate(['/comics/create']);
  }

  public goToListChapter(comicId: number): void {
    this.router.navigate([`/comics/${comicId}/chapters`]);
  }

}
