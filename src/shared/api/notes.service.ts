import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  CollectionReference,
  QueryDocumentSnapshot,
  collectionChanges,
  query,
  orderBy,
  updateDoc,
  doc,
  limit,
  startAfter,
} from '@angular/fire/firestore';
import { OutputData } from '@editorjs/editorjs';
import { UserService } from 'entities/user/model/user.service';
import { BehaviorSubject } from 'rxjs';

export interface Note {
  textData: OutputData;
  images: string[];
}

/**
 * Представляет логику для работы с коллекцией заметок
 * текущего залогиненного юзера, хранящейся в Firestore
 */

@Injectable({ providedIn: 'root' })
export class NotesService {
  private notesCollection: CollectionReference | null;
  notes$ = new BehaviorSubject<QueryDocumentSnapshot<Note>[]>([]);
  private lastNoteRef: QueryDocumentSnapshot<Note> | null;
  private refsCount: number = 0;

  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private fireAuth: AngularFireAuth,
    private userService: UserService,
    private store: Firestore
  ) {
    let user;
    if ((user = this.userService.currentUser.getValue())) {
      this.getUserArchive(user.uid);
      this.subscribeToChanges();
    }
  }

  private async getUserArchive(userId: string) {
    this.notesCollection = collection(this.store, `archive/${userId}/notes`);
    await this.refreshNotes();
  }

  private subscribeToChanges() {
    collectionChanges(this.notesCollection!).subscribe((_) => {
      this.refreshNotes();
    });
    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.getUserArchive(user.uid);
      }
    });
  }

  /**
   *
   * @param newChunk - отвечает за загрузку доп. пакета заметок, если false,
   * происходит объновление списка ранее загруженных заметок
   * @returns {Promise<boolean>} false означает, что все возможные заметки загружены
   */

  async refreshNotes(newChunk: boolean = false): Promise<boolean> {
    !newChunk && this.isLoading$.next(true);
    let refs = await this.getNoteRefs(newChunk);

    this.lastNoteRef = refs[refs.length - 1];
    this.refsCount = newChunk ? this.refsCount + refs.length : refs.length;

    if (newChunk) {
      this.notes$.next([...this.notes$.getValue(), ...refs]);
    } else {
      this.notes$.next(refs);
      this.isLoading$.next(false);
    }

    return !!refs.length;
  }

  private async getNoteRefs(newChunk: boolean = false) {
    let q = newChunk
      ? query(
          this.notesCollection!,
          orderBy('textData.time', 'desc'),
          startAfter(this.lastNoteRef),
          limit(10)
        )
      : query(
          this.notesCollection!,
          orderBy('textData.time', 'desc'),
          limit(!!this.refsCount ? this.refsCount + 1 : 10)
        );

    return (await getDocs(q)).docs as QueryDocumentSnapshot<Note>[];
  }

  async updateNote(noteId: string, newBlocks: Array<any>, newImages: string[]) {
    let userId = this.userService.currentUser.getValue()?.uid;
    let notePath = `archive/${userId}/notes/${noteId}`;

    await updateDoc(doc(this.store, notePath), {
      'textData.blocks': newBlocks,
      images: newImages,
    });
  }

  selectNoteById(noteId: string) {
    return this.notes$.getValue().find((n) => (n.id === noteId ? true : false));
  }

  async addNote(note: Note) {
    await addDoc(this.notesCollection!, <Note>note);
  }

  onLogOut() {
    this.notesCollection = null;
    this.notes$.next([]);
    this.lastNoteRef = null;
    this.refsCount = 0;
  }
}
