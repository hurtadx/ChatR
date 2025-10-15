import { TestBed } from '@angular/core/testing';
import { Supabase } from './supabase';
import { environment } from '../../../environments/environment';

describe('Supabase', () => {
  let service: Supabase;

  beforeEach(() => {
    
    (environment as any).supabase = {
      url: 'https://example.supabase.co',
      key: 'mock-key-for-testing'
    };

    TestBed.configureTestingModule({
      providers: [Supabase]
    });

    service = TestBed.inject(Supabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize supabase client with mock configuration', () => {
    expect(service.client).toBeDefined();
  });
});
