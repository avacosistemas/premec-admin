import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PageTitleService } from 'app/modules/fwk/core/service/page-title.service';
import { NotificationService } from 'app/modules/fwk/core/service/notification/notification.service';
import { NovedadesContadorService } from './novedades-contador.service';
import { locale as esLocale } from './i18n/es';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { NovedadesContadorData, Jornal, FueraConvenio, Mensual, NovedadesContadorApiResponse } from './novedades-contador.models';

@Component({
    selector: 'app-novedades-contador',
    templateUrl: './novedades-contador.component.html',
    styleUrls: ['./novedades-contador.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
            state('expanded', style({ height: '*', visibility: 'visible' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class NovedadesContadorComponent implements OnInit {

    novedadesForm: FormGroup;
    meses: { value: number, viewValue: string }[];
    currentYear = new Date().getFullYear();
    loading = false;
    saving = false;

    novedadesData: NovedadesContadorData | null = null;

    expandedJornalElement: Jornal | null;
    expandedFueraConvenioElement: FueraConvenio | null;
    expandedMensualElement: Mensual | null;

    jornalesDataSource = new MatTableDataSource<Jornal>();
    fueraConvenioDataSource = new MatTableDataSource<FueraConvenio>();
    mensualDataSource = new MatTableDataSource<Mensual>();

    jornalesDisplayedColumns = ['legajo', 'nombreCompleto', 'cuil', 'gratificaciones', 'novedades', 'expand'];
    fueraConvenioDisplayedColumns = ['legajo', 'nombreCompleto', 'cuil', 'gratificaciones', 'novedades', 'expand'];
    mensualDisplayedColumns = ['legajo', 'nombreCompleto', 'cuil', 'gratificaciones', 'novedades', 'expand'];

    @ViewChild('jornalesPaginator') jornalesPaginator: MatPaginator;
    @ViewChild('fueraConvenioPaginator') fueraConvenioPaginator: MatPaginator;
    @ViewChild('mensualPaginator') mensualPaginator: MatPaginator;

    constructor(
        private formBuilder: FormBuilder,
        private titleService: PageTitleService,
        private notificationService: NotificationService,
        private novedadesContadorService: NovedadesContadorService,
        private translateService: TranslateService
    ) {
        this.translateService.setTranslation('es', esLocale.data, true);
        this.translateService.use('es');
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.titleService.changeTitle(this.translate('NOVEDADES_CONTADOR.TITULO'));
        });

        const currentDate = new Date();
        this.novedadesForm = this.formBuilder.group({
            mes: [currentDate.getMonth() + 1, Validators.required],
            anio: [currentDate.getFullYear(), [Validators.required, Validators.min(2001), Validators.max(this.currentYear)]]
        });

        this.meses = [
            { value: 1, viewValue: 'Enero' }, { value: 2, viewValue: 'Febrero' },
            { value: 3, viewValue: 'Marzo' }, { value: 4, viewValue: 'Abril' },
            { value: 5, viewValue: 'Mayo' }, { value: 6, viewValue: 'Junio' },
            { value: 7, viewValue: 'Julio' }, { value: 8, viewValue: 'Agosto' },
            { value: 9, viewValue: 'Septiembre' }, { value: 10, viewValue: 'Octubre' },
            { value: 11, viewValue: 'Noviembre' }, { value: 12, viewValue: 'Diciembre' }
        ];
    }

    translate(key: string, params?: any): string {
        return this.translateService.instant(key, params);
    }

    vistaPrevia(): void {
        if (this.novedadesForm.invalid) {
            return;
        }
        this.loading = true;
        this.novedadesData = null;

        const { anio, mes } = this.novedadesForm.value;

        this.novedadesContadorService.getPreview(anio, mes).subscribe({
            next: (response: NovedadesContadorApiResponse) => {
                if (!response.data || (!response.data.jornales.length && !response.data.fueraConvenio.length && !response.data.mensual.length)) {
                    this.notificationService.notifySuccess(this.translate('NOVEDADES_CONTADOR.NO_HAY_RESULTADOS'));
                    this.loading = false;
                    return;
                }

                this.novedadesData = response.data;

                this.novedadesData.jornales.forEach(item => {
                    item.gratificaciones = item.gratificaciones || '';
                    item.novedades = item.novedades || '';
                });
                this.jornalesDataSource.data = this.novedadesData.jornales;

                this.novedadesData.fueraConvenio.forEach(item => {
                    item.gratificaciones = item.gratificaciones || '';
                    item.novedades = item.novedades || '';
                });
                this.fueraConvenioDataSource.data = this.novedadesData.fueraConvenio;

                this.novedadesData.mensual.forEach(item => {
                    item.gratificaciones = item.gratificaciones || '';
                    item.novedades = item.novedades || '';
                });
                this.mensualDataSource.data = this.novedadesData.mensual;

                this.jornalesDataSource.paginator = this.jornalesPaginator;
                this.fueraConvenioDataSource.paginator = this.fueraConvenioPaginator;
                this.mensualDataSource.paginator = this.mensualPaginator;

                this.loading = false;
            },
            error: (error) => {
                this.notificationService.notifyError(this.translate('NOVEDADES_CONTADOR.ERROR_VISTA_PREVIA'));
                console.error(error);
                this.loading = false;
            }
        });
    }

    guardarNovedades(): void {
        if (!this.novedadesData) return;

        this.saving = true;

        this.novedadesContadorService.saveNovedades(this.novedadesData).subscribe({
            next: () => {
                this.notificationService.notifySuccess(this.translate('NOVEDADES_CONTADOR.EXITO_GUARDADO'));
                this.saving = false;
                this.novedadesData = null;
            },
            error: (error) => {
                this.notificationService.notifyError(this.translate('NOVEDADES_CONTADOR.ERROR_GUARDADO'));
                console.error(error);
                this.saving = false;
            }
        });
    }
}