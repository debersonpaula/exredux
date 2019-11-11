import * as React from 'react';
import { mount } from 'enzyme';
import { Counter } from '../counter/Counter';

import { ModelStore, Provider } from 'exredux';
import { CounterModel } from '../counter/CounterModel';

describe('Counter', () => {
  const appModels = new ModelStore({
    devExtension: true,
    models: [CounterModel]
  });

  // -------------------------------------------------------
  it('should render with content', () => {
    // PREPARE
    const model = appModels.modelByClass(CounterModel);
    model.add(); // increase counter to 1
    model.add(); // increase counter to 2
    model.add(); // increase counter to 3
    model.del(); // decrease counter to 2

    // ACT
    const wrapper = mount(
      <Provider modelStore={appModels}>
        <Counter />
      </Provider>
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#counter-result').text()).toEqual('Counter = 2');
    expect(wrapper.find('#action-result').text()).toEqual('Last Action = del');
  });
  // -------------------------------------------------------
  it('should render with model changed manually', () => {
    // PREPARE
    const model = appModels.modelByClass(CounterModel);
    model.counter = 7;
    appModels.forceUpdate(CounterModel);    

    // ACT
    const wrapper = mount(
      <Provider modelStore={appModels}>
        <Counter />
      </Provider>
    );

    // ASSERT
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#counter-result').text()).toEqual('Counter = 7');
  });
  // -------------------------------------------------------
});