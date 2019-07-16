import * as React from 'react';
import { mount } from 'enzyme';
import { ModelStore, Provider } from 'exredux';
import { Promised } from '../promised/Promised';
import { PromisedModel } from '../promised/PromisedModel';
import { PromisedHttpModel } from '../promised/PromisedHttpModel';

describe('Promised', () => {
  const appModels = new ModelStore({
    devExtension: true,
    models: [PromisedModel, PromisedHttpModel]
  });

  // -------------------------------------------------------
  it('checking Promised component is in loading state', () => {
    // PREPARE
    const model = appModels.modelByClass(PromisedModel);
    model.isLoading = true;

    // ACT
    const wrapper = mount(
      <Provider modelStore={appModels}>
        <Promised />
      </Provider>
    );

    // ASSERT
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.contains('Promise Loading...')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
  // -------------------------------------------------------
  it('simulate done click', done => {
    // PREPARE
    const model = appModels.modelByClass(PromisedModel);
    model.reset();

    // ACT
    const wrapper = mount(
      <Provider modelStore={appModels}>
        <Promised />
      </Provider>
    );
    const button = wrapper.find('#promise-done');
    button.simulate('click');

    // ASSERT
    model.responseAsync.subscribe(res => {
      wrapper.update();
      setImmediate(() => {
        expect(res).toEqual('test inserted from PromisedComponent');
        expect(wrapper.find('#promise-done-result').length).toEqual(1);
        expect(wrapper.find('#promise-done-result').text()).toEqual(
          'From Promise model => test inserted from PromisedComponent'
        );
        done();
      });
    });
  });
  // -------------------------------------------------------
  it('simulate fail click', done => {
    // PREPARE
    const model = appModels.modelByClass(PromisedModel);
    model.reset();

    // ACT
    const wrapper = mount(
      <Provider modelStore={appModels}>
        <Promised />
      </Provider>
    );
    const button = wrapper.find('#promise-fail');
    button.simulate('click');

    // ASSERT
    model.errorAsync.subscribe(res => {
      wrapper.update();
      setImmediate(() => {
        expect(res).toEqual('error test inserted from PromisedComponent');
        expect(wrapper.find('#promise-fail-result').length).toEqual(1);
        expect(wrapper.find('#promise-fail-result').text()).toEqual(
          'Error From Promise model => error test inserted from PromisedComponent'
        );
        done();
      });
    });
  });
  // -------------------------------------------------------
});
