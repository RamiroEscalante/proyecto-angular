import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private productos : Producto[] = [];

  constructor() { }

   // Obtener todos los productos
   getProductos(): Producto[] {
    return this.productos;
  }

  // Agregar un nuevo producto
  agregarProducto(producto: Producto) {
    this.productos.push(producto);
    this.generarXML();
  }

  // Editar un producto existente
  editarProducto(id: number, datosActualizados: Partial<Producto>) {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos[index] = { ...this.productos[index], ...datosActualizados };
      this.generarXML();
    }
  }

  // Eliminar un producto
  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.generarXML();
  }

   // Generar un archivo XML con la lista de productos
   generarXML() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<inventario>\n`;
    this.productos.forEach(p => {
      xml += `  <producto>\n`;
      xml += `    <id>${p.id}</id>\n`;
      xml += `    <nombre>${p.nombre}</nombre>\n`;
      xml += `    <precio>${p.precio}</precio>\n`;
      xml += `    <descripcion>${p.imagen}</descripcion>\n`;
      xml += `  </producto>\n`;
    });
    xml += `</inventario>`;

    // Crear un Blob y descargar el archivo XML
    const blob = new Blob([xml], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'inventario.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
