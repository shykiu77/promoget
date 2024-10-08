import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '@services/search.service'; // Adjust the import path as needed
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { NavbarService } from '@services/navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ToolbarModule, InputTextModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe((query) => {
        this.searchService.setSearchQuery(query);
      });
  }

  onSearch(event: any) {
    this.searchSubject.next(this.searchQuery);
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchService.setSearchQuery(this.searchQuery);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggle(): void {
    this.navbarService.toggle();
  }

  onScrollToTop(): void {
    this.navbarService.scrollTop();
  }
}
