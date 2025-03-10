# Pebball! GUI & Web Server
GUI and Web Server element of the Pebball! tech demo.

Pebball! is a baseball inspired interactive, motion controlled game concept for the Pebble Smartwatch. When paired with the Pebball! Web Server, this Watchapp acts as a controller for an endless batting cage reaction mini-game.

## Project Photos
![web_server_start_page](https://github.com/user-attachments/assets/c2c79924-8e06-4aaa-bf73-8e696765dcab)

![web_server_get_in_position](https://github.com/user-attachments/assets/7a54a262-bfa0-4bf8-8f6e-561abc106ca8)

![web_server_hit](https://github.com/user-attachments/assets/fbfb7f2c-4c24-4d1e-b051-f3eb98e0162b)

## Building Docker Image and Self-hosting
The Dockerfile is set up to automatically start the web server and serve up the client when building the image.

*Note: the website is being proxied in package.json. It should probably stay that way, unless you'd like to point this to a different domain.*

To build the image, run the following command in the project's directory:
`docker build -t pebball-web-image .`

then:
`docker compose up`

To view the console logs from within the container:
`docker logs -f <container_name_or_id>`

### Docker Environment Variable

| Variable Name | Description |
|--|--|
| VITE_DOMAIN | Domain website/websocket will be hosted on, i.e. localhost, website.com |
| VITE_PORT | Port website/websocket will run on, i.e. 3000 |

### Configuring Watchapp
Currently, there's no default URL the Pebball! Watchapp connects to. This is to allow users to select their own Pebball! Web Server. If a demo site gets created, the default URL will be pointed to there.

To configure the Pebball! Watchapp with a Web Server URL, use the Watchapp configuration page on the Pebble app.
