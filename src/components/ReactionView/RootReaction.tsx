import React from 'react';
import ReactionView from './ReactionView';
import ReactionViewModal from './ReactionViewModal';
import type { ReactionViewProps } from './types';
import { GlobalConstants } from '../../constants';

const RootReaction = (props: ReactionViewProps) => {
  const { type } = props;
  return type === GlobalConstants.modal ? (
    <ReactionViewModal {...props} />
  ) : (
    <ReactionView {...props} />
  );
};

export default RootReaction;
