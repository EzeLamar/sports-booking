### Firebase local configuration

It is necessary to create the file `.env` in the root directory with the credentials of the corresponding Firebase Project with the next structure.

```
NEXT_PUBLIC_FIREBASE_API_KEY=<api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<app-id>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<analytic-id>
```

### Firebase Build & Deploy Process

If you want to deploy the application in Firebase instead of Vercel. You can follow the next steps:

1. Install firebase-tools
2. Login with your Firebase account executing:

```shell
npx firebase login
```

3. Indicate that we want to enable the SSR on Firebase Hosting to support NextJS with the next command:

```shell
npx firebase experiments:enable webframeworks
```

4. Indicate that we want to start a firebase config from scratch including the service hosting

```shell
npx firebase init hosting
```

5. Select the current firebase project that we configured previously.

- Automatically NextJs from our project. Mark as this is OK.
- Do not select to use Github to manage the deploy process
- `firebase.json` and `.firebaserc` files will be created. In case you are loading the project with the configuration previously done, you will have to create the `.fireabaserc` file with the next structure:
  ```json
  {
  	"projects": {
  		"default": "<FIREBASE_PROJECT_ID>"
  	}
  }
  ```

6. Run Firebase emulator

```shell
npx firebase emulators:start
```

7. Finally, deploy it with:

```shell
npx firebase deploy
```
