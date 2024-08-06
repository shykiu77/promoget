import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  LOCALE_ID,
  Output,
} from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DatePipe } from '@angular/common';

registerLocaleData(localePt);

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  imports: [CommonModule, SkeletonModule],
  styleUrls: ['./product.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, DatePipe],
})
export class ProductComponent {
  @Input() product: any;
  @Input() loading: boolean = false;
  @Output() showDialog = new EventEmitter<string>();

  onShowDialog(image: string) {
    this.showDialog.emit(image);
  }

  generateGoogleMapsLink(location: string): string {
    // Encode the store name for URL compatibility
    const encodedLocation = encodeURIComponent(location);

    // Construct the Google Maps link
    const googleMapsLink = `http://maps.google.com/?q=${encodedLocation}`;

    return googleMapsLink;
  }

  formatLabel(label: string): string {
    if (label === '') return label;
    const lowercaseLabel = label.toLowerCase();

    return lowercaseLabel[0].toUpperCase() + lowercaseLabel.slice(1);
  }
}
