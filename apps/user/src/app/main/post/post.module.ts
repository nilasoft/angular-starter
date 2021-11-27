import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ToastrModule} from 'ngx-toastr';
import {PostListComponent} from './post-list/post-list.component';
import {PostClient} from './post.client';
import {PostEffect} from './post.effect';
import {postReducer} from './post.feature';
import {PostService} from './post.service';

@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ToastrModule,
    SweetAlert2Module.forChild(),
    StoreModule.forFeature('post', postReducer),
    EffectsModule.forFeature([PostEffect]),
    RouterModule.forChild([
      {
        path: '',
        component: PostListComponent
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
