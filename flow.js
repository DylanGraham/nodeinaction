const Rx = require('rxjs/Rx');

const strings = ['I execute first.', 'I execute next.', 'I execute last.'];
const obs1 = Rx.Observable.from(strings);

obs1.subscribe({
    next: value => console.log(value),
    error: err => console.error('Something bad: ', err),
    complete: () => console.log("Done!")
});
