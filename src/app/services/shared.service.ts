import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  classList = [];
  bedArray = [];
  selectedBed = [];
  // encryptionKey = CryptoJS.enc.Utf8.parse('L5s*2Bh0r!H%3hdN');
  // encryptionIv = CryptoJS.enc.Utf8.parse('V@g4#nG8$kfR*8Hm');
   encryptionKey = CryptoJS.enc.Utf8.parse('MH&4lke&*KysHAi7');
  encryptionIv = CryptoJS.enc.Utf8.parse('S%0*fGe7HdqWq9hA');
  constructor(
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) { }

  encryptUsingAES256(request:any) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(request), this.encryptionKey, {
      keySize: 16,
      iv: this.encryptionIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  decryptUsingAES256(encryptedData:any) {
    return CryptoJS.AES.decrypt(encryptedData, this.encryptionKey, {
      keySize: 16,
      iv: this.encryptionIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
  }
}
