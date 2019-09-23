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
Deployed on Netlify
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

### Misc
---

**auth**

Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
login.js    |   logs in     |   head to '/login'    |
SignUp.js    |   signs up     |   head to '/signup'    |



### Navigation
---

**navbar**

Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
navbar.js    |   navbar routing     |   n/a    |
SignedInNavBar.js    |   navbar routing post sign-in    |   n/a    |



### Pages
---

**landing page**

Name    |   Purpose |   How To View     |
| ------ | ------------------ | ----------------- |
landingpage.js    |   marketing splash     |   "/"    |
placeholder.js    |   placeholder    |   n/a    |




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
2.  React.  Used functional & class components.
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

### OpenTok
```
We used this to faciliate real-time video conferencing...

Documentation - 
```

### WhatsApp
```
Used to facilitate messaging communication...


Documentation - 
```

## Maintainers

Eric Fugleberg  |   George Kando    |   Joel Perez  |   Kedasha Kerr    |   Micah Jones |   Steven Barrett  |
| ------ | ------------------ | --------------- |   -----------------   |   ----------  |   --------------  |
[Eric's github](https://github.com/efugleberg ![alt text](../src/assets/img/GitHubSmall.png))  | [George's github](https://github.com/gkando "George's github") | [Joel's github](https://github.com/Full-lifey "Joel's github") |  [Kedasha's github](https://github.com/Ladykerr "Kedasha's github") |  [Micah's github](https://github.com/micahjones13 "Micah's github") |  [Steven's github](https://github.com/steven-barrett "Steven's github") |


## Contributing

PRs accepted

## License

MIT © Richard McRichface
