import React, { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { motion } from 'framer-motion';
import CoverPageComponent from '../../components/main/cover-page-component';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';

const GalleryPage = () => {
      const coverContent = {
            title: 'Galerie FMED MALI',
            show: true,
            label: 'Ce que nous avons construit, ensemble',
            hook: 'Chaque photo témoigne d’un engagement, d’un projet accompli, d’un sourire retrouvé. Découvrez les actions concrètes menées par FMED MALI.',
      };

      const [images, setImages] = useState([]);

      useEffect(() => {
            async function galleries() {
                  try {
                        const fetchRequest = await fetch(API_ENDPOINTS.getPublishedArticles);
                        const response = await fetchRequest.json();
                        setImages(response);
                  } catch (error) {
                        console.log(error);
                  }
            }

            galleries();
      }, []);

      const categories = ['Tous', ...Array.from(new Set(images.map((img) => img.category)))];
      const [selectedCategory, setSelectedCategory] = useState('Tous');
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 12;

      const filteredImages =
            selectedCategory === 'Tous'
                  ? images
                  : images.filter((img) => img.category === selectedCategory);

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentImages = filteredImages.slice(indexOfFirstItem, indexOfLastItem);

      const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

      const handlePageChange = (page) => {
            if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
            }
      };

      return (
            <section>
                  <CoverPageComponent
                        title={coverContent.title}
                        showSection={coverContent.show}
                        label={coverContent.label}
                        hook={coverContent.hook}
                  />

                  <div className="min-h-screen mb-8 px-4">
                        <div className="max-w-6xl mx-auto text-center">
                              {/* Filtres */}
                              <div className="flex flex-wrap justify-center gap-3 mb-8">
                                    {categories.map((cat) => (
                                          <button
                                                key={cat}
                                                onClick={() => {
                                                      setSelectedCategory(cat);
                                                      setCurrentPage(1); // reset page on category change
                                                }}
                                                className={`px-4 py-2 rounded-full border transition font-medium ${
                                                      selectedCategory === cat
                                                            ? 'bg-black text-white'
                                                            : 'bg-white text-black'
                                                } hover:bg-black hover:text-white`}
                                          >
                                                {cat}
                                          </button>
                                    ))}
                              </div>

                              {/* Galerie */}
                              <PhotoProvider>
                                    <motion.div
                                          layout
                                          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                                    >
                                          {currentImages.map((img, index) => (
                                                <motion.div
                                                      key={index}
                                                      whileHover={{ scale: 1.05 }}
                                                      className="overflow-hidden rounded-xl shadow-md"
                                                >
                                                      <PhotoView src={img.imagePath}>
                                                            <img
                                                                  src={img.imagePath}
                                                                  alt={img.imageName}
                                                                  className="w-full h-48 object-cover cursor-pointer"
                                                            />
                                                      </PhotoView>
                                                </motion.div>
                                          ))}
                                    </motion.div>
                              </PhotoProvider>

                              {/* Pagination */}
                              {totalPages > 1 && (
                                    <div className="flex justify-end mt-8 gap-2 flex-wrap">
                                          <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="px-4 py-2 border rounded hover:bg-black hover:text-white disabled:opacity-50"
                                          >
                                                Précédent
                                          </button>
                                          {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                      key={i}
                                                      onClick={() => handlePageChange(i + 1)}
                                                      className={`px-4 py-2 border rounded ${
                                                            currentPage === i + 1
                                                                  ? 'bg-black text-white'
                                                                  : 'bg-white text-black'
                                                      } hover:bg-black hover:text-white`}
                                                >
                                                      {i + 1}
                                                </button>
                                          ))}
                                          <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="px-4 py-2 border rounded hover:bg-black hover:text-white disabled:opacity-50"
                                          >
                                                Suivant
                                          </button>
                                    </div>
                              )}
                        </div>
                  </div>
            </section>
      );
};

export default GalleryPage;
