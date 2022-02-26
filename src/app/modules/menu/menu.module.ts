import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from './components/menu/menu.component';
import { MenuService } from './services/menu.service';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  providers: [
    MenuService
  ],
  exports: [
    MenuComponent,
  ]
})
export class MenuModule { }
