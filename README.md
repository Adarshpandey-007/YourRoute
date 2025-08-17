# 🚍 YourRoute – AI-Powered Transit Assistant  

![YourRoute Banner](https://via.placeholder.com/1200x300.png?text=YourRoute+-+AI+Transit+Assistant)  

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

```bash
client/         → React + Material UI frontend (Vercel)  
server/         → Node.js + Express backend (Render)  
 ├─ GTFS Service → DelhiBusGTFSService (static & realtime bus data)  
 ├─ AI Service   → Gemini-powered NLP (trip planning, summaries)  
 ├─ Firebase     → Realtime bus tracking + Firestore  
 └─ MongoDB      → User profiles, trips, analytics  
microservices/  → Python + FastAPI (NLP, embeddings, doc parsing)  
