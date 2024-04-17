This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Firebase

It is necessary to create the file .env in the root directory with the credentials of the corresponding Firebase Project with the next structure:

```
NEXT_PUBLIC_FIREBASE_API_KEY=<api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<app-id>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<analytic-id>
```

# Storybook

To start the storybook local server execute the next command:

```
npm run storybook
```

# NextJs Build Process

First make sure there is no Lint and Prettier errors executing:

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

# Firebase Build & Deploy Process (Hosting)

First, we need to install firebase-tools
Login with your Firebase account executing:

```shell
npx firebase login
```

We indicate that we want to enable the SSR on Firebase Hosting to support NextJS with the next command:

```shell
npx firebase experiments:enable webframeworks
```

Then, we indicate that we want to start a firebase config from scrath including the service hosting

```shell
npx firebase init hosting
```

Select the current firebase project that we configured previously.
Automatically NetxJs from our project. Mark as this is OK.

Do not select to use Github to manage the deploy process

firebase.json and .firebaserc files will be created. In case you are loading the project with the configuration previously done, you will have to create the .fireabaserc file with the next structure:

```json
{
	"projects": {
		"default": "<FIREBASE_PROJECT_ID>"
	}
}
```

## Firebase Emulator

```shell
npx firebase emulators:start
```

## Firebase Deploy

Finally, we can deploy it with:

```shell
npx firebase deploy
```
