// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBBQlbsFjxDmTE-T5rl4isqRSBjHfLIbB0',
    authDomain: 'exercise-app-f06be.firebaseapp.com',
    databaseURL: 'https://exercise-app-f06be.firebaseio.com',
    projectId: 'exercise-app-f06be',
    storageBucket: 'exercise-app-f06be.appspot.com',
    messagingSenderId: '453169916463'
  }
};
