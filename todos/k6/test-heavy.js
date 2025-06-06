import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuration du test de charge élevée
export let options = {
  stages: [
    { duration: '1m', target: 50 },   // Montée à 50 utilisateurs
    { duration: '2m', target: 50 },   // Maintien
    { duration: '1m', target: 100 },  // Montée à 100 utilisateurs
    { duration: '2m', target: 100 },  // Maintien
    { duration: '1m', target: 0 },    // Descente
  ],
};

export default function() {
  // Test de différentes pages
  let pages = ['/', '/page1', '/page2'];
  let randomPage = pages[Math.floor(Math.random() * pages.length)];
  
  let response = http.get(`http://nginx${randomPage}`);
  
  check(response, {
    'status is 200 or 404': (r) => r.status === 200 || r.status === 404,
    'response time < 2000ms': (r) => r.timings.duration < 2000,
  });
  
  sleep(0.5); // Pause courte pour intensifier la charge
}