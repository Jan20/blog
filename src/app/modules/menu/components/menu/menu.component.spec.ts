import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuComponent } from './menu.component';
import { MenuService } from '../../services/menu.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

const compileComponent = () => {
  TestBed.configureTestingModule({
    declarations: [
      MenuComponent,
    ],
    imports: [
      FormsModule,
      RouterTestingModule,
      MatMenuModule,
      MatIconModule,
      MatToolbarModule,
    ],
    providers: [
      MenuService,
      { provide: APP_BASE_HREF, useValue : '/' }
    ],
  })
  .compileComponents();
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(() => {
    compileComponent();
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
