// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from 'react'
import {Switch} from '../switch'

type ToggleType = {on: boolean; toggle: () => void}
const ToggleContext = React.createContext<ToggleType | undefined>(undefined)

function Toggle({children}: {children: React.ReactNode}) {
  const [on, setOn] = React.useState(false)
  const toggle = React.useCallback(() => setOn(previousOn => !previousOn), [])

  return (
    <ToggleContext.Provider
      value={React.useMemo(() => ({on, toggle}), [on, toggle])}
    >
      {children}
    </ToggleContext.Provider>
  )
}

function useToggle() {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error('Hey yo... you need to wrap this thing in a provider')
  }
  return context
}

function ToggleOn({children}: {children: React.ReactNode}) {
  const {on} = useToggle()
  return <>{on ? children : null}</>
}

function ToggleOff({children}: {children: React.ReactNode}) {
  const {on} = useToggle()
  return <>{on ? null : children}</>
}

function ToggleButton(
  props: Omit<React.ComponentProps<typeof Switch>, 'on' | 'onClick'>,
) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
  @typescript-eslint/no-unused-vars: "off",
*/
