import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/PostData.module.css'; // Import the CSS module
import WebsiteList from '../pages/WebsiteList';

const apiEndpoint = process.env.NEXT_PUBLIC_API_URL;

const PostData = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
  });

  const handlePostData = async () => {
    try {
      const response = await axios.post(apiEndpoint, formData);
      console.log('Data posted successfully:', response.data);
      // Optionally, you can reset the form after successful submission
      setFormData({
        title: '',
        image: '',
        description: '',
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <>
    <div className={styles.container}>
      <h1>Post Data</h1>

      {/* Form for posting data */}
      <div className={styles.form}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

        <label htmlFor="image">Image URL:</label>
        <input type="text" id="image" name="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

        <button onClick={handlePostData}>Post Data</button>
      </div>
    </div>
    <WebsiteList />
    </>

  );
};

export default PostData;
