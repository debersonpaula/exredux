# EXREDUX

Are u tired to create a lot of files with constants, actions, dispatchers and reducers?

**Exredux** is solution to ease your life by abstracting all react/redux logics with understable architecture.

Based on library **redux-flow-mapper**, this package use decorators to create Models, Actions, Dependencies and much more.

[![NPM](https://nodei.co/npm/exredux.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/exredux)

## Install

```bash
# install ExRedux
npm i exredux
```

## Setup tsconfig and babelrc

Include support for decorators in the tsconfig.json file:

```js
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

ExRedux uses Babel 7.x as base for transpilation/building and should be included the plugins below in the _.babelrc_ file.
Consider these itens as firts in the plugins list and in the same order that appears below:

```js
"presets": [
  "@babel/react",
  "@babel/typescript",
  ["@babel/env", { "modules": false }]
],
"plugins": [
  "babel-plugin-transform-typescript-metadata",
  ["@babel/plugin-proposal-decorators", { "legacy": true }],
  ["@babel/plugin-proposal-class-properties", { "loose": true }],
  "@babel/plugin-proposal-object-rest-spread"
],
```

## Concept

This package is based in the common MVVM principles to control the activities in the frontend.

Any action of the flow is build on ExRedux Models and were dispatched thru Connection and Inject to the Containers and Components.

![Flow Chart Concept][img-flowchart]

[img-flowchart]: https://github.com/debersonpaula/exredux/raw/master/docs/exredux.png

## Models

The logic starts with the Model.

The _Model_ it's a simple class with properties and methods. And values that was set in the properties, acts as initial store for the reducer.

The reducer name will be the same as the class name.

```ts
import { Model } from "exredux";

@Model
export class CounterModel {
  counter = 0;
}
```

## Actions

The _Action_ it's a method decorator and acts as dispatcher for the decorated method.

Any method decored will be replaced by dispatcher function that emits an action with the name of method as type and the result of the original function, will be the payload to be stored in the reducer.

```ts
import { Model, Action } from "exredux";

@Model
export class CounterModel {
  counter = 0;

  @Action add() {
    this.counter += 1;
  }
}
```

## ModelStore

The main component of Exredux, the ModelStore act as dependency controller.

All models created should be listed in the models property:

```ts
import { ModelStore } from "exredux";
import { CounterModel } from "./counter/CounterModel";
import { ListDataModel } from "./listdata/ListDataModel";

export const appModels = new ModelStore({
  devExtension: true, // enables redux-dev-extension for chrome
  models: [CounterModel, ListDataModel]
});
```

Also, the variable that stores the ModelStore, must be used in the connection to provide the state and actions to the components.

## Connection

The models will be available on component, thru the Connection decorator, that indicate the ModelStore and the model injection properties:

```tsx
import * as React from "react";
import { Connection, Inject } from "exredux";
import { appModels } from "../AppModels";
import { CounterModel } from "./CounterModel";

class ModelProps {
  // Inject the model into property
  @Inject counterModel?: CounterModel;
}

// make connection between state and component
@Connection({
  modelStore: appModels, // <-- model store location
  props: ModelProps // <-- props with model injection
})
export class Counter extends React.Component<ModelProps> {
  render() {
    const { counterModel } = this.props;
    return (
      <div>
        Counter = {counterModel.counter}
        <br />
        <button onClick={counterModel.add}>Add</button>
      </div>
    );
  }
}
```

## BaseHttpModel

These Actions are designed to be a Http-Promise based template.
Is used Axios as http requester.

```ts
import { Model, Action, BaseHttpModel } from "exredux";

// mocking http request
const httpDoneRequest = (label: string) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: label });
    }, 1500);
  });

const httpErrorRequest = (errorMessage: string) =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject({ message: errorMessage });
    }, 1500);
  });

@Model
export class HttpHandlerModel extends BaseHttpModel<string> {
  @Action getHttpTest(label: string) {
    this.request(httpDoneRequest(label));
  }

  @Action getHttpTestError(label: string) {
    this.request(httpErrorRequest(label));
  }

  // it can be used the internal method resetState
  // to clear all state data for this model
  @Action reset() {
    this.resetState();
  }
}
```

To connection in the http based model, use the same decorators _Connection_ and _Inject_ to get the data and states based on promise:

```tsx
import * as React from "react";
import { Connection, Inject } from "exredux";
import { appModels } from "../AppModels";
import { HttpHandlerModel } from "./HttphandlerModel";

class ModelProps {
  @Inject httpHandlerModel?: HttpHandlerModel;
}

@Connection({
  modelStore: appModels,
  props: ModelProps
})
export class HttpHandler extends React.Component<ModelProps> {
  render() {
    const { httpHandlerModel } = this.props;
    return (
      <div>
        <button onClick={this.handleClick}>Http Done</button>
        <button onClick={this.handleClickError}>Http Fail</button>
        <button onClick={this.handleReset}>ResetState</button>

        {httpHandlerModel.isCompleted ? (
          <p>From http model => {httpHandlerModel.response.data}</p>
        ) : null}
        {httpHandlerModel.isFailed ? (
          <p>Error From http model => {httpHandlerModel.error.message}</p>
        ) : null}
        {httpHandlerModel.isLoading ? <p>Loading...</p> : null}
      </div>
    );
  }

  handleClick = () => {
    this.props.httpHandlerModel.getHttpTest("test inserted from HttpComponent");
  };

  handleClickError = () => {
    this.props.httpHandlerModel.getHttpTestError(
      "error test inserted from HttpComponent"
    );
  };

  handleReset = () => {
    this.props.httpHandlerModel.reset();
  };
}
```

## Dependency

You inject models in another models thru _Inject_ decorator:

```tsx
import { Model, Action, Inject } from "exredux";
import { CounterModel } from "playground/counter/CounterModel";

@Model
export class ListModel {
  items: string[] = [];

  // inject CounterModel inside ListModel
  @Inject counterModel: CounterModel;

  @Action add() {
    this.counterModel.add();
    this.items.push(
      `Item ${this.items.length} : Counter = ${this.counterModel.counter}`
    );
  }
}
```

## Triggers

Triggers are interceptors that listen to action completion.

And must be used to trigger events from another actions.

This triggers can't be used to listen itself.

```tsx
import { Model, Inject, Trigger } from "exredux";
import { CounterModel } from "playground/counter/CounterModel";

@Model
export class EventsModel {
  message: string;

  // dependency from another model
  @Inject counterModel: CounterModel;

  @Trigger(CounterModel, "add") checkAddCounter() {
    this.message = `Counter updated to = ${this.counterModel.counter}`;
  }
}
```

The connection is the same as usual model:

```tsx
import * as React from "react";
import { Connection, Inject } from "exredux";
import { appModels } from "../AppModels";
import { EventsModel } from "./EventsModel";

class ModelProps {
  @Inject eventsModel: EventsModel;
}
type Props = Partial<ModelProps>;

@Connection({
  modelStore: appModels,
  props: ModelProps
})
export class Events extends React.Component<Props> {
  render() {
    const { eventsModel } = this.props;
    return (
      <div>
        Example of Trigger
        <br />
        <p>Message = {eventsModel.message}</p>
        <button onClick={eventsModel.checkAddCounter}>
          Manually get event
        </button>
      </div>
    );
  }
}
```

Also, the triggers dispatch action to redux state and does not require _Action_ decorator to do it.

```tsx
@Action // <=== NOT REQUIRED, Trigger already is an Action
@Trigger
decorated() {
  ...
}
```

## Availability of methods in component props

Functions and property without decorator can be used in the model, but wil be not available to the connection props.
The reducer dispatcher breaks any method or property and the React component can not see those properties at the component side.

To reach the component side, use arrow function.

```ts
@Model
export class AvailabilityModel {
  // invisible for components
  makeSomething() {
    ...
  }

  @Action
  callMakeSomething() {
    this.makeSomething();
  }

  // use arrow function to be visible at the component side
  makeSomethingFromComponent = () => {
    ...
  }
}
```

## State change guideline

Methods without decorate changes the state only in the class and will not be dispatched to the redux store.
But can be used to calculate or change something until some point, and after that, call a decorated action to dispatch it to the store.

```ts
@Model
export class AvailabilityModel {
  // change state internally only
  changeSomething() {
    this.stateData = "something";
  }

  // change state internally
  // and dispatch it to the store and components
  @Action
  changeAndDispatch() {
    this.stateData = "something changed";
  }
}
```

## Provider

Instead using Provide from _react-redux_, use directly from __exredux__.
It's already provide encapsulation for the ModelStore and the redux Provider.

```tsx
import * as React from "react";

import { appModels } from "./AppModels";
import { Counter } from "./counter/Counter";
import { Provider } from "exredux";

export class Sample extends React.Component {
  public render() {
    return (
      <Provider store={appModels.createStore()}>
        <div>
          Test Application for ExRedux
          <hr />
          <Counter />
        </div>
      </Provider>
    );
  }
}
```

## Sample

The sample project is available in the source https://github.com/debersonpaula/exredux. Just install dependencies and run with `npm start`.

![Changelog][changelog]

[changelog]: https://github.com/debersonpaula/exredux/raw/master/CHANGELOG.md

## License

[MIT](LICENSE)
