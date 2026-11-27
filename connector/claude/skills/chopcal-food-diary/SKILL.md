---
name: chopcal-food-diary
description: Use when the user describes or photographs a meal and wants calorie or macro estimates, asks to see what they ate today or this week in ChopCal, or wants to save a meal to their ChopCal diary. Works with the ChopCal connector.
---

# ChopCal food diary

ChopCal turns a meal into calorie and macro ranges and keeps a food diary. The connector has these tools:

- `search_foods`: look up a dish in ChopCal's food table (no sign-in). Pass `lang` "vi" for Vietnamese dish names.
- `daily_calories`: a daily calorie estimate for an adult (no sign-in).
- `search_articles`: ChopCal nutrition articles (no sign-in).
- `get_diary`: read the signed-in user's own diary, today or the last 7 days.
- `log_meal`: save one meal to the signed-in user's diary.

## Estimate a meal

1. If the user sent a photo, look at it yourself and name each dish. The photo stays in this chat; the connector does not receive it. If a dish is unclear, ask one short question.
2. Call `search_foods` once per dish (with `lang` "vi" if the user writes in Vietnamese). Use the ranges it returns. If a dish has no match, say so, and label any figure you give as your own rough range, not ChopCal's.
3. Always give ranges (min to max), never a single number. Show one short table: dish, portion, kcal, protein, carbs, fat.
4. End every estimate with: "Estimate only. Not a substitute for professional guidance." If the user writes in Vietnamese, add: "Chỉ là ước tính. Không thay cho lời khuyên của chuyên gia."

## Save a meal

1. Ask first: show the dishes and ranges you would save and ask "Save this to your ChopCal diary as lunch?" (use the right meal type: breakfast, lunch, dinner or snack).
2. Only after the user says yes, call `log_meal` with `user_confirmed` set to true and exactly the dishes you showed. Never save from a guess, and never save a meal the user did not confirm.
3. ChopCal does not remove duplicates. If a save fails or you are unsure it worked, call `get_diary` for today before trying again, and tell the user what the diary already holds.
4. Tell the user what was saved. The diary keeps the middle of each range.

## Read the diary

- Call `get_diary` with `range` "today" or "week". Days are UTC, so a meal eaten late at night in Vietnam can show on the previous day; say so if a total looks off.
- Report per-day totals as ranges. Do not add up a week into one exact number.

## Sign-in

If a tool says the user must sign in, tell them to connect ChopCal in the connector settings and approve access in the ChopCal window. Never ask for a ChopCal password in the chat.

## Limits

- ChopCal is a nutrition estimate tool, not a medical one. Do not diagnose, do not prescribe a diet for an illness, and do not advise on medicines or supplements.
- If the user mentions a health condition (for example diabetes, kidney disease, pregnancy, or an eating disorder), give general information only and suggest talking to a doctor or dietitian. If they describe restricting food in a way that sounds harmful, do not encourage fewer calories.
- Do not ask for weight, height or age unless the user wants a daily calorie estimate with `daily_calories`.
- This connector does not sell or upgrade anything. Do not mention plans, prices or purchases.
- Reply in the user's language. Keep dish names as the user wrote them.

## Example

User: "Lunch was a bowl of pho bo and an iced tea with sugar."
You: look up "pho bo" and the tea, show the ranges in a table, add the estimate line, then ask: "Save this to your ChopCal diary as lunch?" Wait for the answer before calling `log_meal`.
