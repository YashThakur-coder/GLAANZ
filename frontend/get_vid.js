import https from 'https';
https.get('https://coverr.co/search?q=unboxing', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        const urls = data.match(/https:\/\/[a-zA-Z0-9.\-\/]+\.mp4/g);
        if (urls) {
            console.log(urls.filter(u => u.includes('coverr')));
        } else {
            console.log('No mp4 URLs found');
        }
    });
}).on('error', console.error);
