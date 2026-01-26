import { Component, EventEmitter, Input, OnInit, Output, input, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnInit {
  protected _count = signal(0);

  initialValue = input<number| undefined>();

  @Input()
  max = Number.MAX_VALUE;
  @Input()
  min = 0;
  @Output()
  protected onCounterChange = new EventEmitter<number>();
  @Output()
  protected onIncrement = new EventEmitter<void>();
  @Output()
  protected onDecrement = new EventEmitter<void>();

  public count = this._count.asReadonly();
  ngOnInit(): void {
      this._count.set(this.initialValue() || this.min);
  }

  public increment(inc: number = 1) {
    if(this._count() >= this.max ) return;
    this._count.update(v => v + inc);
    this.onCounterChange.emit(this._count());
    this.onIncrement.emit();
  }
  public decrement(inc: number = 1) {
    if(this._count() <= this.min ) return;
    this._count.update(v => v - inc);
    this.onCounterChange.emit(this._count());
    this.onDecrement.emit();
  }
}
