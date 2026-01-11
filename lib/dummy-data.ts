export const travelDestinations = [
    { id: 'paris', name: 'Paris', country: 'France', rating: 4.8 },
    { id: 'london', name: 'London', country: 'UK', rating: 4.7 },
    // ... (generate 50+ items)
];

export const mockStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 1.2 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800.50, change: -0.5 },
    // ... (generate 100+ items)
];

export const mockUsers = Array.from({ length: 100 }, (_, i) => ({
    id: `u${i}`,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    role: i % 10 === 0 ? 'admin' : 'user',
}));
