const Rx = require('rxjs/Rx');

const observable = Rx.Observable.create((observer) => {
    setTimeout(() => {
        observer.next('I execute first.');
        setTimeout(() => {
            observer.next('I execute next.');
            setTimeout(() => {
                observer.next('I execute last.');
            }, 800);
        }, 500);
    }, 100);
});

observable.subscribe({
    next: value => console.log(value),
    error: err => console.error('Something bad: ', err),
    complete: () => console.log("Done!")
});
