import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AlertService } from './shared/alert/alert.service';
// import { describe, expect, test , it, beforeEach} from '@jest/globals';

describe('AppComponent', () => {
  let component: AppComponent;
  let alertService: AlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: AlertService, useValue: { closeAlert: () => null } }],
    });

    alertService = TestBed.inject(AlertService);
    component = new AppComponent(alertService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeAlert from alertService when closeAlert is called', () => {
    const closeAlertSpy = jest.spyOn(alertService, 'closeAlert');

    component.closeAlert();

    expect(closeAlertSpy).toHaveBeenCalled();
  });
});
