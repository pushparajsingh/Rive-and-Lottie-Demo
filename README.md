# Rive + React Demo

Examples of embedding [Rive](https://rive.app) animations in React with [`@rive-app/react-canvas`](https://www.npmjs.com/package/@rive-app/react-canvas), covering the three state machine input types, plus a [Lottie](https://lottiefiles.com) animation for comparison.

[App.jsx](src/App.jsx) renders four independent demos:

- **Trigger** — `vehicles.riv`'s `bumpy` state machine, fired once per button click.
- **Number** — `rating.riv`'s `State Machine 1`, driven by a continuous 0-5 value that fills in the stars.
- **Boolean** — `skills.riv`'s `State Machine 1`, with two independent on/off inputs on the same artboard.
- **Lottie** — a `.lottie` file played via [`@lottiefiles/dotlottie-react`](https://www.npmjs.com/package/@lottiefiles/dotlottie-react). Lottie has no state machine — playback is controlled imperatively through `dotLottieRefCallback` and `.play()`/`.pause()`.

Each `useStateMachineInput` call returns an object with a `.value` you can read/set (Number, Boolean) or a `.fire()` method (Trigger) to drive the animation.

## Getting started

```bash
npm install
npm run dev
```

To use your own animation, swap the `src` passed to `useRive` for a local `.riv` file (place it in `public/` and reference it as `/your-file.riv`) and update the state machine/input names to match — open the file in the [Rive editor](https://rive.app) to see the exact names.
