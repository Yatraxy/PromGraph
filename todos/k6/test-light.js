import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuration du test de charge légère
export let options = {
  vus: 10,        // 10 utilisateurs virtuels
  duration: '30s', // Pendant 30 secondes
};

export default function() {
  // Effectuer une requête GET
  let response = http.get('http://nginx/');
  
  // Vérifier que la réponse est correcte
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  // Pause entre les requêtes (simule un utilisateur réel)
  sleep(1);
}