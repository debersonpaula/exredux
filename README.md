# EXREDUX

Are u tired to create a lot of files with constants, actions, dispatchers and reducers?

__Exredux__ is solution to ease your life by abstracting all react/redux logics with understable architecture.

Based on library __redux-flow-mapper__, this package use decorators to create Models, Actions, Dependencies and much more.

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

If Babel is used to transpile the application, include the plugins below in the _.babelrc_ file. Consider these itens as firts in the plugins list and in the same order that appears below:

```js
"plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true}],
    ...
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
import { Model } from 'exredux';

@Model
export class CounterModel {
  counter = 0;
}
```



## Actions

The _Action_ it's a method decorator and acts as dispatcher for the decorated method.

Any method decored will be replaced by dispatcher function that emits an action with the name of method as type and the result of the original function, will be the payload to be stored in the reducer.

```ts
import { Model, Action } from 'exredux';

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
import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';
import { ListDataModel } from './listdata/ListDataModel';

export const appModels = new ModelStore({
  devExtension: true, // enables redux-dev-extension for chrome
  models: [CounterModel, ListDataModel]
});
```

Also, the variable that stores the ModelStore, must be used in the connection to provide the state and actions to the components.

## Connection

The models will be available on component, thru the Connection decorator, that indicate the ModelViewer and the model injection properties:
```tsx
import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { appModels } from '../AppModels';
import { CounterModel } from './CounterModel';

class ModelProps {
  // Inject the model into property
  @Inject(CounterModel) counterModel?: CounterModel;
}

// make connection between state and component
@Connection({
  modelViewer: appModels, // <-- model store location
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
import { Model, Action, BaseHttpModel } from 'exredux';

// mocking http request
const httpRequest = (label: string) => Promise.resolve({ data: label });

@Model
export class HttpModel extends BaseHttpModel<string> {
  @Action getHttpTest(label: string) {
    // use internal method request to
    // trigger promise events
    this.request(httpRequest(label));
  }
}
```

To connection in the http based model, use the same decorators _Connection_ and _Inject_ to get the data and states based on promise:

```tsx
import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { appModels } from '../AppModels';
import { HttpModel } from './HttpModel';

class ModelProps {
  @Inject(HttpModel) httpModel?: HttpModel;
}

@Connection({
  modelViewer: appModels,
  props: ModelProps
})
export class HttpComponent extends React.Component<ModelProps> {
  render() {
    const { httpModel } = this.props;
    return (
      <div>
        <button onClick={this.handleClick}>Get from Http</button>
        {httpModel.isCompleted ? <p>From http model => {httpModel.response.data}</p> : null}
        {httpModel.isLoading ? <p>Loading...</p> : null}
      </div>
    );
  }

  handleClick = () => {
    this.props.httpModel.getHttpTest('test inserted from HttpComponent');
  }
}
```


## Sample

The sample project is available in the source https://github.com/debersonpaula/exredux. Just install dependencies and run with `npm start`.

## License

[MIT](LICENSE)