import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Underline from '@editorjs/underline';

@Component({
  selector: 'note-editor',
  template: `<div class="editor" #editor></div>`,
  styles: [
    `
      .editor {
        background: white;
        border-radius: 10px;
        height: 400px;

        overflow-y: auto;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
/**
 * Поле для ввода текста заметки
 */
export class EditorComponent {
  @ViewChild('editor', { read: ElementRef, static: true })
  editorElement: ElementRef;

  private editor: EditorJS;

  ngAfterViewInit() {
    this.initializeEditor();
  }

  private initializeEditor() {
    this.editor = new EditorJS({
      holder: this.editorElement.nativeElement,
      tools: {
        underline: Underline,
      },
      autofocus: true,
      placeholder: 'Ones upon a time...',
      minHeight: 0,
    });
  }

  async renderData(data: OutputData) {
    await this.editor.isReady;
    await this.editor.blocks.render(data);
  }

  async scrapeData() {
    return await this.editor.save();
  }

  clear() {
    this.editor.blocks.clear();
  }
}
