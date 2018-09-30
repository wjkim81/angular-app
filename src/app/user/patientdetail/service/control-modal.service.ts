import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlModalService {

  private modalMsgSource: Subject<string> = new Subject<string>();

  modal$ = this.modalMsgSource.asObservable();

  setModal(val: any) {
    this.modalMsgSource.next(val);
  }

  openBodyMeasurementModal() {
    this.modalMsgSource.next('openBodymeasurModal');
  }

  closeBodyMeasurementModal() {
    this.modalMsgSource.next('closeBodymeasurModal');
  }

  openSpinePrescriptionModal() {
    this.modalMsgSource.next('openSpinePrescriptionModal');
  }

  closeSpinePrescriptionModal() {
    this.modalMsgSource.next('closeSpinePrescriptionModal');
  }

  openDiagnosisModal() {
    this.modalMsgSource.next('openDiagnosisModal');
  }

  closeDiagnosisModal() {
    this.modalMsgSource.next('closeDiagnosisModal');
  }
}
