import { useState } from 'react';

const RedisTestPage = () => {
  const [inputData, setInputData] = useState('');
  const [storedData, setStoredData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle input data change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  // Function to handle the form submission and save data to Redis
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputData) return;

    setIsLoading(true);
    setError(null);

    try {
      // Assuming Redis is being exposed via an API (e.g., Next.js API route)
      const response = await fetch('/api/save-to-redis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData }),
      });

      if (!response.ok) {
        throw new Error('Failed to save data to Redis');
      }

      // Reset input field after successful submission
      setInputData('');
      alert('Data saved to Redis!');
    } catch (err) {
      setError('An error occurred while saving data.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch data from Redis and display it
  const handleFetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/get-from-redis');
      if (!response.ok) {
        throw new Error('Failed to fetch data from Redis');
      }
      const data = await response.json();
      setStoredData(data);
    } catch (err) {
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
