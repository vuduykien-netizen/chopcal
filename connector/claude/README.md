# ChopCal for Claude

ChopCal is a nutrition estimate app. This plugin connects Claude to the ChopCal connector at `https://chopcal.com/mcp` and adds one skill, `chopcal-food-diary`, that tells Claude how to use it: give calorie and macro estimates as ranges, ask before saving anything, and keep the estimate line on every answer.

Estimate only. Not a substitute for professional guidance.

## What it does

- Looks up a dish in ChopCal's food table and returns kcal, protein, carb and fat ranges for one serving. No sign-in.
- Estimates daily calories for an adult. No sign-in.
- Searches ChopCal's nutrition articles. No sign-in.
- Reads your own ChopCal food diary for today or the last 7 days. Needs sign-in.
- Saves one meal to your diary, only after you confirm the dishes. Needs sign-in.

## What it runs, sends and fetches

- The plugin contains Markdown and JSON only. It runs no scripts and installs no packages.
- `.mcp.json` points Claude at `https://chopcal.com/mcp` (Streamable HTTP). Claude sends the tool inputs you see in the conversation to that address: a dish name, or meal details you confirmed. Photos are not sent; Claude looks at a photo itself and ChopCal never receives it.
- Signing in uses OAuth 2.1 with PKCE on chopcal.com. You log in with your ChopCal account on a chopcal.com page and choose Allow. Claude never sees your ChopCal password. The connection can read your diary (`diary:read`) and add meals (`diary:write`); it cannot delete anything or see other people's data.
- Meals you save are stored in your ChopCal account and kept until you delete them or delete your account.

## Install

1. In Claude, open Customize, then Plugins, and add ChopCal.
2. Open the plugin's Connectors tab and connect ChopCal. A chopcal.com page asks you to log in and choose Allow.
3. Ask, for example: "Estimate my lunch: a bowl of pho bo", or "Show my ChopCal diary for this week".

- Privacy: https://chopcal.com/privacy
- Terms: https://chopcal.com/terms
- Support: https://chopcal.com/support
- How the connector works: https://chopcal.com/mcp-server?utm_source=github-chopcal&utm_medium=plugin

ChopCal is for adults. It is a general nutrition and wellness tool, not a medical device.
