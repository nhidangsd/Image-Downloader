# Image-Downloader

A full-stack application built with NodeJS, ExpressJS, and AngularJS 10.

---
## Summary

This application will :
- Fetch the Mars Rover photos by Earth date, which is read from a RTF (Rich Text Format) file called : `dates.txt` stored at the root directory. 
- Download all images locally on the server side after fetching data and save them to folder `/public/images` 
- Display all images on client side at `http://localhost:4200/`.

**Note**: This application is still under development and is not meant for production.

## Setup

**1. Clone the project**
```
git clone https://github.com/nhidangsd/Image-Downloader.git
```

**2. Navigate to the project directory:**
```
cd image-downloader
```
**3. Download all the dependencies :**
```
npm install
```
**4. Boost up the server and client application :**
```
npm run dev
```
** Or run the server and client application individually :**
```
npm start
npm start --prefix client
```

