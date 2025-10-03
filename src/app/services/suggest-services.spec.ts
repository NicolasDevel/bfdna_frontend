import { TestBed } from '@angular/core/testing';

import { SuggestServices } from './suggest-services';

describe('SuggestServices', () => {
  let service: SuggestServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
