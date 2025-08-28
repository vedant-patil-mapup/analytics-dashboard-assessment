import Papa from 'papaparse';

export const fetchCsvText = async (path: string): Promise<string> => {
	const response = await fetch(path);
	if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.status}`);
	return response.text();
};

export const parseCsvToRows = async (csvText: string): Promise<string[][]> => {
	const result = await new Promise<Papa.ParseResult<string[]>>((resolve) => {
		Papa.parse<string[]>(csvText, {
			header: false,
			dynamicTyping: false,
			skipEmptyLines: true,
			worker: true,
			fastMode: true,
			complete: (r) => resolve(r),
		});
	});
	return (result.data as unknown as string[][]) ?? [];
};
