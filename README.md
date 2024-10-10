# PLAN ME FRONT END

Plan Me is a community-based web application that allows local businesses to share events with community members. Members can explore, book, and optionally pay to participate in these events. Events can range from free activities to paid ones. Users can also add the events they sign up for to their personal calendars, ensuring they never miss out.

This project was built using React + Vite, TailwindCSS, DaisyUI, and a custom Node.js API. It integrates the Google Calendar API for calendar management, allowing users to add events to their calendars after booking.

Link to the hosted site: [Plan Me Web Application](https://plan-me-lp.netlify.app/?page=1)

# Tech Stack

- Frontend: React + Vite, TailwindCSS, DaisyUI, Sass
- Backend: Custom-built Node.js API, Stripe API, PostgreSQL (Database)
- Authentication: Google OAuth (for calendar access), Firebase (Backend)
- Calendar Integration: Google Calendar API
- Deployment: Frontend hosted on Netlify, backend on Render, Aiven (Hosted database)

Node version at time of project development: v22.6.0

# Installation

You can obtain a copy of this repo by cloning it running the following command on your terminal:

```
git clone https://github.com/AlfredoGvz/plan_me_pj.git
```

Once cloned, get into the root directory of the project and run the following command on the terminal to install the node modules and depenencies:

```
npm install
```

To run the app, still in the root directory, run the command

```
npm run dev
```

**run dev** is a script that starts the development server. When you run this command, it launches the app locally so you can see it in your browser while you are building and testing it. In short, npm run dev starts the app in development mode, so you can see any updates live as you work on it.

## Usage

Once the app is running locally or on the hosted site, users can:

Create their own account, or log in to the app using the preset account:

**email:** test.email.events@gmail.com

**password:** test_user123

Creating your own account:

- Create an account as an attendee or organizer. A verification email will be sent to your inbox.
- Browse events: Unverified users can still explore the event listings but cannot book events.
- Book events: Verified users can book spots for events and opt to pay for paid events.
- Add events to Google Calendar: The app prompts users to authenticate with Google and grant calendar permissions. Once permission is granted, events will be added or modified automatically.

**User Roles**

Attendees: Can book events and view their event schedule from the dashboard.
Organizers: Can create, manage, and delete their events, as well as view booked events in their dashboard.

**Deletions**

- Organizers can delete only the events they have created.
- All users can delete their accounts at any time. This action will permanently remove all their personal data, including email addresses and any associated details, from the system.
