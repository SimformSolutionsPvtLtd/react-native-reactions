const mockGestureHandler = jest.requireMock('react-native-gesture-handler');
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return { ...mockGestureHandler, PanGestureHandler: View };
});
