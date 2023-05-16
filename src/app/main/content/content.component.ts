
import {map, filter} from 'rxjs/operators';
import { Component, HostBinding, OnDestroy, Renderer2, ElementRef, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs';



import { fuseAnimations } from '@fuse/animations/index';
import { FuseConfigService } from '@fuse/services/config.service';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';

@Component({
    selector   : 'fuse-content',
    templateUrl: './content.component.html',
    styleUrls  : ['./content.component.scss'],
    animations : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class FuseContentComponent implements OnDestroy
{
    onConfigChanged: Subscription;
    fuseSettings: any;
    @HostBinding('attr.fuse-layout-mode') layoutMode;
    @HostBinding('@routerTransitionUp') routeAnimationUp = false;
    @HostBinding('@routerTransitionDown') routeAnimationDown = false;
    @HostBinding('@routerTransitionRight') routeAnimationRight = false;
    @HostBinding('@routerTransitionLeft') routeAnimationLeft = false;
    @HostBinding('@routerTransitionFade') routeAnimationFade = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fuseConfig: FuseConfigService,
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private platform: Platform,
        @Inject(DOCUMENT) private document: any
    )
    {

        
        if ( this.platform.ANDROID || this.platform.IOS )
        {
            this.document.body.className += ' is-mobile';
        }
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => this.activatedRoute),)
            .subscribe((event) => {
                switch ( this.fuseSettings.routerAnimation )
                {
                    case 'fadeIn':
                        this.routeAnimationFade = !this.routeAnimationFade;
                        break;
                    case 'slideUp':
                        this.routeAnimationUp = !this.routeAnimationUp;
                        break;
                    case 'slideDown':
                        this.routeAnimationDown = !this.routeAnimationDown;
                        break;
                    case 'slideRight':
                        this.routeAnimationRight = !this.routeAnimationRight;
                        break;
                    case 'slideLeft':
                        this.routeAnimationLeft = !this.routeAnimationLeft;
                        break;
                }
            });

        this.onConfigChanged =
            this.fuseConfig.onConfigChanged
                .subscribe(
                    (newSettings) => {
                        this.fuseSettings = newSettings;
                        this.layoutMode = this.fuseSettings.layout.mode;
                    }
                );
    }

    ngOnDestroy()
    {
        this.onConfigChanged.unsubscribe();
    }

    addClass(className: string)
    {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    removeClass(className: string)
    {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
}
