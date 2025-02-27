/* eslint-disable react/react-in-jsx-scope */
import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from "react";
import Zod, * as zod from 'zod'

import { 
  HomeContainer, 
  StartCountdownButton, 
  StopCountdownButton,  
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm/index";
import { Countdown } from "./components/Countdown/index";
import { CyclesContext } from "../../contexts/CyclesContext";


const newCycleFormValidationSchema = Zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(5, 'O ciclo deve ter no mínimo 5 minutos de duração')
  .max(60, 'O ciclo deve ter no máximo 60 minutos de duração')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 5,
      },
    })

  const { handleSubmit, reset, watch } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">      
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        { activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
          <HandPalm size={24}/>
          Interromper
        </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton>
        ) }
        
      </form>
    </HomeContainer>
  )
}