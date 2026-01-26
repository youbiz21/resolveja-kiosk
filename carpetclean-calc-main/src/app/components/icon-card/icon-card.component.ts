import { CommonModule } from '@angular/common';
import { Component, ContentChild, TemplateRef, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-icon-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './icon-card.component.html',
  styleUrl: './icon-card.component.scss'
})
export class IconCardComponent {
  public label = input<string>();
  public icon = input.required<string>();

  @ContentChild('label', { read: TemplateRef }) labelTemplate?: TemplateRef<any>;
}
