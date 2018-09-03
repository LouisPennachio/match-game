# Match Game

Match game is an implementation of the [Nim game strategy][nim] with matches.
Play with a friend, remove 1, 2, or 3 match every turn. If you take the last match, you win.
For now, the game must be played locally.
### Tech

The game runs in a browser and is implemented with [Angular 6][Angular 6]. It features: 
* HTML, CSS, [TypeScript][typescript] - Web stack
* [ngrx/store][store] - Game logic handling
* [Jasmine][jasmine] - To write unit tests
* [Karma][karma] - To run unit test
* [rxjs][rxjs] - For event handling

### Installation

Match Game requires [Node.js](https://nodejs.org/) v8.11.4+ to run.

Install the dependencies and start the server.

```sh
$ npm install
$ ng serve
```

### Testing

```sh
$ ng test
```

License
----
MIT

   [typescript]:  https://www.typescriptlang.org/
   [nim]:  https://en.wikipedia.org/wiki/Nim
   [rxjs]: https://rxjs-dev.firebaseapp.com/
   [store]: <https://github.com/ngrx/platform/blob/master/docs/store/README.md>
   [jasmine]: <https://jasmine.github.io/>
   [karma]: <https://karma-runner.github.io/2.0/index.html>
   [Angular 6]: <https://angular.io/>