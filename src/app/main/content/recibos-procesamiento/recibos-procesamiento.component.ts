import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PageTitleService } from 'app/modules/fwk/core/service/page-title.service';
import { RecibosProcesamientoService } from './recibos-procesamiento.service';
import { ReciboTabla, ReciboProcesarResponse, ReciboAprobarRechazarRequest, RecibosProcesarApiResponse } from './recibos-procesamiento.models';
import { locale as esLocale } from './i18n/es';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-recibos-procesamiento',
    templateUrl: './recibos-procesamiento.component.html',
    styleUrls: ['./recibos-procesamiento.component.scss']
})
export class RecibosProcesamientoComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    processingForm: FormGroup;
    receiptTypes: string[] = [
        'Sueldo Jornal',
        'Sueldo Mensual',
        'SAC',
        'Vacaciones Jornal',
        'Vacaciones Mensual',
        'Ajustes Retroactivos',
        'Adelanto',
        'Préstamo'
    ];

    selectedFile: File | null = null;
    fileName: string = '';

    isLoadingProcess: boolean = false;
    isLoadingSend: boolean = false;

    tableData: ReciboTabla[] = [];
    dataSource: MatTableDataSource<ReciboTabla>;
    displayedColumns: string[] = [];

    constructor(
        private fb: FormBuilder,
        private translateService: TranslateService,
        private pageTitleService: PageTitleService,
        private recibosService: RecibosProcesamientoService
    ) {
        this.translateService.setTranslation('es', esLocale.data, true);
        this.translateService.use('es');

        this.processingForm = this.fb.group({
            receiptType: ['', Validators.required],
            pdfFile: [null, Validators.required]
        });

        this.dataSource = new MatTableDataSource<ReciboTabla>([]);
    }

    ngOnInit(): void {
        this.pageTitleService.changeTitle(this.translate('RECIBOS_PROCESAMIENTO.TITULO_CORTO'));
        this.setupTableColumns();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    setupTableColumns(): void {
        this.displayedColumns = [
            'legajo',
            'nombreCompleto',
            'periodo',
            'neto',
            'tipo',
            'aprobado',
            'observaciones'
        ];
    }

    translate(key: string): string {
        return this.translateService.instant(key);
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
            this.fileName = this.selectedFile.name;
            this.processingForm.get('pdfFile').setValue(this.selectedFile);
        } else {
            this.selectedFile = null;
            this.fileName = '';
            this.processingForm.get('pdfFile').setValue(null);
        }
    }

    async processRecibos(): Promise<void> {
        this.processingForm.markAllAsTouched();

        if (this.processingForm.invalid || !this.selectedFile) {
            console.error('Formulario inválido o archivo no seleccionado.');
            return;
        }

        this.isLoadingProcess = true;
        this.tableData = [];
        this.dataSource.data = [];

        try {
            const base64File = await this.fileToBase64(this.selectedFile);
            const request = {
                archivo: base64File,
                tipo: this.processingForm.get('receiptType').value
            };

            this.recibosService.processRecibos(request).subscribe({
                next: (response: RecibosProcesarApiResponse) => {
                    this.tableData = response.data.map((recibo: ReciboProcesarResponse) => ({
                        ...recibo,
                        aprobado: true,
                        observaciones: ''
                    }));
                    this.dataSource.data = this.tableData;
                    this.isLoadingProcess = false;
                },
                error: (error) => {
                    console.error('Error al procesar recibos:', error);
                    this.isLoadingProcess = false;
                }
            });
        } catch (error) {
            console.error('Error al convertir archivo a Base64:', error);
            this.isLoadingProcess = false;
        }
    }

    private fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = (reader.result as string).split(',')[1];
                resolve(base64String);
            };
            reader.onerror = error => reject(error);
        });
    }

    onApprovalChange(row: ReciboTabla, event: any): void {
        row.aprobado = event.checked;
        if (row.aprobado) {
            row.observaciones = '';
        }
        this.dataSource.data = [...this.dataSource.data];
    }

    onObservationsChange(row: ReciboTabla): void {
        this.dataSource.data = [...this.dataSource.data];
    }

    canSend(): boolean {
        if (!this.dataSource || this.dataSource.data.length === 0) {
            return false;
        }

        return this.dataSource.data.every(row =>
            typeof row.aprobado === 'boolean' &&
            (row.aprobado || (!row.aprobado && row.observaciones.trim() !== ''))
        );
    }

    sendRecibos(): void {
        if (!this.canSend()) {
            console.warn('No se puede enviar: Datos incompletos o no válidos.');
            return;
        }

        this.isLoadingSend = true;

        const requestData: ReciboAprobarRechazarRequest[] = this.dataSource.data.map(row => ({
            legajo: row.legajo,
            neto: row.neto,
            nombreCompleto: row.nombreCompleto,
            periodo: row.periodo,
            tipo: row.tipo,
            aprobado: row.aprobado,
            observaciones: row.observaciones
        }));

        this.recibosService.approveRejectRecibos(requestData).subscribe({
            next: (response) => {
                console.log('Recibos enviados exitosamente:', response);
                this.tableData = [];
                this.dataSource.data = [];
                this.processingForm.reset();
                this.fileName = '';
                this.selectedFile = null;
                this.processingForm.get('receiptType').setValue('');
                this.processingForm.get('pdfFile').setValue(null);
                this.isLoadingSend = false;
            },
            error: (error) => {
                console.error('Error al enviar recibos:', error);
                this.isLoadingSend = false;
            }
        });
    }
}