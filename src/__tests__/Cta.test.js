import React from 'react';
import renderer from 'react-test-renderer';
import Cta from '../components/Cta';

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

describe('Cta test', () => {
  it('Cta should match snapshot', () => {
    const component = renderer.create(<Cta
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
