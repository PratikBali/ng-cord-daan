import { Component } from '@angular/core';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  uploadText;
  downloadText;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    private fileChooser: FileChooser
  ) {
    this.uploadText = '';
    this.downloadText = '';
  }

  uploadFile() {
    this.fileChooser.open().then(uri => {
      this.filePath.resolveNativePath(uri).then(
        nativepath => {
          this.fileTransfer = this.transfer.create();
          const options: FileUploadOptions = {
            fileKey: 'videofile',
            fileName: 'video.mp4',
            chunkedMode: false,
            headers: {},
            mimeType: 'video.mp4'
          };
          this.uploadText = 'uploading...';
          this.fileTransfer.upload(nativepath, 'api url www.google.com',
            options).then(
              data => {
                alert('Transfer done = ' + JSON.stringify(data));
                this.uploadText = '';
              }, err => {
                // alert(JSON.stringify(err));
                this.uploadText = '';
              });
        }, err => {
          alert(JSON.stringify(err));
        });
    }, err => {
      alert(JSON.stringify(err));
    });

  }

  downloadFile() {
    const url = 'http://www.example.com/file.pdf';
    this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }

  abortUpload() {
    this.fileTransfer.abort();
    alert('upload canceled');
  }

  abortDownload() {
    this.fileTransfer.abort();
    alert('download canceled');
  }
}
