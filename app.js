const app = document.querySelector('#app');
const announcer = document.querySelector('#announcer');

const SAVE_KEY = 'tioman_cyoa_part1_save';
const CHECKPOINT_KEY = 'tioman_cyoa_part1_checkpoints';
const ENDINGS_KEY = 'tioman_cyoa_part1_endings';

const ASSETS = {
  opening: 'assets/tioman/tioman-opening-resort-v2.jpg',
  hero: 'assets/tioman/tioman-jetty-hero.jpg',
  reunion: 'assets/tioman/mersing-reunion.jpg',
  tekek: 'assets/tioman/kampung-tekek.jpg',
  jetty: 'assets/tioman/jetty-confrontation.jpg',
  missing: 'assets/tioman/daniel-missing.jpg',
};

const CHARACTERS = {
  Aiman: {
    initials: 'AH',
    role: 'Ketua yang tidak rasmi',
    body: 'Tenang dan biasanya membuat keputusan apabila kumpulan berada dalam masalah.',
  },
  Sara: {
    initials: 'SI',
    role: 'Pemerhati yang tajam',
    body: 'Berani, teliti dan sukar mempercayai jawapan yang tidak lengkap.',
  },
  'Mei Lin': {
    initials: 'ML',
    role: 'Perakam kumpulan',
    body: 'Praktikal, bijak teknologi dan hampir sentiasa memegang telefonnya.',
  },
  Arjun: {
    initials: 'AR',
    role: 'Penceri suasana',
    body: 'Paling banyak bergurau, tetapi mudah menyalahkan dirinya sendiri.',
  },
  Daniel: {
    initials: 'DL',
    role: 'Jurugambar yang pendiam',
    body: 'Semakin menjauh sejak mereka bersekolah berasingan. Dialah yang memilih Tioman.',
  },
  Hafiz: {
    initials: 'HR',
    role: 'Anak tempatan Tioman',
    body: 'Membantu operator bot dan mengambil kerja fotografi bawah air. Daniel mengenalinya secara rahsia.',
  },
  'Pak Razak': {
    initials: 'PR',
    role: 'Pemilik homestay',
    body: 'Ramah, tetapi reaksinya terhadap Daniel dan jeti lama sukar dijelaskan.',
  },
};

const EVIDENCE = {
  'Foto Bot': {
    type: 'Foto',
    title: 'Foto Bot',
    body: 'Bot putih dengan tiga lelaki dan nombor pendaftaran yang separuh terlindung.',
    question: 'Mengapa Daniel merakam bot ini berkali-kali?',
  },
  'Foto Pertukaran': {
    type: 'Pemerhatian',
    title: 'Foto Pertukaran',
    body: 'Daniel kelihatan menyerahkan sesuatu seperti kad memori kecil kepada Hafiz.',
    question: 'Apakah yang dipindahkan antara mereka?',
  },
  'Telefon Hafiz': {
    type: 'Peranti',
    title: 'Telefon Hafiz',
    body: 'Telefon retak yang ditemui di dalam lumpur. Notifikasi terakhirnya ialah UPLOAD COMPLETE dan 1 FILE SENT.',
    question: 'Fail apa yang dihantar, dan kepada siapa?',
  },
  'Polaroid Jeti': {
    type: 'Foto',
    title: 'Polaroid Jeti',
    body: 'Gambar lima sahabat di jeti lama yang diambil dari arah resort.',
    question: 'Siapa yang cukup dekat untuk mengambil gambar ini?',
  },
};

const SCENES = [
  {
    id: 'P1-S01', number: 1, title: 'Lima Orang, Seperti Dulu',
    location: 'Terminal Feri Mersing', time: '9.42 pagi', image: ASSETS.reunion,
    alt: 'Lima remaja Malaysia bertemu semula di Terminal Feri Mersing pada pagi yang cerah.', tone: 'warm',
    chunks: [
      { type: 'narration', text: 'Terminal Feri Mersing penuh dengan bunyi enjin, pengumuman perjalanan dan pelancong yang cuba memahami tiket mereka. Di tengah-tengah semua itu, Arjun berdiri dengan sebungkus keropok lekor.' },
      { type: 'dialogue', speaker: 'Arjun', text: 'Lima belas minit lagi.' },
      { type: 'dialogue', speaker: 'Mei Lin', text: 'Kau dah cakap lima belas minit sejak setengah jam tadi.' },
      { type: 'narration', text: 'Sudah hampir setahun sejak mereka berlima berada di tempat yang sama. Sekolah menengah memecahkan rutin lama mereka. Daniel pula semakin jarang muncul dalam kumpulan mesej.' },
      { type: 'narration', text: 'Namun idea reunion ini datang daripadanya. Dua minggu selepas mesej ringkasnya, mereka berada di Mersing. Hampir semuanya.' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Boleh tak korang mengumpat perlahan sikit?' },
      { type: 'narration', text: 'Daniel muncul dengan beg galas hitam dan kamera di dada. Lebih kurus, lebih diam. Matanya seperti sentiasa memeriksa sesuatu di belakang orang lain.' },
      { type: 'beat', text: 'Untuk sesaat, selepas satu foto berkumpulan, mereka berlima kembali seperti berumur dua belas tahun.' },
    ],
    choices: [
      { id: 'P1-S01-A', label: 'Tegur Daniel secara peribadi', detail: 'Tanya sama ada dia benar-benar okay.', next: 'P1-S02', effects: { trustDaniel: 1 }, flags: ['AIMAN_NOTICES_DANIEL'] },
      { id: 'P1-S01-B', label: 'Biarkan sahaja', detail: 'Jangan rosakkan mood reunion.', next: 'P1-S02' },
      { id: 'P1-S01-C', label: 'Usik Daniel bersama-sama', detail: 'Beri ruang kepada nostalgia lama.', next: 'P1-S02', flags: ['DANIEL_UNQUESTIONED'] },
    ],
  },
  {
    id: 'P1-S02', number: 2, title: 'Laut Yang Terlalu Tenang',
    location: 'Feri ke Pulau Tioman', time: '11.18 pagi', image: ASSETS.reunion, imagePosition: '70% center',
    alt: 'Feri penumpang bergerak dari Mersing menuju Pulau Tioman.', tone: 'calm',
    chunks: [
      { type: 'narration', text: 'Feri meninggalkan Mersing sedikit selepas pukul sepuluh. Goyangan laut dan bunyi enjin yang monoton akhirnya membuatkan kabin senyap.' },
      { type: 'narration', text: 'Daniel berdiri seorang diri di belakang feri. Aiman menemuinya sedang mengambil gambar horizon.' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Kau pernah fikir tak, kalau kau nampak sesuatu yang salah, tapi kalau kau buka mulut, orang lain boleh kena sekali?' },
      { type: 'narration', text: 'Telefon Daniel bergetar. Wajahnya berubah, tetapi dia mengatakan mesej itu cuma spam.' },
      { type: 'narration', text: 'Sebuah bot laju putih memotong feri dari jauh. Daniel mengangkat kamera. Klik. Klik. Klik.' },
      { type: 'dialogue', speaker: 'Aiman', text: 'Kenal?' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Tak.' },
      { type: 'beat', text: 'Daniel memeriksa gambar bot itu dua kali.' },
    ],
    choices: [
      { id: 'P1-S02-A', label: 'Minta tengok gambar bot', detail: 'Perhatikan apa yang menarik perhatian Daniel.', next: 'P1-S03', effects: { evidence: 1 }, flags: ['SAW_BOAT_EARLY'], inventory: ['Foto Bot'] },
      { id: 'P1-S02-B', label: 'Tanya tentang mesej telefon', detail: 'Desak Daniel untuk menjawab.', next: 'P1-S03', effects: { trustDaniel: -1 }, flags: ['DANIEL_DEFENSIVE'] },
      { id: 'P1-S02-C', label: 'Jangan ganggu Daniel', detail: 'Biarkan dia menikmati perjalanan.', next: 'P1-S03' },
    ],
  },
  {
    id: 'P1-S03', number: 3, title: 'Tioman',
    location: 'Kampung Tekek, Pulau Tioman', time: '2.06 petang', image: ASSETS.tekek,
    alt: 'Homestay sederhana dan motosikal di sebuah lorong Kampung Tekek.', tone: 'day',
    chunks: [
      { type: 'narration', text: 'Tioman muncul perlahan-lahan di horizon. Bukit hijau, batu granit dan air yang semakin jernih. Mereka turun berhampiran Kampung Tekek.' },
      { type: 'narration', text: 'Bau laut bercampur minyak bot. Motosikal kecil bergerak melalui jalan sempit. Homestay mereka sederhana, dengan dua bilik dan beranda kayu.' },
      { type: 'dialogue', speaker: 'Pak Razak', text: 'Budak-budak KL?' },
      { type: 'dialogue', speaker: 'Arjun', text: 'Shah Alam pun ada, pak cik.' },
      { type: 'narration', text: 'Apabila Daniel bersalaman dengan Pak Razak, pemilik homestay itu berhenti seketika. Pandangan mereka bertemu terlalu lama.' },
      { type: 'dialogue', speaker: 'Pak Razak', text: 'Kamu pernah datang sini?' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Tak pernah.' },
      { type: 'beat', text: 'Sara pasti nada Daniel berubah.' },
    ],
    choices: [
      { id: 'P1-S03-A', label: 'Sara tanya Daniel', detail: 'Kenapa Pak Razak nampak seperti mengenalinya?', next: 'P1-S04', effects: { trustDaniel: -1 }, flags: ['SARA_SUSPICIOUS_DANIEL'] },
      { id: 'P1-S03-B', label: 'Sara tanya Pak Razak', detail: 'Uji reaksi pemilik homestay itu.', next: 'P1-S04', effects: { evidence: 1 }, flags: ['PAK_RAZAK_EVASIVE'] },
      { id: 'P1-S03-C', label: 'Abaikan', detail: 'Ini percutian. Nikmati sahaja.', next: 'P1-S04' },
    ],
  },
  {
    id: 'P1-S04', number: 4, title: 'Tiga Hari Yang Hampir Sempurna',
    location: 'Kampung Tekek', time: 'Hari kedua, 2.34 petang', image: ASSETS.tekek, imagePosition: 'center',
    alt: 'Sekumpulan remaja berehat berhampiran homestay di Kampung Tekek sementara Daniel bercakap dengan Hafiz.', tone: 'day',
    chunks: [
      { type: 'narration', text: 'Hari pertama berlalu tanpa masalah. Mereka menyewa motosikal, Arjun hampir masuk longkang, dan Sara ketawa sampai menangis.' },
      { type: 'narration', text: 'Hari kedua lebih baik. Snorkelling, air biru jernih, ikan karang, kemudian makan tengah hari di gerai kecil dengan kipas dinding yang berbunyi kuat.' },
      { type: 'narration', text: 'Daniel kelihatan lebih santai. Hampir seperti dirinya dahulu. Kemudian Hafiz muncul, pemuda yang membantu operator bot membawa mereka snorkelling.' },
      { type: 'narration', text: 'Hafiz tersenyum kepada kumpulan itu. Apabila dia melihat Daniel, senyum itu hilang. Daniel bangun untuk membeli air. Hafiz mengikutnya beberapa saat kemudian.' },
      { type: 'beat', text: 'Sara perasan. Dia bangun perlahan-lahan.' },
    ],
    choices: [
      { id: 'P1-S04-A', label: 'Ikuti Daniel dan Hafiz', detail: 'Dengar perbualan mereka secara senyap.', next: 'P1-S05', effects: { evidence: 2 }, flags: ['SARA_HEARD_HAFIZ'] },
      { id: 'P1-S04-B', label: 'Beritahu Aiman', detail: 'Perhatikan mereka dari jauh bersama-sama.', next: 'P1-S05', effects: { evidence: 1, trustAimanSara: 1 }, flags: ['SAW_EXCHANGE'], inventory: ['Foto Pertukaran'] },
      { id: 'P1-S04-C', label: 'Jangan campur tangan', detail: 'Biarkan Daniel kembali apabila dia mahu.', next: 'P1-S05' },
    ],
  },
  {
    id: 'P1-S05', number: 5, title: 'Malam Terakhir',
    location: 'Gerai makan, Kampung Tekek', time: '10.37 malam', image: ASSETS.tekek, imagePosition: '20% center',
    alt: 'Gerai makan kampung di Pulau Tioman sebelum hujan malam.', tone: 'dusk',
    chunks: [
      { type: 'narration', text: 'Malam terakhir bermula dengan terlalu banyak makanan: ikan bakar, tom yam, telur dadar, kangkung belacan dan satu lagi pinggan nasi yang Arjun tidak perlukan.' },
      { type: 'narration', text: 'Hujan turun sekitar pukul sepuluh setengah. Di bawah lampu kalimantang, mereka bercakap tentang guru paling garang, hari sukan, kantin dan crush lama.' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Korang ingat tak kita pernah janji satu benda?' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Kalau salah seorang daripada kita ada masalah, yang lain tak lari.' },
      { type: 'dialogue', speaker: 'Arjun', text: 'Bro, kita umur sebelas masa tu.' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Janji tetap janji.' },
      { type: 'narration', text: 'Meja tiba-tiba senyap. Di luar, hujan semakin lebat.' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Ada tempat aku nak tunjuk.' },
    ],
    next: 'P1-S06', continueLabel: 'IKUT DANIEL',
  },
  {
    id: 'P1-S06', number: 6, title: 'Resort Lama',
    location: 'Laluan pesisir Kampung Tekek', time: '11.43 malam', image: ASSETS.jetty,
    alt: 'Resort pulau yang ditinggalkan, tersembunyi oleh hutan dan hujan malam.', tone: 'night',
    chunks: [
      { type: 'narration', text: 'Mereka berjalan hampir dua puluh minit. Jalan kampung gelap, laut di sebelah kiri dan hutan di sebelah kanan.' },
      { type: 'narration', text: 'Daniel berhenti di hadapan struktur lama yang hampir ditelan pokok. Beberapa tingkap pecah. Papan nama sudah hilang. Sebuah resort terbengkalai.' },
      { type: 'dialogue', speaker: 'Mei Lin', text: 'Daniel, ini bukan sightseeing.' },
      { type: 'narration', text: 'Daniel memeriksa jam, kemudian berjalan menuju laluan kecil di tepi resort.' },
      { type: 'dialogue', speaker: 'Sara', text: 'Aku tak suka benda ni.' },
      { type: 'beat', text: 'Daniel semakin jauh. Mereka perlu memilih.' },
    ],
    choices: [
      { id: 'P1-S06-A', label: 'Semua ikut Daniel', detail: 'Kekal bersama walaupun risikonya meningkat.', next: 'P1-S07A', effects: { trust: 1, danger: 1 }, flags: ['GROUP_TOGETHER'] },
      { id: 'P1-S06-B', label: 'Aiman cuba hentikan Daniel', detail: 'Daniel pergi dahulu. Yang lain mengejar.', next: 'P1-S07B', effects: { trustDaniel: -1, danger: 1 } },
      { id: 'P1-S06-C', label: 'Sara dan Mei Lin pulang', detail: 'Pisahkan kumpulan dan cari jalan selamat.', next: 'P1-S07C', effects: { trust: -1 }, flags: ['GROUP_SPLIT'] },
    ],
  },
  {
    id: 'P1-S07A', number: 7, title: 'Suara di Hujung Jeti',
    location: 'Jeti lama', time: '11.57 malam', image: ASSETS.jetty,
    alt: 'Cahaya lampu suluh membelah hujan di sebuah jeti kayu lama.', tone: 'night', branch: 'A',
    chunks: [
      { type: 'narration', text: 'Mereka bergerak bersama melalui laluan basah di belakang resort. Kemudian terdengar dua lelaki bertengkar. Salah seorang ialah Hafiz.' },
      { type: 'dialogue', speaker: 'Hafiz', text: 'Telefon tu bukan hak kau.' },
      { type: 'dialogue', speaker: 'Hafiz', text: 'Aku dah copy semuanya.' },
      { type: 'narration', text: 'Daniel mengeluarkan telefon dan mula merakam.' },
      { type: 'dialogue', speaker: 'Sara', text: 'Daniel. Jangan.' },
      { type: 'narration', text: 'Lampu suluh tiba-tiba menyapu ke arah mereka.' },
      { type: 'dialogue', speaker: 'Tidak dikenali', text: 'Siapa dekat sana?' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Lari.' },
    ],
    next: 'P1-S08', continueLabel: 'LARI',
  },
  {
    id: 'P1-S07B', number: 7, title: 'Daniel Sudah Tahu',
    location: 'Jeti lama', time: '11.58 malam', image: ASSETS.jetty,
    alt: 'Daniel merakam satu pertemuan rahsia di jeti lama dalam hujan.', tone: 'night', branch: 'B',
    entryEffects: { evidence: 1 }, entryFlags: ['HAFIZ_KNOWS_DANIEL'],
    chunks: [
      { type: 'narration', text: 'Mereka menemui Daniel berdiri di belakang sebatang pokok. Dia sedang merakam pertengkaran di hujung jeti.' },
      { type: 'dialogue', speaker: 'Aiman', text: 'Apa kau buat?' },
      { type: 'dialogue', speaker: 'Hafiz', text: 'Telefon tu bukan hak kau.' },
      { type: 'dialogue', speaker: 'Hafiz', text: 'Daniel!' },
      { type: 'narration', text: 'Semua membeku. Lelaki kedua berpaling. Lampu suluh menyapu ke arah mereka.' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Lari!' },
      { type: 'beat', text: 'Sekarang mereka tahu: Hafiz memang mengenali Daniel.' },
    ],
    next: 'P1-S08', continueLabel: 'LARI',
  },
  {
    id: 'P1-S07C', number: 7, title: 'Dua Cerita Berbeza',
    location: 'Jalan pulang ke homestay', time: '11.58 malam', image: ASSETS.jetty, imagePosition: 'left center',
    alt: 'Jalan kampung yang gelap dan basah menuju homestay di Pulau Tioman.', tone: 'night', branch: 'C',
    chunks: [
      { type: 'narration', text: 'Sara dan Mei Lin baru separuh jalan ke homestay apabila telefon Sara berbunyi.' },
      { type: 'phone', sender: 'Aiman', messages: ['CALL ME NOW', "DON'T COME HERE"], time: '11.58 malam' },
      { type: 'dialogue', speaker: 'Mei Lin', text: 'Something happened?' },
      { type: 'narration', text: 'Kemudian bunyi jeritan datang dari arah resort. Jauh, tetapi jelas. Mereka berpaling.' },
    ],
    choices: [
      { id: 'P1-S07C-A', label: 'Kembali ke resort', detail: 'Cari Aiman dan yang lain sekarang.', next: 'P1-S08' },
      { id: 'P1-S07C-B', label: 'Hubungi Aiman', detail: 'Tiada jawapan. Mereka perlu pergi juga.', next: 'P1-S08' },
      { id: 'P1-S07C-C', label: 'Minta bantuan Pak Razak', detail: 'Sebut jeti lama dan lihat reaksinya.', next: 'P1-S08', flags: ['PAK_RAZAK_KNOWS_JETTY'] },
    ],
  },
  {
    id: 'P1-S08', number: 8, title: 'Jatuh',
    location: 'Jeti lama', time: '12.08 pagi', image: ASSETS.jetty,
    alt: 'Hafiz berlari di atas jeti kayu licin menuju lima remaja yang terkejut.', tone: 'danger',
    chunks: [
      { type: 'narration', text: 'Hujan menjadikan papan jeti licin. Hafiz berlari ke arah mereka, atau mungkin dia melarikan diri daripada lelaki di belakangnya.' },
      { type: 'narration', text: 'Arjun berdiri di laluan sempit. Hafiz menjerit sesuatu. Dalam hujan, perkataan itu tidak jelas.' },
      { type: 'narration', text: 'Tubuh mereka bertembung. Hafiz kehilangan imbangan. Aiman cuba mencapai lengannya.' },
      { type: 'beat', text: 'Jari mereka bersentuhan. Kemudian terlepas.' },
      { type: 'impact', text: 'PLAK!' },
      { type: 'dialogue', speaker: 'Arjun', text: 'Aku... aku tak sengaja.' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Kita kena call polis.' },
      { type: 'narration', text: 'Lelaki tadi sudah hilang. Di tingkat atas resort, satu cahaya bergerak. Seseorang masih memerhati.' },
    ],
    choices: [
      { id: 'P1-S08-A', label: 'Telefon polis sekarang', detail: 'Laporkan apa yang berlaku sebelum bukti hilang.', next: 'P1-S09', effects: { evidence: 1, danger: 2 }, flags: ['POLICE_CONTACTED'] },
      { id: 'P1-S08-B', label: 'Cari Hafiz dahulu', detail: 'Periksa bawah jeti dan sepanjang pantai.', next: 'P1-S09', effects: { evidence: 2, danger: 1 }, flags: ['SEARCHED_HAFIZ'] },
      { id: 'P1-S08-C', label: 'Panik dan pulang', detail: 'Tinggalkan jeti sebelum orang tadi kembali.', next: 'P1-S09', effects: { trust: -2, danger: 1 }, flags: ['LEFT_HAFIZ'] },
    ],
  },
  {
    id: 'P1-S09', number: 9, title: 'Telefon Dalam Lumpur',
    location: 'Laluan dari jeti lama', time: '12.19 pagi', image: ASSETS.hero, imagePosition: 'center bottom',
    alt: 'Sebuah telefon bercahaya terletak di atas papan jeti yang basah.', tone: 'danger',
    chunks: [
      { type: 'narration', text: 'Semasa mereka meninggalkan jeti, Sara terpijak sesuatu. Skrin telefon muncul dari lopak lumpur.' },
      { type: 'narration', text: 'Telefon itu retak. Wallpaper menunjukkan Hafiz bersama seorang wanita berusia sekitar enam puluh tahun.' },
      { type: 'phone', sender: 'Telefon Hafiz', messages: ['UPLOAD COMPLETE', '1 FILE SENT'], time: '12.19 pagi' },
      { type: 'narration', text: 'Sara memandang yang lain. Tiada siapa melihatnya. Dia mempunyai beberapa saat sahaja.' },
    ],
    choices: [
      { id: 'P1-S09-A', label: 'Tunjukkan kepada semua', detail: 'Biarkan kumpulan menentukan langkah seterusnya.', next: 'P1-S10', effects: { trust: 1, evidence: 1 }, flags: ['HAFIZ_PHONE_SHARED'] },
      { id: 'P1-S09-B', label: 'Simpan secara senyap', detail: 'Sara mahu satu perkara yang hanya dia tahu.', next: 'P1-S10', flags: ['SARA_SECRET'], inventory: ['Telefon Hafiz'] },
      { id: 'P1-S09-C', label: 'Tinggalkan telefon', detail: 'Jangan bawa pulang sesuatu yang berbahaya.', next: 'P1-S10', effects: { danger: 2 }, flags: ['PHONE_TAKEN_BY_UNKNOWN'] },
    ],
  },
  {
    id: 'P1-S10', number: 10, title: 'Malam Tanpa Tidur',
    location: 'Homestay, Kampung Tekek', time: '12.56 pagi', image: ASSETS.tekek, imagePosition: '15% center',
    alt: 'Homestay kayu di Kampung Tekek yang kini terasa sunyi dan terasing.', tone: 'claustrophobic',
    chunks: [
      { type: 'narration', text: 'Homestay terasa berbeza apabila mereka kembali. Lampu ruang tamu terlalu terang. Baju basah tergantung. Hujan mengetuk bumbung.' },
      { type: 'dialogue', speaker: 'Arjun', text: 'Aku bunuh dia.' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Kau tak bunuh sesiapa.' },
      { type: 'dialogue', speaker: 'Sara', text: 'Kenapa Hafiz kenal kau?' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Aku pernah message dia. Aku jumpa contact dia online.' },
      { type: 'narration', text: 'Daniel enggan menjelaskan sebabnya. Kemudian ada ketukan di pintu. Tok. Tok. Tok.' },
      { type: 'dialogue', speaker: 'Pak Razak', text: 'Kamu semua okay? Kamu pergi mana tadi?' },
      { type: 'beat', text: 'Dia melihat kasut berlumpur dan pakaian mereka yang basah.' },
    ],
    choices: [
      { id: 'P1-S10-A', label: 'Cerita semuanya', detail: 'Percayakan Pak Razak walaupun reaksinya pelik.', next: 'P1-S11', effects: { trustPakRazak: 1, danger: 1 }, flags: ['PAK_RAZAK_TOLD'] },
      { id: 'P1-S10-B', label: 'Bohong', detail: 'Katakan mereka cuma berjalan di pantai.', next: 'P1-S11', effects: { trust: -1 }, flags: ['PAK_RAZAK_NOT_TOLD'] },
      { id: 'P1-S10-C', label: 'Tanya tentang Hafiz', detail: 'Lihat sama ada Pak Razak mengenalinya.', next: 'P1-S11', effects: { evidence: 1 }, flags: ['PAK_RAZAK_KNOWS_HAFIZ'] },
    ],
  },
  {
    id: 'P1-S11', number: 11, title: 'Pukul 3.17 Pagi',
    location: 'Homestay, Kampung Tekek', time: '3.17 pagi', image: ASSETS.hero, imagePosition: 'center',
    alt: 'Jalan kampung dan jeti di Pulau Tioman dalam kegelapan sebelum subuh.', tone: 'paranoia',
    chunks: [
      { type: 'narration', text: 'Tiada siapa benar-benar tidur. Pukul 3.17 pagi, Mei Lin terjaga apabila telefon Daniel bergetar berkali-kali di ruang tamu.' },
      { type: 'narration', text: 'Telefon itu berada di atas meja. Daniel tiada. Pintu depan terbuka sedikit.' },
      { type: 'phone', sender: 'Nombor tidak dikenali', messages: ['JETI. SEKARANG.'], time: '3.17 pagi' },
      { type: 'beat', text: 'Jejak air menuju keluar dari homestay.' },
    ],
    choices: [
      { id: 'P1-S11-A', label: 'Kejutkan semua', detail: 'Cari Daniel sebelum dia sampai ke jeti.', next: 'P1-S12', effects: { trustDaniel: -1, danger: 1 }, flags: ['DANIEL_STOPPED_AT_317'] },
      { id: 'P1-S11-B', label: 'Ikut Daniel secara senyap', detail: 'Mei Lin mahu tahu siapa yang menunggunya.', next: 'P1-S12', effects: { evidence: 2, danger: 2 }, flags: ['MEILIN_SAW_NIGHT_MEETING'] },
      { id: 'P1-S11-C', label: 'Biarkan Daniel pergi', detail: 'Mei Lin terlalu takut untuk mengikutinya.', next: 'P1-S12', flags: ['DANIEL_HAS_ENVELOPE'] },
    ],
  },
  {
    id: 'P1-S12', number: 12, title: 'Pagi Selepas Itu',
    location: 'Kampung Tekek', time: '8.21 pagi', image: ASSETS.tekek,
    alt: 'Kehidupan kampung yang cerah dan biasa diteruskan di Pulau Tioman.', tone: 'false-calm',
    chunks: [
      { type: 'narration', text: 'Pagi datang terlalu cepat. Langit cerah, burung berbunyi, orang menyewa motosikal dan kanak-kanak bermain berhampiran pantai.' },
      { type: 'beat', text: 'Dunia bertindak seperti tiada apa-apa berlaku.' },
      { type: 'narration', text: 'Arjun tidak mahu sarapan. Sara memeriksa berita tempatan. Tiada apa tentang Hafiz.' },
      { type: 'dialogue', speaker: 'Pak Razak', text: 'Kadang-kadang dia pergi Juara. Kadang dua tiga hari tak nampak.' },
      { type: 'dialogue', speaker: 'Sara', text: 'Pak cik tak risau?' },
      { type: 'dialogue', speaker: 'Pak Razak', text: 'Budak sini pandai jaga diri.' },
      { type: 'narration', text: 'Pak Razak berhenti menyiram pokok. Dia melihat Daniel.' },
      { type: 'dialogue', speaker: 'Pak Razak', text: 'Kamu naik feri pukul berapa?' },
    ],
    next: 'P1-S13', continueLabel: 'TINGGALKAN TIOMAN',
  },
  {
    id: 'P1-S13', number: 13, title: 'Perjalanan Pulang',
    location: 'Feri ke Mersing', time: '11.46 pagi', image: ASSETS.reunion, imagePosition: '75% center',
    alt: 'Feri bergerak pulang ke Mersing merentasi laut yang tenang.', tone: 'false-calm',
    chunks: [
      { type: 'narration', text: 'Tiada siapa mengambil banyak gambar dalam perjalanan pulang. Arjun duduk bersendirian. Mei Lin memandang laut. Sara tidur tetapi kerap terjaga.' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Aku nampak orang lain malam tadi.' },
      { type: 'dialogue', speaker: 'Aiman', text: 'Dekat jeti?' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Dekat tingkat atas resort. Aku rasa aku ada gambar.' },
      { type: 'narration', text: 'Daniel membuka galeri kameranya. Gambar itu hilang. Dia mengeluarkan kad memori dan menyimpannya di dalam beg.' },
      { type: 'dialogue', speaker: 'Daniel', text: 'Nanti bila sampai Mersing aku explain semuanya.' },
      { type: 'beat', text: 'Itulah kali terakhir Aiman mendengar Daniel berkata perkara itu.' },
    ],
    next: 'P1-S14', continueLabel: 'TIBA DI MERSING',
  },
  {
    id: 'P1-S14', number: 14, title: 'Empat',
    location: 'Terminal Feri Mersing', time: '2.18 petang', image: ASSETS.missing,
    alt: 'Empat remaja menemui beg Daniel dan sebuah Polaroid di Terminal Feri Mersing.', tone: 'final',
    entryInventory: ['Polaroid Jeti'],
    chunks: [
      { type: 'narration', text: 'Terminal Mersing sibuk. Orang berebut mengambil bagasi, Arjun membeli air, Sara mencari e-hailing dan Mei Lin menerima panggilan ibunya.' },
      { type: 'narration', text: 'Aiman berpaling selama mungkin tiga puluh saat. Apabila dia melihat semula, Daniel tiada.' },
      { type: 'narration', text: 'Lima minit. Sepuluh minit. Lima belas. Telefon Daniel dimatikan. Beg galas dan kameranya masih ada. Kad memori sudah hilang.' },
      { type: 'narration', text: 'Sebuah Polaroid terletak di atas beg. Gambar mereka berlima di jeti, diambil dari arah resort.' },
      { type: 'message', text: 'KAMU TINGGALKAN SEORANG DI DALAM AIR.' },
      { type: 'message', text: 'SEKARANG SEORANG LAGI MILIK AKU.' },
      { type: 'narration', text: 'Telefon Aiman bergetar. Nombor tidak dikenali menghantar gambar Daniel di dalam sebuah kenderaan. Kepalanya tunduk.' },
      { type: 'message', text: 'JANGAN CARI DIA.' },
      { type: 'beat', text: 'Di tengah-tengah ratusan wajah, mereka kini tinggal berempat.' },
    ],
    next: 'ENDING', continueLabel: 'LIHAT AKIBAT',
  },
];

const ENDINGS = {
  'P1-E1': {
    code: '1A', title: 'Polis Sudah Tahu', image: ASSETS.missing,
    chunks: [
      'Polis tiba di terminal selepas mereka melaporkan Daniel hilang. Seorang anggota memeriksa Polaroid itu lama-lama.',
      '“Kalau gambar ini diambil malam tadi di Tioman, macam mana orang yang mengambilnya tahu kamu akan berada di terminal ini hari ini?”',
      'Di luar terminal, sebuah SUV hitam bergerak perlahan.',
      'Seseorang sudah mengikuti mereka sejak pulau.',
    ],
  },
  'P1-E2': {
    code: '1B', title: 'Telefon Itu', image: ASSETS.hero,
    chunks: [
      'Malam itu, Sara mengunci pintu biliknya dan mengeluarkan telefon Hafiz. Skrin menyala sendiri.',
      '“Saya tahu telefon itu dengan awak.” Kemudian: “Daniel juga tahu.”',
      'Mesej ketiga tiba. “Sekarang Daniel dengan kami.”',
      'Kamera depan telefon terbuka. Sara melihat wajahnya di skrin, dan tingkap bilik di belakangnya.',
    ],
  },
  'P1-E3': {
    code: '1C', title: 'Video Yang Tidak Pernah Dirakam', image: ASSETS.tekek,
    chunks: [
      'Di rumah, Mei Lin membuka galerinya. Ada video baharu dengan masa 3.41 pagi, Tioman.',
      'Rakaman menunjukkan Arjun, Aiman, Sara dan Mei Lin sendiri sedang tidur di homestay.',
      'Seseorang yang lain memegang telefon. Kamera bergerak perlahan ke arah pintu bilik Daniel.',
      'Seorang lelaki berdiri di dalam. Mereka tidak pernah bersendirian malam itu.',
    ],
  },
  'P1-E4': {
    code: '1D', title: 'Orang Keenam', image: ASSETS.hero,
    chunks: [
      'Aiman memperbesar Polaroid. Jauh di tingkat atas resort, ada seorang manusia. Bukan Hafiz. Bukan lelaki di jeti.',
      'Pada pergelangan tangannya ada jam digital besar. Aiman teringat suara elektronik: “Twelve midnight.”',
      'Telefon Aiman bergetar. “Jangan zoom gambar tu.”',
      'Mesej seterusnya muncul. “Aku nampak kau.” Aiman perlahan-lahan mengangkat muka.',
    ],
  },
  'P1-E5': {
    code: '1E', title: 'Daniel Tidak Diculik?', image: ASSETS.missing,
    chunks: [
      'Mei Lin teringat lelaki yang Daniel jumpa pada pukul 3.17 pagi. Sampul itu. Ayat, “Ini yang tinggal.”',
      'Dalam gambar yang sempat dirakamnya, Daniel tidak kelihatan takut. Dia kelihatan seperti sedang menunggu.',
      'Dalam gambar dari kenderaan, tangan Daniel tidak diikat. Pintu di sebelahnya terbuka. Dia boleh keluar.',
      'Mei Lin memandang yang lain. “Apa kalau Daniel tak diculik?”',
    ],
  },
};

function freshState(discoveredEndings = readEndings()) {
  return {
    started: false,
    currentSceneId: 'P1-S01',
    revealed: 0,
    trust: 3,
    evidence: 0,
    danger: 0,
    trustDaniel: 0,
    trustPakRazak: 0,
    trustAimanSara: 0,
    flags: {},
    inventory: [],
    visitedScenes: [],
    decisionHistory: [],
    ending: null,
    completed: false,
    discoveredEndings,
    textScale: 1,
    soundOn: false,
  };
}

function readEndings() {
  try { return JSON.parse(localStorage.getItem(ENDINGS_KEY)) || []; }
  catch { return []; }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    return saved ? { ...freshState(), ...saved, flags: { ...(saved.flags || {}) }, inventory: [...(saved.inventory || [])] } : freshState();
  } catch { return freshState(); }
}

let state = loadState();
let modal = null;
let toastTimer = null;
let audioContext = null;
let ambience = null;

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function sceneById(id) { return SCENES.find((scene) => scene.id === id); }
function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
function announce(message) { announcer.textContent = ''; requestAnimationFrame(() => { announcer.textContent = message; }); }
function saveState(silent = false) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  document.documentElement.style.setProperty('--text-scale', state.textScale);
  if (!silent) showToast('Perjalanan disimpan', 'save');
}

function saveCheckpoint(sceneId) {
  const checkpoints = readCheckpoints();
  const snapshot = JSON.parse(JSON.stringify(state));
  snapshot.currentSceneId = sceneId;
  snapshot.revealed = 0;
  checkpoints[sceneId] = snapshot;
  localStorage.setItem(CHECKPOINT_KEY, JSON.stringify(checkpoints));
}

function readCheckpoints() {
  try { return JSON.parse(localStorage.getItem(CHECKPOINT_KEY)) || {}; }
  catch { return {}; }
}

function latestCheckpoint() {
  const checkpoints = readCheckpoints();
  return ['P1-S11', 'P1-S08', 'P1-S06'].map((id) => checkpoints[id]).find(Boolean) || null;
}

function startStory(reset = false) {
  if (reset) {
    const endings = readEndings();
    state = freshState(endings);
  }
  state.started = true;
  state.completed = false;
  if (!state.visitedScenes.length) enterScene('P1-S01', true);
  else render();
  saveState(true);
}

function enterScene(id, initial = false) {
  const scene = sceneById(id);
  if (!scene) return;
  if (['P1-S06', 'P1-S08', 'P1-S11'].includes(id) && state.currentSceneId !== id) saveCheckpoint(id);
  const firstVisit = !state.visitedScenes.includes(id);
  state.currentSceneId = id;
  state.revealed = initial ? 1 : 0;
  state.ending = null;
  if (firstVisit) {
    state.visitedScenes.push(id);
    applyEffects(scene.entryEffects || {});
    (scene.entryFlags || []).forEach((flag) => { state.flags[flag] = true; });
    (scene.entryInventory || []).forEach(addInventory);
  }
  saveState(true);
  render();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

function applyEffects(effects = {}) {
  state.trust = clamp(state.trust + (effects.trust || 0), 0, 5);
  state.evidence = clamp(state.evidence + (effects.evidence || 0), 0, 8);
  state.danger = clamp(state.danger + (effects.danger || 0), 0, 5);
  state.trustDaniel += effects.trustDaniel || 0;
  state.trustPakRazak += effects.trustPakRazak || 0;
  state.trustAimanSara += effects.trustAimanSara || 0;
}

function addInventory(item) {
  if (item && !state.inventory.includes(item)) state.inventory.push(item);
}

function makeChoice(choiceId) {
  const scene = sceneById(state.currentSceneId);
  const choice = scene?.choices?.find((item) => item.id === choiceId);
  if (!choice) return;
  applyEffects(choice.effects);
  (choice.flags || []).forEach((flag) => { state.flags[flag] = true; });
  (choice.inventory || []).forEach(addInventory);
  state.decisionHistory.push({ sceneId: scene.id, scene: scene.title, choiceId: choice.id, label: choice.label });
  saveState(true);
  showConsequence(choice);
  setTimeout(() => enterScene(choice.next), prefersReducedMotion() ? 80 : 560);
}

function showConsequence(choice) {
  let message = 'Keputusan ini akan diingati.';
  const effects = choice.effects || {};
  if ((choice.flags || []).includes('SARA_SECRET')) message = 'Sara kini menyimpan sesuatu daripada yang lain.';
  else if ((choice.flags || []).includes('PHONE_TAKEN_BY_UNKNOWN')) message = 'Seseorang mengambil apa yang kamu tinggalkan.';
  else if (effects.danger > 0) message = 'Seseorang kini tahu kamu sedang mencari jawapan.';
  else if (effects.evidence > 0) message = 'Satu petunjuk baharu mungkin penting kemudian.';
  else if (effects.trust > 0 || effects.trustAimanSara > 0) message = 'Kamu semakin mempercayai satu sama lain.';
  else if (effects.trust < 0 || effects.trustDaniel < 0) message = 'Sesuatu dalam persahabatan ini mula retak.';
  showToast(message, 'consequence');
}

function continueScene() {
  const scene = sceneById(state.currentSceneId);
  if (!scene) return;
  if (state.revealed < scene.chunks.length) {
    state.revealed += 1;
    saveState(true);
    renderScene({ preserveScroll: true });
    const latest = document.querySelector('.story-chunk:last-child');
    latest?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
    return;
  }
  if (scene.next === 'ENDING') resolveEnding();
  else if (scene.next) enterScene(scene.next);
}

function resolveEnding() {
  saveCheckpoint('ENDING');
  let id = 'P1-E1';
  if (state.flags.MEILIN_SAW_NIGHT_MEETING || state.flags.DANIEL_HAS_ENVELOPE) id = 'P1-E5';
  else if (state.flags.SARA_SECRET) id = 'P1-E2';
  else if (state.flags.LEFT_HAFIZ || state.trust <= 1) id = 'P1-E3';
  else if (state.evidence >= 3) id = 'P1-E4';
  state.ending = id;
  state.completed = true;
  if (!state.discoveredEndings.includes(id)) state.discoveredEndings.push(id);
  localStorage.setItem(ENDINGS_KEY, JSON.stringify(state.discoveredEndings));
  saveState(true);
  render();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function prefersReducedMotion() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

function showToast(message, kind = '') {
  clearTimeout(toastTimer);
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = `toast ${kind}`;
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  announce(message);
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 240);
  }, kind === 'consequence' ? 2100 : 1300);
}

function conditionMet(condition) {
  if (!condition) return true;
  if (condition.flag) return Boolean(state.flags[condition.flag]);
  if (condition.notFlag) return !state.flags[condition.notFlag];
  if (condition.evidenceMin !== undefined) return state.evidence >= condition.evidenceMin;
  if (condition.trustMax !== undefined) return state.trust <= condition.trustMax;
  if (condition.all) return condition.all.every(conditionMet);
  if (condition.any) return condition.any.some(conditionMet);
  return true;
}

function renderChunk(chunk, index) {
  if (!conditionMet(chunk.when)) return '';
  const style = `--chunk-index:${index}`;
  if (chunk.type === 'dialogue') {
    const person = CHARACTERS[chunk.speaker] || { initials: '?', role: '' };
    return `<div class="story-chunk dialogue" style="${style}"><div class="speaker-mark">${escapeHtml(person.initials)}</div><div><span>${escapeHtml(chunk.speaker)}</span><blockquote>“${escapeHtml(chunk.text)}”</blockquote></div></div>`;
  }
  if (chunk.type === 'phone') {
    return `<div class="story-chunk phone-message" style="${style}"><div class="phone-top"><span>${escapeHtml(chunk.sender)}</span><time>${escapeHtml(chunk.time)}</time></div>${chunk.messages.map((message) => `<p>${escapeHtml(message)}</p>`).join('')}</div>`;
  }
  if (chunk.type === 'impact') return `<div class="story-chunk impact" style="${style}">${escapeHtml(chunk.text)}</div>`;
  if (chunk.type === 'message') return `<div class="story-chunk threat-message" style="${style}">${escapeHtml(chunk.text)}</div>`;
  if (chunk.type === 'beat') return `<p class="story-chunk beat" style="${style}">${escapeHtml(chunk.text)}</p>`;
  return `<p class="story-chunk narration" style="${style}">${escapeHtml(chunk.text)}</p>`;
}

function renderOpening() {
  const hasSave = state.started && state.visitedScenes.length > 0 && !state.completed;
  app.innerHTML = `
    <main id="main" class="opening">
      <img class="opening-image" src="${ASSETS.opening}" alt="Lima sahabat menghampiri sebuah resort lama dan melihat dua figura misteri di hujung jeti Pulau Tioman." />
      <div class="opening-scrim"></div>
      <div class="rain" aria-hidden="true"></div>
      <section class="opening-copy">
        <p class="series-label">Thriller interaktif Malaysia</p>
        <h1>Yang Kita Tinggalkan<br />di Tioman</h1>
        <div class="part-lockup"><span>Bahagian 1</span><strong>Pulau Yang Menyimpan Rahsia</strong></div>
        <p class="opening-tagline">Lima sahabat datang untuk menghidupkan semula persahabatan lama. Seseorang sedang memerhati.</p>
        <div class="opening-actions">
          <button class="button primary" data-action="${hasSave ? 'resume' : 'start'}">${hasSave ? 'SAMBUNG CERITA' : 'MULAKAN CERITA'}</button>
          <button class="button ghost" data-action="how-to">CARA BERMAIN</button>
        </div>
        <p class="supporting-copy">Pilihan anda mempengaruhi kepercayaan, bukti, tahap bahaya dan pengakhiran cerita.</p>
      </section>
      <div class="opening-credit">Pulau Tioman · Tiga hari · Dua malam</div>
    </main>`;
}

function progressMarkup(number) {
  const stages = 8;
  const active = Math.max(1, Math.ceil((number / 14) * stages));
  return `<div class="progress-dots" aria-label="Kemajuan anggaran Bahagian 1">${Array.from({ length: stages }, (_, i) => `<span class="${i < active ? 'active' : ''}"></span>`).join('')}</div>`;
}

function renderTopbar(scene) {
  return `<header class="topbar">
    <button class="wordmark" data-action="home" aria-label="Kembali ke pembukaan">YKTDT</button>
    <div class="part-progress"><span>Bahagian 1</span>${progressMarkup(scene.number)}</div>
    <div class="topbar-actions">
      <button class="text-control" data-action="text-down" aria-label="Kecilkan teks">A−</button>
      <button class="text-control" data-action="text-up" aria-label="Besarkan teks">A+</button>
      <button class="menu-button" data-panel="menu">MENU</button>
    </div>
  </header>`;
}

function renderScene({ preserveScroll = false } = {}) {
  const scene = sceneById(state.currentSceneId);
  if (!scene) return renderOpening();
  const revealed = Math.min(state.revealed || 0, scene.chunks.length);
  const decisionReady = revealed >= scene.chunks.length;
  const imageStyle = scene.imagePosition ? `object-position:${scene.imagePosition}` : '';
  const choices = decisionReady && scene.choices ? `
    <section class="decision-block" aria-labelledby="decision-title">
      <p class="decision-kicker">Keputusan anda</p>
      <h2 id="decision-title">Apa yang patut mereka lakukan?</h2>
      <div class="choice-list">${scene.choices.map((choice, index) => `
        <button class="choice" data-choice="${choice.id}">
          <span class="choice-index">${String.fromCharCode(65 + index)}</span>
          <span><strong>${escapeHtml(choice.label)}</strong><small>${escapeHtml(choice.detail)}</small></span>
        </button>`).join('')}</div>
      <p class="choice-warning">Tidak semua akibat akan ditunjukkan serta-merta.</p>
    </section>` : '';
  const continueButton = !decisionReady ? `<button class="continue-button" data-action="continue">TERUSKAN <span>${revealed + 1}/${scene.chunks.length}</span></button>` : !scene.choices ? `<button class="continue-button final-continue" data-action="continue">${escapeHtml(scene.continueLabel || 'TERUSKAN')}</button>` : '';
  app.innerHTML = `
    ${renderTopbar(scene)}
    <main id="main" class="scene-page tone-${scene.tone}">
      <section class="scene-visual">
        <img src="${scene.image}" style="${imageStyle}" alt="${escapeHtml(scene.alt)}" />
        <div class="scene-scrim"></div>
        <div class="film-grain" aria-hidden="true"></div>
        <div class="scene-stamp"><span>Babak ${scene.number}${scene.branch ? scene.branch : ''}</span><strong>${escapeHtml(scene.location)}</strong><time>${escapeHtml(scene.time)}</time></div>
      </section>
      <section class="reading-stage">
        <header class="scene-heading">
          <p>Bahagian 1 · Babak ${scene.number}${scene.branch ? scene.branch : ''}</p>
          <h1>${escapeHtml(scene.title)}</h1>
        </header>
        <div class="story-flow">${scene.chunks.slice(0, revealed).map(renderChunk).join('')}</div>
        ${choices}
        <div class="continue-wrap">${continueButton}</div>
      </section>
    </main>`;
  if (!preserveScroll) document.querySelector('#main')?.focus({ preventScroll: true });
}

function endingSummary() {
  const pieces = ['Daniel sudah hilang.'];
  pieces.push(state.flags.SEARCHED_HAFIZ ? 'Hafiz tidak ditemui di bawah jeti.' : 'Tiada siapa tahu apa yang berlaku kepada Hafiz.');
  if (state.flags.SARA_SECRET) pieces.push('Sara membawa pulang rahsia yang tidak diketahui oleh yang lain.');
  else if (state.flags.HAFIZ_PHONE_SHARED) pieces.push('Telefon Hafiz kini menjadi sebahagian daripada rahsia mereka.');
  else pieces.push('Seseorang mengambil bukti sebelum mereka sempat memahaminya.');
  return pieces;
}

function renderEnding() {
  const ending = ENDINGS[state.ending];
  if (!ending) return renderOpening();
  app.innerHTML = `
    <main id="main" class="ending-page">
      <img class="ending-image" src="${ending.image}" alt="Babak penutup untuk pengakhiran ${escapeHtml(ending.title)}." />
      <div class="ending-scrim"></div>
      <section class="ending-content">
        <p class="ending-code">Pengakhiran ${ending.code}</p>
        <h1>${escapeHtml(ending.title)}</h1>
        <div class="ending-story">${ending.chunks.map((chunk) => `<p>${escapeHtml(chunk)}</p>`).join('')}</div>
        <div class="ending-rule"></div>
        <p class="part-over">Bahagian 1 tamat</p>
        <div class="route-summary">${endingSummary().map((line) => `<p>${escapeHtml(line)}</p>`).join('')}</div>
        <p class="unfinished">Tetapi cerita anda belum selesai.</p>
        <div class="ending-actions">
          <button class="button primary" data-action="part-two">SAMBUNG KE BAHAGIAN 2</button>
          <button class="button ghost" data-panel="history">LIHAT JEJAK KEPUTUSAN</button>
          <button class="button text-button" data-action="restart">MAIN SEMULA</button>
        </div>
        <p class="ending-count">Pengakhiran ditemui ${state.discoveredEndings.length}/5</p>
      </section>
    </main>`;
}

function statusPanel() {
  const dangerLabel = state.danger <= 1 ? 'Rendah' : state.danger === 2 ? 'Sederhana' : state.danger <= 4 ? 'Tinggi' : 'Kritikal';
  const dots = (value, total) => Array.from({ length: total }, (_, index) => `<span class="${index < value ? 'filled' : ''}"></span>`).join('');
  return `<div class="panel-body status-panel">
    <p class="panel-intro">Keputusan anda mengubah keadaan, walaupun tidak semua akibat kelihatan sekarang.</p>
    <div class="status-item"><span>Kepercayaan</span><div class="status-dots" aria-label="Kepercayaan ${state.trust} daripada 5">${dots(state.trust, 5)}</div></div>
    <div class="status-item"><span>Bukti</span><strong>${state.evidence} petunjuk ditemui</strong></div>
    <div class="status-item danger-${dangerLabel.toLowerCase()}"><span>Bahaya</span><strong>${dangerLabel}</strong></div>
  </div>`;
}

function evidencePanel() {
  if (!state.inventory.length) return `<div class="panel-body empty-panel"><p>Belum ada bukti yang disimpan.</p><small>Petunjuk hanya muncul apabila anda benar-benar menemuinya.</small></div>`;
  return `<div class="panel-body evidence-list">${state.inventory.map((id) => {
    const item = EVIDENCE[id];
    return `<article><span>${escapeHtml(item.type)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p><em>${escapeHtml(item.question)}</em></article>`;
  }).join('')}</div>`;
}

function characterPanel() {
  return `<div class="panel-body character-list">${Object.entries(CHARACTERS).map(([name, character]) => {
    let update = '';
    if (name === 'Daniel' && state.flags.HAFIZ_KNOWS_DANIEL) update = 'Hafiz mengenalinya sebelum percutian ini.';
    if (name === 'Daniel' && state.flags.DANIEL_HAS_ENVELOPE) update = 'Dia menerima satu sampul pada pukul 3.17 pagi.';
    if (name === 'Sara' && state.flags.SARA_SECRET) update = 'Dia kini menyimpan sesuatu daripada semua orang.';
    if (name === 'Pak Razak' && state.flags.PAK_RAZAK_KNOWS_JETTY) update = 'Sebut sahaja jeti lama sudah cukup untuk membuatnya takut.';
    return `<article><div class="character-initials">${character.initials}</div><div><span>${escapeHtml(character.role)}</span><h3>${escapeHtml(name)}</h3><p>${escapeHtml(update || character.body)}</p></div></article>`;
  }).join('')}</div>`;
}

function historyPanel() {
  if (!state.decisionHistory.length) return `<div class="panel-body empty-panel"><p>Jejak anda masih kosong.</p></div>`;
  return `<div class="panel-body history-list">${state.decisionHistory.map((item, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><div><small>${escapeHtml(item.scene)}</small><p>${escapeHtml(item.label)}</p></div></article>`).join('')}</div>`;
}

function mapPanel() {
  const visited = new Set(state.visitedScenes);
  const linear = ['P1-S01', 'P1-S02', 'P1-S03', 'P1-S04', 'P1-S05', 'P1-S06'];
  const branchIds = ['P1-S07A', 'P1-S07B', 'P1-S07C'];
  const tail = ['P1-S08', 'P1-S09', 'P1-S10', 'P1-S11', 'P1-S12', 'P1-S13', 'P1-S14'];
  const node = (id) => {
    const scene = sceneById(id);
    return `<div class="map-node ${visited.has(id) ? 'visited' : 'hidden-node'}">${visited.has(id) ? escapeHtml(scene.title) : '???'}</div>`;
  };
  return `<div class="panel-body story-map">
    ${linear.map((id) => `${node(id)}<span class="map-line"></span>`).join('')}
    <div class="branch-row">${branchIds.map(node).join('')}</div>
    <span class="map-line"></span>
    ${tail.map((id, index) => `${node(id)}${index < tail.length - 1 ? '<span class="map-line"></span>' : ''}`).join('')}
  </div>`;
}

function menuPanel() {
  return `<div class="panel-body menu-list">
    <button data-action="close-panel">Sambung Cerita</button>
    <button data-panel="characters">Watak</button>
    <button data-panel="evidence">Bukti <span>${state.inventory.length}</span></button>
    <button data-panel="status">Status</button>
    <button data-panel="history">Jejak Keputusan</button>
    <button data-panel="map">Peta Cerita</button>
    <button data-action="text-up">Besarkan Teks <span>A+</span></button>
    <button data-action="text-down">Kecilkan Teks <span>A−</span></button>
    <button data-action="sound">Bunyi <span>${state.soundOn ? 'Hidup' : 'Dimatikan'}</span></button>
    <button data-action="checkpoint" ${latestCheckpoint() ? '' : 'disabled'}>Kembali ke Checkpoint</button>
    <button class="danger-action" data-action="restart">Mulakan Semula Bahagian</button>
  </div>`;
}

function openPanel(type) {
  const titles = { menu: 'Menu', status: 'Status', evidence: 'Bukti', characters: 'Watak', history: 'Jejak Keputusan', map: 'Peta Cerita' };
  const content = { menu: menuPanel, status: statusPanel, evidence: evidencePanel, characters: characterPanel, history: historyPanel, map: mapPanel }[type]?.() || '';
  closeModal();
  const dialog = document.createElement('div');
  dialog.className = 'modal-layer';
  dialog.innerHTML = `<button class="modal-backdrop" data-action="close-panel" aria-label="Tutup panel"></button><section class="side-panel" role="dialog" aria-modal="true" aria-labelledby="panel-title"><header><div><span>Yang Kita Tinggalkan di Tioman</span><h2 id="panel-title">${titles[type]}</h2></div><button class="close-button" data-action="close-panel" aria-label="Tutup">TUTUP</button></header>${content}</section>`;
  document.body.appendChild(dialog);
  modal = dialog;
  dialog.querySelector('button, [tabindex]')?.focus();
}

function openHowTo() {
  closeModal();
  const dialog = document.createElement('div');
  dialog.className = 'modal-layer centered';
  dialog.innerHTML = `<button class="modal-backdrop" data-action="close-panel" aria-label="Tutup cara bermain"></button><section class="how-to" role="dialog" aria-modal="true" aria-labelledby="how-title"><button class="close-button" data-action="close-panel">TUTUP</button><p>Cara bermain</p><h2 id="how-title">Baca cerita. Buat keputusan. Hidup dengan akibatnya.</h2><div class="how-grid"><span>Kepercayaan</span><span>Bukti</span><span>Rahsia</span><span>Bahaya</span></div><p>Sesetengah keputusan mengubah hubungan, petunjuk yang ditemui, rahsia yang terdedah dan pengakhiran yang boleh dicapai.</p><strong>Tidak semua akibat akan ditunjukkan serta-merta.</strong><button class="button primary" data-action="understood">FAHAM. MULAKAN.</button></section>`;
  document.body.appendChild(dialog);
  modal = dialog;
  dialog.querySelector('.how-to .close-button')?.focus();
}

function openPartTwo() {
  closeModal();
  const dialog = document.createElement('div');
  dialog.className = 'modal-layer centered';
  dialog.innerHTML = `<button class="modal-backdrop" data-action="close-panel" aria-label="Tutup"></button><section class="coming-soon" role="dialog" aria-modal="true" aria-labelledby="next-title"><p>Bahagian 2</p><h2 id="next-title">Mesej Daripada Orang Hilang</h2><strong>Akan Bersambung</strong><button class="button ghost" data-action="close-panel">KEMBALI</button></section>`;
  document.body.appendChild(dialog);
  modal = dialog;
}

function closeModal() {
  if (modal) modal.remove();
  modal = null;
}

function restartStory() {
  const confirmed = window.confirm('Mulakan semula Bahagian 1? Semua kemajuan laluan semasa akan dipadam. Pengakhiran yang ditemui akan kekal.');
  if (!confirmed) return;
  stopAmbience();
  state = freshState(readEndings());
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(CHECKPOINT_KEY);
  closeModal();
  renderOpening();
}

function restoreCheckpoint() {
  const checkpoint = latestCheckpoint();
  if (!checkpoint) return;
  const confirmed = window.confirm('Kembali ke checkpoint terakhir? Kemajuan selepas checkpoint itu akan digantikan.');
  if (!confirmed) return;
  state = { ...freshState(), ...checkpoint, soundOn: state.soundOn };
  closeModal();
  saveState(true);
  render();
}

function toggleSound() {
  state.soundOn = !state.soundOn;
  if (state.soundOn) startAmbience();
  else stopAmbience();
  saveState(true);
  openPanel('menu');
  showToast(state.soundOn ? 'Bunyi suasana dihidupkan' : 'Bunyi dimatikan');
}

function startAmbience() {
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (ambience) return;
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * 0.13;
    const noise = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    noise.buffer = buffer;
    noise.loop = true;
    filter.type = 'lowpass';
    filter.frequency.value = 850;
    gain.gain.value = 0.035;
    noise.connect(filter).connect(gain).connect(audioContext.destination);
    noise.start();
    ambience = { noise, gain };
  } catch {
    state.soundOn = false;
    showToast('Bunyi tidak disokong oleh pelayar ini');
  }
}

function stopAmbience() {
  try { ambience?.noise.stop(); } catch { /* sudah dihentikan */ }
  ambience = null;
}

function adjustText(amount) {
  state.textScale = clamp(Number((state.textScale + amount).toFixed(2)), 0.9, 1.25);
  saveState(true);
  renderScene({ preserveScroll: true });
  showToast(`Saiz teks ${state.textScale > 1 ? 'dibesarkan' : state.textScale < 1 ? 'dikecilkan' : 'asal'}`);
}

function render() {
  document.documentElement.style.setProperty('--text-scale', state.textScale || 1);
  if (state.completed && state.ending) renderEnding();
  else if (state.started) renderScene();
  else renderOpening();
}

document.addEventListener('click', (event) => {
  const choice = event.target.closest('[data-choice]');
  if (choice) return makeChoice(choice.dataset.choice);
  const panelButton = event.target.closest('[data-panel]');
  if (panelButton) return openPanel(panelButton.dataset.panel);
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === 'start') startStory(true);
  if (action === 'resume') startStory(false);
  if (action === 'continue') continueScene();
  if (action === 'how-to') openHowTo();
  if (action === 'understood') { closeModal(); startStory(!state.started); }
  if (action === 'close-panel') closeModal();
  if (action === 'home') renderOpening();
  if (action === 'restart') restartStory();
  if (action === 'checkpoint') restoreCheckpoint();
  if (action === 'part-two') openPartTwo();
  if (action === 'sound') toggleSound();
  if (action === 'text-up') adjustText(0.05);
  if (action === 'text-down') adjustText(-0.05);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

window.addEventListener('beforeunload', () => saveState(true));

render();
