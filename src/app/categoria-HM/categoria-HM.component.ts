import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../carrito/carrito.service';

@Component({
  selector: 'app-categoriahm',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './categoria-HM.html',
  styleUrls: ['./categoria-HM.css']
})
export class CategoriaHMComponent implements OnInit {
  tipo: string = '';
  productos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.tipo = this.route.snapshot.paramMap.get('tipo') || '';
    this.http.get<any[]>(`http://127.0.0.1:8000/api/productos/categoria/${this.tipo}`)
      .subscribe(data => this.productos = data);
  }

  calcularDescuento(precio: number, oferta: number): number {
    return Math.round(((precio - oferta) / precio) * 100);
  }

  agregarAlCarrito(producto: any) {
    console.log('Producto añadido:', producto);
    this.carritoService.agregar(producto); // ✅ Guarda en localStorage y BehaviorSubject
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
