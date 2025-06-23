
# ✈️ Flight Booking System

A modern and user-friendly flight booking system built with **Next.js**, **React**, **Tailwind CSS**, and **Framer Motion**. This project allows users to search, book, and manage flights seamlessly with a professional and dynamic user interface.



## Screenshots

![App Screenshot1](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20085423.png)

![App Screenshot2](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20085455.png)

![App Screenshot3](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20085528.png)

![App Screenshot4](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20085548.png)

![App Screenshot5](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20085603.png)

![App Screenshot6](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20085628.png)

![App Screenshot7](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20085654.png)

![App Screenshot8](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20085724.png)

![App Screenshot9](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20085742.png)

![App Screenshot10](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20085905.png)

![App Screenshot11](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20085943.png)

![App Screenshot12](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20090015.png)

![App Screenshot13](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20090037.png)

![App Screenshot14](https://github.com/Soujanya-R/Flight-Ticket-Booking-System/blob/main/Screenshot%202025-04-16%20094854.png)
## 🚀 Features


✅ **Flight Search** – Search flights by departure and destination airports, and filter by date.  
✅ **Seat Selection** – Real-time seat availability with booked seats highlighted.  
✅ **Secure Authentication** – User authentication with NextAuth.js and MySQL backend.  
✅ **Dynamic UI** – Clean and responsive design using Tailwind CSS.    
✅ **AI-Powered Suggestions** – Smart recommendations for better flight options.  
✅ **Testimonials & Newsletter** – Dynamic testimonials and newsletter signup for engagement.  

## 🖥️ Tech Stack

| Technology     | Description                      |
|---------------|----------------------------------|
| **Next.js**    | React framework for SSR and SSG   |
| **React**       | Component-based frontend library |
| **Tailwind CSS** | Utility-first CSS framework       |
| **Framer Motion**| Animation library for UI/UX      |
| **MySQL**        | Relational database              |
| **NextAuth.js**   | Secure user authentication      |                    

## 🌍 Installation and Setup

### **1. Clone the repository**
```bash
git clone https://github.com/your-username/flight-booking-system.git
```
### **2. Install dependencies**
```bash
cd flight-booking-system
npm install
```
### **3. Create .env file**
Create a .env file in the root directory:
```bash
NEXT_PUBLIC_AMADEUS_API_KEY=your_amadeus_api_key
NEXT_PUBLIC_AMADEUS_API_SECRET=your_amadeus_api_secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=mysql://username:password@localhost:3306/flightdb
```
### **4. Run the development server**
```bash
npm run dev
```

## 📁 Project Structure

```plaintext
📦 flight-booking-system
├── 📂 app
│   ├── 📂 api                # API routes
│   ├── 📂 components         # Reusable components
│   ├── 📂 auth               # NextAuth configuration
│   └── 📂 lib                # Database connection
├── 📂 public                 # Static assets (images, videos)
├── 📂 styles                 # Global CSS files
├── .env                      # Environment variables
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # Project documentation

```


## 🚦 Usage Guide

-  Register/Login – Users can register or log in using NextAuth.js.
-  Search for Flights – Search flights by departure and destination airports.
-  Seat Selection – Choose available seats and confirm booking.
-  Dashboard – View and manage existing bookings.
-  Recommendations – AI-based flight recommendations using Amadeus API.



## ✅ Best Practices and Code Standards

✔️ Clean and modular code structure.

✔️ Strong error handling and validation.

✔️ Secure user authentication and data encryption.

✔️ Optimized performance with lazy loading and caching.


## 🤝 Contributing

Contributions are welcome!

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature).
- Commit changes (git commit -m 'Add new feature').
- Push to the branch (git push origin feature/your-feature).
- Create a pull request.

## 🌟 Acknowledgements


 - OpenAI – For AI-based flight suggestions.

 - Amadeus – For real-time flight data.

 - Framer Motion – For stunning animations.

 - NextAuth.js – For secure user authentication.


## 📜 License

This project is licensed under the MIT License.



