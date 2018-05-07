import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComicComponent } from './edit-comic.component';

describe('EditComicComponent', () => {
  let component: EditComicComponent;
  let fixture: ComponentFixture<EditComicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
