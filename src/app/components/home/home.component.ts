import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { HomeService } from '@services/home.service';
import { CommonModule } from '@angular/common';
import { ScrollerModule } from 'primeng/scroller';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SearchService } from '@services/search.service';
import { catchError, take, Subscription } from 'rxjs';
import { of } from 'rxjs';
import { ProductComponent } from '@components/product/product.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { SidebarModule } from 'primeng/sidebar';
import { FilterComponent } from '@components/filter/filter.component';
import { NavbarService } from '@services/navbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ScrollerModule,
    ButtonModule,
    DialogModule,
    ProductComponent,
    FormsModule,
    DropdownModule,
    InputNumberModule,
    ToastModule,
    SidebarModule,
    FilterComponent,
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: any[] = [];
  lastProduct: any = null;
  loading: boolean = false;
  display: boolean = false;
  isLastPage: boolean = false;
  showMenu: boolean = false;
  searchQuery: string = '';
  selectedImage: string = '';
  sortOrder: string = 'desc';
  sortBy: string = 'created_at';
  totalRecords: number = 0;
  priceMin: number | null = null;
  priceMax: number | null = null;

  @ViewChild('scroller') scroller!: any;

  private searchSubscription: Subscription = new Subscription();
  private togglerSubscription: Subscription = new Subscription();
  private scrollerSubscription: Subscription = new Subscription();

  constructor(
    private homeService: HomeService,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private navbarService: NavbarService
  ) {}

  handleShowDialog(image: string) {
    this.selectedImage = image;
    this.display = true;
  }

  ngOnInit(): void {
    this.searchSubscription.add(
      this.searchService.searchQuery$.subscribe((query) => {
        this.searchQuery = query;
        this.loadData({ first: 0, last: 0 }, true);
      })
    );
    this.togglerSubscription.add(
      this.navbarService.toggleMenu$.subscribe(() => {
        this.showMenu = !this.showMenu;
        this.cdr.detectChanges();
      })
    );
    this.scrollerSubscription.add(
      this.navbarService.scrollToTop$.subscribe(() => {
        this.scroller.scrollToIndex(0, 'smooth');
      })
    );
  }

  loadData(event: any, reset: boolean = false) {
    if (this.products.length > event.last && !reset) return;
    if (reset) this.products = [];

    if (this.lastProduct) this.lastProduct.loading = true;

    this.loading = true;

    this.homeService
      .getProducts(
        Math.ceil(event.last / 30 + 1),
        this.searchQuery,
        this.sortBy,
        this.sortOrder,
        this.priceMin,
        this.priceMax
      )
      .pipe(
        take(1),
        catchError((e: HttpErrorResponse) => {
          if (this.lastProduct) this.lastProduct.loading = false;
          this.loading = false;
          this.lastProduct = null;
          if (e.error?.detail === 'No products found') this.showToastDone();
          else this.showToastError();
          return of([]);
        })
      )
      .subscribe((response) => {
        this.products = [...this.products, ...response];
        if (this.lastProduct) this.lastProduct.loading = false;
        this.loading = false;
        this.lastProduct = this.products.at(-1);
        this.cdr.detectChanges();
      });
  }

  clearFilters(): void {
    this.sortBy = 'created_at';
    this.sortOrder = 'desc';
    this.priceMin = null;
    this.priceMax = null;
    this.loadData({ first: 0, last: 0 }, true);
  }

  showToastDone(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Todas as promoções disponíveis foram carregadas',
    });
  }

  showToastError(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro!',
      detail: 'Erro ao buscar produtos',
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.togglerSubscription.unsubscribe();
    this.scrollerSubscription.unsubscribe();
  }
}
