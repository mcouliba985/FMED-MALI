import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
      const navigate = useNavigate();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);

      const handleLogin = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            try {
                  const response = await fetch('http://localhost:8000/api/login', {
                        method: 'POST',
                        body: JSON.stringify({ email, password }),
                  });

                  if (!response.ok) throw new Error('Email ou mot de passe incorrect');

                  const data = await response.json();
                  localStorage.setItem('token', data.token);
                  localStorage.setItem('token_expire_at', Date.now() + 30 * 60 * 1000); // 30 min

                  navigate('/admin/list-article');
            } catch (err) {
                  setError(err.message);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 to-gray-300 px-4">
                  <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md animate-fade-in">
                        <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-800">
                              Connexion Admin
                        </h2>
                        <p className="text-center text-gray-500 text-sm mb-6">
                              Seuls les administrateurs peuvent accéder à cet espace.
                        </p>

                        {error && (
                              <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 p-2 rounded">
                                    {error}
                              </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                              <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                          Email
                                    </label>
                                    <input
                                          type="email"
                                          className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          required
                                    />
                              </div>

                              <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                          Mot de passe
                                    </label>
                                    <input
                                          type="password"
                                          className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          required
                                    />
                              </div>

                              <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center items-center bg-gold hover:bg-yellow-700 text-white py-2 rounded-xl font-semibold transition duration-200 ${
                                          loading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                              >
                                    {loading ? (
                                          <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                          >
                                                <circle
                                                      className="opacity-25"
                                                      cx="12"
                                                      cy="12"
                                                      r="10"
                                                      stroke="currentColor"
                                                      strokeWidth="4"
                                                ></circle>
                                                <path
                                                      className="opacity-75"
                                                      fill="currentColor"
                                                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                                ></path>
                                          </svg>
                                    ) : (
                                          'Se connecter'
                                    )}
                              </button>
                        </form>

                        <div className="text-center mt-6 text-sm text-gray-500">
                              Vous n’êtes pas admin ?{' '}
                              <a href="/" className="text-blue-600 hover:underline">
                                    Retour à l’accueil
                              </a>
                        </div>
                  </div>
            </div>
      );
}

export default Login;
