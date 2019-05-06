import { TestBed } from '@angular/core/testing';

import { FriendReqService } from './friend-req.service';

describe('FriendReqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendReqService = TestBed.get(FriendReqService);
    expect(service).toBeTruthy();
  });
});
