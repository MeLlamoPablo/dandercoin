FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y curl && \
    # Install Node.js
    curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    # Actually install required dependencies
    apt-get install -y nodejs && \
    # Cleanup
    apt-get purge -y curl && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# Instead of installing Yarn v1 to execute Yarn v2, we add a wrapper script
# that calls Yarn v2.
RUN echo '#!/usr/bin/env bash' > /usr/local/bin/yarn && \
    echo '"$(ls .yarn/releases/*.cjs)" "$@"' >> /usr/local/bin/yarn && \
    chmod +x /usr/local/bin/yarn

COPY --from=ethereum/solc:0.8.3 /usr/bin/solc /usr/bin/solc

WORKDIR /app

COPY .yarn/cache ./.yarn/cache
COPY .yarn/releases ./.yarn/releases
COPY .yarn/plugins ./.yarn/plugins
COPY .yarnrc.yml .

COPY package.json .
COPY yarn.lock .

COPY packages/core/package.json ./packages/core/package.json
COPY packages/web/package.json ./packages/web/package.json
COPY packages/web-fns/package.json ./packages/web-fns/package.json

RUN yarn
