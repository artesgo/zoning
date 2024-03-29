import { Injectable, effect, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
}) export class ThemeService {
  themes = ["light", "dark", "cupcake", "forest", "coffee"];
  theme = signal(localStorage.getItem('theme') || 'light');

  applyTheme$ = effect(() => {
    document.documentElement.setAttribute('data-theme', this.theme());
  });
}