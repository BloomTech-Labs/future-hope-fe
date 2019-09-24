# Future-Hope-Client


> Ready For Stakeholder Branch

## Table of Contents

- **[Project Overview](#project-overview)**<br>
- **[Install](#install)**<br>
- **[Deploy](#deploy)**<br>
- **[Components](#components)**<br>
- **[Auth](#auth)**<br>
- **[Store](#store)**<br>
- **[Usage](#usage)**<br>
- **[API](#api)**<br>
- **[Maintainers](#maintainers)**<br>
- **[Contributing](#contributing)**<br>
- **[License](#license)**<br>

## Project Overview

There are not enough qualified teachers in Ghana for the number of students that need to be taught.  On the flip side, retired persons
in North America report reduced quality of life because fo the feeling of a 'lack of purpose' after retirement.  

To combat these problems, we are teaming up with a stakeholder to develop web and iOS applications that connect teachers and students
in Ghana with retired persons in North America.  We hope to build applications that will enhance teacher education that is almost
unavailable locally throug joint planning between teachers and North American virtual mentors.  

We'll be using in-app video conferencing and messaging apps to facilitate communication between retirees and teachers in Ghana.  In order
to facilitate these communications, we will design an on-boarding process that allows registered (and approved) users to schedule meetings
with one another.

## Install

```
1.  Fork the repo
2.  Yarn start
```
## Deploy

```
Deployed on Netlify.

:      <a href="https://staging.futurehopeschool.com/">Staging server </a>
QA server:           https://qa.futurehopeschool.com/
Production server:   https://futurehopeschool.com/
```



## Components

#### The structure of this documentation is broken up by folder.

```
Starting with the src root folder, the flow will be as follows:
> src
> components
> component folder
> component sub-folder
> component.js files
```

### FAQ folder
---


Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
FAQ.js    |   onboarding process & general FAQ     |   head to '/faq'    |



### Messaging folder
---


Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
conversation.js    |   navbar routing     |   n/a    |
Message.js    |   navbar routing post sign-in    |   n/a    |
Messaging.js    |   navbar routing     |   n/a    |
Messaging.scss    |   navbar routing     |   n/a    |
SearchUsersModal.js    |   navbar routing     |   n/a    |



### auth folder
---

**landing page**

Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
Login.js    |   logs in     |   head to '/login'    |
Login.scss    |   logs in     |   head to '/login'    |
SignUp.js    |   signs up     |   head to '/signup'    |
SignUp.scss    |   signs up     |   head to '/signup'    |
autoCompleteFields.js    |   signs up     |   head to '/signup'    |


### calendar folder
---

**landing page**

Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
Calendar.js    |   marketing splash     |   "/"    |
MeetingDetails.js    |   placeholder    |   n/a    |
MeetingModal.js    |   placeholder    |   n/a    |
flatpickr.css    |   placeholder    |   n/a    |
flatpickr.min.css    |   placeholder    |   n/a    |
main.scss    |   placeholder    |   n/a    |


### dashboard folder
---

**landing page**

Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
landingpage.js    |   marketing splash     |   "/"    |
placeholder.js    |   placeholder    |   n/a    |


### footer folder
---


Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
Footer.js    |   marketing splash     |   "/"    |
styles.js    |   placeholder    |   n/a    |


### landingpage folder
---

**landing page**

Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
landingpage.js    |   marketing splash     |   "/"    |
styles.js    |   placeholder    |   n/a    |
styles.scss    |   placeholder    |   n/a    |


### mentors folder
---


Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
MentorList.js    |   marketing splash     |   "/"    |
MentorPublicPage.js    |   placeholder    |   n/a    |
mentors.css    |   placeholder    |   n/a    |


### navbar folder
---



Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
Navbar.js    |   marketing splash     |   "/"    |
NavbarLinks.js    |   placeholder    |   n/a    |
NavbarUser.js    |   marketing splash     |   "/"    |
SignedInNavBar.js    |   placeholder    |   n/a    |
navConfic.js    |   marketing splash     |   "/"    |
navbarStyle.js    |   placeholder    |   n/a    |


### shared folder
---

**components sub-folder**

**Sidebar sub-folder**

Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
SideBar.js    |   marketing splash     |   "/"    |
SideBar.scss    |   placeholder    |   n/a    |
listItems.js    |   placeholder    |   n/a    |

**Card sub-folder**

Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
Card.js    |   marketing splash     |   "/"    |
CardBody.scss    |   placeholder    |   n/a    |
CardFooter.js    |   placeholder    |   n/a    |
CardHeader.js    |   placeholder    |   n/a    |

**root directory of components sub-folder**

Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
Button.js    |   marketing splash     |   "/"    |
CustomInput.scss    |   placeholder    |   n/a    |
GridContainer.js    |   placeholder    |   n/a    |
GridItem.js    |   placeholder    |   n/a    |
InfoArea.js    |   placeholder    |   n/a    |
SearchResults.js    |   placeholder    |   n/a    |


**styles sub-folder**

Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
buttonStyle.js    |   marketing splash     |   "/"    |
cardBodyStyle.js    |   placeholder    |   n/a    |
cardFooterStyle.js    |   marketing splash     |   "/"    |
cardHeaderStyle.js    |   placeholder    |   n/a    |
cardStyle.js    |   marketing splash     |   "/"    |
customInputStyle.js    |   placeholder    |   n/a    |
imagesStyles.js    |   marketing splash     |   "/"    |
infoStyle.js    |   placeholder    |   n/a    |
sharedStyle.js    |   marketing splash     |   "/"    |
tolltipsStyle.js    |   placeholder    |   n/a    |


### views folder
---



Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
AwaitingApproval.js    |   marketing splash     |   "/"    |
EditProfileView.js    |   placeholder    |   n/a    |
NewUserProfile.js    |   placeholder    |   n/a    |
Profile.scss    |   placeholder    |   n/a    |
ProfileView.js    |   placeholder    |   n/a    |
UploadPhoto.js    |   placeholder    |   n/a    |
ViewUserProfile.js    |   placeholder    |   n/a    |
views.css    |   placeholder    |   n/a    |



### Root Directory of Components folder
---



Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
Analytics.js    |   implement Google Analytics to guage in-app usage     |   n/a    |

## Auth

```
Used OAuth with google firebase.
```


## Store

```
Used react/redux.  Actions are split up into separate files, as are reducers.  Reducers are combined into a common rootreducer.
```


## Usage

```
1.  JavaScript.  Used promises/callbacks and ES6 syntax.
2.  React.  Used functional & class components.  Used React Hooks.
3.  Redux.  Used redux for state management.
```
## API

### Firebase Authentication
```
Authentication for users was accomplished by using the built-in auth feature in firebase
A simple login function that includes firebase.auth().signInWithEmailAndPassword(email, password);
And a simple logout function that includes firebase.auth().signOut();
There are no endpoints to point to but a list of functions as this is a noSQL database 

Documentation - https://firebase.google.com/docs
```


### Full Calendar
```
Meeting availability and scheduling was accomplished by using Full Calendar.
After login, a user is directed to his/her dashboard.  There, on the left-hand side, the user 
has a sidebar menu with a few routing links. To the right of the sidebar, the user's calendar 
is displayed.  The user can filter by month, week, day.  The user can set up a meeting by clicking 
on a date, which brings up a meeting modal.  The user can then search for another user, select the 
user, and select a date/time to schedule a meeting.  The meeting will autopopulate on the calendar
of all participants selected.

Documentation - https://fullcalendar.io/docs
```

### Firebase Cloud Messaging
```
In-app messaging was accomplished by using Firebase Messaging.  Using the Firestore database, real-time
messaging was implemented.  Once logged in, a user can navigate to the messaging feature from his/her
dashboard.  The user can search for other users, select a user, and start to message with that user.
Responses are real-time.  All messaging activity is stored in the Firestore database.

Documentation - https://firebase.google.com/docs/cloud-messaging
```


## Maintainers

Eric Fugleberg  |   Joel Perez  |   Kedasha Kerr    |   Micah Jones |   Steven Barrett  |
| ------ | --------------- |   -----------------   |   ----------  |   --------------  |
[<p align="center"> <img src="https://github.com/favicon.ico" width="35"> </p> ](https://github.com/efugleberg)  | [<p align="center"> <img src="https://github.com/favicon.ico" width="35"> </p>](https://github.com/Full-lifey) |  [<p align="center"> <img src="https://github.com/favicon.ico" width="35"> </p>](https://github.com/Ladykerr) |  [<p align="center"> <img src="https://github.com/favicon.ico" width="35"> </p>](https://github.com/micahjones13) |  [<p align="center"> <img src="https://github.com/favicon.ico" width="35"> </p>](https://github.com/steven-barrett) |


## Contributing

PRs accepted

## License

MIT © Richard McRichface
