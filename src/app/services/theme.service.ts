import { Injectable, effect, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
}) export class ThemeService {
  themes = ["light", "dark", "cupcake", "forest", "coffee"];
  theme = signal('light');

  applyTheme$ = effect(() => {
    console.log('hello?', this.theme());
    document.documentElement.setAttribute('data-theme', this.theme())
  });
}