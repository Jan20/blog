import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuService } from '../../services/menu.service';
import { MenuComponent } from './menu.component';

const compileComponent = () => {
  TestBed.configureTestingModule({
    declarations: [MenuComponent],
    imports: [
      FormsModule,
      RouterTestingModule,
      MatMenuModule,
      MatIconModule,
      MatToolbarModule,
    ],
    providers: [MenuService, { provide: APP_BASE_HREF, useValue: '/' }],
  }).compileComponents();
};

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
