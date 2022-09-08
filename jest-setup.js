const mockGestureHandler = jest.requireMock('react-native-gesture-handler');

jest.mock('react-native-gesture-handler', () => {
  return {
    ...mockGestureHandler,

    useAnimatedGestureHandler: {},
  };
});
