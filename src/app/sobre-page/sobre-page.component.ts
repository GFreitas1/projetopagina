import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-page.component.html',
  styleUrls: ['./sobre-page.component.css']
})
export class SobreComponent {
  nomeProjeto: string = 'Sistema de Gestão de Pesqueiros';
  versao: string = '1.0.0';
  autor: string = 'Time Carpa Cabeçuda';
  anoCriacao: number = 2025;
  descricao: string = 'Este sistema foi desenvolvido para auxiliar na gestão de pesqueiros';
  contatoEmail: string = 'carpacabecuda@exemplo.com';

  constructor(
    public router: Router
  ) { }
}
