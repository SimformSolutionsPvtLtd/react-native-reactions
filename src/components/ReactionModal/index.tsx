import React, { createRef, useImperativeHandle, useRef, useState } from 'react';
import { Modal } from 'react-native';
import EmojiView from '../EmojiView';
import type { ModalProps, RefProps } from './types';

export const reactionModalRef = createRef<RefProps>();

const ReactionModal = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const modalProps = useRef<ModalProps>({});
  const [isCardAnimation, setIsCardAnimation] = useState(false);

  useImperativeHandle(
    reactionModalRef,
    () => ({
      show: (props: ModalProps) => {
        modalProps.current = {};
        modalProps.current = props;
        setIsVisible(true);
        setIsCardAnimation(true);
      },
      hide: () => {
        modalProps.current = {};
        setIsVisible(false);
      },
    }),
    []
  );

  const onStartShouldSetResponder = () => {
    setIsVisible(false);
    setTimeout(() => {
      modalProps.current = {};
      setIsCardAnimation(false);
    }, 500);
    return true;
  };

  if (!isCardAnimation) {
    return null;
  }
  return (
    <Modal visible={isCardAnimation} transparent>
      <EmojiView
        showPopUpCard={isVisible}
        onEmojiCloseModal={onStartShouldSetResponder}
        onStartShouldSetResponder={onStartShouldSetResponder}
        {...modalProps.current}
      />
    </Modal>
  );
};

export default ReactionModal;
