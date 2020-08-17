const request = require('supertest');
const URL = 'https://developers.onemap.sg';
const req = request(URL);

describe('API /commonapi/convert/4326to3414', () => {
    describe('Valid GET request', () => {
        it('returns valid X,Y response with 200 status code', async () => {
            const response = await req.get('/commonapi/convert/4326to3414').query({
                latitude: '1.319728905',
                longitude: '103.8421581'
            });
            expect(response.statusCode).toBe(200);
            const responseText = JSON.parse(response.text);
            expect(responseText).not.toBeNull();
            expect(responseText.X).not.toBeNull();
            expect(responseText.Y).not.toBeNull();
        });
    });

    describe('Invalid GET request', () => {
        it('should return error message when no coordinates are provided', async () => {
            const response = await req.get('/commonapi/convert/4326to3414');
            expect(response.statusCode).toBe(200);
            const responseText = JSON.parse(response.text);
            expect(responseText).not.toBeNull();
            expect(responseText.error).toBe('Please input both latitude and longitude coordinates.');
        });

        it('should return error message when only latitude is provided', async () => {
            const response = await req.get('/commonapi/convert/4326to3414').query({
                latitude: '1.319728905'
            });
            expect(response.statusCode).toBe(200);
            const responseText = JSON.parse(response.text);
            expect(responseText).not.toBeNull();
            expect(responseText.error).toBe('Please input both latitude and longitude coordinates.');
        });

        it('should return error message when only longitude is provided', async () => {
            const response = await req.get('/commonapi/convert/4326to3414').query({
                longitude: '103.8421581'
            });
            expect(response.statusCode).toBe(200);
            const responseText = JSON.parse(response.text);
            expect(responseText).not.toBeNull();
            expect(responseText.error).toBe('Please input both latitude and longitude coordinates.');
        });

        it('should return error message when incorrect values types are provided', async () => {
            const response = await req.get('/commonapi/convert/4326to3414').query({
                latitude: 'hello',
                longitude: 'world'
            });
            expect(response.statusCode).toBe(200);
            const responseText = JSON.parse(response.text);
            expect(responseText).not.toBeNull();
            expect(responseText.error).toBe('Please input a latitude and longitude coordinates');
        });

        it('should return error message when empty values are provided', async () => {
            const response = await req.get('/commonapi/convert/4326to3414').query({
                latitude: '',
                longitude: ''
            });
            expect(response.statusCode).toBe(200);
            const responseText = JSON.parse(response.text);
            expect(responseText).not.toBeNull();
            expect(responseText.error).toBe('Please input both latitude and longitude coordinates.');
        });
    })
});