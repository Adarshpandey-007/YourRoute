# 🚍 YourRoute – AI-Powered Transit Assistant  



YourRoute is an **AI-powered multimodal transit assistant for Delhi**, designed to make public transportation smarter, faster, and more accessible.  
It combines **real-time bus/train data, route planning, and multilingual AI chat assistance** into one seamless experience.  

---

## ✨ Features  

- 🔎 **Smart Route Planning** – AI-driven trip suggestions optimized for time, cost, and preferences  
- 🚦 **Live Transit Data** – Real-time Delhi bus updates via **GTFS-Realtime** + static schedules  
- 🧭 **Nearby Search** – Find buses, stops, and routes near your location  
- 📊 **Analytics Dashboard** – Travel time stats, frequency analysis, and route insights  
- 🤖 **AI Assistant** – Multilingual conversational assistant powered by **Gemini AI**  
- 🗺️ **Maps Integration** – **Google Maps + OpenStreetMap** for visualization  
- 🔐 **User Personalization** – Saved trips, preferences, and multilingual support  
- ☁️ **Cloud Ready** – Frontend on **Vercel**, backend on **Render**, database on **MongoDB Atlas**  

---

## 🏗️ Architecture  


client/         → React + Material UI frontend (Vercel)  
server/         → Node.js + Express backend (Render)  
 ├─ GTFS Service → DelhiBusGTFSService (static & realtime bus data)  
 ├─ AI Service   → Gemini-powered NLP (trip planning, summaries)  
 ├─ Firebase     → Realtime bus tracking + Firestore  
 └─ MongoDB      → User profiles, trips, analytics  
microservices/  → Python + FastAPI (NLP, embeddings, doc parsing)


| Layer         | Technologies                                                     |
| ------------- | ------------------------------------------------                 |
| **Frontend**  | React, Material UI, Tailwind,                                    |
| **Backend**   | Node.js, Express                                                 |
| **Database**  | Firebase Firestore                |
| **AI Models** | Gemini 2.5 Flash & Pro                                           |
| **Maps/APIs** | Google Maps, OpenStreetMap, GTFS-Realtime and static data        | 



##📸 Screenshots




<img width="1895" height="935" alt="Screenshot 2025-08-17 185746" src="https://github.com/user-attachments/assets/81c2a6d3-11d5-44f9-aefc-705002f932ba" />
