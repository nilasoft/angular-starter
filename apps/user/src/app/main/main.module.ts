import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home'
          },
          {
            path: 'home',
            component: HomeComponent
          },
          {
            path: 'posts',
            loadChildren: () => import('./post/post.module').then(m => m.PostModule)
          },
          {
            path: 'profile',
            loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
          }
        ]
      }
    ])
  ]
})
export class MainModule {
}
