import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forEach } from '@angular/router/src/utils/collection';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() control: FormControl;
  @Input() placeholder: string;
  @Input() accept: string;
  @Input() maxSize: number;
  @Input() title: string;
  isLoading: boolean = false;
  fileImage: string;
  fileName: string;
  errorMessage: string;
  observerFileBase64: Observable<string>

  constructor(
    public dialog: MatDialog
  ) { 
  }

  ngOnInit() {
    setTimeout(()=>{
      if(this.control.value){
        this.fileImage = this.control.value;
        this.control.setValue('');
      }
    }, 50);
  }

  public fileChange(e) {
    this.isLoading = true;
    var file = e.srcElement.files[0];
    if(file){
      if(!this.isErrorFile(file)){
        this.errorMessage = '';
        this.getBase64(file);
        this.observerFileBase64.subscribe(fileBase64 =>{
          this.fileName = file.name;
          this.control.setValue(fileBase64.replace(/^data:image\/[a-z]+;base64,/, ""));
          this.isLoading = false;
        });
      }else{
        this.fileName = '';
        this.control.setValue('');
        this.isLoading = false;
      }
    }else{
      this.isLoading = false;
    }
  }

  public isErrorFile(file): boolean{
    var error = false
    var types = this.accept.split(",");
    
    if(!(file.size/1024 <= this.maxSize)){
      this.errorMessage = 'El archivo debe pesar menos de 2MB';
      error = true;
    }

    let findType = false;
    types.forEach(type =>{
      if(type === file.type){
        findType = true;
      }
    });
    if(!findType){
      this.errorMessage = 'El archivo no tiene el formato requerido.';
      error = true;
    }

    return error;
  }

  public getBase64(file): void{
    var reader = new FileReader();
    reader.readAsDataURL(file);
    this.observerFileBase64 = new Observable(observer => {
      reader.onloadend = () => {
        this.fileImage = reader.result;
        observer.next(reader.result);
        observer.complete();
      };
    });
  } 

  public showImage(): void{
    let dialogRef = this.dialog.open(FileImageDialog, {
      width: '40%',
      maxWidth: '450px',
      minWidth: '300px',
      data: { image: this.fileImage }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'file-image-dialog',
  template: '<div fxFlex fxFlexAlign="center center"><img [src]=data.image width="100%"></div>',
})
export class FileImageDialog {

  constructor(
    public dialogRef: MatDialogRef<FileImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}