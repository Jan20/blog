<!--
date=2022-06-27
topic=Docker
-->
<img class='full' src='assets/posts/guides/006_multi_container_applications/thumbnail.png'>

# Multi Container Applications
As we have seen in the previous blog post, it is rather simple to run a Flask application inside a docker container. However, a Flask application lives seldomly live in isolation. For instance, a backened application might be called by an Angular frontend. This article provides a short overview of how to setup a system, consisting of two docker containers communicating with each other.


