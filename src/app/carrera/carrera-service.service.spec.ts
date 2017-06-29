/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarreraService } from './carrera-service.service';

describe('CarreraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarreraService]
    });
  });

  it('should ...', inject([CarreraService], (service: CarreraService) => {
    expect(service).toBeTruthy();
  }));
});
