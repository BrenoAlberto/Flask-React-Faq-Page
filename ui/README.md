# NOTES FOR THE REVIEWER
Install the new packages 
...
cd ui
yarn install
...

Run integration tests
...
yarn run cypress open
when the cy window opens click on app.spec.js
...

# FAQ UI

This SPA fetches frequently asked questions (FAQs) from an api and displays them to the user.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node
- Yarn


### Installing

First, clone the repository, then run

```
cd ui/
yarn install
```
to install React and other dependencies.


If you are also developing the api, you should create a `.env` file with the following content:
```
REACT_APP_API_HOST=<your-api-endpoint>
```
With this variable set, you can use the `API_HOST` const in `consts.js` when fetching data from your api.

## Running

```
yarn start
```
This will start the application on http://localhost:3000.

## What you should do
You should style the page according to [this wireframe](https://gitlab.com/r13/faq-test/wikis/Wireframes).

Remember to use React components to improve code readability and reusability.

When developing the form, you should use [controlled inputs](https://reactjs.org/docs/forms.html#controlled-components).

#### If you are also developing the back-end
Instead of using hard-coded questions, fetch them from your API. When submitting the message form, make a POST request to the API endpoint you created for handling message creation. Remember to catch errors and display the right message to the user.
