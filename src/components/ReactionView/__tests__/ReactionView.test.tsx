import React from 'react';
import { render } from '@testing-library/react-native';
import ReactionView from '../ReactionView';

jest.useFakeTimers();

describe('ReactionView component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<ReactionView items={[]} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
