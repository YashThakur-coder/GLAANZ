const https = require('https');
const fs = require('fs');
const url = "https://assets.mixkit.co/videos/preview/mixkit-woman-opening-a-jewelry-box-43306-large.mp4";
const file = fs.createWriteStream("c:/Users/Admin/Downloads/GLAANZ/frontend/public/Videos/unboxing_bg.mp4");

https.get(url, (response) => {
    if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Download complete.');
        });
    } else {
        console.error('Failed with status: ', response.statusCode);
    }
}).on('error', (err) => {
    console.error(err.message);
});
