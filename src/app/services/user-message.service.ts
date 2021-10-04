import {Injectable} from '@angular/core';
import {NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService, NbComponentStatus} from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class UserMessageService {

  private config: Partial<NbToastrConfig> = {
    status: 'basic',
    destroyByClick: true,
    duration: 2000,
    hasIcon: false,
    position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    preventDuplicates: false
  };

  constructor(private toastrService: NbToastrService) {
  }

  public success(message: string): void {
    this.config['status'] = 'success';
    this.toastrService.show(
      message,
      'SUCCESS',
      this.config);
  }

  public error(message): void {
    this.config['status'] = 'error';
    this.toastrService.show(
      message,
      'SUCCESS',
      this.config);
  }

}
