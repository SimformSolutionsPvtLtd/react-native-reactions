export interface EmojiItemProp {
  // EmojiItemProp object is indexed with a Key it will return a value of any type.
  [key: string]: any;
  id: number;
  emoji: React.ReactNode | string | number;
  title: string;
}

export interface CardProps {
  index: number;
  selectedEmoji?:EmojiItemProp
   setSelectedEmoji?:(e:EmojiItemProp | undefined)=>void
}