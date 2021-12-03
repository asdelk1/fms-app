import {Component, OnInit} from '@angular/core';
import {OwerpFormFieldSize, OwerpFormFieldType, OwerpFormModel} from '../../../@control/form/owerp-form.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SupplierService} from '../supplier.service';
import {ApiResponse} from '../../../model/api-model';
import {OwerpActionModel} from '../../../@control/action/owerp-action.model';

@Component({
  selector: 'ngx-owerp-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.css']
})
export class ViewSupplierComponent implements OnInit {

  public fields: OwerpFormModel[] = [
    {
      name: 'name',
      type: OwerpFormFieldType.TEXT,
      label: 'Name',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'code',
      type: OwerpFormFieldType.TEXT,
      label: 'Code',
      required: true,
      canEdit: false,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'type',
      type: OwerpFormFieldType.TEXT,
      label: 'Type',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL,
      autoComplete: 'id'
    },
    {
      name: 'status',
      type: OwerpFormFieldType.BOOLEAN,
      label: 'Status',
      size: OwerpFormFieldSize.SMALL,
      canEdit: false
    },
    {
      name: 'address',
      type: OwerpFormFieldType.TEXT,
      label: 'Address',
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.LARGE
    },
    {
      name: 'contactPerson',
      type: OwerpFormFieldType.TEXT,
      label: 'Contact Person',
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'printOnCheque',
      type: OwerpFormFieldType.TEXT,
      label: 'Print On Cheque',
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'city',
      type: OwerpFormFieldType.TEXT,
      label: 'City',
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'phoneNo',
      type: OwerpFormFieldType.TEXT,
      label: 'Phone No',
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'mobileNo',
      type: OwerpFormFieldType.TEXT,
      label: 'Mobile No',
      required: false,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'fax',
      type: OwerpFormFieldType.TEXT,
      label: 'Fax',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'email',
      type: OwerpFormFieldType.TEXT,
      label: 'Email',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'webSite',
      type: OwerpFormFieldType.TEXT,
      label: 'Web Site',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'vatNo',
      type: OwerpFormFieldType.TEXT,
      label: 'Vat No',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'svatNo',
      type: OwerpFormFieldType.TEXT,
      label: 'Svat No',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'businessRegNo',
      type: OwerpFormFieldType.TEXT,
      label: 'Business Reg No',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'accountNo',
      type: OwerpFormFieldType.TEXT,
      label: 'Account No',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    },
    {
      name: 'creditLimit',
      type: OwerpFormFieldType.NUMBER,
      label: 'Credit Limit',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
    }
  ];
  public actions: OwerpActionModel[] = [
    {name: 'editSupplier', status: 'warning', icon: 'brush-outline', execute: this.editSupplier.bind(this)}
  ];
  public data: any;
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: SupplierService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadData();
  }

  private loadData(): void {
    this.service.fetch(this.id).subscribe(
      (res: ApiResponse) => {
        const supplier: any = res.data;
        supplier['type'] = `${res.data['type']['typeName']}(${res.data['type']['typeCode']})`;
        this.data = supplier;
      }
    );
  }

  private editSupplier(data: any): void {
    this.router.navigateByUrl(`/pages/suppliers/${this.id}/edit`);
  }

}
