import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'gallery-loader',
  template: `
    <p-fileUpload
      #loader
      chooseLabel="Choose image"
      accept="image/*"
      [maxFileSize]="1000000"
      [fileLimit]="4"
      [multiple]="true"
      [showUploadButton]="false"
      [showCancelButton]="false"
      [customUpload]="true"
    >
      <ng-template let-file pTemplate="file">
        <div class="file-preview">
          <img class="img-preview" [src]="createURLfromFile(file)" />
          <div>{{ file.name }}</div>
          <p-button
            icon="pi pi-times"
            (onClick)="deleteImage($event, file)"
          ></p-button>
        </div>
      </ng-template>
    </p-fileUpload>
  `,
  styles: [
    `
      .file-preview {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        padding: 0 20px;
      }
      .img-preview {
        width: 70px;
        height: 70px;
        display: inline-block;
        object-fit: cover;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
/**
 * Компонент для загрузки пользователем изображений (max 4 шт),
 * которые будут прикреплены к заметке
 */
export class LoadGalleryComponent {
  @ViewChild('loader') loader: FileUpload;

  deleteImage(event: Event, file: File) {
    const index = this.loader.files.indexOf(file);
    this.loader.remove(event, index);
  }

  async getImages() {
    let list = [];
    for (let f of this.loader.files) {
      list.push(await this.toBase64(f));
    }

    return list;
  }

  pushImages(images: string[]) {
    this.loader.clear();
    let files = images.map((i) => this.base64toFile(i));
    this.loader.files.push(...files);
  }

  createURLfromFile(file: File) {
    return URL.createObjectURL(file);
  }

  private toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  }

  private base64toFile(dataurl: string) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)![1],
      mime2 = dataurl.match(/[^:/]\w+(?=;|,)/)![0],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], Date.now().toString() + `.${mime2}`, {
      type: mime,
    });
  }
}
