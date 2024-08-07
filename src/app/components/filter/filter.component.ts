import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  imports: [
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    SliderModule,
  ],
  styleUrls: ['./filter.component.scss'],
  standalone: true,
})
export class FilterComponent {
  @Input() sortBy: string = 'created_at';
  @Output() sortByChange = new EventEmitter<string>();

  @Input() sortOrder: string = 'desc';
  @Output() sortOrderChange = new EventEmitter<string>();

  @Input() priceMin: number | null = null;
  @Output() priceMinChange = new EventEmitter<number | null>();

  @Input() priceMax: number | null = null;
  @Output() priceMaxChange = new EventEmitter<number | null>();

  @Output() search = new EventEmitter<void>();
  @Output() clearFilters = new EventEmitter<void>();

  sortByOptions = [
    { label: 'Criação', value: 'created_at' },
    { label: 'Preço', value: 'true_price' },
    { label: 'Alfabética', value: 'label' },
  ];

  sortOrderOptions = [
    { label: 'Crescente', value: 'asc' },
    { label: 'Decrescente', value: 'desc' },
  ];

  @Input() daysAgo: number = 7;
  @Output() daysAgoChange = new EventEmitter<number>();

  onSearch(): void {
    this.search.emit();
  }

  onClear(): void {
    this.clearFilters.emit();
  }

  onSortByChange(value: string): void {
    this.sortBy = value;
    this.sortByChange.emit(this.sortBy);
  }

  onSortOrderChange(value: string): void {
    this.sortOrder = value;
    this.sortOrderChange.emit(this.sortOrder);
  }

  onPriceMinChange(value: number | null): void {
    this.priceMin = value;
    this.priceMinChange.emit(this.priceMin);
  }

  onPriceMaxChange(value: number | null): void {
    this.priceMax = value;
    this.priceMaxChange.emit(this.priceMax);
  }

  onDaysAgoChange(value: number): void {
    this.daysAgo = value;
    this.daysAgoChange.emit(value);
  }
}
