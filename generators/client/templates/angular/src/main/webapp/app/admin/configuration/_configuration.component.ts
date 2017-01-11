import { Component } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';

import { <%=jhiPrefixCapitalized%>ConfigurationService } from './configuration.service';

@Component({
    selector: '<%=jhiPrefix%>-configuration',
    templateUrl: './configuration.component.html'
})
export class <%=jhiPrefixCapitalized%>ConfigurationComponent {
    allConfiguration: any = null;
    configuration: any = null;
    configKeys: any[];
    filter: string;
    orderProp: string;
    reverse: boolean;

    constructor(
        <%_ if (enableTranslation) { _%>
        private jhiLanguageService: JhiLanguageService,
        <%_ } _%>
        private configurationService: <%=jhiPrefixCapitalized%>ConfigurationService
    ) {
        this.configKeys = [];
        this.filter = '';
        this.orderProp = 'prefix';
        this.reverse = false;
        <%_ if (enableTranslation) { _%>
        this.jhiLanguageService.setLocations(['configuration']);
        <%_ } _%>
    }

    keys(dict): Array<string> {
        return Object.keys(dict);
    }

    ngOnInit() {
        this.configurationService.get().subscribe((configuration) => {
            this.configuration = configuration;

            for (let config of configuration) {
                this.configKeys.push(Object.keys(config.properties));
            }
        });

        this.configurationService.getEnv().subscribe((configuration) => {
            this.allConfiguration = configuration;
        });
    }
}
