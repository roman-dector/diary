import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { NoteTextComponent } from 'entities/note/ui';
import { Note } from 'shared/api/notes.service';

@Component({
  selector: 'note-card',
  template: `
    <div
      class="note-card"
      (mouseenter)="onCardEnter()"
      (mouseleave)="onCardLeave()"
    >
      <div
        class="note-content"
        (mouseenter)="onContentEnter()"
        (mouseleave)="onContentLeave()"
      >
        <div style="flex: 1">
          <div class="card-header">
            <span class="date">
              {{ noteData.textData.time | date : 'dd/MM/yyyy HH:mm' }}
            </span>

            <span [style.visibility]="panelVisible">
              <edit-panel [noteRef]="note.ref" />
            </span>
          </div>
          <note-text [textData]="noteData.textData" [expanded]="noteExpanded" />
        </div>
        <note-gallery [images]="noteData.images" />
        <p-button
          *ngIf="shouldExpand"
          class="expand"
          [icon]="noteExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
          styleClass="p-button-rounded p-button-info"
          [style.visibility]="expandVisible"
          [pTooltip]="noteExpanded ? 'Compress note' : 'Expand note'"
          (onClick)="onExpandClick()"
        />
      </div>
      <div *ngIf="!noteExpanded && shouldExpand" class="blur"></div>
    </div>
  `,
  styleUrls: ['./note-card.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class NoteCardComponent implements AfterViewInit {
  @Input() note: QueryDocumentSnapshot<Note>;
  noteData: Note;
  panelVisible = 'hidden';
  expandVisible = 'hidden';

  noteExpanded = false;
  shouldExpand = false;

  @ViewChild(NoteTextComponent)
  noteText: NoteTextComponent;

  ngOnInit() {
    this.noteData = this.note.data();
  }

  ngAfterViewInit() {
    this.noteText.shouldExpand$.subscribe((v) => {
      this.shouldExpand = v;
    });
  }

  onContentEnter() {
    this.panelVisible = 'visible';
  }
  onContentLeave() {
    this.panelVisible = 'hidden';
  }
  onCardEnter() {
    this.expandVisible = 'visible';
  }
  onCardLeave() {
    this.expandVisible = 'hidden';
  }

  onExpandClick() {
    this.noteExpanded = !this.noteExpanded;
  }
}
