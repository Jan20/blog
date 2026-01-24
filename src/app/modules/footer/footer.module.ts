import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { ImpressumComponent } from './impressum/impressum.component';

@NgModule({
    imports: [CommonModule, ImpressumComponent, FooterComponent],
    exports: [FooterComponent],
})
export class FooterModule {}
