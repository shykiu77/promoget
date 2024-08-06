import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuTogglerService {
  private toggleSubject = new Subject<void>();
  toggleState$ = this.toggleSubject.asObservable();

  toggle(): void {
    this.toggleSubject.next();
  }
}
