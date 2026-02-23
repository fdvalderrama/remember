import { Component, Input } from '@angular/core';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-detalles',
  imports: [],
  templateUrl: './detalles.component.html'
})
export class DetallesComponent {
  @Input() selectedCategoria: Categoria = {
    id: 0,
    nombre: '',
    estatus: true
  }
}
