import { trigger, group, query, animateChild, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimation', [
    // route 'enter' transition
    transition(':enter, :leave', [

      // styles at start of transition
      style({ opacity: 0, transform: 'scale(0.7)' }),

      // animation and styles at end of transition
      animate('.223s cubic-bezier(.35,0,.25,1)', style({ opacity: 1, transform: 'scale(1.05)'})),
      animate('.223s cubic-bezier(.35,0,.25,1)', style({ opacity: 1, transform: 'scale(1)'}))
    ]),
  ]);
export const changePage = trigger('changePage',
  [
      transition('* <=> *', [
        group([
          query(
            ':self',
            [
              // styles at start of transition
              style({ opacity: 0, transform: 'scale(0.95) translateY(20px)' }),

              // animation and styles at end of transition
              animate('.35s cubic-bezier(.35,0,.25,1)', style({ opacity: 0.8, transform: 'scale(1) translateY(0px)'})),
              animateChild()
            ],
            { optional: true }
          )
        ])
      ])
    ]);