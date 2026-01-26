import { Component, computed, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  titulo = input.required<string>();
  descricao = input.required<string>(); 
  icon = input.required<string>();
  src = computed(() => `/assets/icons/${this.icon()}.svg#svgView(viewBox(40,50,100,75))`);
}
