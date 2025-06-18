import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  private titleSource = new BehaviorSubject<string>('');
  currentTitle$: Observable<string> = this.titleSource.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
    const initialTitleKey = this.getRouteTitleFromSnapshot(this.activatedRoute.snapshot);
    if (initialTitleKey) {
      this.titleSource.next(this.translateService.instant(initialTitleKey));
    } else {
      this.titleSource.next(this.translateService.instant('page_title_default'));
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getRouteTitleFromSnapshot(this.activatedRoute.snapshot)),
      distinctUntilChanged(),
      map(titleKey => titleKey ? this.translateService.instant(titleKey) : this.translateService.instant('page_title_default'))
    ).subscribe(title => {
      this.titleSource.next(title);
    });
  }

  private getRouteTitleFromSnapshot(routeSnapshot: any): string | undefined {
    let route = routeSnapshot;
    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.data && route.data['title'] ? route.data['title'] : undefined;
  }

  changeTitle(title: string) {
    this.titleSource.next(this.translateService.instant(title));
  }
}