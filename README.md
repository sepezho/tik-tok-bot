# TIK-TOK-BOT
## That upload tiktoks automatically via terminal
### BEFORE USE:
+ before using this bot, you must install the latest [geckodriver](https://github.com/mozilla/geckodriver/releases/) release
  + MacOs `brew install geckodriver`
  + Linux `apt install firefox-geckodriver`
  + Windows `windows user? fuck u`
+ go to *main.js* and set *folder* of urs videos (from root derictorie of your PC)
+ and if u want run bot from remote server OR if u want just HEADLESS script, UNCOMMIT 18 and 19 line in *main.js*
+ go to chrome browser and install (Get cookies.txt)[https://chrome.google.com/webstore/detail/get-cookiestxt/bgaddhkoddajcdgocldbbfleckgcbcid/related?hl=en] extention
+ go to (TikTok)[https://www.tiktok.com] and login into your account
+ download TikTok cookies via extention and put *tiktok.com_cookies.txt* file in */cookies* folder
+ run `npm run convert` to convert txt into json and write it in cookies.json
### TO USE:
+ `npm install`
+ `npm run start`
### TO LOGOUT:
+ `npm run logout`

###### created by [sepezho](https://sepezho.com) 2021