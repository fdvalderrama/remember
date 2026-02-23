import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../core/services/categoria.service';
import { Categoria } from '../../models/categoria';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-categoria',
  imports: [FormsModule, TableComponent],
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent{


  categoria: Categoria = {
    id: 0,
    nombre: '',
    estatus: true
  }

  categoriasService  = inject(CategoriaService)

  refreshTable = false

  upsertCategoria(){

    if(this.categoria.id !== 0){
      this.categoriasService.updateCategoria(this.categoria).subscribe({
        next: (data)=>{
          this.clearForm()
          this.refreshTable = !this.refreshTable;
        },
        error: (err) => {          console.error('Error al actualizar categoría:', err);
        }
      })
    }

    this.categoriasService.postCategoria(this.categoria).subscribe({
      next: (data) => {
      this.clearForm()
      this.refreshTable = !this.refreshTable;
    }, error: (err) => {
      console.error('Error al agregar categoría:', err);
    }}
  )
  }

  deleteCategoria(){
    this.categoriasService.deleteCategoria(this.categoria).subscribe({
      next: (data) => {
        this.clearForm()
        this.refreshTable = !this.refreshTable;
      },
      error: (err) => {
        console.error('Error al eliminar categoría:', err);
      }
    })
  }

  clearForm(){
    this.categoria = {
      id: 0,
      nombre: '',
      estatus: true
    }
  }

  showDetails(){

  }
}
