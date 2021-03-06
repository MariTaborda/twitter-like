import React, {FC, useEffect, useState} from 'react'
import {Button, Container, Stack, Switch, Heading, Flex, Spacer, Box, Icon} from '@chakra-ui/react'
import {timer} from 'rxjs'

import {tweets} from "./utils/datasource";
import {ITweetContent} from './types/tweet-content.interface'
import Tweet from './components/tweet/tweet'
import {feedHeadingContainerStyle, feedHeadingStyle, feedHeartIconStyle} from './feed.style';
import {IoHeart, IoHeartOutline} from "react-icons/all";

const Feed: FC = () => {
  const [tweetList, setTweetList] = useState<ITweetContent[]>([])
  const [onlyLiked, setOnlyLiked] = useState(false)

  const shouldKeep = (t: ITweetContent) => {
    return 0 <= t.timestamp - new Date(Date.now() - 30000).getTime()
  }

  const handleTweetLiked = (timestamp: number, content: string) => {
    setTweetList((tweets) => {
      let index = tweets.findIndex(t => t.timestamp === timestamp && t.content === content)
      return [
        ...tweets.slice(0, index),
        {...tweets[index], liked: !tweets[index].liked},
        ...tweets.slice(index + 1)
      ]
    })
  }

  const handleSwitchChange = () => () => {
    setOnlyLiked(!onlyLiked)
  }

  const handleClearButtonClick = () => () => {
    setTweetList([])
  }

  useEffect(() => {
    const subscription = tweets.subscribe(newTweet =>
      setTweetList((oldTweetList) => [newTweet, ...oldTweetList]))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const subscription = timer(1000, 1000).subscribe(() => {
      setTweetList((tweets) => [...tweets.filter(shouldKeep)]
      )
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <Container maxW="xl" centerContent>
      <Flex {...feedHeadingContainerStyle}>
        <Heading {...feedHeadingStyle}>Home</Heading>
        <Spacer />
        <Box>
          <Icon {...feedHeartIconStyle} as={onlyLiked ? IoHeart : IoHeartOutline}/>
          <Switch size="sm" mr={1} onChange={handleSwitchChange()} />
          <Button variant="ghost"
            colorScheme="twitter"
            onClick={handleClearButtonClick()}
            size="sm">Clear</Button>
        </Box>
      </Flex>
      <Stack spacing={2}>
        {tweetList
          .filter(tweet => !onlyLiked || (onlyLiked && tweet.liked))
          .map((tweet) => {
            const {timestamp, content} = tweet
            return (
              <Tweet
                key={timestamp}
                tweet={tweet}
                onTweetLiked={() => handleTweetLiked(timestamp, content)}
              />
            )
          })}
      </Stack>
    </Container>
  )
}

export default Feed
