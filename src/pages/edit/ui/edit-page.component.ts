import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EditorComponent } from 'entities/editor';
import { LoadGalleryComponent } from 'features/file-upload';
import { LazyLoadNotesService } from 'shared/api/lazy-load.service';
import { Note, NotesService } from 'shared/api/notes.service';

@Component({
  selector: 'edit-page',
  template: `
    <div class="edit-page">
      <p-progressSpinner
        *ngIf="isUploading"
        title="Saving"
        strokeWidth="3"
        class="spinner"
      />
      <div
        #parentG
        (mouseenter)="fillButton(parentG)"
        (mouseleave)="outlineButton(parentG)"
        (click)="submitNote()"
      >
        <p-button
          icon="pi pi-check"
          styleClass="p-button-outlined p-button-rounded p-button-success"
        />
      </div>

      <div class="container">
        <note-editor />
        <gallery-loader />
      </div>

      <div
        #parentR
        (mouseenter)="fillButton(parentR)"
        (mouseleave)="outlineButton(parentR)"
        (click)="cansel()"
      >
        <p-button
          icon="pi pi-times"
          styleClass="p-button-outlined p-button-rounded p-button-danger"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .spinner {
        position: absolute;
        top: 30%;
      }
      .edit-page {
        position: relative;
        display: flex;
        justify-content: center;
        padding-top: 100px;
        gap: 10px;

        height: 100vh;
      }
      .container {
        width: 800px;
        flex-shrink: 0;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class EditPageComponent implements AfterViewInit {
  noteId: string | null = null;
  isUploading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notesService: NotesService,
    private lazy: LazyLoadNotesService
  ) {}

  @ViewChild(EditorComponent)
  private editor: EditorComponent;

  @ViewChild(LoadGalleryComponent)
  private gallery: LoadGalleryComponent;

  ngAfterViewInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.noteId = params.get('noteId');

      if (!this.noteId) {
        return;
      }
      let noteData = this.notesService.selectNoteById(this.noteId)?.data();

      noteData && this.renderData(noteData);
    });
  }

  renderData(note: Note) {
    if (note.textData) {
      this.editor.renderData(note.textData);
    }
    if (note.images) {
      this.gallery.pushImages(note.images);
    }
  }

  fillButton(parent: HTMLElement) {
    parent.firstElementChild?.firstElementChild?.classList.remove(
      'p-button-outlined'
    );
  }

  outlineButton(parent: HTMLElement) {
    parent.firstElementChild?.firstElementChild?.classList.add(
      'p-button-outlined'
    );
  }

  cansel() {
    this.router.navigate(['notes']);
  }

  async submitNote() {
    const textData = await this.editor.scrapeData();
    const images = await this.gallery.getImages();
    this.lazy.shouldLoad = true;
    this.isUploading = true;

    if (this.noteId) {
      await this.notesService.updateNote(this.noteId, textData.blocks, images);
    } else {
      await this.notesService.addNote({ textData, images });
    }

    setTimeout(() => {
      this.isUploading = false;
      this.router.navigate(['notes']);
    }, 3000);
  }
}
