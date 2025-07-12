const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // path to your downloaded key
const busStops = require('./client/src/data/delhi-bus-stops.json'); // path to your bus stops JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadBusStops() {
  const batchSize = 500; // Firestore batch limit
  for (let i = 0; i < busStops.length; i += batchSize) {
    const batch = db.batch();
    const chunk = busStops.slice(i, i + batchSize);
    chunk.forEach(stop => {
      const ref = db.collection('bus_stops').doc(stop.stop_id);
      batch.set(ref, stop);
    });
    await batch.commit();
    console.log(`Uploaded ${i + chunk.length} of ${busStops.length} stops`);
  }
  console.log('All bus stops uploaded!');
}

uploadBusStops();