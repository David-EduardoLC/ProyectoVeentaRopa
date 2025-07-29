import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ CORREGIDO
import { CorreoService } from '../services/correo.service'; // ✅ RUTA RELATIVA

@Component({
  selector: 'app-correo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './correo.html',
  styleUrls: ['./correo.css']
})
export class CorreoFormComponent {
  nombre: string = '';
  pedido_id: number = 0;
  total: number = 0;
  email: string = '';
  mensaje: string = '';

  constructor(private correoService: CorreoService) {}

  enviarCorreo() {
    if (!this.nombre || !this.pedido_id || !this.total || !this.email) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }

    const datos = {
      nombre: this.nombre,
      email: this.email,
      pedido_id: this.pedido_id,
      total: this.total
    };

    console.log('📤 Enviando datos:', datos);

    this.correoService.enviarCorreo(datos).subscribe({
      next: () => {
        this.mensaje = `✅ Correo enviado a ${this.email}. ¡Gracias, ${this.nombre}!`;
      },
      error: (error) => {
        console.error('❌ Error al enviar correo:', error);
        this.mensaje = '❌ Ocurrió un error al enviar el correo.';
      }
    });
  }
}
