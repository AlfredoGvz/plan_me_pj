# PLAN ME FRONT END

This repository holds the front-end of a web app built using React, Tailwind CSS and DaisyUi components. It lets users easily explore local activities and events happening around them and even book a spot. It's designed to make finding and reserving fun things to do simple and convenient!

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

Once the app is running, everything will be visible in your browser, as this part of the project is highly visual.

- Users can create accounts either as attendees or organizers using their email addresses.
- After signing up, users will receive a verification email.
- If users don't verify their email, they can still browse and read about events, but won't be able to book events or add them to their calendar.

This setup ensures that only verified users can fully participate, while still allowing everyone to explore available events.

The user interface (UI) differs depending on whether you sign up as an organizer or an attendee. If you're an organizer, the app allows you to create and publish events. You can do this easily from your dashboard or by clicking the "Add Event" button located in the navigation bar.

Additionally, users have the option to add events to their Google Calendar. To use this feature, the app requires access to your calendar. From the dashboard, users can add a calendar, which will prompt them to authenticate with their Google account and grant the necessary permissions. Once access is given, the app can automatically modify and update your calendar whenever you add a new event.

The dashboard provides a clear view of your activity within the app. It will display any events you have booked to attend. If you are an organizer, you will also see a list of events you are hosting, alongside any events you have booked as an attendee. This way, both organizers and attendees can easily manage their event schedules from one place.

#### Deletions

- Organizers have the ability to delete only the events that they have created.
- All users can delete their accounts at any time. This action will permanently remove all their personal data, including email addresses and any associated details, from the system.
