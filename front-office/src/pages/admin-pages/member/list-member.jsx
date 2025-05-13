import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../config/API_ENDPOINT';
import OverlayBlocker from './../../../components/main/overlay-blocked';

const MemberList = () => {
      const [members, setMembers] = useState([]);

      useEffect(() => {
            async function memberFunc() {
                  try {
                        const fetchRequest = await fetch(API_ENDPOINTS.getMembers);
                        const response = await fetchRequest.json();

                        setMembers(response);
                  } catch (error) {
                        console.log(error);
                  }
            }

            memberFunc();
      }, []);

      const itemsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);

      const totalPages = Math.ceil(members.length / itemsPerPage);
      const paginated = members.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

      return (
            <div>
                  <div className="bg-white rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-1">Liste des members</h2>
                        <p className="text-sm text-gray-600 mb-4">Tous les member fmed.</p>

                        <div className="flex justify-end gap-4 mb-4">
                              <Link
                                    to={'/admin/add-article'}
                                    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 text-sm font-semibold"
                              >
                                    Ajouter un membre
                              </Link>
                              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm font-semibold">
                                    Filtrer les membre
                              </button>
                        </div>

                        <div className="overflow-auto">
                              <table className="min-w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                          <tr>
                                                <th className="px-4 py-2">N°</th>
                                                <th className="px-4 py-2">image</th>
                                                <th className="px-4 py-2">Nom complet</th>
                                                <th className="px-4 py-2">phone</th>
                                                <th className="px-4 py-2">poste</th>
                                                <th className="px-4 py-2">type</th>
                                                <th className="px-4 py-2">option</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {paginated.map((member, index) => (
                                                <tr key={member.id} className="border-t">
                                                      <td className="px-4 py-2">{index + 1}</td>
                                                      <td className="px-4 py-2">
                                                            <img
                                                                  src={member.imagePath}
                                                                  alt={member.imageName}
                                                                  className="w-10 h-10 rounded object-cover"
                                                            />
                                                      </td>
                                                      <td className="px-4 py-2">
                                                            {member.fullName}
                                                      </td>
                                                      <td className="px-4 py-2">{member.phone}</td>
                                                      <td className="px-4 py-2 capitalize">
                                                            {member.poste}
                                                      </td>
                                                      <td className="px-4 py-2 capitalize">
                                                            {member.memberType}
                                                      </td>
                                                      <td className="px-4 py-2">
                                                            <div className="flex justify-center gap-2">
                                                                  <Link className="text-blue-600 cursor-pointer hover:text-blue-800">
                                                                        <i class="far fa-eye"></i>
                                                                  </Link>
                                                                  <Link
                                                                        className="text-red-600 cursor-pointer hover:text-red-800"
                                                                        to={'/'}
                                                                  >
                                                                        <i class="far fa-trash-can"></i>
                                                                  </Link>
                                                            </div>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>

                              <div className="flex justify-end">
                                    <Pagination
                                          currentPage={currentPage}
                                          totalPages={totalPages}
                                          onPageChange={(page) => setCurrentPage(page)}
                                    />
                              </div>
                        </div>
                  </div>

                  <OverlayBlocker />
            </div>
      );
};

export default MemberList;
