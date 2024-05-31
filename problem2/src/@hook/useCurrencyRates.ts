import { useEffect, useState } from "react";
import axios from "axios";

interface RatesProps {
  currency: string;
  date: string;
  price: number;
}

export const useCurrencyRates = () => {
  const [rates, setRates] = useState<RatesProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Fetch token prices from the provided URL
    axios
      .get("https://interview.switcheo.com/prices.json")
      .then((response) => {
        const rates = response.data;
        const uniqueRates = rates.filter((obj: RatesProps, index: number) => {
          return (
            index ===
            rates.findIndex(
              (rate: RatesProps) => obj.currency === rate.currency
            )
          );
        });
        setRates(uniqueRates);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching token prices:", error);
      });
  }, []);

  return { rates, error };
};
