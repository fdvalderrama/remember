import { Component, computed, inject, input, model, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../core/services/categoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [FormsModule],
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, OnChanges{

  categoriaSelected = model<Categoria>();

  categorias = signal<Categoria[]>([]);
  categoriasService  = inject(CategoriaService)

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

  refreshTable = input<boolean>(false);

  ngOnInit(): void {
    this.actualizarTabla()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['refreshTable']){
      this.actualizarTabla()
    }
  }


  selectCategoria(categoria: Categoria){
    this.categoriaSelected.set({...categoria});
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

}
