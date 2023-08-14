import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'note-gallery',
  template: `
    <p-galleria
      [value]="images"
      [showIndicators]="true"
      [showThumbnails]="false"
      [changeItemOnIndicatorHover]="true"
      [responsiveOptions]="responsiveOptions"
    >
      <ng-template pTemplate="item" let-item>
        <img [src]="item" class="img-block" />
      </ng-template>
    </p-galleria>
  `,
  styles: [
    `
      .img-block {
        width: 200px;
        height: 200px;
        display: inline-block;
        object-fit: cover;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class NoteGalleryComponent {
  @Input() images: string[];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
}
