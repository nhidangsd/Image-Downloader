# Image-Downloader

A full-stack application built with NodeJS, ExpressJS, and AngularJS 10.

---
## Summary

This application will :
- Fetch the Mars Rover photos from [NASA API](https://api.nasa.gov/) by Earth date which is read from a RTF (Rich Text Format) file called : `dates.txt` stored at the root directory. 
- Download all images locally on the server side after fetching data and save them to folder `/downloads` .
- Display all images on client side at `http://localhost:4200/`.

**Note**: This application is still under development and is not meant for production.

## Setup

**1. Clone the project**
```
git clone https://github.com/nhidangsd/Image-Downloader.git
```

**2. Navigate to the project directory and Install all the dependencies for Server application:**
```
cd Image-Downloader
```
```
npm install
```

**3 . Navigate to client directory and Install all the dependencies for Client application:**
```
cd client
```
```
npm install
```
**4. Navigate back to the project root directory and Boost up the server and client application :**
```
cd ..
```
Run both the server and client application:
```
npm run dev
```
Or run the server and client application individually :
```
npm start
npm start --prefix client
```

## Expectation:

- Server application will be runing on `http://localhost:3000/` with data endpoint `/api/images`.
- Client application will be running on `http://localhost:4200/`.
- All downloaded images will be available in folder `/downloads`.
