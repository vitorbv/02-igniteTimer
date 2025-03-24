import React, { createContext, ReactNode, useState, useReducer } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/action";


interface CreateCycleData {
  task: string;
  minutesAmount: number;
}
interface CyclesContextProviderProps {
  children: ReactNode
}


interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)



export function CyclesContextProvider({
  children,
}:CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  })

const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

const { cycles, activeCycleId } = cyclesState;
const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

function setSecondsPassed(seconds:number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData){
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
 
    setAmountSecondsPassed(0)    
  }

  function interruptCurrentCycle(){
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider 
      value={{ 
        cycles,
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      {children}

    </CyclesContext.Provider>
  )
}