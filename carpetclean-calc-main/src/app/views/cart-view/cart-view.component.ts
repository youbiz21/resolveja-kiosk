import { Component, OnInit, inject, signal } from '@angular/core';
import { SectionComponent } from '../../components/section/section.component';
import { ButtonModule } from 'primeng/button';
import { CounterComponent } from '../../components/counter/counter.component';
import { IconCardComponent } from '../../components/icon-card/icon-card.component';
import { StepperService } from '../../services/stepper.service';
import { Formularios, Icones, SimuladorFormKeys } from '../../constants/Formularios';
import { CommonModule } from '@angular/common';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [CommonModule, SectionComponent, IconCardComponent, CounterComponent, ButtonModule],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss'
})
export class CartViewComponent implements OnInit {
  form = inject(FormService);
  stepper = inject(StepperService);

  icones = Icones;

  initialValues = signal<Partial<Record<SimuladorFormKeys, number>>>({});

  ngOnInit(): void {
    this.form.form().controls.forEach(f => {
      this.initialValues.update(values => { 
        const key = f.controls.$type.getRawValue();
        values[key] =  (values[key] || 0) + 1
        return values;
      });
    });
  }

  onIncrement(name: SimuladorFormKeys) {
    this.form.form.update(f => {
      f.controls.push(Formularios[name].factory());
      return f;
    });
  }
  onDecrement(name: SimuladorFormKeys) {
    this.form.form.update(f => {
      const removeIndex = f.controls.findIndex(c => c.value.$type == name);
      f.removeAt(removeIndex);
      return f;
    });
  }

  next() {
    if(this.form.form().controls.length > 0) this.stepper.next();
    else {

    }
  }
}
