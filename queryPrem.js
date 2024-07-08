// URL yang ingin diparse
const url = `URL`
  
//  CONTOH = 'https://tgapp.matchain.io/#tgWebAppData=user%3D%257B%2522id%2522%253A1637380593%252C%2522first_name%2522%253A%2522Mas%2520R%2528%255C%2522%25E2%2581%25A7%253B%2528%255C%2522%2522%252C%2522last_name%2522%253A%2522%25F0%259D%2595%25BD%25F0%2599%2595%25AF%25F0%259D%2596%258E%2522%252C%2522username%2522%253A%2522arp_officiall%2522%252C%2522language_code%2522%253A%2522id%2522%252C%2522is_premium%2522%253Atrue%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D82189002915371406%26chat_type%3Dsender%26auth_date%3D172032224%26hash%3D6cb09c802a3f53a6ab1e04b7fabd3144c8f85577aad297e9cbb6559b5fdb3&tgWebAppVersion=7.6&tgWebAppPlatform=android&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22secondary_bg_color%22%3A%22%23f0f0f0%22%2C%22text_color%22%3A%22%23222222%22%2C%22hint_color%22%3A%22%23a8a8a8%22%2C%22link_color%22%3A%22%232678b6%22%2C%22button_color%22%3A%22%2350a8eb%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22header_bg_color%22%3A%22%23527da3%22%2C%22accent_text_color%22%3A%22%231c93e3%22%2C%22section_header_text_color%22%3A%22%233a95d5%22%2C%22subtitle_text_color%22%3A%22%2382868a%22%2C%22destructive_text_color%22%3A%22%23cc2929%22%2C%22section_separator_color%22%3A%22%23d9d9d9%22%7D';

// Fungsi untuk mengambil data dari URL dan mengembalikannya dalam format yang diinginkan
function extractData(url) {
  // Ambil hash dari URL
  // Menghapus '#' dari awal hash
  const hash = new URL(url).hash.slice(1); 

  
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
