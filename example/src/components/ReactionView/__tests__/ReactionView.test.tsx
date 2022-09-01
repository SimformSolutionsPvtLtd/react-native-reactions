import React from 'react';
import { render } from '@testing-library/react-native';
import ReactionView from '../ReactionView';

jest.useFakeTimers();

describe('ReactionsView component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(<ReactionView items={[]} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
