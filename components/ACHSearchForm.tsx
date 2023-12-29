'use client'

import * as z from "zod"

const formSchema = z.object({
  amount_lb: z.number().optional(),
  amount_ub: z.number().optional(),
  fund: z.number().optional(),
  description: z.string().optional(),
  received_lb: z.date().optional(),
  received_ub: z.date().optional(),
  claimed_lb: z.date().optional(),
  claimed_ub: z.date().optional(),
  roc_id: z.number().optional(),
  department_id: z.number().optional()
})

export function ACHSearchForm() {
  return (
    <></>
  )
}