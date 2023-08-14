import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Underline from '@editorjs/underline';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'note-text',
  template: `<div
    [class]="{ editor: true, expanded: expanded }"
    #editor
  ></div>`,
  styles: [
    `
      .editor {
        max-height: 260px;
        min-height: 100px;
        min-width: 300px;
        overflow: hidden;
      }

      .expanded {
        max-height: min-content;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
/**
 * Представление текстовой части заметки, находящейся на главной странице
 */
export class NoteTextComponent implements AfterViewInit {
  shouldExpand$ = new BehaviorSubject(false);

  @Input() textData: OutputData;
  @Input() expanded: boolean;

  @ViewChild('editor', { read: ElementRef, static: true })
  editorElement: ElementRef;

  private editor: EditorJS;

  async ngAfterViewInit() {
    this.initializeEditor();
    await this.editor.isReady;
    await this.renderData(this.textData);

    let height = Number.parseInt(
      getComputedStyle(this.editorElement.nativeElement).height
    );
    console.log(height);
    if (height < 260) {
      this.shouldExpand$.next(false);
    } else {
      this.shouldExpand$.next(true);
    }
  }

  private initializeEditor() {
    this.editor = new EditorJS({
      holder: this.editorElement.nativeElement,
      tools: {
        underline: Underline,
      },
      readOnly: true,
      minHeight: 0,
    });
  }

  async renderData(data: OutputData) {
    await this.editor.blocks.render(data);
  }
}
