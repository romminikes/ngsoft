import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentRowComponent } from './component-row.component';

describe('ComponentRowComponent', () => {
  let component: ComponentRowComponent;
  let fixture: ComponentFixture<ComponentRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
