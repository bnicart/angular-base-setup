import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowSetupsComponent } from './flow-setups.component';

describe('FlowSetupsComponent', () => {
  let component: FlowSetupsComponent;
  let fixture: ComponentFixture<FlowSetupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowSetupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowSetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
