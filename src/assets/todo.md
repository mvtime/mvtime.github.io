# General Purpose / Goal

- Crowdsource data from students
  - lower teacher inclusion / necessary involvement
- Create a generally sleek product
  - we're not trying to win any design contests, but we want people to want to use it
- Help student health
  - study resources from data, better planning
- Collect student wellness data
  - will allow us to show its usefulness
  - what led us to start this project in the first place, advocating for student health

# Changes

## Priorities

- ~~**Migrate to TypeScript**~~
- **Adding pre-set classes**
  - teachers dont have to join
  - students able to add tasks to their classes / teachers can invite students to edit their classes
  - sync from that huge json file
- **Tutorial Videos**
- **Daily emails / EoD updates**
  - reminders the day before tests/exams
  - ~~better email prefs~~
- **AI/ML/Just "seems like magic" features, can be hardcoded**
  - automatic session plans & time management alerts
  - ~~through API~~
  - ~~things like automatic link names, task typing~~
- Schedule Builder

## Working on Now / Planned Soon (Sander)

- Classes
  - **add from pre-set list**
    - setup from json / claim pre-set class feature (cloud?)
  - view students in class for teacher/current students
    - backend listener to use & keep updated class documents with students array?
  - more unique/protected join codes, invite/accepted-only?
  - display join code to class
  - ~~class view page~~
  - ~~make classes editable~~
  - ~~join from code~~
- Task Creation
  - ~~better keyboard shortcuts (+ and t,p,e,q=quiz, etc)~~
  - ~~shortcuts on `position:fixed` layouts, fullscreen~~
    - ~~migrate to new system that puts it outside of the sidebar element~~
  - class selection popup on creation hotkey
- Studying
  - save sessions and review them later
  - ~~system for studying/working on tasks~~
  - ~~track task completion based on id~~
    - track by hash for updated versions, perhaps preference for specificity
  - ~~ability to mark tasks as done~~
  - ~~notes on tasks~~
  - ~~sort as classes/dates in study view~~
- Admin / Contact
  - **Add/implement analytics**
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

  - AI/ML/Maybe just hardcoded features
    - ~~**auto-suggested link names based on domain**~~
    - ~~auto-suggested task types based on title~~
    - automatic / algorithm-driven study suggestions?
  - Links
    - allow / encourage links to other classes / through selector
    - allowed outlink domains set by district?
  - Create studying / prep pages
    - really use the data/info that we have, let them create study schedules for themselves
    - ~~see upcoming assignments and mark them as done~~
  - ~~fixes on edit page~~
  - ~~process only changed tasks server-side / cancel runs on double changes~~
  - ~~store proxy in class doc - load from there for efficiency / read & write count~~
  - ~~disallow finish when link still in-progress~~
  - ~~drag tasks on calendar to change date~~

- Surveys

  - Create survey / check-in modal
    - time-based variations
      - on mondays, more in-depth, before first use
    - ~~add graphics / illustrations (on weekly at least)~~
      - ~~during the week, short non-intrusive~~
  - ~~make a way for users to see their own responses over time~~
    - include major assignments in this timeline
  - weekly / major surveys
  - ~~show upcoming tasks at end of daily surveys~~
  - ~~daily surveys~~

- Onboarding

  - **setup from pre-defined classes**, add your own
    - **create tutorial videos**
      - View calendar
      - Complete tasks on study page
      - Link accounts
      - View stats
  - ~~add keyboard shortcuts page on (/ or ?)~~
  - ~~large modal type for intro~~
  - ~~tutorial modal set up~~
  - ~~where to find everything~~
    - ~~ui tutorial~~
  - ~~better logout prompt~~
  - ~~add first class~~
  - ~~join modal~~

- Emails
  - setup cloud functions to send **daily**(?) emails
  - ~~exclude tasks marked as finished from weekly summary emails~~
  - ~~setup cloud functions to send task change/create/archive emails~~
  - ~~setup cloud functions to send weekly emails~~
  - ~~link personal account email~~
  - ~~email template~~
  - ~~setup email server~~
  - ~~send from firebase doc~~
- Accounts/ Customization

  - fix linking feature??
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

## Specific milestones / tasks (Aarush)

- Create backend
  - Algorithms
    - Class Spread: N/A
  - Send out emails to students thru firebase?
- a cleaner system to integrate classes
  - Structure teacher add/drop class json update algorithm
- ~~Create data for static classes~~
