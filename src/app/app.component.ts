import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login-page/login-page.component";
import { EquipamentosComponent } from "./equipamentos/equipamentos.component";
import { SobreComponent } from "./sobre-page/sobre-page.component";
import { HomeComponent } from "./home-page/home-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, EquipamentosComponent, SobreComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projetopagina';
}
