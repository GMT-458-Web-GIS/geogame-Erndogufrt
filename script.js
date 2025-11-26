// OYUN VERİLERİ VE DEĞİŞKENLER
let map;
let geoJsonLayer;
let activeQuests = [];
let currentQ = 0;
let score = 0;
let fails = 0;

// Zamanlayıcı Değişkenleri
let timeLeft = 60;
let timerInterval;

// Bilmece listesi
const riddles = {
  "Adana": "Türkiye’nin en sıcak illerinden biri olup kebabıyla ünlü il hangisidir?",
  "Adıyaman": "Nemrut Dağı kalıntılarının bulunduğu şehir hangisidir?",
  "Afyonkarahisar": "Lokum ve sucuk üretimiyle ünlü il hangisidir?",
  "Ağrı": "Türkiye’nin en yüksek dağı hangi il sınırları içindedir?",
  "Amasya": "Ferhat ile Şirin efsanesiyle bilinen şehir hangisidir?",
  "Ankara": "Türkiye’nin başkenti neresidir?",
  "Antalya": "Turizmin başkenti olarak bilinen Akdeniz şehri hangisidir?",
  "Artvin": "Karadeniz’in en yeşil ve en yüksek dağlarına sahip şehir hangisidir?",
  "Aydın": "Efes Antik Kenti hangi ilde yer alır?",
  "Balıkesir": "Hem Marmara hem Ege Denizi’ne kıyısı olan il hangisidir?",
  "Bilecik": "Osmanlı Devleti’nin kurulduğu il hangisidir?",
  "Bingöl": "Yüzen adalarıyla ünlü il hangisidir?",
  "Bitlis": "Nemrut Krater Gölü hangi ilde bulunur?",
  "Bolu": "Abant Gölü hangi ilde yer alır?",
  "Burdur": "Salda Gölü hangi ildedir?",
  "Bursa": "İskender kebabının çıktığı, Osmanlı’ya başkentlik yapan şehir hangisidir?",
  "Çanakkale": "Truva Antik Kenti hangi ilde bulunur?",
  "Çankırı": "Tuz mağaralarıyla ünlü il hangisidir?",
  "Çorum": "Leblebisi meşhur il hangisidir?",
  "Denizli": "Pamukkale Travertenleri hangi ilde bulunur?",
  "Diyarbakır": "Kara surları ile ünlü şehir hangisidir?",
  "Edirne": "Mimar Sinan’ın ustalık eseri Selimiye Camisi nerededir?",
  "Elazığ": "Harput Kalesi hangi ilde bulunur?",
  "Erzincan": "Ekşisu Mesire Alanı ve tulumu ile ünlü il hangisidir?",
  "Erzurum": "Palandöken Kayak Merkezi hangi şehirde yer alır?",
  "Eskişehir": "Lületaşı ile ünlü şehir hangisidir?",
  "Gaziantep": "Baklavasıyla ünlü şehir hangisidir?",
  "Giresun": "Kirazın ana vatanı olarak bilinen Karadeniz şehri hangisidir?",
  "Gümüşhane": "Kürtün ve Santa harabeleriyle bilinen il hangisidir?",
  "Hakkari": "Sat Buzul Gölleri hangi ilde yer alır?",
  "Hatay": "Türkiye’nin en güneyindeki şehir hangisidir?",
  "Iğdır": "Ağrı Dağı’nın büyük kısmı hangi il sınırları içindedir?",
  "Isparta": "Gülleriyle ünlü il hangisidir?",
  "İstanbul": "Hem Asya hem Avrupa’da bulunan şehir hangisidir?",
  "İzmir": "Kordon boyu ve Saat Kulesiyle ünlü şehir hangisidir?",
  "Kahramanmaraş": "Dondurmasıyla meşhur il hangisidir?",
  "Karabük": "Safranbolu evleri hangi ilde bulunur?",
  "Karaman": "Türkçenin resmi dil ilan edildiği şehir hangisidir?",
  "Kars": "Ani Harabeleri hangi ilde bulunur?",
  "Kastamonu": "Pastırmasıyla ünlü Karadeniz şehri hangisidir?",
  "Kayseri": "Mantısıyla ünlü Orta Anadolu şehri hangisidir?",
  "Kırıkkale": "MKE fabrikalarıyla bilinen il hangisidir?",
  "Kırklareli": "Dupnisa Mağarası hangi ilde yer alır?",
  "Kırşehir": "Ahi Evran’ın şehri hangisidir?",
  "Kilis": "Cevizli sucuk (oruk) hangi Güneydoğu ilinde meşhurdur?",
  "Kocaeli": "Sanayi başkenti olarak bilinen Marmara şehri hangisidir?",
  "Konya": "Mevlana’nın şehri hangisidir?",
  "Kütahya": "Çinisiyle ünlü şehir hangisidir?",
  "Malatya": "Kayısısı ile meşhur il hangisidir?",
  "Manisa": "Mesir macunu hangi ilde yapılır?",
  "Mardin": "Taş evleriyle ünlü kadim şehir hangisidir?",
  "Muğla": "Bodrum ve Fethiye hangi ilde bulunmaktadır?",
  "Muş": "Lalesi ile ünlü şehir hangisidir?",
  "Nevşehir": "Kapadokya bölgesi hangi il sınırları içindedir?",
  "Niğde": "Aladağlar’ın bir kısmı hangi ilde yer alır?",
  "Ordu": "Fındığıyla ünlü Karadeniz şehri hangisidir?",
  "Osmaniye": "Karatepe Aslantaş açık hava müzesi hangi ilde bulunur?",
  "Rize": "Çayıyla ünlü şehir hangisidir?",
  "Sakarya": "Sapanca Gölü hangi ilde yer alır?",
  "Samsun": "Atatürk’ün 19 Mayıs’ta ayak bastığı şehir hangisidir?",
  "Siirt": "Fıstığıyla bilinen şehir hangisidir?",
  "Sinop": "Türkiye’nin en kuzey noktası hangi ilde bulunur?",
  "Sivas": "Divriği Ulu Camii hangi şehirde yer alır?",
  "Şanlıurfa": "Göbeklitepe hangi ilde bulunur?",
  "Şırnak": "Cudi Dağı hangi ilde yer alır?",
  "Tekirdağ": "Köftesiyle ünlü Marmara şehri hangisidir?",
  "Tokat": "Zile pekmezi hangi ilde ünlüdür?",
  "Trabzon": "Hamsisi ve Uzungölü ile ünlü il hangisidir?",
  "Tunceli": "Munzur Dağları hangi ilde yer alır?",
  "Uşak": "Battaniyesi ve tarhanasıyla ünlü il hangisidir?",
  "Van": "İnci kefali göçü hangi ilde görülür?",
  "Yalova": "Termal kaplıcalarıyla ünlü il hangisidir?",
  "Yozgat": "Çamlığı ile bilinen Orta Anadolu şehri hangisidir?",
  "Zonguldak": "Taş kömürüyle ünlü il hangisidir?"
};

// 1. SAYFA YÜKLENDİĞİNDE HİKAYEYİ YAZDIR
window.onload = function() {
    const btn = document.getElementById('start-btn');
    const storyText = "Yüzyıllardır beklenen an geldi Komutan... Kadim Anadolu toprakları, ismini bilen gerçek sahibini arıyor. Kahinin sorularını cevapla, sınırları zihninle çiz. Ama dikkat et, zaman aleyhine işliyor! Hazır mısın?";
    
    const writerElement = document.getElementById('story-writer');
    let i = 0;

    // Daktilo Efekti Fonksiyonu
    function typeWriter() {
        if (i < storyText.length) {
            writerElement.innerHTML += storyText.charAt(i);
            i++;
            setTimeout(typeWriter, 30); // Yazı hızı (ms)
        } else {
            // Hikaye bitince butonu aktifleştir
            if(typeof mapData !== 'undefined') {
                btn.innerText = "SEFERİ BAŞLAT";
                btn.style.boxShadow = "0 0 30px #c5a059";
                btn.disabled = false;
            } else {
                alert("HATA: harita.js bulunamadı!");
            }
        }
    }

    // Başlat
    if(typeof mapData !== 'undefined') {
        typeWriter();
    } else {
        alert("Harita verisi eksik! (harita.js)");
    }
};

// OYUNU BAŞLAT
function startGame() {
    document.getElementById('intro-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');

    if (!map) initMap();
    
    // Harita verisini filtrele (Noktaları çıkar) ve soruları karıştır
    activeQuests = mapData.features
        .filter(f => f.geometry.type !== 'Point')
        .filter(f => riddles[f.properties.name]) 
        .map(f => ({
            name: f.properties.name,
            riddle: riddles[f.properties.name]
        }))
        .sort(() => Math.random() - 0.5);

    updateUI();
    startTimer(); // Zamanı başlat
}

// ZAMANLAYICI
function startTimer() {
    timeLeft = 60;
    document.getElementById('timer').innerText = timeLeft;
    
    if(timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft <= 0) {
            endGame(true); // Süre doldu
        }
    }, 1000);
}

// KONFETİ EFEKTİ
function fireConfetti() {
    const colors = ['#ffd700', '#ff4444', '#00e5ff', '#ffffff'];
    
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2500);
    }
}

// HARİTA OLUŞTURMA
function initMap() {
    map = L.map('map', { 
        zoomControl: false, 
        minZoom: 5,
        maxBounds: [[35, 25], [43, 46]],
        maxBoundsViscosity: 1.0
    }).setView([39.0, 35.5], 6);

    // Koyu Tema Harita
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OSM & CartoDB'
    }).addTo(map);

    // Poligonları Ekle (Noktaları Filtrele)
    geoJsonLayer = L.geoJSON(mapData, {
        style: defaultStyle,
        onEachFeature: onEachFeature,
        filter: function(feature) {
            return feature.geometry.type !== "Point"; // Markerları engelle
        }
    }).addTo(map);
}

function defaultStyle() {
    return {
        fillColor: '#333',
        weight: 1,
        opacity: 1,
        color: '#666',
        fillOpacity: 0.5
    };
}

function onEachFeature(feature, layer) {
    layer.cityName = feature.properties.name;
    layer.isConquered = false;

    layer.on('click', () => checkAnswer(layer));

    layer.on('mouseover', function() {
        if (!this.isConquered) {
            this.setStyle({
                weight: 3,
                color: '#c5a059',
                fillColor: '#444',
                fillOpacity: 0.8
            });
            this.bringToFront();
        }
    });

    layer.on('mouseout', function() {
        if (!this.isConquered) {
            geoJsonLayer.resetStyle(this);
        }
    });
}

// CEVAP KONTROLÜ
function checkAnswer(clickedLayer) {
    if (currentQ >= activeQuests.length) return;
    if (clickedLayer.isConquered) return;
    if (timeLeft <= 0) return;

    let targetName = activeQuests[currentQ].name;
    let clickedName = clickedLayer.cityName;

    if (clickedName === targetName) {
        // --- DOĞRU ---
        score++;
        clickedLayer.isConquered = true;

        // Stili değiştir
        clickedLayer.setStyle({
            fillColor: '#ffd700',
            color: '#fff',
            weight: 3,
            fillOpacity: 1
        });
        
        // Animasyon Class'ı ekle
        if(clickedLayer._path) {
            clickedLayer._path.classList.add('conquest-anim');
        }

        // Konfeti patlat
        fireConfetti();

        clickedLayer.bindPopup(`<b style="color:#ffd700; font-size:1.2rem">FETİH BAŞARILI!</b><br>${clickedName}`).openPopup();
        nextTurn();

    } else {
        // --- YANLIŞ ---
        fails++;
        
        clickedLayer.setStyle({
            fillColor: '#ff0000',
            color: '#fff',
            weight: 2,
            fillOpacity: 0.7
        });

        clickedLayer.bindPopup(`<b style="color:#ff4444">YANLIŞ TOPRAK!</b><br>Burası ${clickedName}`).openPopup();

        setTimeout(() => {
            if(!clickedLayer.isConquered) {
                geoJsonLayer.resetStyle(clickedLayer);
                clickedLayer.closePopup();
            }
        }, 1000);

        // Doğru ili ipucu olarak göster (Kırmızı yanıp sönme)
        geoJsonLayer.eachLayer(layer => {
            if (layer.cityName === targetName) {
                layer.setStyle({ color: 'red', weight: 4, dashArray: '10, 10' });
                layer.bringToFront();
                
                setTimeout(() => {
                    if (!layer.isConquered) {
                        geoJsonLayer.resetStyle(layer);
                    } else {
                         layer.setStyle({ color: '#fff', weight: 2, dashArray: '' });
                    }
                }, 1500);
            }
        });

        nextTurn();
    }
}

function nextTurn() {
    currentQ++;
    setTimeout(() => {
        map.closePopup();
        updateUI();
    }, 1500);
}

function updateUI() {
    document.getElementById('score').innerText = score;
    document.getElementById('fail').innerText = fails;

    if (currentQ < activeQuests.length) {
        let txt = document.getElementById('riddle-text');
        txt.style.opacity = 0;
        setTimeout(() => {
            txt.innerText = activeQuests[currentQ].riddle;
            txt.style.opacity = 1;
        }, 300);
    } else {
        endGame(false);
    }
}

function endGame(timeOut = false) {
    if(timerInterval) clearInterval(timerInterval);

    setTimeout(() => {
        document.getElementById('game-screen').classList.add('hidden');
        document.getElementById('end-screen').classList.remove('hidden');
        
        let title = "SEFER SONUCU";
        let msg = `Fethedilen: ${score} - Kaybedilen: ${fails}`;

        if (timeOut) {
            title = "⏳ SÜRE DOLDU!";
            msg = `Zaman tükendi Komutan! Skorun: ${score}`;
        } else if (score > fails) {
            title = "👑 ZAFER SENİNDİR!";
        } else {
            title = "DAHA ÇOK ÇALIŞMALISIN";
        }

        document.getElementById('end-title').innerText = title;
        document.getElementById('end-msg').innerText = msg;
    }, 500);
}