import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {ResourceModule} from '@nilasoft/shared';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ToastrModule} from 'ngx-toastr';
import {ProfileClient} from './profile.client';
import {ProfileComponent} from './profile.component';
import {ProfileEffect} from './profile.effect';
import {postReducer} from './profile.feature';
import {ProfileService} from './profile.service';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ResourceModule,
    ReactiveFormsModule,
    ToastrModule,
    SweetAlert2Module.forChild(),
    StoreModule.forFeature('profile', postReducer),
    EffectsModule.forFeature([ProfileEffect]),
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent
      }
    ])
  ],
  providers: [
    ProfileClient,
    ProfileService
  ]
})
export class ProfileModule {
}
