#!/bin/sh
# Run at container start to link persistent SSH config
mkdir -p /root/.ssh
cat > /root/.ssh/config << 'EOF'
Host github.com
    IdentityFile /data/.ssh/marvin_deploy
    StrictHostKeyChecking accept-new
EOF
chmod 600 /root/.ssh/config

# Git identity
git config --global user.email "marvin@konzhi.com"
git config --global user.name "Marvin"
