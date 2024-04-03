import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
  const [storedNumbers, setStoredNumbers] = useState([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:9876/numbers/e'); // Assuming fetching even numbers
      const fetchedNumbers = response.data.numbers || [];
      const uniqueNumbers = Array.from(new Set([...storedNumbers, ...fetchedNumbers]));
      const limitedNumbers = uniqueNumbers.slice(-10); // Limiting to window size
      const avg = calculateAverage(limitedNumbers);
      setStoredNumbers(limitedNumbers);
      setAverage(avg);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  };

  return (
    <div>
      <h2>Average Calculator</h2>
      <p>Stored Numbers: {storedNumbers.join(', ')}</p>
      <p>Average: {average.toFixed(2)}</p>
    </div>
  );
};

export default AverageCalculator;