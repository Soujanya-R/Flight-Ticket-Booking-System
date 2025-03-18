
# ✈️ Flight Booking System

A modern and user-friendly flight booking system built with **Next.js**, **React**, **Tailwind CSS**, and **Framer Motion**. This project allows users to search, book, and manage flights seamlessly with a professional and dynamic user interface.



## Screenshots

![App Screenshot1](https://raw.githubusercontent.com/Soujanya-R/dum/refs/heads/master/Screenshot%202025-03-18%20124546.png)

![App Screenshot2](https://raw.githubusercontent.com/Soujanya-R/dum/refs/heads/master/Screenshot%202025-03-18%20124609.png)

![App Screenshot3](https://raw.githubusercontent.com/Soujanya-R/dum/refs/heads/master/Screenshot%202025-03-18%20124636.png)

![App Screenshot4](https://github.com/Soujanya-R/dum/blob/master/Screenshot%202025-03-18%20124703.png?raw=true)

![App Screenshot5](https://raw.githubusercontent.com/Soujanya-R/dum/refs/heads/master/Screenshot%202025-03-18%20135434.png)

![App Screenshot6](https://raw.githubusercontent.com/Soujanya-R/dum/refs/heads/master/Screenshot%202025-03-18%20135509.png)

![App Screenshot7](https://github.com/Soujanya-R/dum/blob/master/Screenshot%202025-03-18%20135546.png?raw=true)

![App Screenshot8](https://raw.githubusercontent.com/Soujanya-R/dum/refs/heads/master/Screenshot%202025-03-18%20135618.png)

![App Screenshot9](https://raw.githubusercontent.com/Soujanya-R/dum/refs/heads/master/Screenshot%202025-03-18%20135708.png)

![App Screenshot10](https://raw.githubusercontent.com/Soujanya-R/dum/refs/heads/master/Screenshot%202025-03-18%20135716.png)

![App Screenshot11](https://raw.githubusercontent.com/Soujanya-R/dum/refs/heads/master/Screenshot%202025-03-18%20135727.png)

![App Screenshot10](https://raw.githubusercontent.com/Soujanya-R/dum/refs/heads/master/Screenshot%202025-03-18%20135745.png)
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



