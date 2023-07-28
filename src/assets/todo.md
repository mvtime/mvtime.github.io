# Changes

## General Purpose / Goal

- Crowdsource data from students
  - lower teacher inclusion / necessary involvement
- Create a generally sleek product
  - we're not trying to win any design contests, but we want people to want to use it
- Help student health
  - study resources from data, better planning
- ~~Collect student wellness data~~
  - ~~will allow us to show its usefulness~~

## Working on Now / Planned Soon

- Modal features
  - fix overflow on very small screens
  - show back button?
- Accounts
  - allow connected personal / non-school email
  - create prefs screen / email prefs saving
- Non-User-Facing
  - cleanup code / write docs (+doctests?)
- Surveys
  - make a way for users to see their own responses over time
    - include major assignments in this timeline
- Features / Timeline
  - create a timeline / overall plan
  - work with Aarush on large features before the beginning of the year

## Specific milestones / tasks

### Sander

- Create onboarding
  - setup from pre-defined classes, add your own
  - where to find everything
  - ~~join form -> add classes~~
- Make art assets
  - implement transitions
  - implement animations: lottiefiles?
  - looking good in a proto doesn't mean it'll feel nice to use
  - ~~Create promotional materials~~
    - ~~update og:img~~
    - ~~create public/img/promo imgs~~
  - ~~Create contact page~~
    - ~~fun lighthearted art stuff~~
- ~~Create survey / check-in modal~~
  - very aesthetic-based, bright, should feel fun to use
  - time-based variations
    - on mondays, mandatory for first use
    - ~~during the week, recommended, short non-intrusive~~
- Better prefs
  - save theme under prefs, rather than its own key
  - setup email prefs in onboarding
  - add the option to trust another email / oauth account with access to your account
    - good for phones and such, save to prefs of the acc, then check either request oauth is student, or request oauth is in student prefs.trusted
- Create studying / prep pages
  - really use the data/info that we have, let them create study schedules for themselves
  - automatic / algorithm-driven suggestions?

### Aarush

- Create backend
  - ML / Algorithms
    - for what ever we said before
    - for study suggestions
  - Send out emails to students thru firebase?
- Create data for static classes / a cleaner system to integrate them
