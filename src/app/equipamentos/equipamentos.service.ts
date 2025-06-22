import { Injectable } from '@angular/core';
import { Equipamento } from './equipamento.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipamentosService {
  private equipamentos: Equipamento[] = [
    { id: 1, nome: 'Vara de Pesca', tipo: 'Equipamento Principal', quantidade: 40 },
    { id: 2, nome: 'Anzóis', tipo: 'Acessório', quantidade: 60 },
    { id: 3, nome: 'Molinete', tipo: 'Equipamento de Recolhimento', quantidade: 40 },
    { id: 4, nome: 'Boia', tipo: 'Flutuador', quantidade: 15 }
  ];
  private nextId = 5;

  constructor() { }

  getEquipamentos(): Observable<Equipamento[]> {
    return of(this.equipamentos).pipe(delay(500));
  }

  addEquipamento(equipamento: Omit<Equipamento, 'id'>): Observable<Equipamento> {
    const novoEquipamento: Equipamento = { id: this.nextId++, ...equipamento };
    this.equipamentos.push(novoEquipamento);
    return of(novoEquipamento).pipe(delay(500));
  }

  updateEquipamento(equipamento: Equipamento): Observable<Equipamento> {
    const index = this.equipamentos.findIndex(e => e.id === equipamento.id);
    if (index > -1) {
      this.equipamentos[index] = equipamento;
      return of(equipamento).pipe(delay(500));
    }
    return of(null as any).pipe(delay(500));
  }

  deleteEquipamento(id: number): Observable<boolean> {
    const initialLength = this.equipamentos.length;
    this.equipamentos = this.equipamentos.filter(e => e.id !== id);
    return of(this.equipamentos.length < initialLength).pipe(delay(500)); // Retorna true se deletou
  }
}