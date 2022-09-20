import type { FlatListProps } from 'react-native';

type ScrollToIndex = { index: number; animated?: boolean };
export type ReactionFlatlistRefProps = {
  getCurrentIndex: () => number;
  getPrevIndex: () => number;
  scrollToIndex: (item: ScrollToIndex) => void;
  goToLastIndex: () => void;
  goToFirstIndex: () => void;
};

export type ReactionFlatlistProps<T> = Partial<FlatListProps<T>> & {
  /**
   * Takes an item from data and renders it into the list
   * not required if children is used
   *
   */
  renderItem: FlatListProps<T>['renderItem'];
  /**
   * Data to use in renderItem
   * not required if children is used
   *
   */
  data: T[];
};

export type CellRenderprops = {
  index: number;
  children: React.ReactNode;
};
