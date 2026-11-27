export type Sex = 'male' | 'female'
export type Activity = 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active'
export type Goal = 'lose' | 'maintain' | 'gain'

export const ACTIVITY_FACTORS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
}

export const GOAL_DELTAS: Record<Goal, number> = { lose: -300, maintain: 0, gain: 300 }

export const MIN_KCAL = 1000
export const MAX_KCAL = 5000

/** Body mass index, rounded to 1 decimal. */
export function bmi(kg: number, cm: number): number {
  if (!(kg > 0) || !(cm > 0)) throw new RangeError('kg and cm must be positive')
  const m = cm / 100
  return Math.round((kg / (m * m)) * 10) / 10
}

export type BmiBand = 'underweight' | 'normal' | 'overweight' | 'obese'

/** Adult WHO bands: <18.5, <25, <30, 30+. */
export function bmiBand(value: number): BmiBand {
  if (value < 18.5) return 'underweight'
  if (value < 25) return 'normal'
  if (value < 30) return 'overweight'
  return 'obese'
}

/** Basal metabolic rate, Mifflin-St Jeor, kcal/day. */
export function bmr(input: { sex: Sex; age: number; kg: number; cm: number }): number {
  const { sex, age, kg, cm } = input
  if (!(kg > 0) || !(cm > 0) || !(age > 0)) throw new RangeError('age, kg and cm must be positive')
  return 10 * kg + 6.25 * cm - 5 * age + (sex === 'male' ? 5 : -161)
}

/** Daily calories: BMR x activity factor, plus/minus 300 for lose/gain, kept within 1000-5000, rounded. */
export function dailyCalories(input: {
  sex: Sex
  age: number
  kg: number
  cm: number
  activity: Activity
  goal?: Goal
}): number {
  const factor = ACTIVITY_FACTORS[input.activity]
  if (factor === undefined) throw new RangeError('unknown activity')
  const delta = GOAL_DELTAS[input.goal ?? 'maintain']
  const raw = bmr(input) * factor + delta
  return Math.round(Math.min(MAX_KCAL, Math.max(MIN_KCAL, raw)))
}
