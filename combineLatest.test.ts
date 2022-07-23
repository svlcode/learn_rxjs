import { combineLatest, map, of, Subject, switchMap, timeout } from 'rxjs';

test('combineLatest to simulate c = a + b', (done) => {
  const a = new Subject<number>();
  const b = new Subject<number>();
  const checkMock = jest.fn();
  // create a third stream which emits values that are a result
  // of combining the latest values emited by the
  // two source streams (a and b Subjects)
  const sum = combineLatest([a, b]);
 
  sum.subscribe({
    next: ([num1, num2]) => {
      const result = num1 + num2;
      checkMock(result);
    },
    complete: () => {
      try {
        expect(checkMock).toBeCalledTimes(2);
        expect(checkMock).toHaveBeenNthCalledWith(1, 9);
        expect(checkMock).toHaveBeenNthCalledWith(2, 6);
        done();
      } catch (err) {
        done(err);
      }
    },
  });

  a.next(4);
  // at this moment 'sum' will trigger and checkMock will be called with the result 9
  b.next(5);

  // at this moment 'sum' will trigger the second time with the latest values emitted
  // by subject a (which is 4) and subject b(which is 2) and therefore checkMock will
  // be called with the result 6
  b.next(2);

  a.complete();
  // when both subjects complete also the sum observable completes.
  b.complete();
});
