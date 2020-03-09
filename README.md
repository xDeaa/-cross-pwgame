## Hello, Gamer

## <a name='TOC'>🐼 Summary</a>

* [Rules](#rules)
* [Overview](#overview)
* [Story](#story)
* [Postlude](#postlude)
* [Bonus](#bonus)
* [Credits](#credits)

## <a name='overview'>🦊 Rules</a>

Hi, here are some rules to carry out this story oav;

* You **MUST** create a git repository named `cross-pwgame`
* You **MUST** create a file called `.author.json` with your fullname

```sh
~/cross-pwgame ❯❯❯ cat -e .author.json
{
  "fullname" : "Ken Thompson"
}$
```

> Of course, you can talk about the subject with other developers, peer-learning is
> the key to be a better developer. Don't hesitate to ask questions or help people on slack.

> Don't forget, there is no useless question :-)

* You **MUST** return the project on Friday March, 13 at 11:42 pm by sending an MP on slack with the link of your github repo.

## <a name='overview'>🐱 Overview</a>

This project is about realtime gameS and **HAVE TO** be a **PWA**;<br />

You **HAVE TO** use at least one **PWA** native features: `offline`, `notifications`, etc.

You **CAN** use any ui.x libraries you want [ if interested, you can even create your own ]<br />
You **CAN** use any front-end libraries you want but the back-end has to be written in Typescript with Node.js

## <a name='story'>🐨 Story</a>

### = Prelude

Bootstrap a realtime server using express and socket.io [ back + front ]<br />
First, you **HAVE TO** ask the user his nickname and start any game when 2 connected players are ready.

### = MagicNumber

Create a multiplayer game where the goal is to find a number as quickly as possible

#### How ?

You **HAVE TO** generate a random number between 0 and 1337 on game initialization<br />
Each victory is 1 point and the party end when a player has 3 points.

> Save every games state in a persistent file called games.json

![](./games.json.png)

### = QuickWord

Create a multiplayer game where the goal is to quickly type a random displayed word<br />

#### How ?

You **HAVE TO** use the package `random-words`<br />
Each victory is 3 points and the party end when a player has 15 points

### = WordAndFurious

Create a multiplayer game where the goal is to quickly type on a key from keyboard during 42 seconds

#### How ?

You **HAVE TO** generate a random key from keyboard on game initialization<br />
Each victory is 1 points and the party end when a player has 3 points

## <a name='bonus'>🦄 Bonus</a>

I know you love that, well you can in bulk:

* Add any game you have in mind :)
* Find an other person to use your server with their client and reciprocally 🤓
* Add user password authentication with Json Web Token 😱
* Add more visual effect #css4TheWin 🎉

## <a name='credits'>🐵 Credits</a>

Craft with :heart: in **Paris**.
