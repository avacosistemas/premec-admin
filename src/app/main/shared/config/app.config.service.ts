import { Injectable } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { environment } from 'environments/environment';


// Define the default config
const WITHOUT_TOONAV_CONFIG = {
    layout          : {
        navigation      : 'none', // 'right', 'left', 'top', 'none'
        navigationFolded: false, // true, false
        toolbar         : 'none', // 'above', 'below', 'none'
        footer          : 'none', // 'above', 'below', 'none'
        mode            : 'fullwidth' // 'boxed', 'fullwidth'
    }
};

@Injectable()
export class AppConfigService
{
  
    private config = [
        {
            url: environment.URL_LOGIN,
            config: WITHOUT_TOONAV_CONFIG
        }
    ];

    constructor(private fuseConfigService: FuseConfigService)
    {}

    setConfigByURL(url): void{
        const page = this.config.find(c => c.url === url);
        if (page){
            this.fuseConfigService.setConfig(page.config);
        }else{
            this.fuseConfigService.setConfig({});
        }
    }
}

