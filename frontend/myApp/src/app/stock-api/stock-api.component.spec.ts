import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockApiComponent } from './stock-api.component';

describe('StockApiComponent', () => {
  let component: StockApiComponent;
  let fixture: ComponentFixture<StockApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
