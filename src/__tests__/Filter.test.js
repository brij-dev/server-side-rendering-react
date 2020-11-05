import React from 'react';
import renderer from 'react-test-renderer';
import Filter from '../components/Filter';

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

describe('Filter test', () => {
  it('Filter should match snapshot', () => {
    const component = renderer.create(<Filter
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
