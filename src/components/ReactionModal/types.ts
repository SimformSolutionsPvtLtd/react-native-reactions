export interface ModalProps {
  x?: number;
  y?: number;
  contentHeight?: number;
  width?: number;
  emojiSize?: number;
  directTouchRelease?: boolean;
  directTouchLoad?: boolean;
  position?: number;
  panResponder?: any;
}

export interface RefProps {
  show: (props: ModalProps) => void;
  hide: () => void;
  sendUpdatedValues: (props: Partial<ModalProps>) => void;
}
