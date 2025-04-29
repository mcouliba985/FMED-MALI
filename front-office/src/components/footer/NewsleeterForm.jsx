const NewsletterForm = () => {
      return (
            <form
                  onSubmit={(e) => {
                        e.preventDefault();
                        // Appelle ton API ici
                  }}
                  className="flex sm:flex-row items-start sm:items-center gap-4"
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
                        placeholder="Votre adresse e-mail"
                        className="w-full text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-medgreen"
                  />

                  <button
                        type="submit"
                        className=" h-[42px] inline-flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-md 
                                                hover:bg-yellow-600 transition focus:outline-none focus:ring-2 focus:ring-gold"
                        aria-label="S'abonner à la newsletter"
                  >
                        <i className="fas fa-paper-plane" aria-hidden="true"></i>
                  </button>
            </form>
      );
};

export default NewsletterForm;
