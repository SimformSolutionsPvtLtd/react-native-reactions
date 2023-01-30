import React, { createRef, useImperativeHandle, useRef, useState } from 'react';
import { Modal } from 'react-native';
import EmojiView from '../EmojiView';
import type { ModalProps, RefProps } from './types';

export const reactionModalRef = createRef<RefProps>();
export const reactionModalPosition = createRef<RefProps>();

const ReactionModal = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const modalProps = useRef<ModalProps>({});
  const [isCardAnimation, setIsCardAnimation] = useState(false);
  const [modalPosition, setModalPosition] = useState<number | undefined>(0);
  const [touchRelease, setTouchRelease] = useState<boolean>(false);

  useImperativeHandle(
    reactionModalRef,
    () => ({
      show: (props: ModalProps) => {
        modalProps.current = {};
        modalProps.current = props;
        setIsVisible(true);
        setIsCardAnimation(true);
        setModalPosition(props.position);
      },
      hide: () => {
        modalProps.current = {};
        setIsVisible(false);
        setIsCardAnimation(false);
      },
    }),
    []
  );
  const onStartShouldSetResponder = () => {
    setIsVisible(false);
    setTimeout(() => {
      modalProps.current = {};
      setIsCardAnimation(false);
      setTouchRelease(false);
    }, 500);
    return true;
  };

  useImperativeHandle(
    reactionModalPosition,
    () => ({
      show: (props: ModalProps) => {
        setTouchRelease(false);
        setModalPosition(props.position);
      },
      hide: () => {
        setTouchRelease(true);
        onStartShouldSetResponder();
      },
    }),
    []
  );

  if (!isCardAnimation) {
    return null;
  }
  return (
    <Modal visible={isCardAnimation} transparent>
      <EmojiView
        position={modalPosition}
        showPopUpCard={isVisible}
        directTouchRelease={touchRelease}
        onEmojiCloseModal={onStartShouldSetResponder}
        onStartShouldSetResponder={onStartShouldSetResponder}
        {...modalProps.current}
      />
    </Modal>
  );
};

export default ReactionModal;
