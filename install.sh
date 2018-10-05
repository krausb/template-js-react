#!/bin/bash

echo '================= INSTALL =====================';

echo '--- Install base modules / dependencies ---';

npm install \
    webpack \
    webpack-dev-server \
    webpack-merge \
    webpack-cli \
    --save-dev

npm install \
    @babel/core \
    babel-loader \
    @babel/preset-env \
    @babel/preset-stage-2 \
    @babel/preset-react \
    @babel/plugin-proposal-class-properties \
    --save-dev

npm install \
    react \
    react-dom \
    react-hot-loader \
    react-router-dom \
    react-upload-file \
    react-bootstrap \
    query-string \
    --save

npm install \
    express \
    morgan \
    winston \
    express-winston \
    --save
