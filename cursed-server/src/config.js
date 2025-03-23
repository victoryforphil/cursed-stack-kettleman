export const config = {
    http: {
        address: process.env.HTTP_ADDRESS || '0.0.0.0',
        port: parseInt(process.env.HTTP_PORT || '4151')
    }
};
