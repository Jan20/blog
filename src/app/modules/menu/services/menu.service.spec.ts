import { TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuService } from './menu.service';

const compileComponent = () => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MatIconModule,
    ],
    providers: [
        MenuService,
      ],
      teardown: { destroyAfterEach: false }
  }).compileComponents();
}

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    compileComponent();
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
