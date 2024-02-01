import { AfterViewInit, Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {
  themer = inject(ThemeService);
  theme = this.themer.theme;
  themes = this.themer.themes;

  themeSelect = new FormControl(this.theme());

  subscription = this.themeSelect.valueChanges.pipe(
    takeUntilDestroyed(),
  ).subscribe((theme) => {
    this.theme.set(theme || 'light');
    localStorage.setItem('theme', theme || 'light');
  });
}
