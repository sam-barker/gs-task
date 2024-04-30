# gs-task

Solution for task provided by Gymshark.

## Why is this not in Java?

1. Unfortunately I couldn't get the Java framework to work on my work laptop. This is due to maven not being able to pull down the dependencies through my corporate proxy (which I cannot switch off)
2. I chose TypeScript + Playwright for this in that case, due to familiarity and I know that works.
3. Playwright also does auto-waiting for you a lot of the time, and requires a lot less code to set up!

## Notes

I chose the multiple products in the bag removal for automation as it is the lengthier flow, therefore automating it will free up more time for exploratory, etc.

I also would not typically use cucumber in general. It does have its uses and advantages (especially in a practice that is still getting familiar with automation and code in general), but it's not traditionally used with playwright.

## Setting up

1. Make sure you have the latest `NodeJS` installed, as well as `yarn`
2. Clone the project
3. Run `yarn install` to install the dependencies
4. Run `yarn install-browsers`, unless you have all the necessary browsers installed. This could potentially fail if youb are behind a corporate proxy. If this is the case set the following environment variable `NODE_TLS_REJECT_UNAUTHORIZED` to 0 and then re-run.
5. Run `yarn test` to run the tests in headfull mode. I left this on so you can see what the test is doing.

## Bonus

You can format the code with `yarn format`
