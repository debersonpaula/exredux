# 2.0.0 - Main changes (previous release 1.X)

## Overview

This release 2.X removed all __Redux__ package from the core and use _React_ contexts to handle state management.

## Model
The decorator _Model_ was removed and is no longer needed to associate models.

Previous release (1.X):
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

New release (2.X):
```ts
import { Action } from 'exredux';

export class CounterModel {
  counter = 0;

  @Action add() {
    this.counter += 1;
  }
}
```

## ModelStore

The instatiator class _ModelStore_ was removed and is no longer needed to create instance of store.

Previous release (1.X):
```ts
import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';
import { ListDataModel } from './listdata/ListDataModel';

export const appModels = new ModelStore({
  devExtension: true, // enables redux-dev-extension for chrome
  models: [CounterModel, ListDataModel],
});
```

New release (2.X):
```ts
import { ModelStore } from 'exredux';
import { CounterModel } from './counter/CounterModel';
import { ListDataModel } from './listdata/ListDataModel';

export const appModels = [CounterModel, ListDataModel];
```

## Connection

The _Connection_ decorate no longer needs a model store and have one parameter to indicate the props to inject.

Previous release (1.X):
```tsx
import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { appModels } from '../AppModels';
import { CounterModel } from './CounterModel';

class ModelProps {
  // Inject the model into property
  @Inject counterModel?: CounterModel;
}

// make connection between state and component
@Connection({
  modelStore: appModels, // <-- model store location
  props: ModelProps, // <-- props with model injection
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

New release (2.X):
```tsx
import * as React from 'react';
import { Connection, Inject } from 'exredux';
import { appModels } from '../AppModels';
import { CounterModel } from './CounterModel';

class ModelProps {
  // Inject the model into property
  @Inject counterModel?: CounterModel;
}

// make connection between state and component
@Connection(ModelProps)
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

## Events

Events are no longer available and was replaced by _Trigger_

Previous release (1.X):
```tsx
import { Model, Action, Event } from 'exredux';

@Model
export class CounterModel {
  counter = 0;
  lastAction = '';

  @Action add() {
    this.counter += 1;
  }

  @Action del() {
    this.counter -= 1;
  }

  @Event('add')
  lastActionAdd() {
    this.lastAction = 'add';
  }

  @Event('del')
  lastActionDel() {
    this.lastAction = 'del';
  }
}
```

New release (2.X):
```tsx
import { Action, Event } from 'exredux';

export class CounterModel {
  counter = 0;
  lastAction = '';

  @Action add() {
    this.counter += 1;
  }

  @Action del() {
    this.counter -= 1;
  }

  @Trigger('add')
  lastActionAdd() {
    this.lastAction = 'add';
  }

  @Trigger('del')
  lastActionDel() {
    this.lastAction = 'del';
  }
}
```

## Triggers

Change order of params

Previous release (1.X):
```tsx
import { Model, Inject, Trigger } from 'exredux';
import { CounterModel } from '../counter/CounterModel';

@Model
export class EventsModel {
  message: string;

  // dependency from another model
  @Inject counterModel: CounterModel;

  @Trigger(CounterModel, 'add') checkAddCounter() {
    this.message = `Counter updated to = ${this.counterModel.counter}`;
  }
}
```
New release (2.X):
```tsx
import { Inject, Trigger } from 'exredux';
import { CounterModel } from '../counter/CounterModel';

export class EventsModel {
  message: string;

  // dependency from another model
  @Inject counterModel: CounterModel;

  @Trigger('add', CounterModel) checkAddCounter() {
    this.message = `Counter updated to = ${this.counterModel.counter}`;
  }
}
```

## Provider

Does not require the store. Instead, pass an array of models instead.
It will be instatiated inside Provider and deployed to the application thru Context consumers.

Previous release (1.X):
```tsx
import * as React from 'react';

import { appModels } from './AppModels';
import { Counter } from './counter/Counter';
import { Provider } from 'exredux';

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
New release (2.X):
```tsx
import * as React from 'react';

import { appModels } from './AppModels';
import { Counter } from './counter/Counter';
import { Provider } from 'exredux';

export class Sample extends React.Component {
  public render() {
    return (
      <Provider models={appModels}>
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


# 1.0.0 - Main changes (previous release 0.X)

## Props Injection

The _Inject_ decorator does not requires ClassType as parameter.

Before, was used with parameter of ClassType:
```tsx
class ModelProps {
  @Inject(CounterModel) counterModel: CounterModel;
}
```

Now, it must be call directly without parameter:
```tsx
class ModelProps {
  @Inject counterModel: CounterModel;
}
```

## Dependencies

The _Dependency_ decorate was changed to _Inject_.

Before:
```tsx
@Dependency(CounterModel) counterModel: CounterModel;
```

After:
```tsx
@Inject counterModel: CounterModel;
```

## Trigger

The _ActionListener_ decorator was changed to _Trigger_ and acceps the ClassType instead a string.

Before:
```tsx
@ActionListener('CounterModel', 'add')
  eventAfterCounterAdd() {
    ...
  }
```

After:
```tsx
@Trigger(CounterModel, 'add')
  eventAfterCounterAdd() {
    ...
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