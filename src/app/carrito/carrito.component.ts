import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CarritoService } from './carrito.service';
import { PedidoService } from '../services/pedido';
import { CorreoService } from '../services/correo.service'; // Asegúrate de que la ruta sea correcta

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
    private correoService: CorreoService,
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

        const usuario = JSON.parse(localStorage.getItem('user') || '{}');

        const datosCorreo = {
          nombre: usuario.name,
          email: usuario.email,
          pedido_id: pedido.id,
          total: pedido.total
        };

        console.log('📤 Enviando correo con:', datosCorreo);

        this.correoService.enviarCorreo(datosCorreo).subscribe({
          next: () => {
            console.log('✅ Correo enviado correctamente');
          },
          error: (error) => {
            console.error('❌ Error al enviar correo:', error);
            alert('❌ No se pudo enviar el correo. Revisa los datos del usuario o del pedido.');
          }
        });

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
