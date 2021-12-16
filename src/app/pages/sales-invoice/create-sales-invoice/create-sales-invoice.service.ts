import {Injectable} from '@angular/core';
import {CustomerItemService} from '../../customer/items/customer-item.service';
import {ApiResponse} from '../../../model/api-model';
import {TaxGroupsService} from '../../master-data/tax-groups/tax-groups.service';
import {CostCenterService} from '../../master-data/cost-center/cost-center.service';
import {OwerpLabelValueModel} from '../../../@control/form/owerp-form.model';


@Injectable({
  providedIn: 'root'
})
export class CreateSalesInvoiceService {

  public itemsData: OwerpLabelValueModel[] = [];
  public taxData: OwerpLabelValueModel[] = [];
  public costCenterData: OwerpLabelValueModel[] = [];

  constructor(private customerItemService: CustomerItemService,
              private taxGroupsService: TaxGroupsService,
              private costCenterService: CostCenterService) {
  }

  public refreshData(): void {
    this.loadTaxData();
    this.loadCostCenterData();
  }

  public loadItems(customerTypeId: string): void {
    this.customerItemService.fetchByCustomerType(customerTypeId).subscribe(
      (res: ApiResponse) => {
        this.itemsData = this.customerItemService.getAutocompleteData(res.data);
      }
    );
  }

  private loadTaxData(): void {
    this.taxGroupsService.fetchAllActive().subscribe(
      (res: ApiResponse) => {
        this.taxData = this.taxGroupsService.getAutocompleteData(res.data);
      }
    );
  }

  private loadCostCenterData(): void {
    this.costCenterService.fetchActive().subscribe(
      (res: ApiResponse) => {
        this.costCenterData = this.costCenterService.getAutoCompleteData(res.data);
      }
    );
  }

}
