import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgObjectsComponent } from './org-objects.component';

describe('OrgObjectsComponent', () => {
  let component: OrgObjectsComponent;
  let fixture: ComponentFixture<OrgObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
