import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://65e9cda65b3e7e808c3c8b2fa2a82c8b@o4508348349415424.ingest.de.sentry.io/4508348354789456",

  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({ colorSchema: "system" }),
  ],
  // Session Replay
  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
