import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSetupsComponent } from './forms-setups.component';

describe('FormsSetupsComponent', () => {
  let component: FormsSetupsComponent;
  let fixture: ComponentFixture<FormsSetupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsSetupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsSetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
