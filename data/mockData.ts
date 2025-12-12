import { Specialist, ForumThread, Article, PersonaType } from '../types';

// --- SPECIALISTS ---
export const MOCK_SPECIALISTS: Specialist[] = [
  {
    id: '1',
    name: 'dr n. med. Anna Nowak',
    title: 'Psychiatra',
    city: 'Warszawa',
    specialization: ['ADHD u dorosłych', 'Farmakoterapia'],
    isVerified: true,
    isNFZ: false,
    contact: { phone: '22 123 45 67', website: 'www.znanylekarz.pl' },
    description: 'Specjalizuje się w diagnozie różnicowej ADHD u kobiet oraz leczeniu farmakologicznym dorosłych.'
  },
  {
    id: '2',
    name: 'mgr Piotr Kowalski',
    title: 'Psychoterapeuta CBT',
    city: 'Kraków',
    specialization: ['Terapia poznawczo-behawioralna', 'Trening umiejętności'],
    isVerified: true,
    isNFZ: true,
    contact: { website: 'www.centrum-adhd-krakow.pl' },
    description: 'Prowadzi grupy wsparcia oraz terapię indywidualną nastawioną na radzenie sobie z prokrastynacją.'
  },
  {
    id: '3',
    name: 'Ośrodek "Neuroróżnorodni"',
    title: 'Centrum Diagnostyczne',
    city: 'Online',
    specialization: ['Diagnoza DIVA-5', 'Psychoedukacja'],
    isVerified: true,
    isNFZ: false,
    contact: { website: 'www.neuroroznorodni.pl' },
    description: 'Pełen proces diagnostyczny online. Zespół składa się z lekarzy i psychologów klinicznych.'
  },
  {
    id: '4',
    name: 'dr Marek Wiśniewski',
    title: 'Psychiatra Dziecięcy',
    city: 'Poznań',
    specialization: ['ADHD u dzieci i młodzieży', 'Zaburzenia opozycyjno-buntownicze'],
    isVerified: false,
    isNFZ: true,
    contact: { phone: '61 888 00 00' },
    description: 'Wieloletnie doświadczenie w pracy szpitalnej i ambulatoryjnej z młodzieżą.'
  }
];

// --- FORUM ---
export const MOCK_THREADS: ForumThread[] = [
  {
    id: '1',
    title: 'Jak radzicie sobie z "body doubling" w pracy zdalnej?',
    author: 'Janek_32',
    date: '2024-05-10',
    category: 'Strategie',
    content: 'Pracuję z domu i nie mogę się skupić. Czy są jakieś polskie serwery Discord do wspólnej pracy w ciszy?',
    likes: 15,
    replies: 4,
    tags: ['Praca', 'Produktywność']
  },
  {
    id: '2',
    title: 'Metoda Medikinet CR vs zwykły - wasze doświadczenia',
    author: 'Marta_K',
    date: '2024-05-12',
    category: 'Leki',
    content: 'Lekarz zaproponował zmianę. Czy zjazd popołudniowy jest mniejszy przy CR? Boję się zmian nastroju.',
    likes: 24,
    replies: 12,
    tags: ['Farmakoterapia', 'Dorośli']
  },
  {
    id: '3',
    title: 'Partner nie wierzy w moją diagnozę ("Wymyślasz sobie")',
    author: 'Zosia88',
    date: '2024-05-08',
    category: 'Rodzina',
    content: 'Usłyszałam, że jestem po prostu leniwa i szukam wymówek. Jak wytłumaczyć bliskiej osobie, czym jest dysfunkcja wykonawcza?',
    likes: 45,
    replies: 20,
    tags: ['Relacje', 'Psychoedukacja']
  },
  {
    id: '4',
    title: 'Nauczyciele ignorują zalecenia z poradni',
    author: 'Anna_Mama_Leona',
    date: '2024-05-14',
    category: 'Wsparcie',
    content: 'Mimo opinii o wydłużonym czasie na sprawdzianach, syn ciągle dostaje jedynki za "nieukończenie pracy". Co robić prawnie?',
    likes: 18,
    replies: 7,
    tags: ['Szkoła', 'Rodzice']
  }
];

// --- ARTICLES ---
export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: "ADHD u dorosłych - objawy inne niż myślisz",
    category: "Podstawy",
    targetPersona: [PersonaType.ADULT, PersonaType.PARTNER],
    readTime: "5 min",
    summary: "Zapominanie kluczy to wierzchołek góry lodowej. Dowiedz się, czym jest dysregulacja emocjonalna i paraliż analityczny.",
    tags: ["Diagnoza", "Objawy", "Psychoedukacja"],
    content: `
      <h3>To nie tylko 'wiercenie się'</h3>
      <p>Wielu dorosłych żyje w przekonaniu, że ADHD to choroba niegrzecznych chłopców. Tymczasem u dorosłych nadruchliwość często zamienia się w <strong>wewnętrzny niepokój</strong>. To ciągłe poczucie, że "powinienem coś robić", gonitwa myśli, której nie da się wyłączyć przed snem.</p>
      
      <h3>Niewidzialne objawy</h3>
      <p>Oprócz klasycznego zapominania, dorośli z ADHD zmagają się z:</p>
      <ul>
        <li><strong>Dysregulacją emocjonalną:</strong> Nagłe wybuchy złości lub płaczu, które wydają się nieproporcjonalne do sytuacji.</li>
        <li><strong>Paraliżem wykonawczym:</strong> Siedzisz na kanapie, chcesz wstać i pozmywać, krzyczysz na siebie w myślach, ale ciało nie reaguje.</li>
        <li><strong>Ślepotą czasową:</strong> "To zajmie tylko 5 minut" - a mija 3 godziny.</li>
      </ul>
      
      <h3>Co możesz z tym zrobić?</h3>
      <p>Pierwszym krokiem jest zrozumienie, że to nie wada charakteru, a budowa mózgu. Zamiast zmuszać się do "bycia normalnym", zacznij budować systemy, które wspierają Twój unikalny sposób funkcjonowania.</p>
    `
  },
  {
    id: 'a2',
    title: "Wypalenie rodzicielskie - pierwsza pomoc",
    category: "Dla Rodziców",
    targetPersona: [PersonaType.PARENT],
    readTime: "7 min",
    summary: "Kochasz swoje dziecko, ale masz dość? To normalne. Jak zadbać o siebie, by mieć siłę wspierać dziecko z ADHD.",
    tags: ["Wypalenie", "Self-care", "Rodzina"],
    content: `
      <h3>Maska tlenowa najpierw dla Ciebie</h3>
      <p>Wychowanie dziecka z ADHD to maraton, nie sprint. Często wymaga ciągłego monitorowania, przypominania, negocjowania i gaszenia pożarów emocjonalnych. Jeśli nie zadbasz o swoje zasoby, nie będziesz w stanie pomóc dziecku w koregulacji.</p>
      
      <h3>Sygnały ostrzegawcze</h3>
      <p>Zwróć uwagę, czy czujesz:</p>
      <ul>
        <li>Ciągłe drażliwość wobec dziecka.</li>
        <li>Poczucie bycia "złą matką/ojcem".</li>
        <li>Fizyczne wyczerpanie mimo snu.</li>
        <li>Utratę radości ze wspólnego spędzania czasu.</li>
      </ul>
      
      <h3>Strategie przetrwania</h3>
      <p><strong>1. Obniż poprzeczkę.</strong> Dom nie musi być idealnie czysty. Obiad może być mrożony. Twoje zdrowie psychiczne jest ważniejsze niż kurz na półce.</p>
      <p><strong>2. Szukaj plemienia.</strong> Inni rodzice dzieci neuroróżnorodnych zrozumieją Cię bez słów. Nie musisz tłumaczyć, dlaczego Twoje dziecko krzyczy w sklepie.</p>
    `
  },
  {
    id: 'a3',
    title: "Rybki akwariowe czy dżungla? O stylach myślenia",
    category: "Psychoedukacja",
    targetPersona: [PersonaType.ADULT, PersonaType.PARTNER, PersonaType.PARENT],
    readTime: "5 min",
    summary: "Metafory, które pomagają zrozumieć neuroróżnorodny mózg i wytłumaczyć go bliskim.",
    tags: ["Komunikacja", "Mózg", "Zrozumienie"],
    content: `
      <h3>Mózg Neurotypowy: Bibliotekarz</h3>
      <p>Wyobraź sobie bibliotekarza. Wszystkie myśli są poukładane na półkach. Kiedy potrzebuje informacji, idzie do odpowiedniego działu, wyciąga książkę, czyta i odkłada. Jest cisza i porządek.</p>
      
      <h3>Mózg ADHD: Przeglądarka z 100 kartami</h3>
      <p>Mózg ADHD to przeglądarka internetowa z otwartymi 100 kartami. 3 z nich się zacięły, z jednej dobiega muzyka (nie wiesz z której), a Ty desperacko próbujesz znaleźć tę jedną z excelem do pracy.</p>
      
      <h3>Dlaczego to ważne?</h3>
      <p>Używanie takich metafor w rozmowie z partnerem ("Kochanie, dzisiaj moja przeglądarka się zawiesiła") pomaga uniknąć oskarżeń o lenistwo czy złą wolę. To język, który buduje mosty zrozumienia.</p>
    `
  },
  {
    id: 'a4',
    title: "Leki stymulujące - fakty i mity",
    category: "Leczenie",
    targetPersona: [PersonaType.ADULT, PersonaType.PARENT],
    readTime: "8 min",
    summary: "Czy leki zmieniają osobowość? Czy uzależniają? Przegląd aktualnej wiedzy medycznej o metylofenidacie.",
    tags: ["Farmakoterapia", "Mity", "Nauka"],
    content: `
      <h3>Mit 1: Leki to "narkotyki"</h3>
      <p>Leki stymulujące w dawkach terapeutycznych nie wywołują haju. Działają one na te same neuroprzekaźniki (dopaminę i noradrenalinę), których brakuje w płatach czołowych osoby z ADHD. To jak okulary dla krótkowidza - pomagają "wyostrzyć" funkcje wykonawcze.</p>
      
      <h3>Mit 2: Leki zmieniają osobowość</h3>
      <p>Dobrze dobrany lek nie powinien zmieniać tego, kim jesteś. Powinien sprawić, że łatwiej Ci być sobą - bez ciągłego chaosu, zapominania i frustracji. Jeśli czujesz się "zombie", dawka lub lek są prawdopodobnie źle dobrane.</p>
      
      <h3>Pamiętaj</h3>
      <p>Leki to nie magiczna różdżka. To "kuloodporna kamizelka" w walce z codziennością. Nadal musisz wykonać pracę (terapia, nawyki), ale leki sprawiają, że ta praca jest w ogóle możliwa.</p>
    `
  },
  {
    id: 'a5',
    title: "Jak rozmawiać z szefem o diagnozie?",
    category: "Praca",
    targetPersona: [PersonaType.ADULT],
    readTime: "4 min",
    summary: "Czy warto się ujawniać? Jak prosić o dostosowania (reasonable adjustments) w polskim prawie pracy?",
    tags: ["Praca", "Prawo", "Rozmowa"],
    content: `
      <h3>Mówić czy nie mówić?</h3>
      <p>To decyzja indywidualna. W Polsce świadomość ADHD rośnie, ale wciąż zdarzają się stereotypy. Zanim powiesz "Mam ADHD", zastanów się, jaki masz cel.</p>
      
      <h3>Język korzyści</h3>
      <p>Zamiast mówić o zaburzeniu, mów o <strong>stylu pracy</strong>. Np.:</p>
      <ul>
        <li>"Pracuję wydajniej w blokach czasu z przerwami."</li>
        <li>"Potrzebuję instrukcji pisemnych po spotkaniu, by niczego nie przeoczyć."</li>
        <li>"Słuchawki wygłuszające pomagają mi utrzymać głębokie skupienie (Deep Work)."</li>
      </ul>
      <p>To są profesjonalne prośby o optymalizację pracy, a nie "roszczeniowość".</p>
    `
  },
  {
    id: 'a6',
    title: "Mój partner ma ADHD - instrukcja obsługi",
    category: "Dla Bliskich",
    targetPersona: [PersonaType.PARTNER],
    readTime: "6 min",
    summary: "Jak nie wejść w rolę rodzica dla swojego partnera? Budowanie relacji partnerskiej mimo chaosu.",
    tags: ["Związek", "Komunikacja", "Granice"],
    content: `
      <h3>Pułapka Rodzic-Dziecko</h3>
      <p>Największym zagrożeniem dla związku z ADHD jest dynamika, w której osoba neurotypowa przejmuje odpowiedzialność za wszystko ("muszę mu o wszystkim przypominać"), a osoba z ADHD czuje się kontrolowana i buntuje się.</p>
      
      <h3>Oddziel objaw od intencji</h3>
      <p>Kiedy partner nie zmył naczyń, mimo że obiecał, rzadko wynika to z braku szacunku do Ciebie. Częściej to wina pamięci roboczej. Nie usprawiedliwia to braku działania, ale zmienia sposób rozmowy.</p>
      
      <h3>Rozwiązania systemowe</h3>
      <p>Zamiast "Znowu zapomniałeś!", spróbujcie: "Jaki system przypominania możemy wprowadzić, żeby zmywarka była opróżniana?". Może alarm w telefonie? Może kartka na drzwiach lodówki? Szukajcie rozwiązań, nie winnych.</p>
    `
  },
  // --- NOWE ARTYKUŁY ---
  {
    id: 'a7',
    title: "Jak pokonać prokrastynację? Zestaw ratunkowy",
    category: "Strategie",
    targetPersona: [PersonaType.ADULT, PersonaType.PARTNER],
    readTime: "6 min",
    summary: "Nie możesz zacząć? Twój mózg czeka na dopaminę. Poznaj metody Pomodoro, Two-Minute Rule i zjedz tę żabę.",
    tags: ["Prokrastynacja", "Produktywność", "Lifehacks"],
    content: `
      <h3>Dlaczego nie możesz zacząć?</h3>
      <p>Prokrastynacja w ADHD to nie lenistwo. To ból fizyczny związany z brakiem dopaminy. Zadanie wydaje się "zbyt duże", "zbyt nudne" lub "zbyt straszne". Oto jak oszukać mózg:</p>

      <h3>1. Zasada 2 Minut</h3>
      <p>Jeśli coś zajmie mniej niż 2 minuty (np. odpisanie na SMS, włożenie talerza do zmywarki) – <strong>zrób to natychmiast</strong>. Nie wpisuj na listę. Nie planuj. Po prostu zrób. To daje natychmiastowy strzał dopaminy ("odhaczone!").</p>

      <h3>2. Metoda Pomodoro (wersja ADHD)</h3>
      <p>Klasyczne 25 minut może być za długie. Spróbuj <strong>10 minut pracy + 3 minuty nagrody</strong>. Nastaw fizyczny timer. Obiecaj sobie, że po 10 minutach możesz przestać. Najtrudniejszy jest start – zazwyczaj po 10 minutach będziesz chciał kontynuować.</p>

      <h3>3. "Zjedz tę żabę" (lub chociaż ją poliż)</h3>
      <p>Najtrudniejsze zadanie zrób jako pierwsze rano, zanim Twój "bak z silną wolą" się opróżni. Jeśli cała "żaba" jest za duża, zrób tylko jedną małą rzecz z nią związaną (np. otwórz plik w Wordzie i napisz tytuł).</p>
    `
  },
  {
    id: 'a8',
    title: "Cyfrowi pomocnicy – najlepsze aplikacje dla ADHD",
    category: "Strategie",
    targetPersona: [PersonaType.ADULT, PersonaType.PARENT],
    readTime: "5 min",
    summary: "Technologia może być wrogiem lub sojusznikiem. Lista sprawdzonych aplikacji, które działają jak zewnętrzna kora przedczołowa.",
    tags: ["Aplikacje", "Narzędzia", "Technologia"],
    content: `
      <h3>Zewnętrzny mózg</h3>
      <p>Nie próbuj wszystkiego pamiętać. Twój mózg jest od wymyślania pomysłów, a nie od przechowywania dat. Oto zestaw startowy:</p>

      <h3>1. Todoist / Microsoft To Do</h3>
      <p>Do list zadań. Klucz: używaj widgetu na pulpicie telefonu, żeby widzieć zadania bez wchodzenia w aplikację. Zapisuj wszystko od razu.</p>

      <h3>2. Habitica</h3>
      <p>Dla graczy. Zamienia Twoje życie w grę RPG. Za umycie zębów dostajesz złoto i doświadczenie, za niewykonanie zadania – tracisz życie. Świetne dla motywacji.</p>

      <h3>3. Forest</h3>
      <p>Jeśli ciągle scrollujesz social media. Sadzisz wirtualne drzewo, które rośnie, gdy nie dotykasz telefonu. Jeśli wyjdziesz z aplikacji – drzewo usycha. Proste i skuteczne.</p>

      <h3>4. Time Timer (Fizyczny lub App)</h3>
      <p>Osoby z ADHD mają "ślepotę czasową". Time Timer pokazuje upływ czasu jako znikający czerwony dysk. Widzisz, ile czasu zostało, zamiast zgadywać.</p>
    `
  },
  {
    id: 'a9',
    title: "ADHD w szkole – jak wspierać dziecko?",
    category: "Dla Rodziców",
    targetPersona: [PersonaType.PARENT],
    readTime: "8 min",
    summary: "Szkoła to często pole minowe dla dziecka z ADHD. Strategie na współpracę z nauczycielami i organizację nauki.",
    tags: ["Szkoła", "Edukacja", "Dziecko"],
    content: `
      <h3>Miejsce w klasie ma znaczenie</h3>
      <p>Poproś nauczyciela, by dziecko siedziało <strong>blisko tablicy i nauczyciela</strong>, z dala od okna i drzwi (głównych źródeł rozproszeń). To nie kara – to ułatwienie skupienia.</p>

      <h3>Dzielenie słonia na kawałki</h3>
      <p>Duże projekty (np. "napisz referat na za miesiąc") są dla dziecka z ADHD abstrakcją. Pomóż mu:</p>
      <ul>
        <li>Tydzień 1: Wybierz temat i poszukaj źródeł.</li>
        <li>Tydzień 2: Przeczytaj źródła i zrób notatki.</li>
        <li>Tydzień 3: Napisz brudnopis.</li>
      </ul>

      <h3>Wizualne wsparcie</h3>
      <p>Checklisty przyklejone na biurku ("Spakowałeś: zeszyt, piórnik, drugie śniadanie?"). Kolorowe teczki na każdy przedmiot. Plan lekcji z kolorami. Mózg ADHD kocha kolory i obrazy.</p>
    `
  },
  {
    id: 'a10',
    title: "Ogarnąć chaos – lifehacki organizacyjne i Body Doubling",
    category: "Strategie",
    targetPersona: [PersonaType.ADULT, PersonaType.PARTNER],
    readTime: "7 min",
    summary: "Od 'Launchpadu' przy drzwiach po pracę z 'Body Double'. Proste systemy, które ratują przed zgubionymi kluczami i bałaganem.",
    tags: ["Organizacja", "Dom", "Body Doubling"],
    content: `
      <h3>1. Stwórz "Launchpad" (Strefę Startową)</h3>
      <p>Miejsce przy samych drzwiach wejściowych. Miska na klucze, ładowarka do telefonu, miejsce na portfel i haczyk na plecak. <strong>Zasada:</strong> Jak wchodzisz do domu, rzeczy lądują TYLKO tam. Nigdy na kanapie.</p>

      <h3>2. Przezroczyste pudła</h3>
      <p>Jeśli nie widzisz przedmiotu, dla mózgu ADHD on nie istnieje (object permanence). Używaj przezroczystych pojemników do przechowywania. Nie chowaj rzeczy głęboko w szufladach.</p>

      <h3>3. Body Doubling (Sobowtór)</h3>
      <p>Magiczna technika na nudne zadania. Polega na pracy w obecności innej osoby.</p>
      <p><strong>Jak to działa?</strong> Druga osoba nie musi Ci pomagać. Może czytać książkę, podczas gdy Ty sprzątasz. Sama jej obecność działa jak "kotwica", która trzyma Cię przy zadaniu. Możesz to robić na żywo, na wideo z przyjacielem, lub skorzystać z dedykowanych stron (np. Focusmate).</p>

      <h3>4. Sprzątanie z timerem</h3>
      <p>Nie mów "posprzątam cały dom". Powiedz: "Będę sprzątać przez 15 minut". Włącz muzykę. Kiedy timer zadzwoni – masz prawo przestać. Często zrobisz więcej niż myślisz.</p>
    `
  }
];