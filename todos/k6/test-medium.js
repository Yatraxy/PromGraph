import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuration du test de charge moyenne
export let options = {
  stages: [
    { duration: '30s', target: 20 },  // Montée progressive à 20 utilisateurs
    { duration: '1m', target: 20 },   // Maintien à 20 utilisateurs
    { duration: '30s', target: 0 },   // Descente progressive
  ],
};

export default function() {
  let response = http.get('http://nginx/');
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 1000ms': (r) => r.timings.duration < 1000,
  });
  
  sleep(Math.random() * 2); // Pause aléatoire entre 0 et 2 secondes
}