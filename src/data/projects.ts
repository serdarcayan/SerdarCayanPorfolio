export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string; // path to image or placeholder
  technologies: string[];
  features: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  result: string;
  github?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "smart-lab-power-supply",
    number: "01",
    title: "Akıllı Laboratuvar Güç Kaynağı",
    category: "GÜÇ ELEKTRONİĞİ / GÖMÜLÜ SİSTEM",
    description:
      "12 V girişten 0–30 V ayarlanabilir çıkış sağlayan, sayısal kontrollü buck-boost laboratuvar güç kaynağı.",
    image: `${import.meta.env.BASE_URL}brands/ssps.png`,
    technologies: [
      "ATmega328P",
      "AVR programlama",
      "LCD kullanıcı arayüzü",
      "KiCad",
      "PWM",
      "Sabit akım (CC) ve sabit gerilim (CV)",
      "Mikrodenetleyiciden bağımsız koruma",
    ],
    features: [
      "0–30 V aralığında ayarlanabilir çıkış gerilimi",
      "Ayarlanabilir akım sınırı",
      "Sabit akım (CC) ve sabit gerilim (CV) çalışma modları",
      "ATmega328P ile sayısal kontrol",
      "Buck-boost topolojisi",
      "Gerilim, akım ve güç ölçümü",
      "Mikrodenetleyiciden bağımsız termal ve aşırı akım koruması",
      "Çalışma durumunu bildiren uyarı ışıkları",
      "Kaba ve hassas ayar seçenekleri",
    ],
    overview:
      "12 V giriş geriliminden 0–30 V aralığında ayarlanabilir çıkış üreten, sabit akım (CC) ve sabit gerilim (CV) modlarında çalışabilen sayısal kontrollü bir laboratuvar güç kaynağıdır. Gerilim, akım ve güç değerlerini ölçüp ekranda gösterir; azami çıkış gücü 230 W'tır.",
    problem:
      "Sabit çıkışlı güç kaynakları farklı projelerin gerilim ve akım gereksinimlerini karşılamakta yetersiz kalabilir. Geniş ve ayarlanabilir çıkış aralığı sunan, aynı zamanda güvenli biçimde kullanılabilen bir laboratuvar güç kaynağına ihtiyaç vardı.",
    solution:
      "ATmega328P tabanlı bu programlanabilir güç kaynağı, gerilim (V), akım (A) ve gücü (W) ölçerek ekranda gösterir; çalışma durumunu uyarı ışıklarıyla bildirir. Sabit akım (CC) ve sabit gerilim (CV) modlarında çalışır. 12 V giriş gerilimini buck-boost dönüştürücüyle yükseltip düşürerek 0–30 V aralığında ayarlanabilir çıkış sağlar ve azami 230 W çıkış gücü sunar. Mikrodenetleyiciden bağımsız termal ve aşırı akım korumaları ile kaba ve hassas ayar seçenekleri içerir.",
    architecture:
      "Sistem; 12 V girişten 0–30 V çıkış elde edilmesini sağlayan buck-boost güç katmanı, PWM ve ADC geri bildirimiyle kontrolü yürüten ATmega328P katmanı ve LCD ekran ile döner kodlayıcıdan oluşan kullanıcı arayüzü bileşenlerinden oluşur. Termal ve aşırı akım korumaları mikrodenetleyiciden bağımsız çalışır.",
    result:
      "12 V girişle çalışan, 0–30 V aralığında ayarlanabilir çıkış gerilimi, ayarlanabilir akım sınırı ve azami 230 W çıkış gücü sunan; CC/CV modlarına ve mikrodenetleyiciden bağımsız korumalara sahip işlevsel bir laboratuvar güç kaynağı geliştirdim. Bu proje, güç elektroniği ve gömülü kontrol alanındaki uzmanlığımı gösterir.",
    github: "https://github.com/serdarcayan/smart-lab-power-supply",
    featured: true,
  },
  {
    id: "turkishengineering",
    number: "02",
    title: "TurkishEngineering",
    category: "TAM YAPI",
    description:
      "React, Node.js ve PostgreSQL ile geliştirilen tam yığın mühendislik topluluğu platformu.",
    image: `${import.meta.env.BASE_URL}brands/turkish-engineering.png`,
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Sequelize",
    ],
    features: [
      "Kullanıcı kimlik doğrulaması ve profiller",
      "Forum ve tartışma başlıkları",
      "Proje paylaşımı",
      "Duyarlı tasarım",
      "REST API",
    ],
    overview:
      "Türkçe konuşan mühendislerin bilgi paylaşımında bulunabileceği, projeleri tartışabileceği ve iş birliği yapabileceği çevrimiçi bir topluluk platformu.",
    problem:
      "Türkçe konuşan mühendislerin dil engeli olmadan etkileşim kurabileceği yerelleştirilmiş bir platforma ihtiyaç vardı.",
    solution:
      "React ön ucu ve Node.js/Express arka ucu ile tam yığın bir web uygulaması geliştirdim. Veri yönetimi için PostgreSQL ve Sequelize ORM kullandım. Platform kullanıcı profilleri, forumlar ve proje sergileme alanları sunuyor.",
    architecture:
      "Ön yüz: TypeScript ile React SPA. Arka yüz: Express kullanan Node.js REST API. Veritabanı: Sequelize ORM ile PostgreSQL. Kimlik doğrulama: JWT.",
    result:
      "Platform başarıyla yayınlandı ve küçük ama aktif bir kullanıcı kitlesi oluşturdu. Mühendislerin iş birliği yapıp bilgi paylaşabileceği bir alan yarattı.",
    github: "https://github.com/serdarcayan/turkishengineering",
    featured: true,
  },
  {
    id: "ne-almaliyim",
    number: "03",
    title: "Ne Almalıyım",
    category: "MOBİL GELİŞTİRME",
    description: "Mobil alışveriş / liste yönetimi uygulaması.",
    image: "",
    technologies: ["Flutter", "Dart", "Riverpod"],
    features: [
      "Alışveriş listesi oluşturma ve yönetme",
      "Listeleri başkalarıyla paylaşma",
      "Çevrimdışı destek",
      "Çapraz platform (iOS ve Android)",
      "Basit ve sezgisel arayüz",
    ],
    overview:
      "Kullanıcıların alışveriş listelerini verimli şekilde yönetmelerine yardımcı olan, paylaşım imkanı sunan mobil uygulama.",
    problem:
      "Mevcut liste uygulamaları, özellikle paylaşılan aile alışverişlerinde sade ve çevrimdışı kullanım deneyimi sunmuyordu.",
    solution:
      "Çapraz platform uyumluluk için Flutter kullandım; durum yönetimi için Riverpod kullandım. Uygulama çevrimdışı çalışır, çevrimiçi olduğunda senkronize olur ve bağlantı yoluyla liste paylaşımı sağlar.",
    architecture:
      "Flutter ön yüz, Riverpod durum yönetimi. Çevrimdışı depolama ve senkronizasyon için Firebase kullanımı.",
    result:
      "Uygulama Google Play Store'da yayınlandı ve olumlu geri bildirimler aldı. Tam bir mobil ürün teslim edebilme yeteneğini gösterdi.",
    github: "https://github.com/serdarcayan/ne-almaliyim",
    featured: true,
  },
];
