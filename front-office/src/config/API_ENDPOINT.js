const API_URL = process.env.REACT_APP_API_URL;

export const API_ENDPOINTS = {
      getArticles: `${API_URL}/articles`,
      getPublishedArticles: `${API_URL}/articles/published`,
      createArticle: `${API_URL}/articles/create`,
      addNewPartner: `${API_URL}/partenaires/create`,
      getPartners: `${API_URL}/partenaires`,
      getMembers: `${API_URL}/members`,
      createDonor: `${API_URL}/donors/create`,
      getDonators: `${API_URL}/donors`,
      createTestimonial: `${API_URL}/testimonial/create`,
      getTestimonial: `${API_URL}/testimonial`,
      getCarouselElement: `${API_URL}/carousel`,
      getYoutubeElement: `${API_URL}/youtube`,
      fonsejSubmit: `${API_URL}/aide/submit`,
};
