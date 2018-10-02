import { trigger, state, style, animate, transition } from '@angular/animations';

export function visibility() {
  return trigger('visibility', [
    state('shown', style({
      transform: 'scale(1.0)',
      opacity: 1
    })),
    state('hidden', style({
      transform: 'scale(0.5)',
      opacity: 0
    })),
  transition('* => *', animate('0.5s ease-in-out'))
  ]);
}

export function flyInOut() {
  return trigger('flyInOut', [
    state('*', style({ opacity: 1, transform: 'translateX(0)'})),
    transition(':enter', [
      style({ transform: 'translateX(-100%)', opacity:0 }),
      animate('500ms ease-in')
    ]),
    transition(':leave', [
      animate('500ms ease-out', style({ transform: 'translateX(100%)', opacity: 0}))
    ])
  ]);
}

export function expand() {
  return trigger('expand', [
    state('*', style({ opacity: 1, transform: 'translateX(0)' })),
    transition(':enter', [
      style({ transform: 'translateY(-50%)', opacity:0 }),
      animate('200ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
    ])
  ]);
}

export function slide() {
  //   return trigger('slide', [
  //     state('left', style({ transform: 'translateX(-100%)' })),
  //     state('middle', style({ transorms: 'translateX(0%)' })),
  //     state('right', style({ transform: 'translateX(100%)' })),
  //     transition('* => *', animate(300))
  // ]);
  return trigger('slide', [
    // state('left', style({ opacity: 0, transform: 'translateX(-100%)'})),
    // state('middle', style({ opacity: 1, transform: 'translateX(0)'})),
    // state('right', style({ opacity: 0, transform: 'translateX(100%)'})),
    transition('left => middle', [
      style({ transform: 'translateX(-100%)', opacity: 0 }),
      animate('500ms ease-in'),
      style({ transform: 'translateX(0)', opacity: 1 })
    ]),
    transition('right => middle', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('500ms ease-in'),
      style({ transform: 'translateX(0)', opacity: 1 })
    ]),
    transition('middle => left', [
      style({ transform: 'translateX(0)', opacity: 1 }),
      animate('500ms ease-out'),
      style({ transform: 'translateX(-100%)', opacity: 0 })
    ]),
    transition('middle => right', [
      style({ transform: 'translateX(0)', opacity: 1 }),
      animate('500ms ease-out'),
      style({ transform: 'translateX(100%)', opacity: 0 })
    ]),
  ]);
}