import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable()
export class MenuService {

  public menuFlagSubject: Subject<boolean> = new Subject<boolean>()
  public stateSubject: Subject<string> = new Subject<string>()
  private menuFlag: boolean = false
  private state: string = 'default'

  constructor() { }

  public toggleMenuFlag(): void {
    this.menuFlag = this.menuFlag === true ? false : true
    this.menuFlagSubject.next(this.menuFlag)
  }

  public getMenuFlag(): boolean {
    return this.menuFlag
  }

  public getState(): string {
    return this.state
  }

  public setMenuFlag(menuFlag: boolean): void {
    this.menuFlag = menuFlag
    this.menuFlagSubject.next(menuFlag)
  }

  public setState(state: string): void {
    this.state = state
    this.stateSubject.next(state)
  }
}
