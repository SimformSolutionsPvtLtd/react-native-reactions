const mockGestureHandler = jest.requireMock('react-native-gesture-handler');
const mock = jest.requireMock('react-native-reanimated');

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    ...mockGestureHandler,
    PanGestureHandler: View,
  };
});

jest.mock('react-native-reanimated', () => {
  return {
    ...mock,
    useSharedValue: jest.fn,
    useValue: jest.fn,
    event: jest.fn(),
  };
});
