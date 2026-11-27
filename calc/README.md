# @chopcal/calc

BMI and daily calorie estimate. Mifflin-St Jeor times an activity factor, plus or minus 300 kcal for a goal, kept within 1000-5000. No dependencies.

```ts
import { bmi, bmiBand, dailyCalories } from './src/index.ts'

bmi(70, 175)                  // 22.9
bmiBand(22.9)                 // 'normal'
dailyCalories({ sex: 'male', age: 30, kg: 70, cm: 175, activity: 'moderate' })               // 2556
dailyCalories({ sex: 'male', age: 30, kg: 70, cm: 175, activity: 'moderate', goal: 'lose' }) // 2256
```

Activity: `sedentary` 1.2 · `light` 1.375 · `moderate` 1.55 · `very_active` 1.725 · `extra_active` 1.9.

```
node --test test/calc.test.ts   # Node 22.18+
```

Estimate only. Not medical advice. MIT.
