import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FormBuilder],
      imports: [SearchComponent, ReactiveFormsModule],
    });

    fb = TestBed.inject(FormBuilder);
    component = new SearchComponent(fb);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search value after 1 second of typing', done => {
    jest.useFakeTimers();
    const emitSpy = jest.spyOn(component.searchValueChange, 'emit');

    component.form.controls.search.setValue('test');

    jest.advanceTimersByTime(1000);

    expect(emitSpy).toHaveBeenCalledWith('test');
    done();
  });

  it('should not emit value when there is no change', done => {
    jest.useFakeTimers();
    const emitSpy = jest.spyOn(component.searchValueChange, 'emit');

    component.form.controls.search.setValue('test');
    jest.advanceTimersByTime(1000);

    component.form.controls.search.setValue('test');
    jest.advanceTimersByTime(1000);

    expect(emitSpy).toHaveBeenCalledTimes(1);
    done();
  });

  it('should emit empty string when the input is cleared', done => {
    jest.useFakeTimers();
    const emitSpy = jest.spyOn(component.searchValueChange, 'emit');

    component.form.controls.search.setValue('test');
    jest.advanceTimersByTime(1000);

    component.form.controls.search.setValue('');
    jest.advanceTimersByTime(1000);

    expect(emitSpy).toHaveBeenCalledWith('');
    done();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
