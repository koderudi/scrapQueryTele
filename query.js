// URL yang ingin diparse
const url = `URL FULL`



// Fungsi untuk mengambil data dari URL dan mengembalikannya dalam format yang diinginkan
function extractData(url) {
  // Ambil hash dari URL
  const hash = new URL(url).hash.slice(1); // Menghapus '#' dari awal hash
  
  // Parse hash sebagai query string
  const queryParams = new URLSearchParams(hash);
  
  // Ambil nilai dari 'tgWebAppData' parameter
  const tgWebAppData = queryParams.get('tgWebAppData');
  
  if (!tgWebAppData) {
    throw new Error('tgWebAppData parameter not found');
  }
  
  // Pisahkan parameter dari query string
  const params = new URLSearchParams(tgWebAppData);
  const userParam = params.get('user');
  const chatInstance = params.get('chat_instance');
  const chatType = params.get('chat_type');
  const authDate = params.get('auth_date');
  const hashValue = params.get('hash');

  if (!userParam || !chatInstance || !chatType || !authDate || !hashValue) {
    throw new Error('Some data is missing in tgWebAppData');
  }

  // Decode nilai parameter 'user'
  const userJSON = decodeURIComponent(userParam);
  
  // Encode nilai parameter 'user' dan parameter lainnya untuk membuat query string
  const userEncoded = encodeURIComponent(userJSON);
  const result = `user=${userEncoded}&chat_instance=${chatInstance}&chat_type=${chatType}&auth_date=${authDate}&hash=${hashValue}`;

  return result;
}

// Ambil data dari URL dalam format yang diinginkan
const result = extractData(url);
console.log(result);
