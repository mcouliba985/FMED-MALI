import { useState } from 'react';
import CoverPageComponent from '../../components/main/cover-page-component';
import { API_ENDPOINTS } from '../../config/API_ENDPOINT';
import Modal from '../../components/main/modal';
import Loader from '../../components/main/loader-component';
import { useTranslation } from 'react-i18next';

const FormMember = () => {
      const { t } = useTranslation();

      const [formData, setFormData] = useState({
            type: 'particulier',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            donationFrequency: '',
            paymentMethod: '',
            profession: '',
            motivation: '',
            file: null,
      });

      const [loading, setLoading] = useState(false);
      const [showModal, setShowModal] = useState(false);

      const handleChange = (e) => {
            const { name, value, type, files } = e.target;
            if (type === 'file') {
                  setFormData({ ...formData, file: files[0] });
            } else {
                  setFormData({ ...formData, [name]: value });
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            const form = new FormData();
            const infos = { ...formData };
            delete infos.file;

            form.append('informations', JSON.stringify(infos));
            if (formData.file) {
                  form.append('file', formData.file);
            }

            try {
                  const response = await fetch(API_ENDPOINTS.createDonor, {
                        method: 'POST',
                        body: form,
                  });

                  if (response.ok) {
                        await response.json();

                        setFormData({
                              type: 'particulier',
                              firstName: '',
                              lastName: '',
                              email: '',
                              phone: '',
                              address: '',
                              donationFrequency: '',
                              paymentMethod: '',
                              profession: '',
                              motivation: '',
                              file: null,
                        });

                        setShowModal(true);
                  } else {
                        alert(t('formMember.modal.error'));
                  }
            } catch (err) {
                  console.error(err);
                  alert(t('formMember.modal.networkError'));
            } finally {
                  setLoading(false);
            }
      };

      const coverContent = {
            title: t('formMember.cover.title'),
            show: true,
            label: t('formMember.cover.label'),
            hook: t('formMember.cover.hook'),
      };

      return (
            <section>
                  <CoverPageComponent
                        className="mb-4"
                        title={coverContent.title}
                        showSection={coverContent.show}
                        label={coverContent.label}
                        hook={coverContent.hook}
                  />
                  <section className="container">
                        <form
                              onSubmit={handleSubmit}
                              className="p-8 bg-white shadow-lg mb-8 space-y-4 max-w-3xl mx-auto"
                        >
                              <h2 className="text-2xl font-bold">{t('formMember.form.title')}</h2>
                              <p className="text-sm text-gray-600">
                                    {t('formMember.form.privacy')}
                              </p>

                              {/* Type selection */}
                              <div className="flex items-center gap-6 mt-2">
                                    <label className="flex items-center gap-2">
                                          <input
                                                type="radio"
                                                name="type"
                                                value="entreprise"
                                                checked={formData.type === 'entreprise'}
                                                onChange={handleChange}
                                          />
                                          {t('formMember.form.type.company')}
                                    </label>

                                    <label className="flex items-center gap-2">
                                          <input
                                                type="radio"
                                                name="type"
                                                value="particulier"
                                                checked={formData.type === 'particulier'}
                                                onChange={handleChange}
                                          />
                                          {t('formMember.form.type.individual')}
                                    </label>
                              </div>

                              {/* Input fields */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                          { name: 'firstName', required: true },
                                          { name: 'lastName', required: true },
                                          { name: 'email', required: true },
                                          { name: 'phone', required: true },
                                          { name: 'address', required: true },
                                          { name: 'donationFrequency' },
                                          { name: 'paymentMethod' },
                                          { name: 'profession' },
                                    ].map(({ name, required }) => (
                                          <div key={name} className="bg-gray-100 p-3 rounded-xl">
                                                <input
                                                      name={name}
                                                      value={formData[name]}
                                                      onChange={handleChange}
                                                      placeholder={t(
                                                            `formMember.form.fields.${name}`
                                                      )}
                                                      className="w-full bg-transparent outline-none"
                                                      required={required}
                                                />
                                          </div>
                                    ))}
                              </div>

                              {/* Textarea */}
                              <div className="bg-gray-100 p-4 rounded-xl mt-4">
                                    <textarea
                                          name="motivation"
                                          value={formData.motivation}
                                          onChange={handleChange}
                                          placeholder={t('formMember.form.fields.motivation')}
                                          className="w-full bg-transparent outline-none resize-none"
                                          rows={4}
                                    />
                              </div>

                              {/* File input */}
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <label
                                          htmlFor="file"
                                          className="bg-black text-white px-4 py-2 rounded-xl cursor-pointer shadow"
                                    >
                                          {t('formMember.form.file.label')}
                                    </label>
                                    <span className="text-black">
                                          {formData.file
                                                ? formData.file.name
                                                : t('formMember.form.file.noFile')}
                                    </span>
                                    <input
                                          type="file"
                                          id="file"
                                          name="file"
                                          onChange={handleChange}
                                          className="hidden"
                                    />
                              </div>

                              {/* Submit button */}
                              <button
                                    type="submit"
                                    className="bg-yellow-400 hover:bg-yellow-300 px-6 py-2 rounded-xl shadow font-semibold"
                              >
                                    {loading ? (
                                          <Loader size={5} color="black" />
                                    ) : (
                                          t('formMember.form.submit')
                                    )}
                              </button>
                        </form>

                        <Modal
                              isOpen={showModal}
                              onClose={() => setShowModal(false)}
                              title={t('formMember.modal.successTitle')}
                              message={t('formMember.modal.successMessage')}
                        />
                  </section>
            </section>
      );
};

export default FormMember;
