import React from 'react';
import renderer from 'react-test-renderer';
import FilterCta from '../components/FilterCta';

function mockFunction() {
  const original = require.requireActual('react-router-dom');
  return {
    ...original,
    useLocation: jest.fn().mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null
    }),
  };
}

jest.mock('react-router-dom', () => mockFunction());

describe('FilterCta test', () => {
  it('FilterCta should match snapshot', () => {
    const component = renderer.create(<FilterCta
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
