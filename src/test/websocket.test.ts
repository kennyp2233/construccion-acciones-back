import WebSocket from 'ws';

jest.setTimeout(600000);

describe('WebSocket', () => {
    let ws: any;

    beforeAll(() => {
        ws = new WebSocket('ws://localhost:8081');
    });

    it('should receive a JSON message', (done) => {
        ws.on('message', (data: any) => {
            try {
                const message = JSON.parse(data);
                expect(typeof message).toBe('object');
                done();
            } catch (e) {
                done(e);
            }
        });

    });

    afterAll(() => {
        ws.close();
    });
});