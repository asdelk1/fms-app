import {OwerpLabelValueModel} from '../../../@control/form/owerp-form.model';

export interface JournalAccount {
  id: number;
  ledgerCategory: OwerpLabelValueModel;
  ledgerAccount: OwerpLabelValueModel;
  debitAmount: number;
  creditAmount: number;
  memo: string;
  costCenter: OwerpLabelValueModel;
  personType: OwerpLabelValueModel;
  person: OwerpLabelValueModel;
}
