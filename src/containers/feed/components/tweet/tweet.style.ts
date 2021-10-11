export const tweetContainerStyle = {
  bg: 'cyan.50',
  borderWidth: 0.5,
  p: 4,
}

export const tweetAccountStyle = {
  fontWeight: 'bold',
  mr: 1,
}

export const tweetDateStyle = {
  color: 'gray.600',
  fontSize: '14px',
}

export const tweetEmptyHeartIconStyle = {
  bg: 'cyan.50',
  _hover: {
    bg: 'cyan.50',
    color: 'pink.500',
  }
}

export const tweetHeartIconStyle = {
  ...tweetEmptyHeartIconStyle,
  color: 'pink.500',
}