import { DOCUMENT, Injectable, Renderer2, RendererFactory2, inject } from '@angular/core';
import {BehaviorSubject, fromEvent, tap} from 'rxjs';
import {Theme} from "../../../components/models/menu-item";
import {Platform} from "@angular/cdk/platform";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly document = inject<Document>(DOCUMENT);
    private readonly rendererFactory = inject(RendererFactory2);
    private readonly platform = inject(Platform);

    public readonly theme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.LIGHT);
    private readonly renderer: Renderer2;

    constructor() {
        this.renderer = this.rendererFactory.createRenderer(null, null);
        this.initializeTheme();
    }

    public toggleTheme(): void {
        const newTheme = this.theme$.value === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        this.setTheme(newTheme);
    }


    private initializeTheme(): void {
        if (!this.platform.isBrowser) {
            this.setTheme(Theme.DARK);
            return;
        }

        const darkModeMediaQuery: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

        this.setTheme(darkModeMediaQuery.matches ? Theme.DARK : Theme.LIGHT);

        fromEvent<MediaQueryListEvent>(darkModeMediaQuery, 'change')
            .pipe(
                tap((event: MediaQueryListEvent): void => this.setTheme(event.matches ? Theme.DARK : Theme.LIGHT)),
                takeUntilDestroyed()
            )
            .subscribe();
    }

    private setTheme(theme: Theme): void {
        if (this.theme$.value === theme) {
            return;
        }

        this.updateBodyClass(this.theme$.value, theme);
        this.theme$.next(theme);
    }

    private updateBodyClass(oldTheme: Theme, newTheme: Theme): void {
        this.renderer.removeClass(this.document.body, oldTheme);
        this.renderer.addClass(this.document.body, newTheme);
    }
}