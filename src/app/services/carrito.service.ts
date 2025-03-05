import { Injectable } from '@angular/core';
import {Producto} from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
 
  private  carrito: Producto[] = [];
  agregarProducto(producto: Producto){
    this.carrito.push(producto);
  }

  obtenerProducto(){
    return this.carrito;
  }
  
  generarXML() : string{
    let xml = `<?xml version="1.0" encoding="UTF-8" ?> 
    <recibido> `
    this.carrito.forEach((producto) => {
      xml += `<producto id="${producto.id}">
      <nombre>${producto.nombre}</nombre> 
      </producto>`    
    });
    xml += '</recibido>';
    const blob = new Blob([xml], {type:'aapplication/json'})
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url
    a.download = "recibido.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return xml;
  }

  eliminarProducto(producto: Producto){
    this.carrito.splice(producto.id, 1);
  }
}
