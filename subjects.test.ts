import { combineLatest, of, Subject, timeout } from 'rxjs';

it('works', (done) => {
  const eventEmitter = new Subject<string>();
  eventEmitter.subscribe((value) => {
    expect(value).toBe('this is a test');
    done();
  });
  eventEmitter.next('this is a test');
});


