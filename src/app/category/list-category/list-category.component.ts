import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CategoryService } from '../../core/services/category.service';
import { ICategory } from '../../core/models/i-category.model';
import { IResponse } from '../../core/models/i-response.response';
import { IPaginator } from '../../core/models/i-paginator.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError} from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { Router } from '@angular/router';
import { ApplicationConstants } from '../../core/utils/application.constant';
import { IErrorResponse } from '../../core/models/i-error-response';
import { MessageConstants } from '../../core/utils/message.constant';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit  {
 
  searchForm: FormGroup = new FormGroup({});
  numberRows: number = ApplicationConstants.DEFAULT_NUMBER_ROWS;
  isLoading: boolean;
  currentPage: number;
  displayedColumns = ['name', 'status', 'options'];
  dataSource: Array<ICategory>;
  totalElements: number;
  currentSort: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.init();
  }

  ngOnInit() { 
    this.loadSearchForm();
    this.search();
    this.initCurrentPage();
    this.sortTable();
  }

  private init(){
    this.isLoading = false;
    this.currentPage = 0;
    this.totalElements = 0;
    this.currentSort = 'name,asc';
  }

  private loadSearchForm(){
    this.searchForm = new FormGroup({
      'name': new FormControl('', []),
      'status': new FormControl('', [])
    });
  }

  public search(){
    this.isLoading = true;
    this.categoryService.search(this.generateSearchRequest(), this.generatePaginatorRequest()).subscribe(
      (response: IResponse<IPaginator<ICategory>>) => {
        this.dataSource = response.data.content;
        this.totalElements = response.data.totalElements;
        this.isLoading = false;
      },
      (errorResponse: IErrorResponse) => {
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

  private generateSearchRequest(): any{
    let params = {
      name: this.searchForm.controls.name.value,
      status: this.searchForm.controls.status.value
    };
    return params;
  }

  private generatePaginatorRequest(): any{
    var paginator = {
      page: this.paginator.pageIndex,
      size: this.numberRows,
      sort: this.currentSort,
    }
    return paginator;
  }

  private initCurrentPage(){
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  private sortTable(): void {
    merge(this.sort.sortChange, this.paginator.page)
    .subscribe(() => {
      this.currentSort = this.sort.direction ? this.sort.active+','+this.sort.direction : '';
      this.search();
    });
  }

  public goToUpdate(categoryId: number) : void{
    this.router.navigate(['/categories/update/', categoryId]);
  }

  public goToCreate() : void{
    this.router.navigate(['/categories/create/']);
  }

}
