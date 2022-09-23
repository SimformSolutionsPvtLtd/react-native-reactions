export interface ModalProps {
  x?: number;
  y?: number;
  contentHeight?: number;
  width?: number;
}

export interface RefProps {
  show: (props: ModalProps) => void;
  hide: () => void;
}
