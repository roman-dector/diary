import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';

@Injectable({
  providedIn: 'root',
})
export class LazyLoadNotesService {
  private isLoading = false;
  shouldLoad = true;

  constructor(private notesService: NotesService) {
    window.addEventListener(
      'scroll',
      this.throttle(this.checkPosition.bind(this), 500)
    );
    window.addEventListener(
      'resize',
      this.throttle(this.checkPosition.bind(this), 500)
    );
  }

  async checkPosition() {
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;

    const scrolled = window.scrollY;

    const threshold = height - screenHeight / 4;

    const position = scrolled + screenHeight;

    if (position >= threshold) {
      await this.getNewNotes();
    }
  }

  async getNewNotes() {
    if (this.isLoading || !this.shouldLoad) {
      return;
    }

    this.isLoading = true;

    this.shouldLoad = await this.notesService.refreshNotes(true);

    this.isLoading = false;
  }

  throttle(callee: any, timeout: number) {
    let timer: any = null;

    return (args: Event) => {
      if (timer) return;

      let cb = () => {
        callee(args);
        clearTimeout(timer);
        timer = null;
      };

      timer = setTimeout(cb, timeout);
    };
  }

  onLogOut() {
    this.isLoading = false;
    this.shouldLoad = true;
  }
}
