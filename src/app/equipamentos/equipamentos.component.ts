import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Equipamento } from './equipamento.model';
import { EquipamentosService } from './equipamentos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipamentos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.css'],
})
export class EquipamentosComponent implements OnInit {

  equipamentos: Equipamento[] = [];
  formNovoEquipamento: FormGroup;
  formEdicaoEquipamento: FormGroup | null = null;
  equipamentoEmEdicaoId: number | null = null;
  isAddingEquipment: boolean = false;

  constructor(
    private equipamentosService: EquipamentosService,
    private fb: FormBuilder,
    public router: Router
  ) {
    this.formNovoEquipamento = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.carregarEquipamentos();
  }

  carregarEquipamentos(): void {
    this.equipamentosService.getEquipamentos().subscribe(data => {
      this.equipamentos = data;
    });
  }

  adicionarEquipamento(): void {
    console.log('adicionarEquipamento() called');
    if (this.formNovoEquipamento.valid) {
      const novoEquipamento: Omit<Equipamento, 'id'> = this.formNovoEquipamento.value;
      this.equipamentosService.addEquipamento(novoEquipamento).subscribe(equipamento => {
        this.carregarEquipamentos();
        this.formNovoEquipamento.reset({ nome: '', tipo: '', quantidade: 0 });
        console.log('Equipamento adicionado com sucesso!');
      });
    } else {
      alert('Por favor, preencha todos os campos do novo equipamento corretamente. A quantidade deve ser maior que zero.');
    }
  }

  iniciarEdicao(equipamento: Equipamento): void {
    this.equipamentoEmEdicaoId = equipamento.id;
    this.formEdicaoEquipamento = this.fb.group({
      id: [equipamento.id],
      nome: [equipamento.nome, Validators.required],
      tipo: [equipamento.tipo, Validators.required],
      quantidade: [equipamento.quantidade, [Validators.required, Validators.min(1)]]
    });
  }

  salvarEdicao(): void {
    if (this.formEdicaoEquipamento && this.formEdicaoEquipamento.valid) {
      const equipamentoAtualizado: Equipamento = this.formEdicaoEquipamento.value;
      this.equipamentosService.updateEquipamento(equipamentoAtualizado).subscribe(updatedEquip => {
        if (updatedEquip) {
          const index = this.equipamentos.findIndex(e => e.id === updatedEquip.id);
          if (index > -1) {
            this.equipamentos[index] = updatedEquip;
          }
          this.cancelarEdicao();
        } else {
          alert('Erro ao atualizar equipamento.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos do equipamento em edição corretamente. A quantidade deve ser maior que zero.');
    }
  }

  cancelarEdicao(): void {
    this.equipamentoEmEdicaoId = null;
    this.formEdicaoEquipamento = null;
  }

  deletarEquipamento(id: number): void {
    if (confirm('Tem certeza que deseja deletar este equipamento?')) {
      this.equipamentosService.deleteEquipamento(id).subscribe(sucesso => {
        if (sucesso) {
          this.equipamentos = this.equipamentos.filter(e => e.id !== id);
          if (this.equipamentoEmEdicaoId === id) {
            this.cancelarEdicao();
          }
        } else {
          alert('Erro ao deletar equipamento.');
        }
      });
    }
  }
}