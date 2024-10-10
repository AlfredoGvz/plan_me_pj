# PLAN ME FULLSTACK WEB APP

Plan Me is a community-based web application that allows local businesses to share events with community members. Events can range from free activities to paid ones. Members can explore, book and pay to participate in these events or pick the free of charge ones. Users can also add the events they sign up for to their personal calendars, ensuring they never miss out.

This project was built using React + Vite, TailwindCSS, DaisyUI, and a custom Node.js API. It integrates the Google Calendar API for calendar management, allowing users to add events to their calendars after booking.

![Web App Logo](https://firebasestorage.googleapis.com/v0/b/bookstore-578c6.appspot.com/o/profileImages%2Flogo.jpg?alt=media&token=c0a0c8bf-e669-4727-90c9-9af4ca1a8e16)

Link to the hosted site: [Plan Me Web Application](https://plan-me-lp.netlify.app/?page=1)

# Tech Stack

- Frontend: React + Vite, TailwindCSS, DaisyUI, Sass
- Backend: Custom-built Node.js API, Stripe API, PostgreSQL (Database), Firebase (User Authentication)
- Authentication: Google OAuth (for calendar access)
- Calendar Integration: Google Calendar API
- Deployment and Hosting: Frontend hosted on Netlify, backend on Render, Aiven (Hosted database)

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

# Usage

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

**Create Events**

To create events as an organizer:

1. Make sure you are signed in with an organizer account.
2. From the dashboard, click on the "Add Event" button to open the event creation form.
3. Fill in all the required fields. Every input field in the form must be completed as all fields are mandatory.
4. Alternatively, you can access the event creation form by clicking "Add Event" in the navigation bar.
5. After creating an event, navigate to the "Hosted Events" tab in your dashboard to view all the events you've created.

**Add Events to your Calendar**

Once users book an event, they can add it to their Google Calendar directly from the dashboard. Under the "Next Meetings" tab, a list of all upcoming events will be displayed, and next to each event, there will be an "Add To Calendar" button. Simply click the button to add the event to your calendar. Please note that before using this feature, users must grant the app permission to modify their Google Calendar.

**Deletions**

- Organizers can delete only the events they have created.
- All users can delete their accounts at any time from the dashboard. This action will permanently remove all their personal data, including email addresses and any associated details, from the system.
