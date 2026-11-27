import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bmi, bmiBand, bmr, dailyCalories } from '../src/index.ts'

test('bmi', () => {
  assert.equal(bmi(70, 175), 22.9)
  assert.equal(bmi(50, 160), 19.5)
  assert.throws(() => bmi(0, 170), RangeError)
})

test('bmi bands', () => {
  assert.equal(bmiBand(18.4), 'underweight')
  assert.equal(bmiBand(18.5), 'normal')
  assert.equal(bmiBand(24.9), 'normal')
  assert.equal(bmiBand(25), 'overweight')
  assert.equal(bmiBand(30), 'obese')
})

test('bmr Mifflin-St Jeor', () => {
  assert.equal(bmr({ sex: 'male', age: 30, kg: 70, cm: 175 }), 1648.75)
  assert.equal(bmr({ sex: 'female', age: 30, kg: 60, cm: 165 }), 1320.25)
})

test('daily calories by activity', () => {
  const base = { sex: 'male', age: 30, kg: 70, cm: 175 } as const
  assert.equal(dailyCalories({ ...base, activity: 'sedentary' }), 1979)
  assert.equal(dailyCalories({ ...base, activity: 'moderate' }), 2556)
})

test('goal adjusts by 300', () => {
  const base = { sex: 'female', age: 30, kg: 60, cm: 165, activity: 'light' } as const
  const keep = dailyCalories({ ...base, goal: 'maintain' })
  assert.equal(dailyCalories({ ...base, goal: 'lose' }), keep - 300)
  assert.equal(dailyCalories({ ...base, goal: 'gain' }), keep + 300)
})

test('clamped to 1000-5000', () => {
  assert.equal(dailyCalories({ sex: 'female', age: 90, kg: 30, cm: 120, activity: 'sedentary', goal: 'lose' }), 1000)
  assert.equal(dailyCalories({ sex: 'male', age: 20, kg: 250, cm: 210, activity: 'extra_active', goal: 'gain' }), 5000)
})
