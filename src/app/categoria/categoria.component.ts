import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../carrito/carrito.service'; // ✅ Ruta correcta según tu estructura

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.css']
})
export class CategoriaComponent {
  productos = [
    {
      nombre: 'Camisa Blanca',
      precio: 299,
      imagen: '/assets/img/camisa.jpg'
    },
    {
      nombre: 'Blusa Estampada',
      precio: 349,
      imagen: '/assets/img/blusa.jpg'
    }
    // Agrega más si quieres
  ];

  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(producto: any): void {
    this.carritoService.agregar(producto);
    console.log('Añadido al carrito:', producto);
  }
}
