import { useEffect, useState } from 'react';
import axios from 'axios';

const useBalance = () => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
          },
        });

        setBalance(response.data.balance);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return { balance, isLoading, error };
};

export default useBalance;
