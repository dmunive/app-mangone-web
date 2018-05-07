import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusPipe } from './pipes/status.pipe';
import { FileUploadComponent, FileImageDialog } from './file-upload/file-upload.component';
import { MaterialModule } from '../material/material.module';
import { DndModule } from 'ng2-dnd';

@NgModule({
  declarations: [
    StatusPipe,
    FileUploadComponent,
    FileImageDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DndModule
  ],
  exports: [
    StatusPipe,
    FileUploadComponent
  ],
  entryComponents: [
    FileImageDialog
  ]
})
export class SharedModule { }
