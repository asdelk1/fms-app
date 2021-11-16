import {Component, OnInit} from '@angular/core';
import {
  OwerpAutoCompleteDataModel,
  OwerpFormFieldSize,
  OwerpFormFieldType,
  OwerpFormModel
} from '../../../@control/form/owerp-form.model';
import {SupplierService} from '../supplier.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiResponse} from '../../../model/api-model';
import {UserMessageService} from '../../../services/user-message.service';
import {SupplierTypeService} from '../supplier-type.service';

@Component({
  selector: 'ngx-owerp-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {


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
      name: 'type',
      type: OwerpFormFieldType.AUTOCOMPLETE,
      label: 'Type',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL,
      autoComplete: {
        value: 'id', label: 'typeName'
      }
    },
    {
      name: 'status',
      type: OwerpFormFieldType.BOOLEAN,
      label: 'Status',
      required: true,
      canEdit: true,
      size: OwerpFormFieldSize.SMALL
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

  public autoCompleteData: OwerpAutoCompleteDataModel = {};
  public data: any = {};
  private mode: 'create' | 'update' = 'create';

  constructor(private service: SupplierService,
              private toast: UserMessageService,
              private router: Router,
              private route: ActivatedRoute,
              private supplierTypeService: SupplierTypeService) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.data['mode']) {
      this.mode = this.route.snapshot.data['mode'];
    }

    if (this.mode && this.mode === 'update') {
      const id: string = this.route.snapshot.paramMap.get('id');
      this.loadData(id);
    }

    this.fetchSupplierTypes();
  }

  public saveSupplier(data: any): void {
    this.service.save(data).subscribe(
      (res: ApiResponse) => {
        this.toast.success('Supplier Created Successfully');
        this.router.navigateByUrl(`/pages/suppliers/${res.data.id}`);
      }
    );
  }

  public cancel(): void {
    this.router.navigateByUrl('/pages/suppliers');
  }

  public fetchSupplierTypes(): void {
    this.supplierTypeService.fetchActiveTypes().subscribe(
      (res: ApiResponse) => {
        this.autoCompleteData['type'] = res.data;
        this.autoCompleteData = Object.assign({}, this.autoCompleteData);
      });
  }

  private loadData(id: string): void {
    this.service.fetch(id).subscribe(
      (res: ApiResponse) => {
        const supplier: any = res.data;
        supplier['type'] = res.data['type']['id'];
        this.data = supplier;
      }
    );
  }

}
