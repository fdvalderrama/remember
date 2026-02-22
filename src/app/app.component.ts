import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategoriaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Remember';


}
