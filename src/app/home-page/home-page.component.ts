import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomeComponent implements OnInit {

  username: string | null = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
  }

  navigateToEquipamentos(): void {
    this.router.navigate(['/equipamentos']);
  }

  navigateToSobre(): void {
    this.router.navigate(['/sobre']);
  }
  
}
