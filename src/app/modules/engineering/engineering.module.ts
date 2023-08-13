import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineeringComponent } from './engineering/engineering.component';
import { MatCardModule } from '@angular/material/card';
import { engineeringRoutes } from './guides.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EngineeringComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forChild(engineeringRoutes),
    SharedModule,
  ],
  exports: [],
})
export class EngineeringModule {}
