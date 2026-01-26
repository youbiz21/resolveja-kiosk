import { Injectable } from '@angular/core';
import { SimuladorFormKeys } from '../constants/Formularios';
import { OFERTAS } from '../constants/Ofertas';



@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  public getOferta(type: SimuladorFormKeys | undefined) {
    if(!type) return null;
    return OFERTAS[type];
  }
}
