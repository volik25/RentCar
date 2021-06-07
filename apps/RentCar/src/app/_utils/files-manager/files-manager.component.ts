import { Component, OnInit, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'files-manager',
  templateUrl: './files-manager.component.html',
  styleUrls: ['./files-manager.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilesManagerComponent),
      multi: true,
    },
  ],
})
export class FilesManagerComponent implements OnInit, ControlValueAccessor {
  @ViewChild('inputFileContainer') private inputFileContainer: ElementRef<HTMLDivElement>;
  @ViewChild('image') private image: ElementRef<HTMLImageElement>;

  public value: File;
  public disabled: boolean;


  private onChange = (value: any) => {};
  private onTouched = () => {};

  /*
    Value Accessor
  */
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(out: File) {
    this.value = out;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  updateValue(value: File) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  constructor() {}

  ngOnInit(): void {}

  onRemoveFileClick(event: MouseEvent): void {
    event.preventDefault();
    this.updateValue(null);
  }

  onUploadFileClick(event: MouseEvent): void {
    event.preventDefault();
    const fileInput = this.createUploadFileInput();
    this.inputFileContainer.nativeElement.append(fileInput);

    fileInput.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.image.nativeElement.src = (e.target as any).result.toString();
      };

      this.updateValue(file);

      fileInput.remove();
    });

    fileInput.click();
  }

  private createUploadFileInput(): HTMLInputElement {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <input hidden name="images" type="file" accept="image/*">
    `;

    return wrapper.firstElementChild as HTMLInputElement;
  }
}
