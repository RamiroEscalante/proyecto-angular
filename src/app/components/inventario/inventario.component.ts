import { Component } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-inventario',
  imports: [],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent {

  productos: Producto[] = [];
  nuevaImagen: string = '';

  constructor(private inventarioService: InventarioService) {}

  ngOnInit() {
    this.productos = this.inventarioService.getProductos();
  }

  agregarProducto() {
    const nuevoProducto = new Producto(
      Date.now(), // Simulación de un ID único
      'Producto Ejemplo',
      100,
      this.nuevaImagen || 'https://via.placeholder.com/150' // Imagen por defecto
    );
    this.inventarioService.agregarProducto(nuevoProducto);
    this.productos = this.inventarioService.getProductos();
  }

  eliminarProducto(id: number) {
    this.inventarioService.eliminarProducto(id);
    this.productos = this.inventarioService.getProductos();
  }

  descargarXML() {
    this.inventarioService.generarXML();
  }

}
