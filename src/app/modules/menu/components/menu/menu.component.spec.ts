// Custom Components
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Routing
import { RouterModule, Routes } from '@angular/router';

// Services

// Custom Components
import { MenuComponent } from './menu.component';
// import { LoginComponent } from './../login/login.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        // LoginComponent
      ],
      imports: [
        FormsModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
