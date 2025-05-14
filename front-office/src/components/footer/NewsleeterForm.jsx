import React, { useState } from 'react';
import { API_ENDPOINTS } from './../../config/API_ENDPOINT';

const NewsletterForm = () => {
      const [email, setEmail] = useState('');
      const [message, setMessage] = useState(null);
      const [loading, setLoading] = useState(false);

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setMessage(null);

            try {
                  const response = await fetch(API_ENDPOINTS.newsletterSubscribe, {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                  });

                  const data = await response.json();

                  if (!response.ok) {
                        // Si l'API retourne un message d'erreur, on l'affiche
                        throw new Error(data.message || 'Une erreur est survenue');
                  }

                  setMessage('Inscription réussie !');
                  setEmail('');
            } catch (error) {
                  setMessage(error.message || 'Une erreur inconnue est survenue.');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div>
                  <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                        aria-label="Formulaire d'inscription à la newsletter"
                  >
                        <label htmlFor="newsletter-email" className="sr-only">
                              Adresse e-mail
                        </label>
                        <input
                              type="email"
                              id="newsletter-email"
                              name="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Votre adresse e-mail"
                              className="w-full text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-medgreen"
                        />

                        <button
                              type="submit"
                              disabled={loading}
                              className="h-[42px] inline-flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-md 
                hover:bg-yellow-600 transition focus:outline-none focus:ring-2 focus:ring-gold"
                              aria-label="S'abonner à la newsletter"
                        >
                              <i className="fas fa-paper-plane" aria-hidden="true"></i>
                              {loading ? 'Envoi...' : 'Envoyer'}
                        </button>
                  </form>

                  <div>
                        {message && <p className="text-sm text-gold mt-2 sm:mt-0">{message}</p>}
                  </div>
            </div>
      );
};

export default NewsletterForm;
