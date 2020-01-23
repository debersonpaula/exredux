import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Counter } from '../counter/Counter';

import { Provider } from 'exredux';
import { CounterModel } from '../counter/CounterModel';

describe('Counter', () => {
  const models = [CounterModel];
  let wrapper: ReactWrapper;
  // -------------------------------------------------------
  beforeAll(() => {
    wrapper = mount(
      <Provider models={models}>
        <Counter />
      </Provider>
    );
  });
  // -------------------------------------------------------
  afterAll(() => {
    wrapper.unmount();
  });
  // -------------------------------------------------------
  it('should increase three times', () => {
    // PREPARE
    const counterAdd = wrapper.find('#counter-add').first();

    // ACT
    counterAdd.simulate('click');
    counterAdd.simulate('click');
    counterAdd.simulate('click');

    // ASSERT
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#counter-result').text()).toEqual('Counter = 3');
    expect(wrapper.find('#action-result').text()).toEqual('Last Action = add');
  });
  // -------------------------------------------------------
  it('should decrease two times', () => {
    // PREPARE
    const counterDel = wrapper.find('#counter-del').first();

    // ACT
    counterDel.simulate('click');
    counterDel.simulate('click');

    // ASSERT
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#counter-result').text()).toEqual('Counter = 1');
    expect(wrapper.find('#action-result').text()).toEqual('Last Action = del');
  });
  // -------------------------------------------------------
});
