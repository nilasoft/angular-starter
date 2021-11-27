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
import {PostItemComponent} from './post-item/post-item.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostClient} from './post.client';
import {PostEffect} from './post.effect';
import {postReducer} from './post.feature';
import {PostService} from './post.service';

@NgModule({
  declarations: [
    PostListComponent,
    PostItemComponent
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
    StoreModule.forFeature('post', postReducer),
    EffectsModule.forFeature([PostEffect]),
    RouterModule.forChild([
      {
        path: '',
        component: PostListComponent
      },
      {
        path: 'add',
        component: PostItemComponent,
        data: {
          mode: ItemMode.ADD
        }
      },
      {
        path: 'show/:id',
        component: PostItemComponent,
        data: {
          mode: ItemMode.SHOW
        }
      },
      {
        path: 'edit/:id',
        component: PostItemComponent,
        data: {
          mode: ItemMode.EDIT
        }
      },
      {
        path: 'delete/:id',
        component: PostItemComponent,
        data: {
          mode: ItemMode.DELETE
        }
      }
    ])
  ],
  providers: [
    PostClient,
    PostService
  ]
})
export class PostModule {
}
