import { ModuleWithProviders, NgModule } from '@angular/core';
import { AnalyticsModel } from './analytics.model';
import { AnalyticsConstant } from './analytics.constant';
import { GoogleTagManagerService } from './google-tag-manager.service';
import { GoogleAnalyticsService } from './google-analytics.service';


@NgModule({
  declarations: [],
  imports: [

  ]
})
export class AnalyticsModule {
  public static forRoot(config: AnalyticsModel): ModuleWithProviders<AnalyticsModule> {
    return {
      ngModule: AnalyticsModule,
      providers: [
        GoogleTagManagerService,
        GoogleAnalyticsService,
        { provide: AnalyticsConstant, useValue: config }
      ]
    };
  }
}
