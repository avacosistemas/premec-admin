import { Component, OnInit } from '@angular/core';
import { PREFIX_DOMAIN_WEB } from 'environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { locale as esLocale } from './i18n/es';
import { GenerarQrService } from '../../../modules/fwk/core/service/generar-qr-service/generar-qr.service';

import QRCode from 'qrcode';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.css']
})
export class GenerarQrComponent implements OnInit {
  id: string = '';
  loading: boolean = false;
  qrCodeData: string | null = null;
  logoUrl: string = 'assets/images/logos/logo_premec.jpg';

  private defaultDomain: string = 'http://premec.ddns.net:48080/';

  constructor(
    private encodearService: GenerarQrService,
    private translateService: TranslateService
  ) {
    this.translateService.setTranslation('es', esLocale.data, true);
    this.translateService.use('es');
  }

  ngOnInit() {
    this.qrCodeData = null;
  }

  translate(key: string): string {
    return this.translateService.instant(key);
  }

  async generateQR(): Promise<void> {
    if (!this.id) {
      return;
    }

    this.loading = true;

    this.encodearService.getServiceCallId(this.id).subscribe({
      next: async (newId: string) => {
        const url = (PREFIX_DOMAIN_WEB ? PREFIX_DOMAIN_WEB : this.defaultDomain) + `informe-qr/?serviceCallId=${newId}`;

        try {
          const qrCodeDataUrl = await QRCode.toDataURL(url, { errorCorrectionLevel: 'M' });
          this.qrCodeData = await this.addLogoToQRCode(qrCodeDataUrl, this.logoUrl);
        } catch (error) {
          console.error('Error al generar QR:', error);
        } finally {
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error al obtener el serviceCallId:', error);
        this.loading = false;
      }
    });
  }

  async addLogoToQRCode(qrCodeDataUrl: string, logoUrl: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const qrCanvas = document.createElement('canvas');
      const ctx = qrCanvas.getContext('2d');

      const qrImage = new Image();
      qrImage.crossOrigin = 'Anonymous';
      qrImage.onload = () => {
        const scaleFactor = 2;
        qrCanvas.width = qrImage.width * scaleFactor;
        qrCanvas.height = qrImage.height * scaleFactor;

        ctx.drawImage(qrImage, 0, 0, qrCanvas.width, qrCanvas.height);

        const logoImage = new Image();
        logoImage.crossOrigin = 'Anonymous';
        logoImage.onload = () => {
          const logoSize = qrCanvas.width / 5;
          const logoX = (qrCanvas.width / 2) - (logoSize / 2);
          const logoY = (qrCanvas.height / 2) - (logoSize / 2);

          ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);

          resolve(qrCanvas.toDataURL());
        };
        logoImage.onerror = (error) => reject(error);
        logoImage.src = logoUrl;
      };
      qrImage.onerror = (error) => reject(error);
      qrImage.src = qrCodeDataUrl;
    });
  }
}
