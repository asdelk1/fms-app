import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ECommerceComponent} from './e-commerce/e-commerce.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule)
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule)
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule)
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule)
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule)
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule)
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule)
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule)
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule)
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule)
    },
    {
      path: 'users',
      loadChildren: () => import('./user/user.module')
        .then(m => m.UserModule)
    },
    {
      path: 'user-groups',
      loadChildren: () => import('./user-group/user-group.module')
        .then(m => m.UserGroupModule)
    },
    {
      path: 'user-login-history',
      loadChildren: () => import('./user-login-history/user-login-history.module')
        .then(m => m.UserLoginHistoryModule)
    },
    {
      path: 'customer-types',
      loadChildren: () => import('./customer-type/customer-type.module')
        .then(m => m.CustomerTypeModule)
    },
    {
      path: 'suppliers',
      loadChildren: () => import('./supplier/supplier.module')
        .then(m => m.SupplierModule)
    },
    {
      path: 'master-data',
      loadChildren: () => import('./master-data/master-data.module')
        .then(m => m.MasterDataModule)
    },
    {
      path: 'ledger',
      loadChildren: () => import('./ledger/ledger.module')
        .then(m => m.LedgerModule)
    },
    {
      path: 'customers',
      loadChildren: () => import('./customer/customer.module')
        .then(m => m.CustomerModule)
    },
    {
      path: 'sales-invoices',
      loadChildren: () => import('./sales-invoice/sales-invoice.module')
        .then(m => m.SalesInvoiceModule)
    },
    {
      path: 'accounts',
      loadChildren: () => import('./account/account.module')
        .then(m => m.AccountModule)
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: '**',
      component: NotFoundComponent
    }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
