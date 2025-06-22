import { Routes } from '@angular/router';
import { LoginComponent } from './login-page/login-page.component';
import { HomeComponent } from './home-page/home-page.component';
import { EquipamentosComponent } from './equipamentos/equipamentos.component';
import { SobreComponent } from './sobre-page/sobre-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'equipamentos', component: EquipamentosComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
