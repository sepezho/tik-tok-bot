# TIK-TOK-BOT
## That upload tiktoks automatically via terminal
### TO USE:
+ before using this bot, you must download the latest [geckodriver](https://github.com/mozilla/geckodriver/releases/) release
  + MacOs `brew install geckodriver`
  + Linux `apt install firefox-geckodriver`
  + Windows `windows user? fuck u`
+ go to main.js and set "folder" of urs videos (from root derictorie)
+ go to normal browser and login in tiktok
  + put ALL tiktok cookies into "cookies.json"
    + that step need to login bot into your acc
      + btw still working on this step to optimize UX
+ !ANYWAY if u run this bot from pc with monitor (not from remote server thrue ssh) U CAN just login via browser window, that will be open after start!
+ If u want run bot from remote server OR if u want just HEADLESS script, UNCOMMIT 18 and 19 line in main.js
+ `npm install`
+ `npm start`
### TO LOGOUT:
+ `npm logout`

###### created by [sepezho](https://sepezho.com) 2021