import React from 'react';
import ReactionModal from '../ReactionModal';
import type { reactionProviderProps } from './types';

export const ReactionProvider = ({ children }: reactionProviderProps) => {
  return (
    <>
      <ReactionModal />
      {children}
    </>
  );
};
