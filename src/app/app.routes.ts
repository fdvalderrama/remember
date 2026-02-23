import { Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { DetallesComponent } from './components/categoria/detalles/detalles.component';

export const routes: Routes = [
  {path: 'categorias', component: CategoriaComponent},
  {path: 'categorias/detalles', component: DetallesComponent}
];
