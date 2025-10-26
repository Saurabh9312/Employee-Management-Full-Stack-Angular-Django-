import { Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
import { ViewEmployee } from './components/view-employee/view-employee';
import { Signupform } from './components/signupform/signupform';
import { Signinform } from './components/signinform/signinform';
import { EditEmployee } from './components/edit-employee/edit-employee';
import { authGuardGuard } from './services/auth-guard-guard';
import { AddEmployee } from './components/add-employee/add-employee';

export const routes: Routes = [
  {
    path: 'list',
    component: EmployeeList,
    canActivate: [authGuardGuard]
  },
  {
    path: 'employees/add',
    component: AddEmployee,
    canActivate: [authGuardGuard]
  },
  {
    path: 'employees/view/:id',
    component: ViewEmployee,
    canActivate: [authGuardGuard]
  },
  {
    path: 'employees/edit/:id',
    component: EditEmployee,
    canActivate: [authGuardGuard]
  },
  {
    path: 'employees/delete/:id',
    component: EmployeeList,
    canActivate: [authGuardGuard]
  },
  { path: 'signup', component: Signupform },
  { path: '', component: Signinform },
  {
    path:'login',
    component:Signinform
  }
];
