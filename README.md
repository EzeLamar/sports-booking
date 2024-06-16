# Sports Booking System

This project is a web-based application designed to facilitate the booking and management of sports facilities. The objective is to provide a tool that lets the organizations manage their reservations, courts and clients. On the other hand, the clients can book times in the provided courts through the application.

The scope is aimed to the aforementioned scenario, however it is not limited to it. It can be easily adapted in the future for a general approach and applied to other segments (like doctors appointments, restaurants, etc.).

This applications was born as a hands-on experience and challenge that could help us learn new technologies and develop an application from scratch.

## Features

- [x] Multiple courts/facilities management for the admin account.
- [x] Configurable price, opening hours and other court's information.
- [x] Calendar view to manager reservations.
- [x] User authentication through third party services such as Google.
- [x] Admin can book times for non-registered clients, perform CRUD operations for reservations and defined different type of reservations (like classes, tournaments, normal bookings, etc.).
- [x] Reservations present different status. For instance, booked, paid or cancelled.
- [ ] Clients can book times and delete their reservations. _In progress_
- [ ] Create recurrent reservations (fixed shift) that occur every week (same day and time) until further cancellation. _In progress_

## Technologies used

The project is mainly developed using [Next.js][Next-url] for the front-end and [Google Firebase](https://firebase.google.com/) for the back-end and database.

- [![Next][Next-logo]][Next-url] [Next.js][Next-url] is the React framework used to develop the application front-end.
- [![TypeScript][TypeScript-logo]][TypeScript-url] [TypeScript.js][TypeScript-url] is the chosen language as it adds the type-hinting benefits to plain JavaScript
- [![Firebase][Firebase-logo]][Firebase-url] [Google Firebase][Firebase-url] is being used to store the database, 3rd party user authentication services and other back-end logic.
- [![Vercel][Vercel-logo]][Vercel-url] [Vercel][Vercel-url] is currently hosting the application.
- [![Bootstrap][Bootstrap-logo]][Bootstrap-url] [Bootstrap][Bootstrap-url] is used to hit the ground running in the aesthetic aspects of the application. However, we are evaluating a possible migration to [Tailwind CSS](https://tailwindcss.com/).
- [![Storybook][Storybook-logo]][Storybook-url] [Storybook][Storybook-url] is included in order to showcase and test the created UI components.
- [![ESLint][ESLint-logo]][ESLint-url] [ESLint][ESLint-url] is implemented to prevent problems or identify potential issues with the TypeScript code.
- [![Prettier][Prettier-logo]][Prettier-url] [Prettier][Prettier-url] tool is used to define a standard format for the code, so that there is cohesion in the code styling throughout the project.
- [![Husky][Husky-logo]][Husky-url] [Husky][Husky-url] is included to define routines for every commit. I.e., it runs ES Lint and Prettier validations before accepting any commit.
- [![react-big-calendar][react-big-calendar-logo]][react-big-calendar-url] [react-big-calendar][react-big-calendar-url] is used for the calendar views within the application as it has a flexible definition and its a very complete library.
- [![react-day-picker][react-day-picker-logo]][react-day-picker-url] [react-day-picker][react-day-picker-url] is used for the date inputs in forms, it has a simple and neat presentation.
- [![react-hook-form][react-hook-form-logo]][Husky-url] [react-hook-form][react-hook-form-url] is used to create the forms as it presents several benefits regarding validations and data access in forms.
- [![react-toastify][react-toastify-logo]][react-toastify-url] [react-toastify][react-toastify-url] for warning or errors as it very simple to use.

## Directory tree summary

```
│
├───app
│   ├───(admin): view accessible only for admin users
│   ├───components: UI components
│   │   └───UI: re-usable UI components for general use (non-specific for a certain purpose)
│   ├───context: authentication context for session user
│   ├───firebase: Firebase (back-end) related services
│   └───utils: general-use services
├───docs: technical documentation about procedures for developers.
└───public: public images and icons
```

## Deployment on Vercel

It was decided to deploy this app using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) as this is provided by the creators of Next.js with a very straight-forward procedure.

## Installation & setup

### Environment file

It is necessary to create the file `.env` in the root directory. There is a `.env.example` that you can use as a template. The file will have the credentials of the corresponding Firebase Project and the DB collections names.

### Local

To run the project locally, run the development server command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Storybook

To start the storybook local server execute the next command:

```bash
npm run storybook
```

It will automatically open the Storybook server in your web browser.

### Build Process

First, there is a Husky set up that makes sure there is no Lint and Prettier errors before committing, it runs the pertinent scripts. If you want, you can run those check manually and individually by executing:

```shell
npm run lint:check
npm run format:check
```

Then, verify there is no Typescript errors with the next command:

```shell
npx tsc --noEmit
```

Finally, you can build the project executing:

```shell
npm run build
```

## About us

As mentioned, the idea of this project is to have a hands-on experience and challenge with new technologies or tools that we had not used before. Also, we wanted to learn how to start an application from scratch and be able to showcase it.

- **Ezequiel M. Lamarque** - Fullstack Developer - https://www.linkedin.com/in/ezequiel-lamarque/
- **Lucas S. Bualo G.** - Fullstack Developer - https://www.linkedin.com/in/lucasbualo/

Feel free to reach out to us :)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Next-logo]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Bootstrap-logo]: https://img.shields.io/badge/Bootstrap-000000?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[TypeScript-logo]: https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Firebase-logo]: https://img.shields.io/badge/Firebase-000000?style=for-the-badge&logo=firebase&logoColor=white
[Firebase-url]: https://firebase.google.com/
[Vercel-logo]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Storybook-logo]: https://img.shields.io/badge/Storybook-000000?style=for-the-badge&logo=storybook&logoColor=white
[Storybook-url]: https://storybook.js.org/
[ESLint-logo]: https://img.shields.io/badge/ESLint-000000?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[Prettier-logo]: https://img.shields.io/badge/Prettier-000000?style=for-the-badge&logo=prettier&logoColor=white
[Prettier-url]: https://prettier.io/
[Husky-logo]: https://img.shields.io/badge/Husky-000000?style=for-the-badge&logo=react&logoColor=white
[Husky-url]: https://github.com/typicode/husky#readme
[react-big-calendar-logo]: https://img.shields.io/badge/react%20big%20calendar-000000?style=for-the-badge&logo=react&logoColor=white
[react-big-calendar-url]: https://github.com/jquense/react-big-calendar#readme
[react-day-picker-logo]: https://img.shields.io/badge/react%20day%20picker-000000?style=for-the-badge&logo=react&logoColor=white
[react-day-picker-url]: https://react-day-picker.js.org/
[react-hook-form-logo]: https://img.shields.io/badge/react%20hook%20form-000000?style=for-the-badge&logo=react&logoColor=white
[react-hook-form-url]: https://react-hook-form.com/
[react-toastify-logo]: https://img.shields.io/badge/react%20toastify-000000?style=for-the-badge&logo=react&logoColor=white
[react-toastify-url]: https://github.com/fkhadra/react-toastify#readme
