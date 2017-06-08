[![](https://scdn.rapidapi.com/RapidAPI_banner.png)](https://rapidapi.com/package/TwitchTV/functions?utm_source=RapidAPIGitHub_TwitchTVFunctions&utm_medium=button&utm_content=RapidAPI_GitHub)

# TwitchTV Package
The Twitch API enables you to develop your own applications using the rich feature set that we provide
* Domain: twitch.tv
* Credentials: clientId, clientSecret

## How to get credentials:
To make an application that uses the Twitch API, you will first need to "Register your application" from the [connections tab](https://www.twitch.tv/settings/connections) of your Twitch settings page. When creating this app, you'll need to enter in your **redirect URI**, which is where users are redirected after having authorized your application.

Once you create a Developer Application, you are assigned a **client id**. Some authentication flows also require a **client secret**. You can generate one on the same page as the client ID. Client IDs are public and can be shared (e.g. embedded in the source of a web page), but client secrets are equivalent to a password for your application and must be kept confidential.

Your client secret is like a password and we can't show it to you once you leave the page, so make sure to record it somewhere safe. Additionally, generating a new client secret will immediately invalidate the current one, which might make your API requests fail until your app is updated.

When authenticating on behalf of a user, you'll be granted an **access token** that uniquely identifies to us your client and the user. There are a few ways to obtain access tokens, which are described below. An access token has an associated list of scopes that determine what permissions you are allowed on behalf of the authorized Twitch user.

1. Direct user to https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=[`clientId`]&redirect_uri=[`redirectUri`]&scope=[`scope`]&state=`state`
2. If the user accepts, they will be redirected back to https://[your registered redirect URI]/?code=[CODE]
3. Use getAccessToken method to get users's `accessToken`.

You can also generate an access token using this [OAuth Generator](https://rapidoauth.com/twitch)

### Scopes

Example: ...&redirect_uri=[`redirectUri`]&scope=`user_read+user_blocks_edit+channel_stream+channel_feed_edit`

+ `user_read`: Read access to non-public user information, such as email address.
+ `user_blocks_edit`: Ability to ignore or unignore on behalf of a user.
+ `user_blocks_read`: Read access to a user's list of ignored users.
+ `user_follows_edit`: Access to manage a user's followed channels.
+ `channel_read`: Read access to non-public channel information, including email address and stream key.
+ `channel_editor`: Write access to channel metadata (game, status, etc).
+ `channel_commercial`: Access to trigger commercials on channel.
+ `channel_stream`: Ability to reset a channel's stream key.
+ `channel_subscriptions`: Read access to all subscribers to your channel.
+ `user_subscriptions`: Read access to subscriptions of a user.
+ `channel_check_subscription`: Read access to check if a user is subscribed to your channel.
+ `chat_login`: Ability to log into chat and send messages.
+ `channel_feed_read`: Ability to view to a channel feed.
+ `channel_feed_edit`: Ability to add posts and reactions to a channel feed.

Read more about Twitch Authentication: https://github.com/justintv/Twitch-API/blob/master/authentication.md

## Custom datatypes:
 |Datatype|Description|Example
 |--------|-----------|----------
 |Datepicker|String which includes date and time|```2016-05-28 00:00:00```
 |Map|String which includes latitude and longitude coma separated|```50.37, 26.56```
 |List|Simple array|```["123", "sample"]```
 |Select|String with predefined values|```sample```
 |Array|Array of objects|```[{"Second name":"123","Age":"12","Photo":"sdf","Draft":"sdfsdf"},{"name":"adi","Second name":"bla","Age":"4","Photo":"asfserwe","Draft":"sdfsdf"}] ```


## TwitchTV.getAccessToken
Getting access tokens

| Field       | Type       | Description
|-------------|------------|----------
| clientId    | credentials| Required: Application client id
| clientSecret| credentials| Required: Application client secret key
| code        | String     | Required: The authorization code
| redirectUri | String     | Required: Application redirect url
| state       | String     | Your provided unique token

## TwitchTV.getBlocklist
Get user's block list.
Authenticated, required scope: `user_blocks_read`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| user       | String     | Required: Valid username
| limit      | Number     | Maximum number of objects in array. Default is 25. Maximum is 100
| offset     | Number     | Object offset for pagination. Default is 0

## TwitchTV.addToBlockList
Add target to user's block list.
Authenticated, required scope: `user_blocks_edit`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| user       | String     | Required: The authenticated user
| target     | String     | Required: User to be blocked

## TwitchTV.deleteFromBlockList
Delete target from user's block list.
Authenticated, required scope: `user_blocks_edit`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| user       | String     | Required: The authenticated user
| target     | String     | Required: User to be unblocked

## TwitchTV.getChannel
Get channel object

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| channel | String     | Required: Channel to retrieve

## TwitchTV.getUsersChannel
Returns a channel object of authenticated user.
Authenticated, required scope: `channel_read`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token

## TwitchTV.getChannelVideos
Get channel's list of videos

| Field     | Type       | Description
|-----------|------------|----------
| clientId  | credentials| Required: Application client id
| channel   | String     | Required: Channel to video retrieve from
| limit     | Number     | Maximum number of objects in array. Default is 10. Maximum is 100
| offset    | Number     | Object offset for pagination. Default is 0
| broadcasts| Boolean    | Returns only broadcasts when `true`. Otherwise only highlights are returned. Default is `false`
| hls       | Boolean    | Returns only HLS VoDs when `true`. Otherwise only non-HLS VoDs are returned. Default is `false`

## TwitchTV.getChannelFollowingUsers
Get channel's list of following users

| Field    | Type       | Description
|----------|------------|----------
| clientId | credentials| Required: Application client id
| channel  | String     | Required: Channel to follows retrieve for
| limit    | Number     | Maximum number of objects in array. Default is 25. Maximum is 100
| offset   | Number     | (deprecated) Object offset for pagination. Default is 0. Maximum is 1600
| cursor   | String     | Twitch uses cursoring to paginate long lists of followers. Check _cursor in response body and set cursor to this value to get the next page of results, or use _links.next to navigate to the next page of results
| direction| Select     | Creation date sorting direction. Default is `desc`. Valid values are asc and `desc`

## TwitchTV.getChannelEditors
Get channel's list of editors.
Authenticated, required scope: `channel_read`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to retrieve editors for

## TwitchTV.updateChannel
Update channel object.
Authenticated, required scope: `channel_editor`

| Field             | Type       | Description
|-------------------|------------|----------
| clientId          | credentials| Required: Application client id
| accessToken       | String     | Required: OAuth Access Token
| channel           | String     | Required: Channel to update
| status            | String     | Channel's title
| game              | String     | Game category to be classified as
| delay             | String     | Channel delay in seconds. Requires the channel owner's OAuth token
| channelFeedEnabled| Boolean    | Whether the channel's feed is enabled. Requires the channel owner's OAuth token

## TwitchTV.resetChannelStreamKey
Reset channel's stream key.
Authenticated, required scope: `channel_stream`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to reset stream key for

## TwitchTV.startCommercialOnChannel
Start a commercial on channel.
Authenticated, required scope: `channel_commercial`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to start commercial for
| length     | Select     | Length of commercial break in seconds. Default value is 30. Valid values are 30, 60, 90, 120, 150, and 180. You can only trigger a commercial once every 8 minutes

## TwitchTV.getChannelTeams
Get list of teams channel belongs to

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to list teams for

## TwitchTV.getChannelFeedPosts
Get channel feed posts.
Authenticated, optional scope: channel_feed_read

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to list posts from
| limit      | Number     | Maximum number of objects in array. Default is 10. Maximum is 100
| cursor     | String     | Cursor value to begin next page

## TwitchTV.createPost
Create post.
Authenticated, required scope: `channel_feed_edit`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to create feed post for
| content    | String     | Required: Content of the post
| share      | Boolean    | When set to true, shares the post, with a link to the post URL, on the channel's Twitter if it's connected

## TwitchTV.getPost
Get channel feed posts.
Authenticated, optional scope: channel_feed_read

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to retrieve post from
| id         | String     | Required: Post id to retrieve

## TwitchTV.deletePost
Delete post.
Authenticated, required scope: `channel_feed_edit`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to delete post from
| id         | String     | Required: Post id to delete

## TwitchTV.createReactionToPost
Create reaction to post.
Authenticated, required scope: `channel_feed_edit`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to create post reaction for
| id         | String     | Required: Post id to add reaction for
| emoteId    | String     | Required: Single emote id (ex: `25` => Kappa) or the string `endorse`

## TwitchTV.deleteReaction
Delete reaction.
Authenticated, required scope: `channel_feed_edit`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to delete post reaction for
| id         | String     | Required: Post id to delete reaction for
| emoteId    | String     | Required: Single emote id (ex: `25` => Kappa) or the string `endorse`

## TwitchTV.getChatLinks
Returns a links object to all other chat endpoints

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| channel | String     | Required: Channel to retrive chant links for

## TwitchTV.getChannelChatBadges
Get chat badges for channel

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| channel | String     | Required: Channel to list badges for

## TwitchTV.getAllEmoticon
Returns a list of all emoticon objects for Twitch

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id

## TwitchTV.getEmoticons
Get list of emoticons

| Field    | Type       | Description
|----------|------------|----------
| clientId | credentials| Required: Application client id
| emotesets| String     | Emotes from a comma separated list of emote sets

## TwitchTV.getUserFollowedChannels
Get a user's list of followed channels

| Field    | Type       | Description
|----------|------------|----------
| clientId | credentials| Required: Application client id
| user     | String     | Required: User to retrieve follows for
| limit    | String     | Maximum number of objects in array. Default is 25. Maximum is 100
| offset   | String     | (deprecated) Object offset for pagination. Default is 0. Maximum is 1600
| sortby   | Select     | Sort key. Default is `created_at`. Valid values are `created_at`, `last_broadcast`, and `login`
| direction| Select     | Creation date sorting direction. Default is `desc`. Valid values are `asc` and `desc`

## TwitchTV.checkFollowing
Get status of follow relationship between user and target channel

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| user    | String     | Required: User to check following on `target`
| target  | String     | Required: Channel to check following for

## TwitchTV.followChannel
Follow a channel.
Authenticated, required scope: `user_follows_edit`

| Field        | Type       | Description
|--------------|------------|----------
| clientId     | credentials| Required: Application client id
| accessToken  | String     | Required: OAuth Access Token
| user         | String     | Required: Authenticated user's name
| target       | String     | Required: The name of the channel to be followed
| notifications| Boolean    | Whether :user should receive email/push notifications (depending on their notification settings) when :target goes live. Default is false

## TwitchTV.unfollowChannel
Unfollow a channel.
Authenticated, required scope: `user_follows_edit`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| user       | String     | Required: Authenticated user's name
| target     | String     | Required: The name of the channel to be unfollowed

## TwitchTV.getUserFollowingStreams
Get a list of streams user is following.
Authenticated, required scope: `user_read`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| limit      | Number     | Maximum number of objects in array. Default is 25. Maximum is 100
| offset     | Number     | Object offset for pagination. Default is 0
| streamType | Select     | Only shows streams from a certain type. Permitted values: `all`, `playlist`, `live`

## TwitchTV.getGamesByViewers
Returns a list of games objects sorted by number of current viewers on Twitch, most popular first

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| limit   | String     | Maximum number of objects in array. Default is 10. Maximum is 100
| offset  | String     | Object offset for pagination. Default is 0

## TwitchTV.getIngests
Get list of ingests

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | OAuth Access Token

## TwitchTV.getInformation
Get top level links object and authorization status

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | OAuth Access Token

## TwitchTV.findChannels
Returns a list of channel objects matching the search query

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| query   | String     | Required: A search query
| limit   | Number     | Maximum number of objects in array. Default is 25. Maximum is 100
| offset  | Number     | Object offset for pagination. Default is 0

## TwitchTV.findStreams
Returns a list of stream objects matching the search query

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| query   | String     | Required: A search query
| limit   | Number     | Maximum number of objects in array. Default is 25. Maximum is 100
| offset  | Number     | Object offset for pagination. Default is 0
| hls     | Boolean    | If set to `true`, only returns streams using HLS. If set to `false`, only returns streams that are non-HLS

## TwitchTV.findGames
Returns a list of game objects matching the search query

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| query   | String     | Required: A url-encoded search query
| type    | String     | Suggests a list of games similar to query, e.g. 'star' query might suggest 'StarCraft II: Wings of Liberty'
| live    | Boolean    | If true, only returns games that are live on at least one channel

## TwitchTV.getSingleStream
Returns a stream object if live

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| channel | String     | Required: Channel name

## TwitchTV.getStreams
List streams

| Field     | Type       | Description
|-----------|------------|----------
| clientId  | credentials| Required: Application client id
| game      | String     | Streams categorized under game
| channel   | String     | Streams from a comma separated list of channels
| limit     | String     | Maximum number of objects in array. Default is 25. Maximum is 100
| offset    | String     | Object offset for pagination. Default is 0
| streamType| Select     | Only shows streams from a certain type. Permitted values: `all`, `playlist`, `live`
| language  | String     | Only shows streams of a certain language. Permitted values are locale ID strings, e.g. `en`, `fi`, `es-mx`

## TwitchTV.getFeaturedStreams
Get a list of featured streams

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| limit   | String     | Maximum number of objects in array. Default is 25. Maximum is 100
| offset  | String     | Object offset for pagination. Default is 0

## TwitchTV.getStreamsSummary
Get a summary of streams

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| game    | String     | Only show stats for the set game

## TwitchTV.getChannelSubscriptions
Get list of users subscribed to channel.
Authenticated, required scope: `channel_subscriptions`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to list subscriptions for
| limit      | String     | Maximum number of objects in array. Default is 25. Maximum is 100
| offset     | String     | Object offset for pagination. Default is 0
| direction  | Select     | Creation date sorting direction. Default is asc. Valid values are asc and desc

## TwitchTV.checkUserSubscribed
Check if channel has user subscribed.
Authenticated, required scope: `channel_check_subscription`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| channel    | String     | Required: Channel to check subscription
| user       | String     | Required: User to check subscription

## TwitchTV.getUserSubscribedChannels
Check if user subscribes to channel.
Authenticated, required scope: `user_subscriptions`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| user       | String     | Required: User Name
| channel    | String     | Required: Channel Name

## TwitchTV.getTeams
Get list of active team objects

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| limit   | Number     | Maximum number of objects in array. Default is 25. Maximum is 100
| offset  | Number     | Object offset for pagination. Default is 0

## TwitchTV.getSingleTeam
Get team object

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| team    | String     | Required: Team name to retrieve

## TwitchTV.getUser
Returns a user object

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| user    | String     | Required: User name to retrieve

## TwitchTV.getSelf
Returns a authenticated user.
Authenticated, required scope: `user_read`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token

## TwitchTV.getUserEmotes
Get list of user's emotes.
Authenticated, required scope: `user_subscriptions`

| Field      | Type       | Description
|------------|------------|----------
| clientId   | credentials| Required: Application client id
| accessToken| String     | Required: OAuth Access Token
| user       | String     | Required: User name

## TwitchTV.getUserFollowingChannelsVideos
Get list of videos belonging to channels user is following.
Authenticated, required scope: `user_read`

| Field        | Type       | Description
|--------------|------------|----------
| clientId     | credentials| Required: Application client id
| accessToken  | String     | Required: OAuth Access Token
| limit        | String     | Maximum number of objects in array. Default is 10. Maximum is 100
| offset       | String     | Object offset for pagination. Default is 0
| broadcastType| Select     | Only shows videos of a certain type. Supported values: `all`, `archive`, `highlight`. Default: `all`

## TwitchTV.getVideo
Get video object

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| id      | String     | Required: Video id to retrieve

## TwitchTV.getTopVideos
Get top videos by number of views

| Field   | Type       | Description
|---------|------------|----------
| clientId| credentials| Required: Application client id
| limit   | String     | Maximum number of objects in array. Default is 10. Maximum is 100
| offset  | String     | Object offset for pagination. Default is 0
| game    | String     | Returns only videos from game
| period  | Select     | Returns only videos created in time period. Valid values are week, month, or all. Default is week
