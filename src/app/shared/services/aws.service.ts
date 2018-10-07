import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

/**
 * Caution!
 * https://github.com/aws/aws-sdk-js/issues/2141
 * 
 * There is an issue with aws-sdk
 * 
 * I put the following in polyfills.ts
 * 
 * // aws-sdk requires global to exist
 * (window as any).global = window;
 * 
 * Please, check later.
 * 
 * I wrote the code with the following sites
 * https://grokonez.com/aws/angular-4-amazon-s3-example-how-to-upload-file-to-s3-bucket
 * 
 */
import * as AWS from 'aws-sdk';
// import * as S3 from 'aws-sdk/clients/s3';

import { awsconfig, AwsUploadResponse } from '../models/aws-config';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor() { }

  private getS3Bucket(): any {
    const s3 = new AWS.S3({
      accessKeyId: awsconfig.access_key,
      secretAccessKey: awsconfig.secret_access_key,
      region: awsconfig.region
    });

    return s3;
  }

  // List all of your available file in the bucket in this AWS Region.
  listFiles(): Observable<Array<string>> {
    const bucketName = awsconfig.bucket_name;

    const files = new Array<string>();
    const s3 = this.getS3Bucket();

    const params = {
      Bucket: bucketName,
    };

    s3.listObjects(params, (err, data) => {
      console.log('listFiles')
      console.log(err);
      
      if (!data) {
        console.log('data');
        const fileDatas = data.Contents;
    
        fileDatas.forEach((file) => {
          // fileUploads appends file...
          files.push(file);
          console.log(file);
        });
      }
    });
  
    return Observable.of(files);
  }

  uploadImage(imgInput: any, fileName: string): Observable<AwsUploadResponse> {
    var response: any = {};
    const bucketName = awsconfig.bucket_name;
    const imageFile = imgInput;

    const params = {
      Bucket: bucketName,
      Key:  fileName,
      Body: imageFile,
      ACL: 'public-read'
    };

    const s3 = this.getS3Bucket();

    s3.upload(params, (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        response.success = false;
        response.file = undefined;
      } else {
        console.log('Successfully uploaded file.', data);
        // I store this in a variable for retrieval later
        // This should be saved in back-end db
        const imgFile = imageFile.name;
        response.success = true;
        response.file = imgFile;
      }
    });

    return Observable.of(response);
  }

  getFullPathName(filePath: string): string {

    let path = 'https://' + awsconfig.bucket_name + '.s3.' + awsconfig.region + '.amazonaws.com/' + filePath;
    return path;
  }
}
