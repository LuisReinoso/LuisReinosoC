import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have type attribute', () => {
    expect(component.type).toBeDefined();
  });

  it('should have message attribute', () => {
    expect(component.message).toBeDefined();
  });

  it('should have closable attribute', () => {
    expect(component.closable).toBeDefined();
  });

  it('should initialize isVisible as false', () => {
    expect(component.isVisible).toBeFalsy();
  });

  it('should emit close when call emitClose function', () => {
    const closeSpy = jest.spyOn(component.close, 'emit');

    component.emitClose();

    expect(closeSpy).toHaveBeenCalled()
  })
});
