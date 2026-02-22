import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { CategoriaService } from '../../core/services/categoria.service';
import { Categoria } from '../../models/categoria';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  imports: [FormsModule],
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit{

  categorias = signal<Categoria[]>([]);
  categoriasService  = inject(CategoriaService)
  categoriaNueva: Categoria = {
    id: 0,
    nombre: '',
    estatus: true
  }

  currentPage = signal(1);
  pageSize = signal(5);

  filteredCategorias = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if(!term) return this.categorias();
    return this.categorias().filter(c => c.nombre.toLowerCase().includes(term));
  })

  paginatedCategorias = computed(() =>{
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredCategorias().slice(start, end);
  })

  totalPages = computed(() => {
    return Math.ceil(this.filteredCategorias().length / this.pageSize());
  })

  searchTerm = signal('');



  ngOnInit(): void {
    this.actualizarTabla()
  }

  prevPage(){
    if(this.currentPage() > 1){
      this.currentPage.update(n => n - 1)
    }
  }

  nextPage(){
    if(this.currentPage() < this.totalPages()){
      this.currentPage.update(n => n + 1)
    }
  }

  upsertCategoria(){

    if(this.categoriaNueva.id !== 0){
      this.categoriasService.updateCategoria(this.categoriaNueva).subscribe({
        next: (data)=>{
          this.clearForm()
          this.actualizarTabla()
        },
        error: (err) => {          console.error('Error al actualizar categoría:', err);
        }
      })
    }

    this.categoriasService.postCategoria(this.categoriaNueva).subscribe({
      next: (data) => {
      this.clearForm()
      this.actualizarTabla()
    }, error: (err) => {
      console.error('Error al agregar categoría:', err);
    }}
  )
  }

  deleteCategoria(){
    this.categoriasService.deleteCategoria(this.categoriaNueva).subscribe({
      next: (data) => {
        this.clearForm()
        this.actualizarTabla()
      },
      error: (err) => {
        console.error('Error al eliminar categoría:', err);
      }
    })
  }

  actualizarTabla(){
    this.categoriasService.getCategoriasActivas().subscribe({
      next: (data) => {
        this.categorias.set(data)
      },
      error: (err) => {
        console.error('Error al actualizar tabla de categorías:', err);
      }
    })
  }

  selectCategoria(categoria: Categoria){
    this.categoriaNueva = { ...categoria }
  }

  clearForm(){
    this.categoriaNueva = {
      id: 0,
      nombre: '',
      estatus: true
    }
  }

}
