import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComicComponent } from './list-comic.component';

describe('ListComicComponent', () => {
  let component: ListComicComponent;
  let fixture: ComponentFixture<ListComicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
