#!/bin/bash
#
# Remixed from https://gist.github.com/nicerobot/1443588
#
# Usage:
#    * export-chrome-cookie.sh
#    * export-chrome-cookie.sh <domain>
#      <domain> examples:
#        .google.com
#        %.google.com (SQLite wildcard)
#        %.com

# The path for MAC!
CHROME="${HOME}/Library/Application Support/Google/Chrome/Default"
#echo $CHROME
COOKIES="$CHROME/Cookies"
#echo ${COOKIES:-Cookies}

QUERY='select * from cookies'

if [[ $# == 1 ]]; then
    domain=$1
    QUERY="$QUERY where host_key like '$domain'"
fi

#echo $QUERY

# This is to make the exported cookies.txt recognizable by some libraries.
# e.g. http.cookiejar.MozillaCookieJar will deny it without this string... -_-//.
# The library does not trust the programmer but searches for this magic string..
echo "# Netscape HTTP Cookie File"
sqlite3 -separator ' ----------	' "${COOKIES:-Cookies}" "$QUERY"