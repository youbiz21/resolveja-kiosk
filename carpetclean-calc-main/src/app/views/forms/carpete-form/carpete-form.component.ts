import { CommonModule } from '@angular/common';
import { Component, OnInit, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconCardComponent } from '../../../components/icon-card/icon-card.component';
import { CarpeteFormFactory } from '../../../models/CarpeteModels';
import { Nullable } from 'primeng/ts-helpers';
import { IconComponent } from '../../../components/icon/icon.component';

@Component({
  selector: 'app-carpete-form',
  standalone: true,
  imports: [
    CommonModule,
    IconCardComponent,
    InputNumberModule,
    ButtonModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    RadioButtonModule,
    IconComponent
  ],
  templateUrl: './carpete-form.component.html',
  styleUrl: './carpete-form.component.scss'
})
export class CarpeteFormComponent implements OnInit {
  form = input.required<ReturnType<typeof CarpeteFormFactory>>();

  ngOnInit(): void {
    this.form().controls.x.valueChanges.subscribe((x) => {
      const y = (this.form().value.y || 0);
      this.form().controls.medida.setValue((x || 0) * y ) ;
    });
    
    this.form().controls.y.valueChanges.subscribe((y) => {
      const x = this.form().value.x || 0;
      this.form().controls.medida.setValue((y || 0) * x);
    });
    
    this.form().controls.d.valueChanges.subscribe((d) => {
      const diameter = d || 0;
      this.form().controls.medida.setValue((Math.PI * Math.pow(diameter, 2) / 4));
    });
    
    this.form().controls.a.valueChanges.subscribe((a) => {
      const lado = a || 0;
      this.form().controls.medida.setValue(lado * lado);
    });

    this.form().controls.formato.valueChanges.subscribe((formato) => {
      this.form().controls.medida.reset();
      switch(formato) {
        case 'quadrado':
          this.form().controls.a.enable();
          this.form().controls.d.reset(0);
          this.form().controls.a.reset(0);
          this.form().controls.x.reset(0);
          this.form().controls.y.reset(0);
          this.form().controls.x.disable();
          this.form().controls.y.disable();
          this.form().controls.d.disable();
          break;
        case 'redondo':
          this.form().controls.d.enable();
          this.form().controls.d.reset(0);
          this.form().controls.a.reset(0);
          this.form().controls.x.reset(0);
          this.form().controls.y.reset(0);
          this.form().controls.x.disable();
          this.form().controls.y.disable();
          this.form().controls.a.disable();
          break;
        case 'retangulo':
          this.form().controls.x.enable();
          this.form().controls.y.enable();
          this.form().controls.d.reset(0);
          this.form().controls.a.reset(0);
          this.form().controls.x.reset(0);
          this.form().controls.y.reset(0);
          this.form().controls.d.disable();
          this.form().controls.a.disable();
          break;
      }
    });
  }
}
