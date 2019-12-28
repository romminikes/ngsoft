import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialInformationComponent } from './material-information.component';

describe('MaterialInformationComponent', () => {
  let component: MaterialInformationComponent;
  let fixture: ComponentFixture<MaterialInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
