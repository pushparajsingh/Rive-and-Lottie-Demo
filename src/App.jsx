import { useState } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import './App.css'

// --- Demo 1: Trigger input — fires a one-shot animation (van hits a bump) ---
const VEHICLE_SRC = 'https://cdn.rive.app/animations/vehicles.riv'
const VEHICLE_SM = 'bumpy'
// Trigger's name inside the state machine — doesn't match VEHICLE_SM's name
const VEHICLE_INPUT = 'bump'

// --- Demo 2: Number input — a continuous 0-5 value fills in the stars ---
const RATING_SRC =
  'https://raw.githubusercontent.com/rive-app/rive-react/main/examples/public/rating.riv'
const RATING_SM = 'State Machine 1'
const RATING_INPUT = 'rating'

// --- Demo 3: Boolean input — two independent on/off switches on one artboard ---
const SKILLS_SRC =
  'https://raw.githubusercontent.com/rive-app/rive-flutter/master/example/assets/skills.riv'
const SKILLS_BOOLEAN_SM = 'State Machine 1'
// Name as authored in the .riv file — note the trailing space, it must match exactly
const SKILLS_INTERMEDIATE_INPUT = 'Intermediate '
const SKILLS_EXPERT_INPUT = 'Expert'

// --- Demo 4: Lottie — a different animation format, for comparison ---
// Lottie files have no state machines/inputs; they just play/pause/loop.
const LOTTIE_SRC = 'https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie'

function VehicleDemo() {
  const { rive, RiveComponent } = useRive({
    src: VEHICLE_SRC,
    stateMachines: VEHICLE_SM,
    autoplay: true,
  })
  const bumpInput = useStateMachineInput(rive, VEHICLE_SM, VEHICLE_INPUT)

  return (
    <div className="demo">
      <div className="rive-canvas">
        <RiveComponent />
      </div>
      <h2>Trigger</h2>
      <p>One-shot event, like a button press</p>
      <button type="button" className="counter" onClick={() => bumpInput?.fire()}>
        Hit a bump
      </button>
    </div>
  )
}

function RatingDemo() {
  const { rive, RiveComponent } = useRive({
    src: RATING_SRC,
    stateMachines: RATING_SM,
    autoplay: true,
  })
  const ratingInput = useStateMachineInput(rive, RATING_SM, RATING_INPUT, 0)
  // Mirrors ratingInput.value in React state purely so the label below re-renders —
  // the Rive canvas itself reads straight from ratingInput.value, not from this state.
  const [rating, setRating] = useState(0)

  // .value is a mutable setter exposed by the Rive SDK to drive the state machine
  const applyValue = (input, value) => input && (input.value = value)

  const setStars = (value) => {
    const clamped = Math.max(0, Math.min(5, value))
    applyValue(ratingInput, clamped)
    setRating(clamped)
  }

  return (
    <div className="demo">
      <div className="rive-canvas">
        <RiveComponent />
      </div>
      <h2>Number</h2>
      <p>Continuous 0-5 value fills in the stars</p>
      <div className="row">
        <button type="button" className="counter" onClick={() => setStars(rating - 1)}>
          -1
        </button>
        <span>{rating} / 5</span>
        <button type="button" className="counter" onClick={() => setStars(rating + 1)}>
          +1
        </button>
      </div>
    </div>
  )
}

function SkillsBooleanDemo() {
  const { rive, RiveComponent } = useRive({
    src: SKILLS_SRC,
    stateMachines: SKILLS_BOOLEAN_SM,
    autoplay: true,
  })
  const intermediateInput = useStateMachineInput(rive, SKILLS_BOOLEAN_SM, SKILLS_INTERMEDIATE_INPUT)
  const expertInput = useStateMachineInput(rive, SKILLS_BOOLEAN_SM, SKILLS_EXPERT_INPUT)

  // .value is a mutable setter exposed by the Rive SDK to drive the state machine
  const setInput = (input, checked) => input && (input.value = checked)

  return (
    <div className="demo">
      <div className="rive-canvas">
        <RiveComponent />
      </div>
      <h2>Boolean</h2>
      <p>On/off switch between two animation states</p>
      <div className="row">
        <label>
          <input
            type="checkbox"
            onChange={(e) => setInput(intermediateInput, e.target.checked)}
          />
          Intermediate
        </label>
        <label>
          <input
            type="checkbox"
            onChange={(e) => setInput(expertInput, e.target.checked)}
          />
          Expert
        </label>
      </div>
    </div>
  )
}

function LottieDemo() {
  const [dotLottie, setDotLottie] = useState(null)
  const [playing, setPlaying] = useState(true)

  const togglePlaying = () => {
    if (!dotLottie) return
    playing ? dotLottie.pause() : dotLottie.play()
    setPlaying(!playing)
  }

  return (
    <div className="demo">
      <div className="rive-canvas">
        <DotLottieReact src={LOTTIE_SRC} loop autoplay dotLottieRefCallback={setDotLottie} />
      </div>
      <h2>Lottie</h2>
      <p>A different format — no state machine, just play/pause/loop</p>
      <button type="button" className="counter" onClick={togglePlaying}>
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

function App() {
  return (
    <section id="center">
      <h1>Rive Demo</h1>
      <p>Three state machines, three input types — plus a Lottie animation for comparison</p>
      <div className="demo-grid">
        <VehicleDemo />
        <RatingDemo />
        <SkillsBooleanDemo />
        <LottieDemo />
      </div>
    </section>
  )
}

export default App
