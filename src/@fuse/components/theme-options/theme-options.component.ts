import { Component, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { style, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';
import { Subscription } from 'rxjs';

import { fuseAnimations } from '../../animations';
import { FuseConfigService } from '../../services/config.service';
import { FuseNavigationService } from '../navigation/navigation.service';

import { navigation } from 'app/navigation/navigation';
import { Injector } from '@angular/core';
import { AbstractComponent } from 'app/modules/fwk/core/component/abstract-component.component';

@Component({
    selector   : 'fuse-theme-options',
    templateUrl: './theme-options.component.html',
    styleUrls  : ['./theme-options.component.scss'],
    animations : fuseAnimations
})
export class FuseThemeOptionsComponent extends AbstractComponent implements OnDestroy
{


    @ViewChild('openButton', { static: true }) openButton;
    @ViewChild('panel', { static: true }) panel;
    @ViewChild('overlay', { static: true }) overlay: ElementRef;

    public player: AnimationPlayer;
    config: any;

    onConfigChanged: Subscription;

    @HostBinding('class.bar-closed') barClosed: boolean;

    constructor(
        private animationBuilder: AnimationBuilder,
        private navigationService: FuseNavigationService,
        private renderer: Renderer2,
        injector: Injector
    )
    {
        super(injector);
        this.setUpI18n({
            name: 'fuse_framework',
            lang: 'es',
            dictionary: {
                theme_options_panel_title: 'Navegación:',
                theme_options_panel_top_text: 'Arriba',
                theme_options_panel_left_text: 'Izquierda',
                theme_options_panel_right_text: 'Derecha',
                theme_options_panel_none_text: 'Ninguno',
                theme_options_panel_navigation_fold_text: 'Pliego de la Navegación:',
                theme_options_panel_navigation_fold_button: 'Pliego',
                theme_options_panel_toolbar_text: 'Barra de herramientas:',
                theme_options_panel_below_text: 'Abajo',
                theme_options_panel_above_text: 'Encima',
                theme_options_panel_footer_text: 'Pie:',
                theme_options_panel_layout_mode_text: 'Modo de diseño',
                theme_options_panel_layout_mode_boxed_text: 'En caja',
                theme_options_panel_layout_mode_fullwidth_text: 'Ancho completo',
                theme_options_panel_color_text: 'Color:',
                theme_options_panel_toolbar_color_text: 'Barra de herramientas',
                theme_options_panel_navigation_bar_color_text: 'Barra de navegación',
                theme_options_panel_footer_color_text: 'Pie de página',
                theme_options_panel_router_animation_text: 'Animación del router',
                theme_options_panel_router_animation_none_text: 'Ninguna',
                theme_options_panel_router_animation_slideup_text: 'Deslizar hacia arriba',
                theme_options_panel_router_animation_slidedown_text: 'Deslizar hacia abajo',
                theme_options_panel_router_animation_slideright_text: 'Deslizar hacia la derecha',
                theme_options_panel_router_animation_slideleft_text: 'Deslizar hacia la izquierda',
                theme_options_panel_router_animation_fadein_text: 'Fundir'
            }
        });
        this.barClosed = true;

        this.onConfigChanged =
            this.configService.onConfigChanged
                .subscribe(
                    (newConfig) => {
                        this.config = newConfig;
                    }
                );

        // Get the nav model and add customize nav item
        // that opens the bar programmatically
        const nav: any = navigation;
        /*
        nav.push({
            'id'      : 'custom-function',
            'title'   : 'Custom Function',
            'type'    : 'group',
            'children': [
                {
                    'id'      : 'customize',
                    'title'   : 'Customize',
                    'type'    : 'item',
                    'icon'    : 'settings',
                    'function': () => {
                        this.openBar();
                    }
                }
            ]
        }); */
    }

    onInit()
    {
        this.renderer.listen(this.overlay.nativeElement, 'click', () => {
            this.closeBar();
        });
    }

    ngOnDestroy()
    {
        this.onConfigChanged.unsubscribe();
    }

    onSettingsChange()
    {
        this.configService.setConfig(this.config);
    }

    closeBar()
    {
        this.player =
            this.animationBuilder
                .build([
                    style({transform: 'translate3d(0,0,0)'}),
                    animate('400ms ease', style({transform: 'translate3d(100%,0,0)'}))
                ]).create(this.panel.nativeElement);

        this.player.play();

        this.player.onDone(() => {
            this.barClosed = true;
        });
    }

    openBar()
    {
        this.barClosed = false;

        this.player =
            this.animationBuilder
                .build([
                    style({transform: 'translate3d(100%,0,0)'}),
                    animate('400ms ease', style({transform: 'translate3d(0,0,0)'}))
                ]).create(this.panel.nativeElement);

        this.player.play();
    }

    getI18nName(): string {
        return 'fuse_framework';
    }
}
