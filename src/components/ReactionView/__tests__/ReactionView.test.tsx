import React from 'react';
import { render } from '@testing-library/react-native';
import ReactionView from '../ReactionView';
import { Text } from 'react-native';

jest.useFakeTimers();

describe('ReactionView component', () => {
  it('Match Snapshot', () => {
    const { toJSON } = render(
      <ReactionView items={[]}>
        <Text>Emoji Text</Text>
      </ReactionView>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
