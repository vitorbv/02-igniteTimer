import { useForm } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const newCycleFormValidationSchema = Zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(5, 'O ciclo deve ter no mínimo 5 minutos de duração')
  .max(60, 'O ciclo deve ter no máximo 60 minutos de duração')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 5,
      },
    })
  
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput 
        id="task" 
        list="task-suggestion"
        placeholder="Dê um nome ao seu projeto."
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestion">
        <option value="Projeto 1"></option>
        <option value="Projeto 2"></option>
        <option value="Projeto 3"></option>
        <option value="Projeto 4"></option>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput 
        type="number" 
        id="minutesAmount" 
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

        <span>minutos.</span>
      </FormContainer>
  )
}