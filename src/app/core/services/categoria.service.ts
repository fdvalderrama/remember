import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categoria } from '../../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5150/api/categorias';

  constructor() { }

  getCategorias(){
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  postCategoria(categoria: Categoria){
    return this.http.post(this.apiUrl, categoria);
  }

  updateCategoria(categoria: Categoria){
    return this.http.put( `${this.apiUrl}/${categoria.id}`, categoria);
  }

  deleteCategoria(categoria: Categoria){
    categoria.estatus = false;
    return this.http.put(`${this.apiUrl}/${categoria.id}`, categoria);
  }

  getCategoriasActivas(){
    return this.http.get<Categoria[]>(`${this.apiUrl}/activas`);
  }
}
