import React from 'react';
import renderer from 'react-test-renderer';
import LaunchYearFilter from '../components/LaunchYearFilter';

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

describe('LaunchYearFilter test', () => {
  it('LaunchYearFilter should match snapshot', () => {
    const component = renderer.create(<LaunchYearFilter
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
