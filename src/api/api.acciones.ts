const baseUrl = 'https://api.polygon.io/v2/aggs/ticker';
const ticker = 'AAPL';
const range = '1/day';
const startDate = '2023-01-09';
const endDate = '2023-01-09';
const adjusted = true;
const sort = 'asc';
const limit = 120;
const apiKey = '48OvSHcWgZF6Sbf0LhFYyfU2lujA5Ou7';

export function getStockPrice(ticker: string, startDate: Date, endDate: Date): Promise<number> {
    try {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        const url = `${baseUrl}/${ticker}/range/${range}/${formattedStartDate}/${formattedEndDate}?adjusted=${adjusted}&sort=${sort}&limit=${limit}&apiKey=${apiKey}`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('Data:', data, url);
                const currentPrice = data.results[0].c;

                return currentPrice;
            });
    } catch (error) {
        console.error('Error ocurrio al consumir api de polygon:', error);
        throw error;
    }
}
