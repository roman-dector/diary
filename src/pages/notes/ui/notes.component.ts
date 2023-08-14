import { Component, ViewEncapsulation } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserService } from 'entities/user';
import { AuthService } from 'shared/api/auth.service';
import { LazyLoadNotesService } from 'shared/api/lazy-load.service';
import { Note, NotesService } from 'shared/api/notes.service';

@Component({
  selector: 'notes-page',
  template: `
    <div [style]="{ position: 'relative' }">
      <div class="header">
        <p-button
          label="Create"
          icon="pi pi-plus"
          styleClass="p-button-info"
          (onClick)="onCreate()"
        />
        <p-button
          label="Log out"
          icon="pi pi-sign-out"
          styleClass="p-button-info"
          (onClick)="onLogout()"
        />
      </div>
      <div *ngIf="isLoading" class="spinner">
        <p-progressSpinner strokeWidth="3" />
      </div>

      <ng-container *ngIf="!isLoading">
        <note-card *ngFor="let note of notes" [note]="note" />
      </ng-container>
    </div>
  `,
  styles: [
    `
      .spinner {
        display: flex;
        justify-content: center;
        padding: 80px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        margin: 40px 150px 0;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class NotesPageComponent {
  notes: QueryDocumentSnapshot<Note>[];
  isLoading: boolean;

  constructor(
    private notesService: NotesService,
    private authService: AuthService,
    private router: Router,
    private lazy: LazyLoadNotesService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.notesService.isLoading$.subscribe((v) => {
      this.isLoading = v;
    });
    this.notesService.notes$.subscribe((v) => {
      this.notes = v;
    });
  }

  onCreate() {
    this.router.navigate(['/edit']);
  }

  async onLogout() {
    await this.authService.logout();
    this.notesService.onLogOut();
    this.userService.onLogOut();
    this.lazy.onLogOut();
  }
}
