# Redux Flow Mapper

React/Redux utility to create flows that acts as Actions and Reducers with Typescript and Decorators.

[![NPM](https://nodei.co/npm/redux-flow-mapper.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/redux-flow-mapper)

[![NPM](https://nodei.co/npm-dl/redux-flow-mapper.png)](https://nodei.co/npm/redux-flow-mapper/)

Work in Progress:

- Core functionalities: done
- Actions dispatchers: done
- Reducer handlers: done
- Triggers handlers: done
- Promise based events: done
- Http-Promise based events: done
- Tests: TBD

## Requirements

```bash
# requires the following packages:
npm i --save react-redux
npm i --save rxjs
npm i --save axios
npm i --save-dev @babel/plugin-proposal-decorators
npm i --save-dev @babel/plugin-proposal-class-properties
```

## Install

```bash
# install Flow Mapper
npm i redux-flow-mapper
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

This package is based in the common flow principles to control the activities in the frontend.
Any action of flow is build on FlowMapper and React just render the results.

The base flow of FlowMapper starts with flow actions and states, are intercepted by triggers, encapsulated with modules, created by mapper and distributed thru connections:
![Flow Chart Concept][img-flowchart]

## Redux by Class and Decorators

All Redux logics were designed to be a decorated classes and methods.

### FlowState

The development starts with states, that is the initial data for reducers.

```ts
import {FlowState} from 'redux-flow-mapper';

@FlowState({
  name: 'name-of-your-state'
})
export class MyState {
  myCustomData = '';
  ...
}
```

The name in the decorator, will be used as reducer name in redux store.

### FlowActions

Actions are designed to be dispatchers and reducers.
Any method decored by **getState** will be replaced by dispatcher function that emits an action with the name of method as type and the arguments as args in the dispatch.

```ts
import { FlowActions, getState } from "redux-flow-mapper";

@FlowActions({
  // name of the flow
  // all methods in this class will use this name
  // as prefix in the redux action
  name: "name-of-your-action-flow"
})
export class MyActions {
  @getState(MyState)
  start = () => (state: MyState): MyState => {
    return { ...state, myCustomData: "something" };
  };
}
```

### FlowTriggers

Triggers are interceptors that listen to action completion and returns the previous and new changed state.

And must be used to trigger events from another actions.

This trigger can't be used to listen to event in the same class that hold the trigger function.

```ts
import {FlowActions, getTrigger} from 'redux-flow-mapper';

@FlowActions({
  name: 'name-of-another-action'
})
export class MyAnotherActions {
  ...
  @getAction(MyActions) actions?: MyActions;

  @getTrigger(MyState, MyActions, 'start')
  checkIfActionIfStarted = (
    previous: MyState,
    state: MyState
  ) => {
    if (!previous.myCustomData && state.myCustomData) {
      // make your actions
      ...
    }
  };

  ...
}
```

### FlowModules

Modules are encapsulation that holds all flow states and actions.

```ts
import { FlowModule } from "redux-flow-mapper";

@FlowModule({
  states: [MyState],
  actions: [MyActions, MyAnotherActions]
})
export class MyModule {}
```

### FlowMapper

The FlowMapper is the main class and instantiate all actions and states, transforming then in dispatchers and reducers.

```ts
import { FlowMapper } from "redux-flow-mapper";

export const myMapper = new FlowMapper({
  devExtension: true, // enables redux-dev-extension for chrome
  modules: [MyModule]
});
```

### Connecting in React

Use Redux Provider and connect it to the mapper store:

```tsx
import { Provider } from 'react-redux';
import * as React from 'react';

...

export class App extends React.Component {
  public render() {
    return (
      <Provider store={myMapper.createStore()}>
        ...
      </Provider>
    );
  }
}
```

The function _createStore_ instantiate a **Store** object, that can be used in the redux Provider.

### Render in component

Use FlowConnection to replace connect from Redux. This decorator automatically connect the component to the redux store and instantiate actions and states from mapper.

```tsx
import { FlowConnection, getAction, getState } from "redux-flow-mapper";

class Props {
  // decorate property with action and send the action
  // object to the component thru props
  @getAction(MyActions) actions?: MyActions;

  // decorate property with state and send the action
  // object to the component thru props
  @getState(MyState) stateContent?: MyState;
}

@FlowConnection({
  flow: myMapper, // <-- set the instance of FlowMapper
  props: Props // <-- set to the Props class
})
// always use the Props class to incorporate the React component
export class MyComponent extends React.Component<Props> {
  render() {
    return (
      <div>
        <strong>Test Component</strong>
        <p>custom data = {this.props.stateContent.myCustomData}</p>
        <p>
          <button onClick={this.start}>Start</button>
        </p>
      </div>
    );
  }
  start = () => {
    this.props.actions.start();
  };
}
```

## Tools

### FlowPromised

These Actions are designed to be a Promise based template.
The FlowMapper will generate the action dispatchers as _loading_, _completed_ and _failed_.
The promise handle function will be replaced by dispatcher and the Promise will output the methods above for each Promise event.

```ts
import {
  FlowPromised,
  FlowPromiseActions,
  FlowPromiseState
} from "redux-flow-mapper";

@FlowState({
  name: "my-promised-state"
})
export class MyState extends FlowPromiseState<any, any> {}

@FlowPromised({
  name: "my-promised-action",
  state: MyState
})
export class MyPromisedAction implements FlowPromiseActions {
  // pass the Promise inside the start function
  // dont use arrow function or the decorator will not found
  // the method
  start(request: string, error: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (error) {
          reject({ error });
        } else {
          resolve({ request });
        }
      }, 2500);
    });
  }
}
```

Also, the promised methods can be triggered in another actions, by using the _completed_ and _failed_ names:

```ts
import { FlowActions, getTrigger } from "redux-flow-mapper";

@FlowActions({
  name: "my-promised-catcher-action"
})
export class MyPromisedCatcherAction {
  @getAction(MyActions) actions?: MyActions;

  @getTrigger(MyState, MyPromisedAction, "completed")
  checkIsComplete = (previous: MyState, state: MyState) => {
    if (!previous.isCompleted && state.isCompleted) {
      console.log("isCompleted ok");
      actions.start();
    }
  };

  @getTrigger(MyState, MyPromisedAction, "failed")
  checkIsFailed = (previous: MyState, state: MyState) => {
    if (!previous.isFailed && state.isFailed) {
      console.log("isFailed ok");
    }
  };
}
```

### FlowHttpRequest

These Actions are designed to be a Http-Promise based template.
Use Axios as http requester and works same as **FlowPromised**

```ts
import {
  FlowHttpRequest,
  FlowHttpActions,
  FlowHttpState,
  http // <-- return an Axios object that makes requests
} from "redux-flow-mapper";

@FlowState({
  name: "testhttp"
})
export class TestHttpState extends FlowHttpState<any> {}

@FlowHttpRequest({
  name: "test.http.actions",
  state: TestHttpState
})
export class TestHttpActions implements FlowHttpActions {
  request(simulateError?: number) {
    if (simulateError === 400) {
      return http.get("http://localhost:9999/fail400");
    }
    if (simulateError === 999) {
      return http.get("http://server-does-not-exists");
    }
    return http.get("http://localhost:9999");
  }
}
```

The _FlowHttpState_ is based in the same event handler **FlowPromised** (_loading_, _completed_ and _failed_), bu the response returns and AxiosResponse or AxiosError depending the handler.

The object handling can be defined as example below. All Axios responses will be stored in the properties _response_ or _error_.

```ts
class StageHttpComponentProps {
  @getAction(TestHttpActions) actions?: TestHttpActions;
  @getState(TestHttpState) stage?: TestHttpState;
}
@FlowConnection({
  flow: reduxflowApplication,
  props: StageHttpComponentProps
})
export class StageHttpComponent extends React.Component<
  StageHttpComponentProps
> {
  render() {
    return (
      <div className="flow-box">
        <p>Based on FlowActionsHttpRequest</p>
        <p>
          <button onClick={this.request}>request</button>
          <button onClick={this.request400}>error 400</button>
          <button onClick={this.request999}>error 999</button>
        </p>
        {this.renderResponse()}
        {this.renderError()}
      </div>
    );
  }

  renderResponse() {
    const { isCompleted, response } = this.props.stage;
    if (isCompleted) {
      return (
        <div>
          <p>Response OK</p>
          <p>Status = {response.status}</p>
          <p>Data = {JSON.stringify(response.data)}</p>
        </div>
      );
    }
    return null;
  }

  renderError() {
    const { isFailed, error } = this.props.stage;
    if (isFailed) {
      if (error.response) {
        return (
          <div>
            <p>Response NOK</p>
            <p>Status = {error.response.status}</p>
            <p>Error = {JSON.stringify(error.response.data)}</p>
          </div>
        );
      }
      return (
        <div>
          <p>Response Can´t be Reached</p>
          <p>Fail to request on {error.config.url}</p>
        </div>
      );
    }
    return null;
  }

  request = () => {
    this.props.actions.request();
  };

  request400 = () => {
    this.props.actions.request(400);
  };

  request999 = () => {
    this.props.actions.request(999);
  };
}
```

## Sample

The sample project is available in the source https://github.com/debersonpaula/redux-flow-mapper. Just install dependencies and run with `npm start`.

## License

[MIT](LICENSE)

[img-flowchart]: https://github.com/debersonpaula/redux-flow-mapper/raw/master/docs/flowchart.png

[sample]
:https://github.com/debersonpaula/redux-flow-mapper/tree/master/src
