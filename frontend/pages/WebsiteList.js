// components/WebsiteList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/WebsiteList.module.css';

const apiEndpoint = 'https://3000-lskit-shopnode-nzbi8pq8w1c.ws-us107.gitpod.io/api/websites';

const WebsiteList = () => {
  const [websites, setWebsites] = useState([]);
  const [editingWebsite, setEditingWebsite] = useState(null);

  const fetchWebsites = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      setWebsites(response.data);
    } catch (error) {
      console.error('Error fetching websites:', error);
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  const handleEdit = (website) => {
    setEditingWebsite(website);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await axios.put(`${apiEndpoint}/${editingWebsite._id}`, updatedData);
      console.log('Data updated successfully:', response.data);

      // Reset editing state
      setEditingWebsite(null);

      // Refetch the updated data
      fetchWebsites();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingWebsite(null);
  };

  const handleDelete = async (websiteId) => {
    try {
      const response = await axios.delete(`${apiEndpoint}/${websiteId}`);
      console.log('Data deleted successfully:', response.data);

      // Refetch the updated data after deletion
      fetchWebsites();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className={styles.websiteList}>
      <h2>Website List</h2>

      <ul>
        {websites.map((website) => (
          <li key={website._id} className={styles.websiteItem}>
            {editingWebsite && editingWebsite._id === website._id ? (
              // Edit form for the currently selected website
              <div className={styles.editForm}>
                <label htmlFor="editTitle">Title:</label>
                <input type="text" id="editTitle" value={editingWebsite.title} onChange={(e) => setEditingWebsite({ ...editingWebsite, title: e.target.value })} />

                <label htmlFor="editImage">Image URL:</label>
                <input type="text" id="editImage" value={editingWebsite.image} onChange={(e) => setEditingWebsite({ ...editingWebsite, image: e.target.value })} />

                <label htmlFor="editDescription">Description:</label>
                <textarea id="editDescription" value={editingWebsite.description} onChange={(e) => setEditingWebsite({ ...editingWebsite, description: e.target.value })} />

                <button onClick={() => handleUpdate(editingWebsite)}>Update</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              // Display the website details
              <>
                <img src={website.image} alt={website.title} />
                <div>
                  <h3>{website.title}</h3>
                  <p>{website.description}</p>
                  <div className={styles.actions}>
                    <button onClick={() => handleEdit(website)}>Edit</button>
                    <button onClick={() => handleDelete(website._id)}>Delete</button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebsiteList;
