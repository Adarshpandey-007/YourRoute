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



Home page
<img width="1895" height="935" alt="Screenshot 2025-08-17 185746" src="https://github.com/user-attachments/assets/81c2a6d3-11d5-44f9-aefc-705002f932ba" />

Bus stops and Details
<img width="1904" height="911" alt="Screenshot 2025-08-17 185803" src="https://github.com/user-attachments/assets/d656c2b1-28f8-493d-86a6-f288334bddbd" />

<img width="1889" height="929" alt="Screenshot 2025-08-17 185832" src="https://github.com/user-attachments/assets/c8236e11-7925-4536-bb05-49e841aeaf80" />


Route Planing 
<img width="1881" height="908" alt="Screenshot 2025-08-17 185937" src="https://github.com/user-attachments/assets/0a429dd8-ccbc-4843-a721-2ca8be21a03e" />

Preferences
<img width="1853" height="902" alt="Screenshot 2025-08-17 185858" src="https://github.com/user-attachments/assets/683cc9af-2056-493f-ad15-af77e98f6ba6" />

AI Agent 
<img width="1878" height="922" alt="Screenshot 2025-08-17 185928" src="https://github.com/user-attachments/assets/988b85b9-469b-4bfa-9656-9237dac1149d" />

Route history
<img width="1886" height="924" alt="Screenshot 2025-08-17 190002" src="https://github.com/user-attachments/assets/cd0949d4-cd32-486f-baba-f337eb3808bc" />

Live Bus Tracker 
<img width="1904" height="930" alt="Screenshot 2025-08-17 190016" src="https://github.com/user-attachments/assets/b80563c5-1c82-4050-aa9b-f351a5460bd4" />


<img width="1897" height="932" alt="Screenshot 2025-08-17 190027" src="https://github.com/user-attachments/assets/392d666b-212a-4fee-a8c7-304d0c14156d" />


live Buse Locator
<img width="1912" height="1078" alt="Screenshot 2025-08-17 190107" src="https://github.com/user-attachments/assets/eb4efd68-2fc7-47cc-a72a-ac0708c30969" />

Individual bus
<img width="1832" height="821" alt="Screenshot 2025-08-17 190219" src="https://github.com/user-attachments/assets/15ea1478-8c68-4c2b-a3e3-0cace3570ae5" />

Overall data analysis
<img width="1906" height="943" alt="Screenshot 2025-08-17 190131" src="https://github.com/user-attachments/assets/95f75e6a-dc23-49d4-84eb-f44a4a654fa4" />

Other things

about
<img width="1867" height="906" alt="Screenshot 2025-08-17 190239" src="https://github.com/user-attachments/assets/da4de20d-5faf-45d1-9f02-9d5e56d1265e" />
<img width="1890" height="915" alt="Screenshot 2025-08-17 190256" src="https://github.com/user-attachments/assets/34109431-cfd5-496d-9e8d-bafd3bb9790a" />


