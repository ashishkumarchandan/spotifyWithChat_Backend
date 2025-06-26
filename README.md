# Music Streaming & Management API

This project is a backend API for a music streaming and management application. It provides functionalities for user authentication, managing music albums and songs, retrieving music data, and accessing administrative statistics.

## Features

- User Authentication (via Clerk)
- Music Management (Admin only): Create, delete songs and albums.
- Music Discovery: Get all songs (admin), featured, made for you, and trending songs (public).
- Album Browsing: Get all albums and individual album details with their songs.
- User Management (Admin only): View all users.
- Real-time Chat: Send and receive messages between users using Socket.IO.
- Admin Dashboard: View statistics on total songs, albums, users, and unique artists.
- Cloudinary Integration for media storage.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** Clerk
- **Media Storage:** Cloudinary
- **Real-time Communication:** Socket.IO

## Installation

1.  **Clone the repository:**


## Getting Started

Server should run automatically when starting a workspace. To run manually, run:
```sh
npm run dev
```