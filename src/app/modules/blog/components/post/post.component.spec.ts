import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostComponent } from './post.component';

const compileComponent = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
    ],
    providers: [
    ],
    teardown: { destroyAfterEach: false }
  }).compileComponents();
}

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  
  beforeEach(async () => {
    compileComponent();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
