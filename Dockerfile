FROM node:10-onbuild

# update and install chrome dependencies
RUN apt-get -y update
RUN apt-get -y install libgtk-3-0 libx11-xcb1 libxtst6 libnss3 libxss1 libasound2 fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont

# create user to run server
RUN useradd headless --shell /bin/bash --create-home \
    && usermod -a -G sudo headless \
    && echo 'ALL ALL = (ALL) NOPASSWD: ALL' >> /etc/sudoers \
    && echo 'headless:nopassword' | chpasswd \
    && chown -R headless:headless /usr/src/app

# It's a good idea to use dumb-init to help prevent zombie chrome processes.
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

#RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
#    && mkdir -p /home/pptruser/Downloads \
#    && chown -R pptruser:pptruser /home/pptruser \
#    && chown -R pptruser:pptruser /node_modules
USER headless

# Runs "/usr/bin/dumb-init -- /my/script --with --args"
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

# or if you use --rewrite or other cli flags
# ENTRYPOINT ["dumb-init", "--rewrite", "2:3", "--"]
CMD ["npm", "start"]

EXPOSE 8080