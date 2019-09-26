import { Component, OnInit } from '@angular/core'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/observable/interval'
import 'rxjs/add/observable/merge'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import {
  concat, concatMap, debounceTime, delay, delayWhen, distinctUntilChanged, map,
  mapTo, publishReplay, refCount, scan, share, startWith, switchMap, take, tap, zip
} from 'rxjs/operators'
import {
  generateSolution, LIGHT_DURATION, MESSAGE_DURATION, nextTurn, playSound,
  SOLUTION_DELAY, Turn
} from './utils'
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-flippisay',
  templateUrl: './flippisay.component.html',
  styleUrls: ['./flippisay.component.scss']
})
export class FlippisayComponent implements OnInit {
  // sequence of random number from 0 to 3 (representing the 4 pads) and which
  // should be replicated by the player
  solution: number[] = generateSolution()
  // observer of the click on the play button, observable of the initial state
  start$: Observable<Turn>
  // observable of the state of the game after each click (continue, level up, loose)
  turn$: Observable<Turn>
  // observable of messages to display in reaction of the game state changes
  message$: Observable<string>
  // observable of the number of the currently active pad (be it via player clicks
  // or via sequence sample by the game.
  activePad$: Observable<number>

  lastLevel: any;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    // listen for clicks on the PLAY button
    this.start$ = Observable.fromEvent(
      document.querySelector('.play'), 'click'
    ).pipe(
      // limit the stream to the first (and only possible) click,
      // thus completing the observable
      take(1),
      // and map it to our initial Turn model
      mapTo(new Turn())
    )

    this.start$.subscribe(v => console.log('start', v))

    // listen for clicks on the pad buttons
    const playerSequence$ = Observable.fromEvent(
      document.querySelectorAll('.pad'), 'click'
    ).pipe(
      // and map them to their numeric value
      map((click: Event) => +(click.srcElement as Element).getAttribute('data-pad'))
    )

    // build the turn observable : based on the sequence or clicks, decide whether to
    // - continue in a level,
    // - pass to the next one
    // - or return to level 1 when the player looses
    this.turn$ = this.start$.pipe(
      // initiate the first level with the click on "PLAY", then concat that
      // observable of one click to the infinite observable of pad clicks
      concat(
        playerSequence$.pipe(
          // similar to what ngrx does, we compute our next state based on
          // the previous state and the new event (new click here, new Action in ngrx)
          scan((turn: Turn, pad: number, clickIndex: number) =>
            nextTurn(this.solution, turn, pad, clickIndex),
            new Turn()
          ),
          // do not emit a new state when the level hasn't change
          distinctUntilChanged(),
          // generate a new solution when the user looses and head back
          // to level 1
          tap(turn => {
            if (turn.previousWasLost) {
              this.solution = generateSolution();
              this.loadResult(); // Save data result
            }
          })
        )
      ),
      // this observable is used by several observers, it must be shared in
      // order not to replicate its chain for each one (which would effectively
      // generate several solutions after each loss for example)
      share()
    )

    // log out the current turn if changed
    this.turn$.subscribe(turn => console.log(turn))

    // build the observable of messages do display in reaction to the player clicks
    this.message$ = this.start$.pipe(
      // greet the player when she starts the game
      mapTo('GO'),
      // and concat that to the infinite observable of changes in the game's state
      // to display a happy face upon leveling up, and a sad one upon loosing
      concat(
        this.turn$.pipe(
          map((turn: Turn) => turn.previousWasLost ? ':-(' : ':-)')
        )
      ),
      switchMap(message =>
        // To display at most a message each second, we zip the observable
        // of messages to an observable interval of 1s
        Observable.interval(MESSAGE_DURATION).pipe(
          // and to display the first message in the message batch immediately
          // we start with a dummy tick
          startWith(0),
          // upon loosing concat with a new 'GO' message after the sad face,
          // in any case concat with "null" so that the message gets
          // erased after 1s
          zip(
            message === ':-('
              ? Observable.of(message, 'YA', null)
              : Observable.of(message, null)
          ),
          // we zipped to enforce a rhythm, but we only care about the message
          map(([tick, mes]) => mes)
        )
      )
    )

    // build the observable of the currently active pad number (will light up
    // the corresponding pad and play the corresponding sound)
    this.activePad$ = this.turn$.pipe(
      // we use a switchMap below to cancel potential ongoing sequence sample
      // when the user clicks on a wrong pad (ie a new turn starts)... but we
      // still need to display that click (same goes for the last click in
      // every level) : delay this canceling until the next vm turn, so that
      // this last click goes through.
      delay(0),
      switchMap(turn => {
        this.lastLevel = turn.level;
        // merge the player sequence and the solution sequence to light the
        // pads and play the sounds
        return Observable.merge(
          playerSequence$,
          // transform the solution (number[]) into an Observable<number>
          // that we can use to show the pattern before the player tries
          // to replicate it
          Observable.from(this.solution).pipe(
            // only take the first n pads (n corresponding to the current level
            take(turn.level),
            // and delay the sample when there are messages being shown
            // (the messages would distract the player who would miss
            // the first few pads)
            delayWhen(() =>
              this.message$.pipe(
                // but don't wait for a new message before displaying the
                // sequence when there aren't any currently being shown
                startWith(''),
                // then wait for a short bit longer than the message
                // display duration
                debounceTime(MESSAGE_DURATION + 1)
              )
            ),
            // then delay each pad sample so that the player can follow them
            // (and so that we see multiple lightings in sequence when
            // the solution has the same pad multiple times in a row)
            // This is just to showcase another technique than the one used
            // above to delay the messages
            concatMap(pad =>
              Observable.of(pad).pipe(delay(SOLUTION_DELAY))
            )
          )
        )
      }),
      concatMap(pad =>
        // like we did for the messages, we concat with null so that our
        // pad lights are switched off after a period of time
        Observable.of(pad, null).pipe(
          delayWhen(p => p === null ? Observable.timer(LIGHT_DURATION) : Observable.of(true))
        )
      ),
      // play the corresponding sound
      tap(pad => playSound(pad)),
      // and share this observable because it has several subscribers (otherwise
      // it would play multiple sounds and switch on the pads multiple times...
      // this would happen in parallel so we wouldn't notice, but it still
      // would happen...)
      share()
    )
  }

  loadResult() {
    this.firebaseService.addResult('FlippiSay', this.lastLevel, false)
      .then(result => {
        console.log("insert result");
      });
  }
}
