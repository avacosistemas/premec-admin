import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FichadoProcesamientoService } from './fichado-procesamiento.service';
import { FichadoEmpleado, FichadoDetalle, Empleado, FichadoApiResponse } from './fichado-procesamiento.models';
import { locale as esLocale } from './i18n/es';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'app/modules/fwk/core/service/notification/notification.service';


@Component({
    selector: 'app-fichado-procesamiento',
    templateUrl: './fichado-procesamiento.component.html',
    styleUrls: ['./fichado-procesamiento.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class FichadoProcesamientoComponent implements OnInit {
    @ViewChild('fileInput') fileInputRef: ElementRef<HTMLInputElement>;

    jsonData: FichadoEmpleado[] = [];
    selectedFile: File | null = null;
    fileName: string = '';
    isProcessed: boolean = false;
    isProcessingExcel: boolean = false;
    isSendingToSap: boolean = false;

    dataSource: MatTableDataSource<Empleado>;
    expandedElement: Empleado | null;
    columnsToDisplay = ['legajo', 'nombreCompleto'];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

    fichadosDisplayedColumns: string[] = [
        'dia', 'fecha', 'entrada1', 'salida1', 'entrada2', 'salida2',
        'totalDia', 'descanso', 'normal', 'extra50', 'extra100',
        'horaNoTipificada', 'tarde', 'comentarios', 'horasProductivas'
    ];

    constructor(
        private fichadoService: FichadoProcesamientoService,
        private translateService: TranslateService,
        private notificationService: NotificationService
    ) {
        this.translateService.setTranslation('es', esLocale.data, true);
        this.translateService.use('es');
    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<Empleado>([]);
    }

    translate(key: string): string {
        return this.translateService.instant(key);
    }

    triggerFileInput(): void {
        if (this.fileInputRef) {
            this.fileInputRef.nativeElement.value = '';
        }
        this.fileInputRef.nativeElement.click();
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
            this.fileName = this.selectedFile.name;
            this.isProcessed = false;
            this.jsonData = [];
            this.dataSource.data = [];
        } else {
            this.selectedFile = null;
            this.fileName = '';
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

    async processExcel(): Promise<void> {
        if (!this.selectedFile) {
            this.notificationService.notifyError('Por favor, seleccione un archivo de Excel.');
            return;
        }

        this.isProcessingExcel = true;

        try {
            const base64FileWithMime = await this.fileToBase64(this.selectedFile);

            this.fichadoService.processExcel(base64FileWithMime).subscribe({
                next: (response: FichadoApiResponse) => {
                    const datosFichados = response.data;
                    this.jsonData = datosFichados;

                    const employeeData: Empleado[] = datosFichados.map(item => ({
                        ...item.empleado,
                        nombreCompleto: `${item.empleado.nombre} ${item.empleado.apellido}`,
                        fichados: new MatTableDataSource<FichadoDetalle>(item.fichados)
                    }));

                    this.dataSource.data = employeeData;
                    this.isProcessed = true;
                    this.isProcessingExcel = false;
                    this.notificationService.notifySuccess('Excel procesado correctamente.');
                },
                error: (err) => {
                    this.isProcessingExcel = false;
                    this.notificationService.notifyError('Error al procesar el archivo Excel.');
                    console.error(err);
                }
            });
        } catch (error) {
            this.isProcessingExcel = false;
            this.notificationService.notifyError('Error al convertir el archivo a Base64.');
            console.error(error);
        }
    }

    sendToSap(): void {
        if (!this.jsonData || this.jsonData.length === 0) {
            this.notificationService.notifyError('No hay datos procesados para enviar.');
            return;
        }

        this.isSendingToSap = true;

        const payload = {
            fichados: this.jsonData
        };

        this.fichadoService.enviarFichados(payload).subscribe({
            next: (response) => {
                this.isSendingToSap = false;
                this.notificationService.notifySuccess('Datos enviados a SAP correctamente.');

                this.isProcessed = false;
                this.jsonData = [];
                this.dataSource.data = [];
                this.selectedFile = null;
                this.fileName = '';
                this.triggerFileInput();
            },
            error: (err) => {
                this.isSendingToSap = false;
                this.notificationService.notifyError('Error al enviar los datos a SAP.');
                console.error(err);
            }
        });
    }

    expandRow(element: Empleado): void {
        this.expandedElement = this.expandedElement === element ? null : element;
    }
}