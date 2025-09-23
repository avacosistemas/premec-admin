import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PageTitleService } from 'app/modules/fwk/core/service/page-title.service';
import { NotificationService } from 'app/modules/fwk/core/service/notification/notification.service';
import { CierreMesService } from './cierre-mes.service';
import { locale as esLocale } from './i18n/es';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cierre-mes',
  templateUrl: './cierre-mes.component.html',
  styleUrls: ['./cierre-mes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CierreMesComponent implements OnInit {

  cierreForm: FormGroup;
  meses: { value: number, viewValue: string }[];
  currentYear = new Date().getFullYear();
  loading = false;
  saving = false;

  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = ['legajo', 'usuarioSap', 'nombre', 'facturablesHora', 'ociosasHora', 'fichadoHora', 'efectividad', 'cumplimientoObjetivo'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;

  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private titleService: PageTitleService,
    private notificationService: NotificationService,
    private cierreMesService: CierreMesService,
    private translateService: TranslateService
  ) {
    this.translateService.setTranslation('es', esLocale.data, true);
    this.translateService.use('es');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.titleService.changeTitle(this.translate('CIERRE_MES.TITULO'));
    });

    const currentDate = new Date();
    this.cierreForm = this.formBuilder.group({
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
    if (this.cierreForm.invalid) {
      return;
    }
    this.loading = true;
    this.dataSource.data = [];
    const { anio, mes } = this.cierreForm.value;

    this.cierreMesService.getPreview(anio, mes).subscribe({
      next: (response) => {
        const dataArray = response && response.data ? response.data : [];

        if (!Array.isArray(dataArray)) {
          console.error('La respuesta de la API no contiene un array en la propiedad "data".', response);
          this.notificationService.notifyError('Formato de respuesta inesperado.');
          this.loading = false;
          return;
        }

        if (dataArray.length === 0) {
          this.notificationService.notifySuccess(this.translate('CIERRE_MES.NO_HAY_RESULTADOS'));
          this.loading = false;
          return;
        }

        const processedData = dataArray.map(item => ({
          ...item,
          viaticos: item.viaticos || 0,
          adelanto: item.adelanto || 0,
          prestamo: item.prestamo || 0,
          premioAsistencia: item.premioAsistencia || false,
          novedades: item.novedades || '',
          gratificacionesAumentos: item.gratificacionesAumentos || ''
        }));

        this.dataSource.data = processedData;

        this.loading = false;
      },
      error: (error) => {
        this.notificationService.notifyError(this.translate('CIERRE_MES.ERROR_VISTA_PREVIA'));
        console.error(error);
        this.loading = false;
      }
    });
  }

  guardarCierres(): void {
    const allData = this.dataSource.data;

    this.saving = true;
    const { anio, mes } = this.cierreForm.value;
    this.cierreMesService.saveCierres(allData, anio, mes).subscribe({
      next: () => {
        this.notificationService.notifySuccess(this.translate('CIERRE_MES.EXITO_GUARDADO'));
        this.saving = false;
      },
      error: (error) => {
        this.notificationService.notifyError(this.translate('CIERRE_MES.ERROR_GUARDADO'));
        console.error(error);
        this.saving = false;
      }
    });
  }
}