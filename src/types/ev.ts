export interface EVRecord {
	vin: string;
	county: string;
	city: string;
	state: string;
	postalCode: string;
	year: number;
	make: string;
	model: string;
	type: string;
	cafv: string;
	electricRange: number | null;
	msrp: number | null;
}

export interface EVDataAggregates {
	evsByMake: { labels: string[]; series: number[] };
	evsByType: { labels: string[]; series: number[] };
	evsByYear: { labels: string[]; series: number[] };
	stackedByTypeOverYears: { labels: string[]; series: { name: string; data: number[] }[] };
	cafvBreakdown: { labels: string[]; series: number[] };
	rangeBuckets: { labels: string[]; series: number[] };
	msrpBuckets: { labels: string[]; series: number[] };
	yearVsRange: { x: number; y: number }[];
	topMakesTrend: { labels: string[]; series: { name: string; data: number[] }[] };
	topModels: { model: string; count: number }[];
	counties: { county: string; count: number }[];
	averageRange: number | null;
	p50Range: number | null;
	p90Range: number | null;
	totalEVs: number;
}

export interface EVFilters {
	make?: string;
	type?: string;
	yearMin?: number;
	yearMax?: number;
}
