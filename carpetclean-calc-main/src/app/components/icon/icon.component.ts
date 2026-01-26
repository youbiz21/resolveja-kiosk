import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  icon = input.required<string>();
  viewbox = input<string>('#svgView(viewBox(42.81,42.81,85.62,85.62))');
  width = input<number>(60);
  height = input<number>(60);
  src = computed(() => `/assets/icons/${this.icon()}.svg${this.viewbox()}`);
}
