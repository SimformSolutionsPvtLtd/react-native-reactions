export interface ReactionViewProps {
  children?: React.ReactNode;
  items?: EmojiItem[];
}

export interface EmojiItem {
  id: number;
  emoji: React.ReactNode;
  title: string;
}
