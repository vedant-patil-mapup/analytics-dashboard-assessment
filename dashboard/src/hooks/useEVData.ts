import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { EVData, EVRecord } from '../types/ev-data';

export const useEVData = () => {
    const [data, setData] = useState<EVRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadConstants = async () => {
           
            try {
                const { EV_DATA_SUBSET } = await import('../data/ev-data-constant');

                const formattedData: EVRecord[] = EV_DATA_SUBSET.map((row: any) => ({
                    vin: row["VIN (1-10)"],
                    county: row.County,
                    city: row.City,
                    state: row.State,
                    postalCode: row["Postal Code"],
                    modelYear: parseInt(row["Model Year"], 10) || 0,
                    make: row.Make,
                    model: row.Model,
                    evType: row["Electric Vehicle Type"],
                    cafvEligibility: row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"],
                    electricRange: parseInt(row["Electric Range"], 10) || 0,
                    baseMsrp: parseInt(row["Base MSRP"], 10) || 0,
                    legislativeDistrict: row["Legislative District"],
                    dolVehicleId: row["DOL Vehicle ID"],
                    vehicleLocation: row["Vehicle Location"],
                    electricUtility: row["Electric Utility"],
                    censusTract: row["2020 Census Tract"]
                })).filter((r: unknown) => (r as EVRecord).vin);

                setData(formattedData);
                setLoading(false);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Unknown error';
                setError(message);
                setLoading(false);
            }
        };

        const fetchData = async () => {
            try {
                Papa.parse<EVData>('/data/Electric_Vehicle_Population_Data.csv', {
                    download: true,
                    header: true,
                    worker: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        if (results.errors.length > 0) {
                            console.warn('Parse errors:', results.errors);
                        }

                        const formattedData: EVRecord[] = results.data.map((row) => ({
                            vin: row["VIN (1-10)"],
                            county: row.County,
                            city: row.City,
                            state: row.State,
                            postalCode: row["Postal Code"],
                            modelYear: parseInt(row["Model Year"], 10) || 0,
                            make: row.Make,
                            model: row.Model,
                            evType: row["Electric Vehicle Type"],
                            cafvEligibility: row["Clean Alternative Fuel Vehicle (CAFV) Eligibility"],
                            electricRange: parseInt(row["Electric Range"], 10) || 0,
                            baseMsrp: parseInt(row["Base MSRP"], 10) || 0,
                            legislativeDistrict: row["Legislative District"],
                            dolVehicleId: row["DOL Vehicle ID"],
                            vehicleLocation: row["Vehicle Location"],
                            electricUtility: row["Electric Utility"],
                            censusTract: row["2020 Census Tract"]
                        })).filter(r => r.vin); // Filter out any possibly empty rows

                        setData(formattedData);
                        setLoading(false);
                    },
                    error: (err: Error) => {
                        setError(err.message);
                        setLoading(false);
                    }
                });
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Unknown error';
                setError(message);
                setLoading(false);
            }
        };

        // Use constant data for development stability/speed, switch to fetchData() for full production dataset
        // loadConstants();
        fetchData();
    }, []);

    return { data, loading, error };
};
