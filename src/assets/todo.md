# General Purpose / Goal

- Crowdsource data from students
  - lower teacher inclusion / necessary involvement
- Create a generally sleek product
  - we're not trying to win any design contests, but we want people to want to use it
- Help student health
  - study resources from data, better planning
- Collect student wellness data
  - will allow us to show its usefulness
  - what led us to start MVTT in the first place, advocating for student health

# Changes

## Working on Now / Planned Soon (Sander)

- Studying
  - system for studying/working on tasks
  - ~~track task completion based on id~~
    - track by hash for updated versions, perhaps preference for specificity
  - ~~ability to mark tasks as done~~
  - ~~notes on tasks~~
- Admin / Contact
  - Add/implement analytics
  - Send messages from w/i the app using mail system
    - user will receive a copy
  - District portal
  - Admin portal
    - create portal based on /portal but with panel in place of calendar
    - ability to fix errors that might impede usability for students
    - ability to view student surveys in bulk - form-type
    - force reload student sessions to update / quickfix
    - add more protections to teacher mode
- Student involvement
  - way for students to access teacher features for their peers / as a proxy for the teacher
  - student self "classes" for things specific to them to keep track of, all in one place
- Tasks
  - **auto-suggested link names based on domain**
  - auto-suggested task types based on title
  - allow / encourage links to other classes / through selector
  - allowed outlink domains set by district?
  - ~~fixes on edit page~~
  - ~~**process only changed tasks server-side / cancel runs on double changes**~~
  - ~~**store proxy in class doc - load from there for efficiency / read & write count**~~
  - ~~disallow finish when link still in-progress~~
  - ~~drag tasks on calendar to change date~~
- Surveys
  - ~~make a way for users to see their own responses over time~~
    - include major assignments in this timeline
  - weekly / major surveys
  - ~~show upcoming tasks at end of daily surveys~~
  - ~~daily surveys~~
- Classes
  - **add from pre-set list**
    - setup from json / claim pre-set class feature (cloud?)
  - display join code to class
  - ~~class view page~~
  - ~~make classes editable~~
  - ~~join from code~~
- Onboarding

  - large modal type for intro - better video support

    - tutorial videos / pages
      - View calendar
      - Complete tasks on study page
      - Link accounts
      - View stats

  - ~~ui tutorial~~
  - ~~better logout prompt~~
  - ~~add first class~~
  - ~~join modal~~

- Emails
  - exclude tasks marked as finished from weekly summary emails
  - setup cloud functions to send **daily**(?) emails
  - ~~setup cloud functions to send task change/create/archive emails~~
  - ~~setup cloud functions to send weekly emails~~
  - ~~link personal account email~~
  - ~~email template~~
  - ~~setup email server~~
  - ~~send from firebase doc~~
- Accounts
  - fix linking feature??
  - ~~create email prefs screen~~
  - ~~finish personal account connection~~
  - ~~create prefs screen~~
  - ~~allow connected personal / non-school email~~
    - ~~settings from portal / email links~~
- ~~Mobile Interface~~
  - ~~pages on mobile instead of sidebars~~
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
  - ~~where to find everything~~
  - ~~join form -> add classes~~
- Create studying / prep pages
  - really use the data/info that we have, let them create study schedules for themselves
  - ~~see upcoming assignments and mark them as done~~
  - automatic / algorithm-driven suggestions?
- Create survey / check-in modal
  - add graphics / illustrations (on weekly at least)
  - time-based variations
    - on mondays, more in-depth, before first use
    - ~~during the week, short non-intrusive~~
- ~~Better prefs~~
  - ~~add email prefs~~
  - ~~save theme under prefs, rather than its own key~~
  - ~~add the option to trust another email / oauth account with access to your account~~
    - ~~good for phones and such, save to prefs of the acc, then check either request oauth is student, or request oauth is in student prefs.trusted~~
- ~~Make art assets~~
  - ~~implement animations~~
    - ~~loading imgs~~
  - ~~implement transitions~~
    - ~~for modals~~
  - ~~Create promotional materials~~
    - ~~update og:img~~
    - ~~create public/img/promo imgs~~
  - ~~Create contact page~~
    - ~~fun lighthearted art stuff~~

### Aarush

- Create backend
  - Algorithms
    - Class Spread: N/A
  - Send out emails to students thru firebase?
- a cleaner system to integrate classes
  - Structure teacher add/drop class json update algorithm
- ~~Create data for static classes~~
