import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MenuService {
  menuFlagSubject: Subject<boolean> = new Subject<boolean>();
  stateSubject: Subject<string> = new Subject<string>();
  private menuFlag: boolean = false;
  private state: string = 'default';

  constructor() {}

  toggleMenuFlag(): void {
    this.menuFlag = this.menuFlag === true ? false : true;
    this.menuFlagSubject.next(this.menuFlag);
  }

  getMenuFlag(): boolean {
    return this.menuFlag;
  }

  getState(): string {
    return this.state;
  }

  setMenuFlag(menuFlag: boolean): void {
    this.menuFlag = menuFlag;
    this.menuFlagSubject.next(menuFlag);
  }

  setState(state: string): void {
    this.state = state;
    this.stateSubject.next(state);
  }
}
