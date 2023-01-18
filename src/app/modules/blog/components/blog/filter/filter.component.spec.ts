import { FilterComponent } from './filter.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [FilterComponent],
    imports: [RouterTestingModule, MatCardModule],
    providers: [],
  }).compileComponents();
};

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await compileComponent();
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a Filter component', () => {
    expect(component).toBeTruthy();
  });
});
