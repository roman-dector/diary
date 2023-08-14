import { NgModule } from '@angular/core';
import { NoteTextComponent } from 'entities/note/ui';
import { NoteGalleryComponent } from 'entities/note/ui/note-gallery/note-gallery.component';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { NoteCardComponent } from 'widgets/note-card/ui/note-card.component';
import { NotesPageComponent } from './ui/notes.component';
import { EditPanelComponent } from 'features/edit-panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    NotesPageComponent,
    NoteCardComponent,
    NoteTextComponent,
    NoteGalleryComponent,
    EditPanelComponent,
  ],
  imports: [
    GalleriaModule,
    ButtonModule,
    ProgressSpinnerModule,
    CommonModule,
    TooltipModule,
  ],
  exports: [NotesPageComponent],
})
export class NotesPageModule {}
