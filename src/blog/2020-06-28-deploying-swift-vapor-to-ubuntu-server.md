---
title: "Deploying a Swift Vapor Project to a Ubuntu Server"
date: 2020-06-28T12:42:58.118+10:00
permalink: "/blog/2020/6/28/deploying-swift-vapor-to-ubuntu-server.html"
layout: layouts/post.njk
image: "/images/1593314532370/image.png"
---
# Intro and rationale

So you've got a [Swift Vapor](https://github.com/vapor/vapor) project that works on your machine, and you're ready to host it publicly and make that glorious API available to the world. But how?

Although I do a lot of frontend software development, especially with Swift, and have built simple backends in the past, I've never had to deploy the backend code before. I've recently had a need to build and deploy a backend that will soon be used in production by my app - [Petty](https://apps.apple.com/au/app/petty/id1253821300). My choice to write the backend using Swift/Vapor is simply from my familiarity with Swift as a language, and the ability it gives to share some code between my backend and frontend. This was an entirely new experience for me, and I found the individual pieces of work straightforward, but needed to piece together information from many different sources, and play around with things until they worked. A lot of this is based heavily on the excellent Vapor deployment documentation that can be found [here](https://docs.vapor.codes/4.0/deploy/digital-ocean/). *Please note that this is not meant to be a comprehensive set of instructions, but more a guide to getting up and running. I've probably missed something somewhere, and if you need to deploy a backend with strict security or other requirements, then this post is almost certainly lacking. This is only me sharing what's worked for my needs, please treat accordingly and use only as a guide.*

I've chosen to deploy to [Linode](https://www.linode.com), and the rest of this post assumes familiarity with it, but similar steps are involved if you choose to deploy to other cloud hosting providers such as [AWS](https://aws.amazon.com) and [Digital Ocean](https://www.digitalocean.com). Why Linode for Petty? I wanted a host located in Sydney and that meant either AWS or Linode, and the choice came to Linode because of their clear pricing. Looking into AWS, I couldn't tell if I'd be up for $7 or $700 per month.

---

# Getting started

At this point I'm going to assume you've got your Vapor project files ready to go, and you've also create a Linode account.

It's time to create your Linode. There should be a large "Create" button somewhere on the Linode dashboard, and from there choose your configuration. I'm going with a `Ubuntu 18.04 LTS` distribution, setting the region to `Sydney, AU`, and settling for the `Nanode 1GB` Linode plan (for now - this will change when things go to production). See the below screenshot.

![img\_01.png](/images/1593311131010-Z01L9D82A73ZGYCA8AO0/img_01.png)

You'll also need to enter a root password. Ideally make this long and secure, and store in a password manager.

Congrats - you've just created a server! Interfacing with this server will be done via SSH from a Terminal on your local machine. If you navigate to your newly created Linode in the Linode dashboard, you'll see an IP address. SSH in from any Terminal with the command `ssh root@<server_IP_address>`. You will need to follow the prompts to configure SSH keys. From then on, you'll be able to SSH in from the same machine without a password. Once you're in, the bottom of your Terminal window should look similar to the following.

![img\_02.png](/images/1593311167629-ZZSFNPMF8H6DRM5FRCQ7/img_02.png)

We're currently logged in as the root user, but we'll create a new user on the server and perform our work with that user account. Do this with the command `adduser <username>`, replacing `<username>` with the account name. I'll run, `adduser zach`. Set a password, and follow the rest of the prompts to create the user.

![img\_03.png](/images/1593311192396-ZDN9Q18SAHA8LSN7UYEH/img_03.png)

You'll also want to copy the root user's SSH keys to the new user. It can be achieved with the following command:

`rsync --archive --chown=<username>:<username> ~/.ssh /home/<username>`

Once done, you'll be able to SSH in as that user directly. e.g. `ssh zach@<server_IP_address>>`

Finally, add the user to the sudo group with the command, `usermod -aG sudo <username>`, and then switch to that user - `su - <username>`. Alternatively, you are now able to start an SSH session with your new username - `ssh <user>@<server_IP_address>`.

---

## Installing stuff

It's now time to install what we need to get this Vapor project up and running.

## Configure Firewall

*Note you will need to run as root, hence the `sudo`*

```
sudo ufw allow OpenSSH
sudo ufw enable
```

## Install Swift dependencies:

```
sudo apt-get update
sudo apt-get install clang libicu-dev libatomic1 build-essential pkg-config
```

## Install Swift

Head to the [Swift releases page](https://swift.org/download/#releases) and right-click on the suitable release to copy its download link.

![img\_04.png](/images/1593311260918-UVQL1J2AMCMPDX93Y4WK/img_04.png)

Then run the wget command with the link just copied. See the example below, but replace the download URL with the one for the version of Swift you're after.

```
wget https://swift.org/builds/swift-5.2.4-release/ubuntu1804/swift-5.2.4-RELEASE/swift-5.2.4-RELEASE-ubuntu18.04.tar.gz
tar xzf swift-5.2.4-RELEASE-ubuntu18.04.tar.gz
```

It [is recommended](https://docs.vapor.codes/4.0/deploy/digital-ocean/) to create subfolders for each Swift release to neatly manage the versions. This can be achieved with the following commands:

```
sudo mkdir /swift
sudo mv swift-5.2.4-RELEASE-ubuntu18.04 /swift/5.2.4
sudo ln -s /swift/5.2.4/usr/bin/swift /usr/bin/swift
```

Verify the installation with the command `swift --version`. You should see something similar to this:

![img\_05.png](/images/1593311290506-PFRYD6H9V2OC8IZHL1GH/img_05.png)

## Vapor dependencies

Vapor has some dependencies which can be installed with the following command:

`sudo apt-get install openssl libssl-dev zlib1g-dev libsqlite3-dev`

Finally, run `sudo ufw allow http`, and we're done setting up Vapor.

---

# Database setup

Due to the nature of the project I'm using this server for, I've made the choice to store the database on the same machine as the server. Obviously your needs may vary, and if you don't need to setup a database, or if your backend project is already configured to connect to a remote database somewhere, you can safely ignore this section.

For the project in question, I'm using a PostgreSQL.

Install with the following commands:

```
sudo apt update
sudo apt install postgresql postgresql-contrib
```

Enter the postgres account on your server:

```
sudo -i -u postgres
psql
```

![img\_06.png](/images/1593311315863-G3YL42IPZT1IKMD3K3A7/img_06.png)

Create a new psql user by typing:

`createuser --interactive`

And following the prompts. Answer "Y" to "Shall the new role be a superuser?"

Create a new database:

`CREATE DATABASE <database_name>`

Add a password to the psql user:

`ALTER USER <username> PASSWORD '<super_secure_password>';`

Exit the psql client using the command `\q`.

## Gather your project files

It's time to put a copy of your source files on the server. Do this in any way you please. Download the source directly, clone from Git, use `scp`, whatever you like. I've create an `/app` directory in my home folder in which to clone the project source files to.

Optionally, you can check to see that everything builds and runs by running

```
swift build
sudo .build/debug/Run serve
```

We're far from production-ready, but gives you a chance to iron out any potential build or run issues with the project now that it's on a remote machine.

---

# Supervisor

We're now going to setup Supervisor - a tool to help manage your server by start, stopping, and/or rebooting the Vapor app automatically when something happens, such as a system reboot.

Before beginning, I'd suggest creating a simple bash script named `run.sh` that Supervisor can run to start your Vapor app. For Petty, I use the one below, and the file is in the root directory of my project.

run.sh:

```
#!/bin/bash
swift build --configuration release
.build/release/Run serve --env production --port 8080 --hostname 0.0.0.0
```

Install Supervisor:

```
sudo apt-get update
sudo apt-get install supervisor
```

Create a Supervisor config file at `/etc/supervisor/conf.d/`. I've named my file, `petty.conf`, and it looks like:

```
[program:petty]
command=/home/zach/app/Petty-backend/run.sh
directory=/home/zach/app/Petty-backend
user=zach
stdout_logfile=/var/log/supervisor/%(program_name)-stdout.log
stderr_logfile=/var/log/supervisor/%(program_name)-stderr.log
```

Now, start Supervisor, replacing `petty` with the name of your app/project:

```
sudo supervisorctl reread
sudo supervisorctl add petty
sudo supervisorctl start petty
```

Now Supervisor will start your app, and do so automatically at times you'd expect, such as after a server reboot.

You can check on the status of Supervisor at any time with the command, `sudo supervisorctl status`.

---

# Nginx

There's still one more to be solved. We want our server to be accessible via the public Internet. Fortunately, Nginx can help with that by configuring our public server and proxy. I'll be using it simply here, but Nginx is quite powerful and can handle a lot of things from security, to increasing performance by caching, etc.

```
sudo apt update
sudo apt install nginx
```

You can check the status of Nginx at any time with the following command:

`systemctl status nginx`

To verify that it's working, open a browser on your local computer and visit `http://<server_IP_address>`. You should see something similar to the following:

![img\_08.png](/images/1593311369522-RPUEETDPQZ4UITE6TQNV/img_08.png)

Nginx needs to be configured to make our Vapor app publicly accessable. We need to create a config file in the `/etc/nginx/sites-enabled/` directory. Create a file named `default`, and, for Petty, the contents of it looks like the following:

default:

```
server {

    server_name <server_URL>;

    root /home/zach/app/Petty-backend/Public/;


    location / {
        try_files $uri @proxy;
    }

    location @proxy {
        proxy_pass http://127.0.0.1:8080;
        proxy_pass_header Server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass_header Server;
        proxy_connect_timeout 3s;
        proxy_read_timeout 10s;
    }
}
```

After saving the `default` file, restart Nginx: `sudo service nginx restart`.

Great! Nginx is setup. If you attempt to make a HTTP request to your server, you should find that it works, and you get a response - assuming your Vapor project works. :-)

---

# Next steps

Now, you could stop here. You have an unencrypted HTTP server that hosts your API. To be truly production-ready, though, it helps to have a custom domain configured for HTTPS. Who wants to hit an API that's just an IP address, or that isn't HTTP?

## Custom domain

To configure a custom domain on your server, follow your server provider's guides. If you're using Linode, there's a great one available [here](https://www.linode.com/docs/platform/manager/dns-manager/).

## SSL

In the modern world, having a secured connection to a server isn't seen as a luxury, but instead essential. Even if the API you've created isn't for public consumption, it's still worthwhile using SSL to connect to your server. Linode has a great guide [here](https://www.linode.com/docs/security/ssl/install-lets-encrypt-to-create-ssl-certificates/) which I'm going to summarise below. Note, this will only work if you've configured a custom domain, and uses Certbot and Let's Encrypt.

Run Certbot:

```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx
```

Follow the prompts and you should be good to go.

The SSL certificate will eventually expire and need to be updated. Certbot makes it easy enough with a `certbot renew` command, but I believe we can automate it (I haven't verified this works, but I'd assume it does).

We can schedule it to attempt an update to the certificates on a monthly basis. There's no harm in calling this command frequently as nothing happens if a renewal isn't needed.

Run `sudo crontab -e` and add the following to the bottom of the file it opens:

`0 0 1 * * sudo certbot renew`

---

# Wrapping up

That should be all you need to deploy a Vapor app.

To recap, your Vapor app or API should be accessible via the public Internet thanks to Nginx routing, your server should automatically start when your server boots thanks to Supervisor, and optionally you should be able to access your server or API with a custom domain that is secured with SSL. I hope it has provided a succinct guide to getting started with Vapor deployment, and that you've been able to learn something.

As I mentioned at the beginning, it's the first time I've done something like this. Consider this a "getting started" guide - it's good enough for my use-case but I've probably missed something, or not followed best practices in a few places, so please don't blindly follow it.

If you've got any suggestions or recommendations, please reach out, and I'd be happy to have a chat and learn something. [Twitter](https://twitter.com/zachsimone/) is the best place for that. Also if you're a motorist in Sydney, check out my app [Petty](https://apps.apple.com/au/app/petty/id1253821300) which will soon be updated to use this Swift and Vapor-powered API.
