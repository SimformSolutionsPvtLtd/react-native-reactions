import React from 'react';
import { FlatList, View } from 'react-native';
import type { CellRenderprops, ReactionFlatlistProps } from './types';

const CellRender = ({ index, children }: CellRenderprops) => (
  <View style={{ zIndex: -index }}>{children}</View>
);

export const ReactionFlatlist = React.forwardRef(
  (
    { data = [], ...props }: ReactionFlatlistProps<FlatList>,
    ref: React.Ref<FlatList>
  ) => {
    return (
      <FlatList
        ref={ref}
        data={data}
        CellRendererComponent={CellRender}
        {...props}
      />
    );
  }
);
