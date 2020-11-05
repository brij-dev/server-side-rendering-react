import React from 'react';
import renderer from 'react-test-renderer';
import CardView from '../components/CardView';

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

describe('CardView test', () => {
  it('CardView should match snapshot', () => {
    const component = renderer.create(<CardView
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
