import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChapterComponent } from './list-chapter.component';

describe('ListChapterComponent', () => {
  let component: ListChapterComponent;
  let fixture: ComponentFixture<ListChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
