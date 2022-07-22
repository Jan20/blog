import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MenuModule } from './modules/menu/menu.module';
import { MenuService } from './modules/menu/services/menu.service';

const compileComponent = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MenuModule,
    ],
    declarations: [
      AppComponent,
    ],
    providers: [
      MenuService,
    ]
  }).compileComponents();
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await compileComponent();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'blog'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('blog');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('blog app is running!');
  // });
});
