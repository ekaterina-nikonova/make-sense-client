import React from "react";

import { Divider, Timeline, Typography } from "antd";

import TimelineSection from "./TimelineSection";

const AboutPageContainer = () => {
  const { Paragraph, Title } = Typography;

  const links = {
    androidX: 'https://developer.android.com/jetpack/androidx',
    antDesign: 'https://ant.design/',
    aws: 'https://aws.amazon.com/s3/',

    brittleEyeLink: 'https://github.com/ekaterina-nikonova/brittle-eye',
    brittleUpLink: 'https://github.com/ekaterina-nikonova/brittle-up',
    brittlePinsAndroidLink: 'https://github.com/ekaterina-nikonova/brittle-pins-android',
    brittlePinsAPILink: 'https://github.com/ekaterina-nikonova/brittle-pins-api',
    brittlePinsWebLink: 'https://github.com/ekaterina-nikonova/brittle-pins-web',

    heroku: 'https://heroku.com/',
    netlify: 'https://www.netlify.com/',
    postgresql: 'https://www.postgresql.org/',
    react: 'https://create-react-app.dev/',
    rails: 'https://rubyonrails.org/'
  };

  const brittleEyeDescription = (
    <React.Fragment>
      A live image recognition app that allows to determine what the camera is pointed at.
      Currently works with a small set of electronic components.
      The app is written in <strong>Kotlin</strong>.
    </React.Fragment>
  );

  const brittleEyeLibraries = [{
    title: 'CameraX',
    description: 'Get preview from device camera; handle preview rotation based on the data from device sensor',
    link: 'https://developer.android.com/training/camerax'
  }, {
    title: 'Firebase Vision',
    description: 'Detect the most prominent object in the preview, track it\'s position and dimensions',
    link: 'https://firebase.google.com/docs/reference/android/com/google/firebase/ml/vision/FirebaseVision'
  }, {
    title: 'Firebase AutoML',
    description: 'Recognise the object in the preview using a cloud-hosted re-trained model',
    link: 'https://firebase.google.com/docs/ml-kit/automl-image-labeling'
  }];

  const brittleUpDescription = (
    <React.Fragment>
      A little utility for uploading massive amounts of photos on Google Drive to be later used as training data for image labelling models.
      To save space and bandwidth, the app allows to resize images, and since they are uploaded directly, without storing on the device, the memory doesn't get cluttered.
      You don't need to sort images later, since labels are assigned automatically.
      The app is written in <strong>Java</strong>.
    </React.Fragment>
  );

  const brittleUpLibraries = [{
    title: 'Drive API v3',
    description: 'Manage fetching folder structure from Google Drive, uploading photos, verifying credentials',
    link: 'https://developers.google.com/api-client-library/java/apis/drive/v3'
  }, {
    title: 'Android Hardware Camera2',
    description: 'Show preview, take pictures, turn the flash on and off',
    link: 'https://developer.android.com/reference/android/hardware/camera2/package-summary'
  }, {
    title: 'Google Play Services',
    description: 'Handle signing in with Google account to get access to Google Drive',
    link: 'https://developers.google.com/android/guides/overview'
  }, {
    title: 'Mockito',
    description: 'Mock DriveService in tests, stub Google Drive responses',
    link: 'https://site.mockito.org/'
  }];

  const androidDescription = (
    <React.Fragment>
      The Android client has the same features as the web app.
      It incorporates a few <a href={links.androidX} target="_blank" rel="noopener noreferrer">AndroidX</a> packages and manages user sessions internally. <strong>The app is still under development</strong>.
    </React.Fragment>
  );

  const androidLibraries = [{
    title: 'Retrofit',
    description: 'Handle HTTP requests to the API',
    link: 'https://square.github.io/retrofit/'
  }, {
    title: 'Persistent Cookie Jar',
    description: 'Store cookies in SharedPreferences and handle CSRF token to keep the user logged in',
    link: 'https://github.com/franmontiel/PersistentCookieJar'
  }, {
    title: 'Picasso',
    description: 'Fetch images from the remote storage and render them in the ImageView',
    link: 'https://square.github.io/picasso/'
  }, {
    title: 'Gson',
    description: 'Process responses from the API; deserialize JSON to render in the activities',
    link: 'https://github.com/google/gson'
  }];

  const apiDescription = (
    <React.Fragment>
      The back-end is a <a href={links.rails} target="_blank" rel="noopener noreferrer">Ruby on Rails</a> app generated as an API.
      It uses <a href={links.postgresql} target="_blank" rel="noopener noreferrer">PostgreSQL</a> as the database and is hosted on <a href={links.heroku} target="_blank" rel="noopener noreferrer">Heroku</a>.
      Uploaded files are stored at <a href={links.aws} target="_blank" rel="noopener noreferrer">Amazon S3</a>.
    </React.Fragment>
  );

  const apiLibraries = [{
    title: 'JWT Sessions',
    description: 'Manage sessions using JSON Web Tokens',
    link: 'https://github.com/tuwukee/jwt_sessions'
  }, {
    title: 'ActionCable',
    description: 'Use WebSockets to broadcast changing data across clients in real time',
    link: 'https://edgeguides.rubyonrails.org/action_cable_overview.html'
  }];

  const webClientDescription = (
    <React.Fragment>
      The client app has been bootstrapped with <a href={links.react} target="_blank" rel="noopener noreferrer">create-react-app</a>.
      It uses <a href={links.antDesign} target="_blank" rel="noopener noreferrer">Ant Design</a> as a UI library, and is hosted on <a href={links.netlify} target="_blank" rel="noopener noreferrer">Netlify</a>.
      Instead of components' state and lifecycle methods, the local flow of data is based on <strong>hooks</strong>.
    </React.Fragment>
  );

  const reactLibraries = [{
    title: 'Axios',
    description: 'Send HTTP requests to the API, handle headers and credentials',
    link: 'https://github.com/axios/axios'
  }, {
    title: 'React ActionCable Provider',
    description: 'Connect to the API\'s ActionCable channels using WebSockets to receive real-time updates across open browser windows and devices',
    link: 'https://github.com/cpunion/react-actioncable-provider'
  }, {
    title: 'ReactN',
    description: 'Global state management; together with React Context, replaces Redux',
    link: 'https://github.com/CharlesStover/reactn'
  }, {
    title: 'Uniforms',
    description: 'Schema-based form generation',
    link: 'https://uniforms.tools/'
  }];

  return (
    <div className="about-container">
      <div className="about-section">
        <Divider>
          <Title>About Brittle Pins</Title>
        </Divider>

        <Paragraph>
          This project is a playground where I experiment with technologies that catch my eye.
          It was conceived as an IoT project management app&nbsp;&mdash; a single place
          to keep track of your equipment and code.
        </Paragraph>

        <Paragraph>
          The core of Brittle Pins is an API built with <strong>Ruby on Rails</strong> and a web client built with <strong>React</strong>.
          The accompanying Android apps are written in <strong>Kotlin</strong>, but you can still find some older <strong>Java</strong> code.
        </Paragraph>

        <div className="apps-timeline">
          <Timeline>
            <TimelineSection
              description={brittleEyeDescription}
              icon={KotlinIcon}
              libraries={brittleEyeLibraries}
              repoLink={links.brittleEyeLink}
              title="Brittle Eye"
              subtitle="started Sep 29, 2019"
            />

            <TimelineSection
              description={brittleUpDescription}
              icon={AndroidIcon}
              libraries={brittleUpLibraries}
              repoLink={links.brittleUpLink}
              title="Brittle Up"
              subtitle="started Jun 1, 2019"
            />

            <TimelineSection
              description={androidDescription}
              icon={AndroidIcon}
              libraries={androidLibraries}
              repoLink={links.brittlePinsAndroidLink}
              title="Brittle Pins for Android"
              subtitle="started May 14, 2019"
            />

            <TimelineSection
              description={apiDescription}
              icon={RubyIcon}
              libraries={apiLibraries}
              repoLink={links.brittlePinsAPILink}
              subtitle="started Mar 9, 2019"
              title="API"
            />

            <TimelineSection
              description={webClientDescription}
              icon={ReactIcon}
              libraries={reactLibraries}
              repoLink={links.brittlePinsWebLink}
              subtitle="started Mar 6, 2019"
              title="Web client"
            />
          </Timeline>
        </div>

      </div>
    </div>
  );
};

const AndroidIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="android"
    className="svg-inline--fa fa-android fa-w-14"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width="1.5em"
    height="1.5em"
  >
    <path fill="#4cb518"
          d="M89.6 204.5v115.8c0 15.4-12.1 27.7-27.5 27.7-15.3 0-30.1-12.4-30.1-27.7V204.5c0-15.1 14.8-27.5 30.1-27.5 15.1 0 27.5 12.4 27.5 27.5zm10.8 157c0 16.4 13.2 29.6 29.6 29.6h19.9l.3 61.1c0 36.9 55.2 36.6 55.2 0v-61.1h37.2v61.1c0 36.7 55.5 36.8 55.5 0v-61.1h20.2c16.2 0 29.4-13.2 29.4-29.6V182.1H100.4v179.4zm248-189.1H99.3c0-42.8 25.6-80 63.6-99.4l-19.1-35.3c-2.8-4.9 4.3-8 6.7-3.8l19.4 35.6c34.9-15.5 75-14.7 108.3 0L297.5 34c2.5-4.3 9.5-1.1 6.7 3.8L285.1 73c37.7 19.4 63.3 56.6 63.3 99.4zm-170.7-55.5c0-5.7-4.6-10.5-10.5-10.5-5.7 0-10.2 4.8-10.2 10.5s4.6 10.5 10.2 10.5c5.9 0 10.5-4.8 10.5-10.5zm113.4 0c0-5.7-4.6-10.5-10.2-10.5-5.9 0-10.5 4.8-10.5 10.5s4.6 10.5 10.5 10.5c5.6 0 10.2-4.8 10.2-10.5zm94.8 60.1c-15.1 0-27.5 12.1-27.5 27.5v115.8c0 15.4 12.4 27.7 27.5 27.7 15.4 0 30.1-12.4 30.1-27.7V204.5c0-15.4-14.8-27.5-30.1-27.5z">
    </path>
  </svg>
);

const JavaIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="java"
    className="svg-inline--fa fa-java fa-w-12"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width="1.5em"
    height="1.5em"
  >
    <path fill="#e08800"
          d="M277.74 312.9c9.8-6.7 23.4-12.5 23.4-12.5s-38.7 7-77.2 10.2c-47.1 3.9-97.7 4.7-123.1 1.3-60.1-8 33-30.1 33-30.1s-36.1-2.4-80.6 19c-52.5 25.4 130 37 224.5 12.1zm-85.4-32.1c-19-42.7-83.1-80.2 0-145.8C296 53.2 242.84 0 242.84 0c21.5 84.5-75.6 110.1-110.7 162.6-23.9 35.9 11.7 74.4 60.2 118.2zm114.6-176.2c.1 0-175.2 43.8-91.5 140.2 24.7 28.4-6.5 54-6.5 54s62.7-32.4 33.9-72.9c-26.9-37.8-47.5-56.6 64.1-121.3zm-6.1 270.5a12.19 12.19 0 0 1-2 2.6c128.3-33.7 81.1-118.9 19.8-97.3a17.33 17.33 0 0 0-8.2 6.3 70.45 70.45 0 0 1 11-3c31-6.5 75.5 41.5-20.6 91.4zM348 437.4s14.5 11.9-15.9 21.2c-57.9 17.5-240.8 22.8-291.6.7-18.3-7.9 16-19 26.8-21.3 11.2-2.4 17.7-2 17.7-2-20.3-14.3-131.3 28.1-56.4 40.2C232.84 509.4 401 461.3 348 437.4zM124.44 396c-78.7 22 47.9 67.4 148.1 24.5a185.89 185.89 0 0 1-28.2-13.8c-44.7 8.5-65.4 9.1-106 4.5-33.5-3.8-13.9-15.2-13.9-15.2zm179.8 97.2c-78.7 14.8-175.8 13.1-233.3 3.6 0-.1 11.8 9.7 72.4 13.6 92.2 5.9 233.8-3.3 237.1-46.9 0 0-6.4 16.5-76.2 29.7zM260.64 353c-59.2 11.4-93.5 11.1-136.8 6.6-33.5-3.5-11.6-19.7-11.6-19.7-86.8 28.8 48.2 61.4 169.5 25.9a60.37 60.37 0 0 1-21.1-12.8z">
    </path>
  </svg>
);

const KotlinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    viewBox="0 0 60 60"
    id="kotlin"
  >
    <linearGradient id="kotlin_a" gradientUnits="userSpaceOnUse" x1="15.959" y1="-13.014" x2="44.307" y2="15.333" gradientTransform="matrix(1 0 0 -1 0 61)"><stop offset=".097" stopColor="#0095D5" /><stop offset=".301" stopColor="#238AD9" /><stop offset=".621" stopColor="#557BDE" /><stop offset=".864" stopColor="#7472E2" /><stop offset="1" stopColor="#806EE3" /></linearGradient>
    <path fill="url(#kotlin_a)" d="M0 60L30.1 29.9 60 60z" />

    <linearGradient id="kotlin_b" gradientUnits="userSpaceOnUse" x1="4.209" y1="48.941" x2="20.673" y2="65.405" gradientTransform="matrix(1 0 0 -1 0 61)"><stop offset=".118" stopColor="#0095D5" /><stop offset=".418" stopColor="#3C83DC" /><stop offset=".696" stopColor="#6D74E1" /><stop offset=".833" stopColor="#806EE3" /></linearGradient>
    <path fill="url(#kotlin_b)" d="M0 0L30.1 0 0 32.5z" />

    <linearGradient id="kotlin_c" gradientUnits="userSpaceOnUse" x1="-10.102" y1="5.836" x2="45.731" y2="61.669" gradientTransform="matrix(1 0 0 -1 0 61)"><stop offset=".107" stopColor="#C757BC" /><stop offset=".214" stopColor="#D0609A" /><stop offset=".425" stopColor="#E1725C" /><stop offset=".605" stopColor="#EE7E2F" /><stop offset=".743" stopColor="#F58613" /><stop offset=".823" stopColor="#F88909" /></linearGradient>
    <path fill="url(#kotlin_c)" d="M30.1 0L0 31.7 0 60 30.1 29.9 60 0z" /></svg>
);

const ReactIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="react"
    className="svg-inline--fa fa-react fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="1.5em"
    height="1.5em"
  >
    <path fill="#40a9ff"
          d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z">
    </path>
  </svg>
);

const RubyIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="far"
    data-icon="gem"
    className="svg-inline--fa fa-gem fa-w-18"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    width="1.5em"
    height="1.5em"
  >
    <path fill="#cc342d"
          d="M464 0H112c-4 0-7.8 2-10 5.4L2 152.6c-2.9 4.4-2.6 10.2.7 14.2l276 340.8c4.8 5.9 13.8 5.9 18.6 0l276-340.8c3.3-4.1 3.6-9.8.7-14.2L474.1 5.4C471.8 2 468.1 0 464 0zm-19.3 48l63.3 96h-68.4l-51.7-96h56.8zm-202.1 0h90.7l51.7 96H191l51.6-96zm-111.3 0h56.8l-51.7 96H68l63.3-96zm-43 144h51.4L208 352 88.3 192zm102.9 0h193.6L288 435.3 191.2 192zM368 352l68.2-160h51.4L368 352z">
    </path>
  </svg>
);

export default AboutPageContainer;
