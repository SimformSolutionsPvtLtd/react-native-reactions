import React, { memo, useEffect } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { moderateScale, verticalScale } from '../../theme';
import { isValidUrl } from '../../utils';
import EmojiImage from '../EmojiImage';
import type { EmojiItemProp } from '../ReactionView/types';
import { useEmojiItem } from './hooks';
import styles from './styles';
import type { emojiData, EmojiItemProps } from './types';

const EmojiButton = ({
  emojiData,
  emojiStyle,
  emojiKey = 'emoji',
  iconSize = 28,
}: emojiData) => {
  const emoji = emojiData?.[emojiKey];
  const isNumber: boolean = typeof emoji === 'number';
  const isValidEmement = React.isValidElement(emoji);
  const emojiElementStyle = StyleSheet.flatten([
    { fontSize: moderateScale(iconSize) },
    emojiStyle,
    emoji?.props?.style ?? {},
  ]);

  if (isValidEmement) {
    return React.cloneElement(emoji as React.ReactElement, {
      style: emojiElementStyle,
    });
  } else if (isValidUrl(emoji as string) || isNumber) {
    return (
      <EmojiImage
        {...{ emojiElementStyle, iconSize }}
        source={isNumber ? (emoji as number) : { uri: emoji as string }}
      />
    );
  } else {
    return <Text style={[styles.emojiText, emojiElementStyle]}>{emoji}</Text>;
  }
};

const EmojiItem = (props: EmojiItemProps) => {
  const {
    data,
    onPress,
    titleStyle,
    titleBoxStyle,
    emojiContainerStyle,
    showTopEmojiCard,
    emojiKey,
    emojiStyle,
    iconSize,
    isTouchRelease,
    isModal = true,
    setShowPopUpCard = () => {},
    onTap = () => {},
    loaded,
    onEmojiCloseModal = () => {},
    setTouchRelease = () => {},
  } = props;

  const {
    titlePosition,
    onLayout,
    scaled,
    childref,
    emojiAnimatedScaled,
    wavedEmoji,
  } = useEmojiItem(props);

  const labelStyle = StyleSheet.flatten([
    styles.titleBox,
    {
      transform: [
        { scale: scaled ? 1.0 : 0 },
        { translateX: titlePosition },
        { perspective: 1000 },
      ],
      opacity: scaled ? 1.0 : 0,
      top: showTopEmojiCard ? verticalScale(-30) : verticalScale(70),
    },
    titleBoxStyle,
  ]);

  useEffect(() => {
    const getEmoji: EmojiItemProp | null = scaled ? data : null;
    isTouchRelease && (isModal ? onEmojiCloseModal() : setShowPopUpCard(false));

    return () => {
      isTouchRelease && getEmoji && onTap(getEmoji);
      setTouchRelease(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, scaled, isTouchRelease]);

  return (
    <>
      {scaled && data?.title && (
        <Animated.View style={labelStyle}>
          <Text style={[styles.title, titleStyle]}>{data?.title}</Text>
        </Animated.View>
      )}
      <Pressable
        ref={childref}
        onPress={onPress}
        style={[styles.root, emojiContainerStyle]}
        onLayout={onLayout}>
        <Animated.View style={loaded ? emojiAnimatedScaled : wavedEmoji}>
          <EmojiButton
            emojiData={data}
            {...{ emojiStyle, emojiKey, iconSize }}
          />
        </Animated.View>
      </Pressable>
    </>
  );
};

export default memo(EmojiItem);
