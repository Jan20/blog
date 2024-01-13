import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinksComponent } from './links.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { GuidesComponent } from '../../guides/guides/guides.component';
import { BlogService } from '../../shared/services/blog.service';
import { MatCardModule } from '@angular/material/card';

let component: LinksComponent;
let fixture: ComponentFixture<LinksComponent>;

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [LinksComponent],
    imports: [MatCardModule, MatIconModule],
    providers: [],
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

describe('LinksComponent', () => {
  beforeEach(async () => {
    compileComponent();

    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a link component', () => {
    expect(component).toBeTruthy();
  });
});
