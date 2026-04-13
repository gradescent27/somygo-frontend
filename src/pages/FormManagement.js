

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

const Toast = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded-md shadow-lg text-white transition-transform ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <p>{message}</p>
      <button onClick={onClose} className="mt-2 text-sm underline">
        Close
      </button>
    </div>
  );
};

const FormManagement = () => {
  const [forms, setForms] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  const [, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null); // Toast message state

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(searchEmail);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchEmail]);

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${BASE_URL}/forms`, {
          params: { status: statusFilter, email: debouncedSearch, page, limit: 10 },
        });

        if (response.data && Array.isArray(response.data.forms)) {
          setForms(response.data.forms);
          setTotalCount(response.data.totalCount || 0);
        } else {
          setForms([]);
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
        setError('Failed to load data');
        setForms([]);
      }

      setLoading(false);
    };

    fetchForms();
  }, [statusFilter, debouncedSearch, page]);

  const handleMarkAsCalled = async (formId) => {
    try {
      await axios.put(`${BASE_URL}/forms/${formId}/called`);
      setForms((prevForms) =>
        prevForms.map((form) =>
          form._id === formId ? { ...form, called: true, stage: 'called' } : form
        )
      );
      showToast('Marked as called!', 'success');
    } catch (error) {
      console.error('Error marking as called:', error);
      showToast('Failed to mark as called', 'error');
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const clearSearch = () => {
    setSearchEmail('');
    setDebouncedSearch('');
  };

  return (
    <div className="p-6 bg-white min-h-screen container">
      <h1 className="text-3xl font-bold mb-6 text-acBlack">Form Management</h1>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by email..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-acblue"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          {searchEmail && (
            <button
              className="absolute right-2 top-2 p-2 text-gray-500 hover:text-black"
              onClick={clearSearch}
            >
              ❌
            </button>
          )}
        </div>
        <select
          className="p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-acblue"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="feedback">Feedback</option>
          <option value="called">Called</option>
          <option value="follow-up">Follow-Up</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader border-t-4 border-b-4 border-acBlack w-12 h-12 rounded-full animate-spin"></div>
        </div>
      ) : forms.length === 0 ? (
        <p className="text-gray-500 text-center">No forms found.</p>
      ) : (
        <table className="w-full border border-gray-200 bg-white rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-100">
              {['Date', 'First Name', 'Last Name', 'Email', 'Phone', 'Amount', 'Type', 'Method', 'Status', 'Actions'].map((header) => (
                <th key={header} className="border border-gray-200 p-3 text-left text-gray-700">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form._id} className="border border-gray-200">
                <td className="p-3">{new Date(form.createdAt).toLocaleDateString()}</td>
                <td className="p-3">{form.responses?.first_name || 'N/A'}</td>
                <td className="p-3">{form.responses?.surname || 'N/A'}</td>
                <td className="p-3">{form.email}</td>
                <td className="p-3">{form.phone}</td>
                <td className="p-3">{form.amount}</td>
                <td className="p-3">{form.type}</td>
                <td className="p-3">{form.method}</td>
                <td className="p-3">{form.stage}</td>
                <td className="p-3">
                  {!form.called ? (
                    <button
                      className="bg-acBlack text-white px-4 py-2 rounded-md transition-colors hover:bg-acGray"
                      onClick={() => handleMarkAsCalled(form._id)}
                    >
                      Mark as Called
                    </button>
                  ) : (
                    <span className="text-green-500">✔ Called</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default FormManagement;
