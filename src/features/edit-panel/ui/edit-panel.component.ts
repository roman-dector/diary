import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DocumentReference, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NotesService } from 'shared/api/notes.service';

@Component({
  selector: 'edit-panel',
  template: `
    <div class="panel">
      <i
        class="pi pi-file-edit edit"
        style="color: #707e8e"
        (click)="onEdit()"
      ></i>
      <i
        class="pi pi-trash delete"
        style="color: #f20c2e"
        (click)="onDelete()"
      ></i>
    </div>
  `,
  styles: [
    `
      .edit,
      .delete {
        padding: 2px;
        border-radius: 4px;
      }
      .edit:hover {
        background: #ace2e5;
      }
      .delete:hover {
        background: #edb1b1;
      }
      .panel {
        display: flex;
        gap: 30px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
/**
 * Панель для редактирования или удаления существующей заметки
 */
export class EditPanelComponent {
  @Input() noteRef: DocumentReference;

  constructor(private router: Router, private notesService: NotesService) {}

  async onDelete() {
    await deleteDoc(this.noteRef);
    await this.notesService.refreshNotes();
  }

  onEdit() {
    this.router.navigate([`edit/${this.noteRef.id}`]);
  }
}
