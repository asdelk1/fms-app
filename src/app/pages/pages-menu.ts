import {NbMenuItem} from '@nebular/theme';

export class OwerpMenuItem extends NbMenuItem {
  permissionName?: string;
  strictAuthorization?: boolean;
}

export const MENU_ITEMS: OwerpMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard'
  },
  {title: 'FMS - Application', group: true},
  {
    title: 'Admin',
    icon: '',
    children: [
      {
        title: 'Users',
        link: '/pages/users'
      },
      {
        title: 'User Groups',
        link: '/pages/user-groups'
      },
      {
        title: 'User Access History',
        link: '/pages/user-login-history'
      }
    ]
  },
  {
    title: 'Customers',
    children: [
      {
        title: 'View',
        link: '/pages/customers'
      },
      {
        title: 'Types',
        link: '/pages/customer-types'
      },
      {
        title: 'Items',
        link: '/pages/customers/items'
      },
      {
        title: 'Sale Invoices',
        link: '/pages/sales-invoices'
      }
    ]
  },
  {
    title: 'Suppliers',
    children: [
      {
        title: 'View',
        link: '/pages/suppliers'
      },
      {
        title: 'Types',
        link: '/pages/suppliers/types'
      },
      {
        title: 'Items',
        link: '/pages/suppliers/items'
      }]
  },
  {
    title: 'Master Data',
    children: [
      {
        title: 'Chart Of Accounts',
        link: '/pages/master-data/chart-of-accounts'
      },
      {
        title: 'Currency Types',
        link: '/pages/master-data/currency-types'
      },
      {
        title: 'Payment Methods',
        link: '/pages/master-data/payment-methods'
      },
      {
        title: 'Payment Terms',
        link: '/pages/master-data/payment-terms'
      },
      {
        title: 'Tax Types',
        link: '/pages/master-data/tax-types'
      },
      {
        title: 'Tax Groups',
        link: '/pages/master-data/tax-groups'
      },
      {
        title: 'Cost Centers',
        link: '/pages/master-data/cost-centers'
      },
      {
        title: 'Accounting Periods',
        link: '/pages/master-data/accounting-periods'
      }
    ]
  },
  {
    title: 'Accounts', children: [
      {title: 'Journal Entries', link: '/pages/accounts/journal-entries'}
    ]
  },
  {
    title: 'FEATURES',
    group: true
  },
  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper'
      },
      {
        title: 'List',
        link: '/pages/layout/list'
      },
      {
        title: 'Infinite List',
        link: '/pages/layout/infinite-list'
      },
      {
        title: 'Accordion',
        link: '/pages/layout/accordion'
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs'
      }
    ]
  },
  {
    title: 'Forms',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs'
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts'
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons'
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker'
      }
    ]
  },
  {
    title: 'UI Features',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid'
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons'
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography'
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields'
      }
    ]
  },
  {
    title: 'Modal & Overlays',
    icon: 'browser-outline',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog'
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window'
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover'
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr'
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip'
      }
    ]
  },
  {
    title: 'Extra Components',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar'
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar'
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner'
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert'
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit'
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat'
      }
    ]
  },
  {
    title: 'Maps',
    icon: 'map-outline',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps'
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet'
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble'
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap'
      }
    ]
  },
  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts'
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs'
      },
      {
        title: 'D3',
        link: '/pages/charts/d3'
      }
    ]
  },
  {
    title: 'Editors',
    icon: 'text-outline',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce'
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor'
      }
    ]
  },
  {
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table'
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid'
      }
    ]
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404'
      }
    ]
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login'
      },
      {
        title: 'Register',
        link: '/auth/register'
      },
      {
        title: 'Request Password',
        link: '/auth/request-password'
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password'
      }
    ]
  }
];
