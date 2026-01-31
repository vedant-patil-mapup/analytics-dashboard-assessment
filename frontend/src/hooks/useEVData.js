import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export const useEVData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.csv');
                if (!response.ok) {
                    throw new Error('Failed to fetch CSV data');
                }
                const csvText = await response.text();

                Papa.parse(csvText, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setData(results.data);
                        setLoading(false);
                    },
                    error: (err) => {
                        setError(err);
                        setLoading(false);
                    }
                });
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};
