import {OwerpLabelValueModel} from '../../../@control/form/owerp-form.model';

export interface SalesInvoiceItem {
  item: OwerpLabelValueModel;
  description: string;
  costCenter: OwerpLabelValueModel;
  unitAmount: number;
  tax: OwerpLabelValueModel;
  taxAmount: number;
  amount: number;
}
