import { Component, Input, inject, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ServiceSelections,
  ServiceCategoryConfig,
  EXTERIOR_SERVICES_CONFIG,
  INTERIOR_SERVICES_CONFIG
} from '../../core/project-request-services.config';

/** Phone layout: section headers collapse the whole exterior/interior list */
const MOBILE_SERVICES_MAX = '(max-width: 640px)';

@Component({
  selector: 'app-project-request-services-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-request-services-section.component.html',
  styleUrls: ['./project-request-services-section.component.scss']
})
export class ProjectRequestServicesSectionComponent implements OnInit {
  @Input() selections!: ServiceSelections;

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroyRef = inject(DestroyRef);

  interiorConfig: ServiceCategoryConfig[] = [];
  exteriorConfig: ServiceCategoryConfig[] = [];
  configLoading = true;

  isMobileCompact = false;
  mobileExteriorOpen = false;
  mobileInteriorOpen = false;
  expanded: Record<string, boolean> = {};

  constructor() {
    this.isMobileCompact = this.breakpointObserver.isMatched(MOBILE_SERVICES_MAX);
    this.breakpointObserver
      .observe([MOBILE_SERVICES_MAX])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        const next = state.matches;
        const was = this.isMobileCompact;
        this.isMobileCompact = next;
        if (next && !was) {
          this.mobileExteriorOpen = false;
          this.mobileInteriorOpen = false;
        }
      });
  }

  ngOnInit(): void {
    // UI-only: static config (no Firebase / ServiceConfigService)
    this.exteriorConfig = EXTERIOR_SERVICES_CONFIG;
    this.interiorConfig = INTERIOR_SERVICES_CONFIG;
    this.configLoading = false;
  }

  toggleMobileExterior(): void {
    this.mobileExteriorOpen = !this.mobileExteriorOpen;
  }

  toggleMobileInterior(): void {
    this.mobileInteriorOpen = !this.mobileInteriorOpen;
  }

  toggle(catId: string): void {
    this.expanded[catId] = !this.expanded[catId];
  }

  isExpanded(catId: string): boolean {
    return !!this.expanded[catId];
  }

  trackByCatId(_: number, cat: ServiceCategoryConfig): string {
    return cat.id;
  }
  trackByItemId(_: number, item: { id: string }): string {
    return item.id;
  }
  trackByOptValue(_: number, opt: { value: string }): string {
    return opt.value;
  }

  key(catId: string, itemId?: string): string {
    return itemId ? `${catId}_${itemId}` : catId;
  }
}
