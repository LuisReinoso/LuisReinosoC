import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnDestroy {
  form = this.fb.group({
    search: [''],
  });
  private searchSubs: Subscription | null = null;

  @Output() searchValueChange = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchSubs = this.form.controls.search.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(value => {
        this.searchValueChange.emit(value || '');
      });
  }

  ngOnDestroy(): void {
    if (this.searchSubs) {
      this.searchSubs.unsubscribe();
      this.searchSubs = null;
    }
  }
}
