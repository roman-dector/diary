import { NgModule } from '@angular/core';
import { LoadGalleryComponent } from 'features/file-upload';

import { FileUploadModule } from 'primeng/fileupload';
import { EditPageComponent } from './ui';
import { EditorComponent } from 'entities/editor';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [EditPageComponent, LoadGalleryComponent, EditorComponent],
  imports: [
    ButtonModule,
    FileUploadModule,
    ProgressSpinnerModule,
    CommonModule,
  ],
  exports: [EditPageComponent],
})
export class EditPageModule {}
