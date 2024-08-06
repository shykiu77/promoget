import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private toggleMenu = new Subject<void>();
  toggleMenu$ = this.toggleMenu.asObservable();

  private scrollToTop = new Subject<void>();
  scrollToTop$ = this.scrollToTop.asObservable();

  toggle(): void {
    this.toggleMenu.next();
  }

  scrollTop(): void {
    this.scrollToTop.next();
  }
}
