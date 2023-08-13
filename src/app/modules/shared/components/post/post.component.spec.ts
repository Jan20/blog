import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { PostComponent } from './post.component';

let component: PostComponent;
let fixture: ComponentFixture<PostComponent>;

const compileComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [PostComponent],
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
