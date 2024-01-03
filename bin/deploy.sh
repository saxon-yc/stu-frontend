#!/bin/sh

PROXY=xxx
PROXY_PATH=xxx
PROJECT_NAME="student-web"

function sync_portal() {

  echo "making tarball ..."
  tar -czvf $PROJECT_NAME.tgz dist/
  echo "done"

  echo "rsync $PROJECT_NAME.tgz to $PROXY ..."
  rsync -avz --progress $PROJECT_NAME.tgz root@$PROXY:$PROXY_PATH
  echo "done"

  echo "clear ..."
  rm -rf $PROJECT_NAME.tgz 
  echo "done"
}

#exit
if [ "$1" = "portal" ]; then
  sync_portal $1
fi

exit 0



