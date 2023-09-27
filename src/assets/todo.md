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

## Working on Now / Planned Soon (Sander)

- Admin / Contact
  - Send messages from w/i the app using mail system
    - user will receive a copy
  - Admin portal
    - create portal based on /portal but with panel in place of calendar
    - ability to fix errors that might impede usability for students
    - ability to view student surveys in bulk - form-type
    - force reload student sessions to update / quickfix
    - add more protections to teacher mode
- Student involvement
  - way for students to access teacher features for their peers / as a proxy for the teacher
  - student self "classes" for college apps, other things to keep track of
- Surveys
  - make a way for users to see their own responses over time
    - include major assignments in this timeline
  - weekly / major surveys
  - ~~show upcoming tasks at end of daily surveys~~
  - ~~daily surveys~~
- Tasks
  - allow / encourage links to other classes / through selecter?
  - ~~**process only changed tasks server-side / cancel runs on double changes**~~
  - ~~**store proxy in class doc - load from there for efficiency / read & write count**~~
  - ~~disallow finish when link still in-progress~~
  - ~~drag tasks on calendar to change date~~
- Classes
  - add from pre-set list
  - display join code to class
  - ~~class view page~~
  - ~~make classes editable~~
  - ~~join from code~~
- Onboarding
  - ui tutorial
  - better logout prompt
  - large modal type for intro - better video support
    - fill screen on small devices
  - ~~add first class~~
  - ~~join modal~~
- Emails
  - setup cloud functions to send daily(?) emails
  - ~~setup cloud functions to send task change/create/archive emails~~
  - ~~setup cloud functions to send weekly emails~~
  - ~~link personal account email~~
  - ~~email template~~
  - ~~setup email server~~
  - ~~send from firebase doc~~
- Accounts
  - create email prefs screen
  - ~~finish personal account connection~~
  - ~~create prefs screen~~
  - ~~allow connected personal / non-school email~~
    - ~~settings from portal / email links~~
- ~~Non-User-Facing~~
  - ~~cleanup code / write docs~~
    ~~Tasks / Calendar Objects~~
  - ~~note type / generic info w/o color~~
  - ~~regular assignment / generic task type~~
  - ~~id tasks for easier load/share~~
  - ~~view task by task id~~
  - ~~less cluttered scheduling options (use dropdown)~~
  - ~~convert /task to /view/{type}/{info}~~
  - ~~add editing functionality~~
  - ~~confirm task delete~~
- ~~Modal features~~
  - ~~fix overflow on very small screens~~
  - ~~redirect modal / outlink interceptor~~

## Specific milestones / tasks

### Sander

- Create onboarding
  - setup from pre-defined classes, add your own
  - where to find everything
  - ~~join form -> add classes~~
- Make art assets
  - implement transitions
    - between pages
    - ~~for modals~~
  - implement animations
    - lottiefiles?
    - ~~loading imgs~~
  - ~~Create promotional materials~~
    - ~~update og:img~~
    - ~~create public/img/promo imgs~~
  - ~~Create contact page~~
    - ~~fun lighthearted art stuff~~
- Create survey / check-in modal
  - add graphics / illustrations (on weekly at least)
  - time-based variations
    - on mondays, more in-depth, before first use
    - ~~during the week, short non-intrusive~~
- Better prefs
  - ~~save theme under prefs, rather than its own key~~
  - setup email prefs in onboarding
  - ~~add the option to trust another email / oauth account with access to your account~~
    - ~~good for phones and such, save to prefs of the acc, then check either request oauth is student, or request oauth is in student prefs.trusted~~
- Create studying / prep pages
  - really use the data/info that we have, let them create study schedules for themselves
  - automatic / algorithm-driven suggestions?

### Aarush

- Create backend
  - Algorithms
    - Class Spread: N/A
  - Send out emails to students thru firebase?
- Create data for static classes / a cleaner system to integrate them
  - Structure teacher add/drop class json update algorithm
