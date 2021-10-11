import React, {FC} from 'react'
import {Box, Flex, Icon, IconButton, Text} from '@chakra-ui/react'
import {IoHeart, IoHeartOutline} from 'react-icons/all'

import {ITweetContent} from '../../types/tweet-content.interface'
import {tweetAccountStyle, tweetContainerStyle, tweetDateStyle, tweetHeartIconStyle} from './tweet.style'
import {DATE_FORMAT, formatDate} from '../../../../shared/utils/date'

export interface ITweetProps {
  tweet: ITweetContent
  onTweetLiked: () => void
}


const Tweet: FC<ITweetProps> = ({tweet, onTweetLiked}) => {
  const {account, timestamp, content, liked} = tweet

  const handleClick = () => {
    console.log('click')
    onTweetLiked()
  }

  return (
    <Box {...tweetContainerStyle}>
      <Flex>
        <Text {...tweetAccountStyle}>{account}</Text>
        <Text {...tweetDateStyle}>{`· ${formatDate(new Date(timestamp), DATE_FORMAT.tweet)}`}</Text>
      </Flex>
      <Text>{content}</Text>
      <IconButton
        aria-label="Like button"
        onClick={handleClick}
        icon={<Icon as={liked ? IoHeart : IoHeartOutline}/>} {...tweetHeartIconStyle}/>
    </Box>
  )
}

export default Tweet