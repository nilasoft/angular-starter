import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ResourceClient} from './resource.client';
import {ResourceComponent} from './resource.component';
import {ResourcePipe} from './resource.pipe';
import {ResourceService} from './resource.service';

@NgModule({
  declarations: [
    ResourceComponent,
    ResourcePipe
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ResourceComponent
  ],
  providers: [
    ResourceClient,
    ResourceService
  ]
})
export class ResourceModule {
}
