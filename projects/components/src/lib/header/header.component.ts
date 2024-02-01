import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ThemeComponent } from '../theme/theme.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule, ThemeComponent ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router);
}
