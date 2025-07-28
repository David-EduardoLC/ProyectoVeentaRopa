import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CarritoService } from './carrito.service';
import { PedidoService } from '../services/pedido';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  // Variables del modal
  mostrarModal = false;
  nombre = '';
  tarjeta = '';
  cvv = '';
  fecha = '';

  constructor(
    private carritoService: CarritoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  get total(): number {
    return this.carritoService.obtenerTotal();
  }

  actualizarCantidad(item: any) {
    this.carritoService.actualizarCantidad(item.id, item.cantidad);
    this.carrito = this.carritoService.obtenerCarrito();
  }

  eliminar(item: any) {
    this.carritoService.eliminar(item);
    this.carrito = this.carritoService.obtenerCarrito();
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  procesarPago() {
    this.mostrarModal = false;

    const productos = this.carrito.map(item => ({
      id: item.id,
      cantidad: item.cantidad,
      precio: item.precio
    }));

    this.pedidoService.crearPedido(productos).subscribe({
      next: (pedido: any) => {
        this.carritoService.vaciar();
        this.carrito = [];

        localStorage.setItem('pedidoId', pedido.id);
        this.router.navigate(['/seguimiento']);
      },
      error: (err: any) => {
        alert('❌ Error al registrar el pedido.');
        console.error(err);
      }
    });
  }
}
