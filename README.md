This project is a web client for [**Brittle Pins**](https://brittle-pins.com) app bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run

Even though it is possible to run the client as a stand-alone app with `yarn start`,
the API will be unavailable.
To be able to use all features, place the code of the client in a folder called `brittle-pins-web`
and make it a sibling of the [API's](https://github.com/ekaterina-nikonova/brittle-pins-api) folder.
The command `rails start` will make the app run on port `3000`.

Keep in mind that port numbers are hard-coded: the API runs on port `3001`.
If you change the client's port, it will fail to communicate with the API.

## How to test

Run tests with watch:

```yarn test```

To run or re-run all tests in the watch mode, press `a`.

Run tests with coverage:

```yarn test --coverage```

The coverage will be displayed in the terminal, and the contents of the `/coverage` folder will be updated.
To see the report, open the `/coverage/lcov-report/index.html` file.
