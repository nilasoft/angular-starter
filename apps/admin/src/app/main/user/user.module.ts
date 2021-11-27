import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {ItemMode} from '@nilasoft/core';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ToastrModule} from 'ngx-toastr';
import {UserItemComponent} from './user-item/user-item.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserClient} from './user.client';
import {UserEffect} from './user.effect';
import {userReducer} from './user.feature';
import {UserService} from './user.service';

@NgModule({
  declarations: [
    UserListComponent,
    UserItemComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ToastrModule,
    ReactiveFormsModule,
    SweetAlert2Module.forChild(),
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffect]),
    RouterModule.forChild([
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'add',
        component: UserItemComponent,
        data: {
          mode: ItemMode.ADD
        }
      },
      {
        path: 'show/:id',
        component: UserItemComponent,
        data: {
          mode: ItemMode.SHOW
        }
      },
      {
        path: 'edit/:id',
        component: UserItemComponent,
        data: {
          mode: ItemMode.EDIT
        }
      },
      {
        path: 'delete/:id',
        component: UserItemComponent,
        data: {
          mode: ItemMode.DELETE
        }
      }
    ])
  ],
  providers: [
    UserClient,
    UserService
  ]
})
export class UserModule {
}
