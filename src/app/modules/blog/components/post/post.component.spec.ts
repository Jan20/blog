import { PostComponent } from './post.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from './back-button.component/back-button.component';
import { MatButtonModule } from '@angular/material/button';

let component: PostComponent;
let fixture: ComponentFixture<PostComponent>;

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [PostComponent, BackButtonComponent],
    imports: [
      RouterTestingModule,
      MatIconModule,
      MatMenuModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
    ],
    providers: [],
    teardown: { destroyAfterEach: false },
  }).compileComponents();
};

fdescribe('PostComponent:', () => {
  beforeEach(async () => {
    compileComponent();
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
