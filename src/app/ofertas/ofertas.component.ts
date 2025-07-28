import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarritoService } from '../carrito/carrito.service'; // 👈 Asegúrate que la ruta esté bien

@Component({
  selector: 'app-oferta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ofertas.html',
  styleUrls: ['./ofertas.css']
})
export class OfertaComponent implements OnInit {
  productosEnOferta: any[] = [];

  constructor(
    private http: HttpClient,
    private carritoService: CarritoService // 👈 Inyecta el servicio
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/api/productos').subscribe(productos => {
      this.productosEnOferta = productos.filter(p => p.oferta && p.oferta > 0);
    });
  }

  calcularDescuento(precio: number, oferta: number): number {
    return Math.round(((precio - oferta) / precio) * 100);
  }

  agregarAlCarrito(producto: any): void {
    this.carritoService.agregar(producto); // 👈 Usa el servicio para agregar
  }
}
