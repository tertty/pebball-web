GUI + Web Server for the Pebball! Game

Note: localhost:3000 is being proxied in package.json. It should probably stay that way, until
when/if we're ready to point this to a different domain

### docker config ###
The Dockerfile is set up to automatically start the web server and serve up the client
when building the image

To build the image, run the following command in this directory:
`docker build -t pebball-web-image .`

then run the container using the image:
`docker container run -d -p 3000:3000 pebball-web-image`

To view the console logs from within the container:
`docker logs -f <container_name_or_id>`