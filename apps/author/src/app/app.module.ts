import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard, AuthModule} from '@nilasoft/auth';
import {CoreModule} from '@nilasoft/core';
import {Role} from '@nilasoft/data';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard]
      }
    ]),
    AuthModule.forRoot({role: Role.AUTHOR})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
