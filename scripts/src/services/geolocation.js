export async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, (error) => {
            reject("Erro ao recuperar a localização: " + error);
        });
    });
}