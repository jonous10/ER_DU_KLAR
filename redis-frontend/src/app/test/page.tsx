"use client";

import { useState } from 'react';
import { SaveToRedis, GetFromRedis } from '@/api/language'; // Adjust this import path as needed

const RedisTestPage = () => {
  const [inputData, setInputData] = useState('');
  const [storedData, setStoredData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputData) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await SaveToRedis(inputData);
      alert(result.message || 'Data saved!');
      setInputData('');
    } catch (err) {
      console.error(err);
      setError('An error occurred while saving data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await GetFromRedis();
      setStoredData(result.data || null);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Redis Data Input & View</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={handleInputChange}
          placeholder="Enter data"
          style={{ padding: '8px', width: '300px' }}
        />
        <button type="submit" disabled={isLoading} style={{ padding: '8px', marginLeft: '10px' }}>
          {isLoading ? 'Saving...' : 'Save to Redis'}
        </button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleFetchData} disabled={isLoading} style={{ padding: '8px' }}>
          {isLoading ? 'Fetching...' : 'Fetch Data from Redis'}
        </button>

        {storedData && (
          <div style={{ marginTop: '10px' }}>
            <h2>Stored Data in Redis:</h2>
            <pre>{JSON.stringify(storedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedisTestPage;
