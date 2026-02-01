import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuComponent} from './components/menu/menu.component';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {MobileMenuComponent} from './components/mobile-menu/mobile-menu.component';
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-root',
    imports: [MenuComponent, MobileMenuComponent, RouterOutlet, AsyncPipe],
    templateUrl: './app.component.html',
})
export class AppComponent {
    private readonly breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

    public isMobile$: Observable<boolean> = this.breakpointObserver
        .observe([Breakpoints.Small, Breakpoints.XSmall])
        .pipe(map((state: BreakpointState): boolean => state.matches));

}
