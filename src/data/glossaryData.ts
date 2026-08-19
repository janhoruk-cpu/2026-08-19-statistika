export interface GlossaryTerm {
  id: string;
  slo: string;
  eng: string;
  category:
    | 'Uvod in metodologija'
    | 'Opisna statistika in spremenljivke'
    | 'Vzorčenje in poskusi'
    | 'Verjetnost'
    | 'Porazdelitve'
    | 'Temelji sklepanja'
    | 'Kategorični podatki'
    | 'Številska analiza in ANOVA'
    | 'Linearna regresija'
    | 'Logistična regresija in GLM';
  chapterId?: string;
  unitId?: string;
  definition: string;
  formula?: string;
  example?: string;
  details?: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ==========================================
  // 1. UVOD, METODOLOGIJA IN OSNOVE PODATKOV
  // ==========================================
  {
    id: 'statistika-def',
    slo: 'Statistika (Znanost o podatkih)',
    eng: 'Statistics',
    category: 'Uvod in metodologija',
    chapterId: 'chapter-0',
    unitId: 'unit-0-1',
    definition: 'Znanstvena disciplina, ki razvija in uporablja metode za zbiranje, urejanje, analizo, interpretacijo in predstavitev podatkov ter omogoča sprejemanje utemeljenih odločitev v razmerah negotovosti.',
    example: 'Preizkušanje učinkovitosti novega cepiva v klinični študiji z 10.000 udeleženci za dokazovanje varnosti in učinka.',
    details: 'Statistiko delimo na opisno (deskriptivno) statistiko, ki povzema opazovane podatke, in sklepno (inferenčno) statistiko, ki posplošuje ugotovitve z vzorca na celotno populacijo.'
  },
  {
    id: 'opisna-statistika',
    slo: 'Opisna (deskriptivna) statistika',
    eng: 'Descriptive Statistics',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-0',
    unitId: 'unit-0-1',
    definition: 'Nabor metod, tabelaričnih prikazov, grafikonov in številskih kazalnikov (srednjih vrednosti, mer razpršenosti), ki kvantitativno opisujejo in strnjeno povzemajo lastnosti zbranih podatkov brez posploševanja.',
    example: 'Izračun povprečne ocene, mediane in standardnega odklona točk na izpitu za 120 študentov.'
  },
  {
    id: 'sklepna-statistika',
    slo: 'Sklepna (inferenčna) statistika',
    eng: 'Inferential Statistics',
    category: 'Temelji sklepanja',
    chapterId: 'chapter-0',
    unitId: 'unit-0-1',
    definition: 'Postopki in matematična orodja, ki na podlagi slučajnega vzorca ocenjujejo neznane populacijske parametre (intervali zaupanja) in preverjajo znanstvene hipoteze (testiranje hipotez) ob upoštevanju verjetnostne napake vzorčenja.',
    example: 'Napovedovanje volilnega rezultata celotnega volilnega telesa na podlagi reprezentativnega vzorca 1.000 volivcev.'
  },
  {
    id: 'populacija-vzorec',
    slo: 'Populacija in Vzorec',
    eng: 'Population and Sample',
    category: 'Uvod in metodologija',
    chapterId: 'chapter-0',
    unitId: 'unit-0-2',
    definition: 'Populacija je celotna množica vseh enot (ljudi, izdelkov, meritev), ki so predmet našega raziskovanja. Vzorec je podmnožica enot, izbrana iz populacije, na kateri dejansko izvedemo meritve.',
    formula: 'N \\text{ (velikost populacije)}, \\quad n \\text{ (velikost vzorca, } n < N)',
    example: 'Populacija: vsi polnoletni prebivalci Slovenije (N ≈ 1.700.000). Vzorec: 1.200 naključno anketiranih prebivalcev (n = 1.200).'
  },
  {
    id: 'parameter-statistika',
    slo: 'Populacijski parameter in vzorčna statistika',
    eng: 'Parameter vs. Statistic',
    category: 'Uvod in metodologija',
    chapterId: 'chapter-0',
    unitId: 'unit-0-2',
    definition: 'Parameter je fiksna, običajno neznana številska značilnost celotne populacije (npr. μ, σ, p). Vzorčna statistika (ocenjevalec) je številska vrednost, izračunana iz podatkov vzorca (npr. x̄, s, p̂), ki se od vzorca do vzorca naključno spreminja.',
    formula: '\\text{Parameter: } \\mu, \\sigma, p \\quad \\Longleftrightarrow \\quad \\text{Statistika: } \\bar{x}, s, \\hat{p}',
    example: 'Resnična povprečna višina vseh prebivalcev je μ (parameter), povprečje v našem vzorcu 100 oseb pa je x̄ = 176,4 cm (statistika).'
  },
  {
    id: 'tidy-data',
    slo: 'Urejeni podatki (Tidy Data)',
    eng: 'Tidy Data',
    category: 'Uvod in metodologija',
    chapterId: 'chapter-1',
    unitId: 'unit-1-1',
    definition: 'Standardizirana zgradba podatkovne matrike, kjer: 1. vsaka vrstica predstavlja natanko eno opazovano enoto (primer), 2. vsak stolpec natanko eno spremenljivko in 3. vsaka celica natanko eno izmerjeno vrednost.',
    example: 'V tabeli pacientov ima vsaka vrstica ID enega bolnika, stolpci pa so [ID, Starost, Krvni_tlak, Terapija].'
  },
  {
    id: 'cleveland-mcgill-hierarhija',
    slo: 'Cleveland-McGillova hierarhija zaznavanja',
    eng: 'Cleveland-McGill Perception Hierarchy',
    category: 'Uvod in metodologija',
    chapterId: 'chapter-0',
    unitId: 'unit-0-4',
    definition: 'Empirično dokazana lestvica natančnosti, s katero človeški možgani dekodirajo vizualne simbole v podatke: 1. Položaj na skupni osi (najbolj natančno), 2. Dolžina, 3. Kot/nagib, 4. Površina, 5. 3D volumen, 6. Barvna nasičenost/svetlost (najmanj natančno za količine).',
    example: 'Stolpčni graf na skupni ničelni osi omogoča 10-krat bolj natančno primerjavo kot tortni diagram z več izseki ali 3D krogelni graf.',
    details: 'Raziskava Clevelanda in McGilla (1984) ter kasnejša potrditev Heera in Bostocka (2010) predstavljata temelj znanstvenega načrtovanja podatkovnih grafik.'
  },
  {
    id: 'fasetiranje-small-multiples',
    slo: 'Fasetiranje (Small Multiples / Mreža podgrafov)',
    eng: 'Faceting / Small Multiples',
    category: 'Uvod in metodologija',
    chapterId: 'chapter-0',
    unitId: 'unit-0-4',
    definition: 'Tehnika vizualizacije, pri kateri podatke razdelimo po kategorijah in za vsako podskupino narišemo ločen, a strukturno in merilno povsem usklajen mini grafikon v urejeni mreži.',
    example: 'Prikaz trenda BDP za 12 držav v mreži 3×4 z enako Y-osjo, namesto prepletenih 12 barvnih črt na enem samem grafu.',
    details: 'Tufte in Healy to tehniko poudarjata kot eno najučinkovitejših rešitev za primerjavo večdimenzionalnih podatkov brez kognitivne preobremenitve.'
  },
  {
    id: 'graf-koeficientov-forest',
    slo: 'Grafikon modelskih koeficientov (Forest / Dot-and-Whisker plot)',
    eng: 'Coefficient / Forest Plot',
    category: 'Linearna regresija',
    chapterId: 'chapter-8',
    unitId: 'unit-8-3',
    definition: 'Vizualni prikaz ocen parametrov regresijskih modelov (β_j), kjer vsaka spremenljivka dobi točko (točkovna ocena) in vodoravni interval (npr. 95 % interval zaupanja). Omogoča takojšnjo oceno velikosti učinka in statistične značilnosti glede na ničelno črto.',
    formula: '\\hat{\\beta}_j \\pm t^* \\cdot \\text{SE}(\\hat{\\beta}_j)',
    example: 'Prikaz učinkov izobrazbe, izkušenj in spola na plačo v enem grafu, kjer takoj vidimo, kateri intervali prečkajo ničlo.',
    details: 'Zamenjuje dolge in težko berljive tabele regresijskih koeficientov z zvezdicami (***) ter omogoča neposredno vizualno primerjavo več modelov.'
  },
  {
    id: 'preobremenjen-graf-spaghetti',
    slo: 'Preobremenjen grafikon (Spaghetti Plot)',
    eng: 'Spaghetti Plot',
    category: 'Uvod in metodologija',
    chapterId: 'chapter-0',
    unitId: 'unit-0-4',
    definition: 'Slab vizualni prikaz časovnih vrst, kjer je na enem koordinatnem sistemu narisanih preveč (npr. 10–20) prekrivajočih se črt različnih barv, kar onemogoča sledenje posameznim skupinam in ustvarja optični kaos.',
    example: 'Graf z 15 državami v različnih barvah in 15-delno legendo, ki od bralca zahteva nenehno skakanje med grafom in legendo.',
    details: 'Rešitev je bodisi fasetiranje (small multiples) bodisi fokusno poudarjanje (ena izbrana serija v barvi, ostale v nevtralni sivi).'
  },
  {
    id: 'stresanje-tock-jitter',
    slo: 'Stresanje točk (Jittering)',
    eng: 'Jittering',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-1',
    unitId: 'unit-1-2',
    definition: 'Grafični postopek dodajanja majhnega naključnega šuma (odklona) položaju točk na diskretnih ali zaokroženih spremenljivkah, da se prepreči popolno prekrivanje (overplotting) in razkrije prava gostota podatkov.',
    example: 'Pri prikazu ocen od 1 do 5 pri 1.000 študentih bi se brez stresanja videlo le 5 točk; z dodanim vodoravnim stresanjem pa se razkrije celotna porazdelitev frekvenc.'
  },
  {
    id: 'perceptivno-enakomerna-lestvica',
    slo: 'Perceptivno enakomerna barvna lestvica (Perceptually Uniform Colormap)',
    eng: 'Perceptually Uniform Palette (Viridis / Cividis)',
    category: 'Uvod in metodologija',
    chapterId: 'chapter-0',
    unitId: 'unit-0-4',
    definition: 'Barvna lestvica, pri kateri je fizikalna sprememba v svetlosti (luminanci) natančno sorazmerna s človeškim zaznavanjem spremembe vrednosti skozi celoten razpon, ne ustvarja lažnih vizualnih mejnikov ter ostaja berljiva pri vseh oblikah barvne slepote in v sivinskem tisku.',
    example: 'Paleta Viridis (od temno vijolične prek turkizne do svetlo rumene), ki je nadomestila zastarelo mavrično (Jet/Rainbow) paleto v sodobni znanosti.'
  },

  // ==========================================
  // 2. VRSTE SPREMENLJIVK IN MERSKE LESTVICE
  // ==========================================
  {
    id: 'numericne-spremenljivke',
    slo: 'Številčne (numerične / kvantitativne) spremenljivke',
    eng: 'Numerical / Quantitative Variables',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-1',
    unitId: 'unit-1-1',
    definition: 'Spremenljivke, katerih vrednosti so števila, s katerimi imajo računske operacije (seštevanje, povprečje, razlika) smiseln vsebinski pomen. Delimo jih na zvezne in diskretne.',
    example: 'Telesna višina (178,5 cm), starost (24 let), število otrok (2), letni dohodek (28.000 €).'
  },
  {
    id: 'zvezna-spremenljivka',
    slo: 'Zvezna spremenljivka',
    eng: 'Continuous Variable',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-1',
    unitId: 'unit-1-1',
    definition: 'Številska spremenljivka, ki lahko na danem intervalu zavzame poljubno realno vrednost (neskončno mnogo možnih vmesnih stanj), običajno je rezultat merjenja.',
    example: 'Čas teka na 100 m (10,42 s), temperatura zraka (21,37 °C), teža paketa (3,412 kg).'
  },
  {
    id: 'diskretna-spremenljivka',
    slo: 'Diskretna (števna) spremenljivka',
    eng: 'Discrete Variable',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-1',
    unitId: 'unit-1-1',
    definition: 'Številska spremenljivka, ki lahko zavzame le ločene, posamične vrednosti (običajno cela števila brez vmesnih vrednosti), običajno je rezultat štetja.',
    example: 'Število napak v programski kodi (0, 1, 2, 3...), število prometnih nesreč v enem dnevu, število golov na tekmi.'
  },
  {
    id: 'kategoricne-spremenljivke',
    slo: 'Kategorične (opisne / kvalitativne) spremenljivke',
    eng: 'Categorical / Qualitative Variables',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-1',
    unitId: 'unit-1-1',
    definition: 'Spremenljivke, katerih vrednosti predstavljajo pripadnost določenim skupinam, kategorijam ali opisnim lastnostim. Delimo jih na nominalne in ordinalne.',
    example: 'Krvna skupina (A, B, AB, 0), stopnja izobrazbe (osnovna, srednja, visoka), spol, domači kraj.'
  },
  {
    id: 'nominalna-spremenljivka',
    slo: 'Nominalna spremenljivka',
    eng: 'Nominal Variable',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-1',
    unitId: 'unit-1-1',
    definition: 'Kategorična spremenljivka, katere kategorije nimajo naravnega ali logičnega vrstnega reda. Kategorije služijo zgolj poimenovanju in razlikovanju.',
    example: 'Barva oči (modra, rjava, zelena), operacijski sistem (Windows, macOS, Linux), smer študija.'
  },
  {
    id: 'ordinalna-spremenljivka',
    slo: 'Ordinalna (vrstilna) spremenljivka',
    eng: 'Ordinal Variable',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-1',
    unitId: 'unit-1-1',
    definition: 'Kategorična spremenljivka, pri kateri obstaja jasen, naraven vrstni red med kategorijami, vendar razmiki med posameznimi stopnjami niso nujno enaki ali natančno izmerljivi.',
    example: 'Likertova lestvica (1 - Močno se ne strinjam do 5 - Močno se strinjam), vojaški čini, ocena zadovoljstva (slabo, povprečno, odlično).'
  },
  {
    id: 'indikatorska-spremenljivka',
    slo: 'Indikatorska (dummy / binarna) spremenljivka',
    eng: 'Indicator / Dummy / Binary Variable',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-1',
    unitId: 'unit-1-1',
    definition: 'Dvojiška spremenljivka, ki zavzame le vrednost 1 (če je lastnost prisotna) ali 0 (če lastnosti ni), uporabna predvsem za vključevanje kategoričnih podatkov v regresijske modele.',
    formula: 'x_i = \\begin{cases} 1, & \\text{če velja pogoj} \\\\ 0, & \\text{sicer} \\end{cases}',
    example: 'Kajenje: 1 = kadi, 0 = ne kadi; Izid zdravljenja: 1 = ozdravljen, 0 = neozdravljen.'
  },
  {
    id: 'pojasnjevalna-odzivna',
    slo: 'Pojasnjevalna (neodvisna) in odzivna (odvisna) spremenljivka',
    eng: 'Explanatory vs. Response Variable',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-1',
    unitId: 'unit-1-2',
    definition: 'Pojasnjevalna spremenljivka (X) je dejavnik, za katerega domnevamo, da vpliva ali napoveduje spremembe v odzivni spremenljivki (Y). Odzivna spremenljivka (Y) je tisti izid, ki ga želimo razložiti ali napovedati.',
    example: 'Pojasnjevalna X: tedensko število ur učenja; Odzivna Y: doseženo število točk na izpitu.'
  },
  {
    id: 'confounding-variable',
    slo: 'Moteča spremenljivka (Confounder)',
    eng: 'Confounding Variable',
    category: 'Uvod in metodologija',
    chapterId: 'chapter-1',
    unitId: 'unit-1-2',
    definition: 'Zunanja spremenljivka, ki je hkrati povezana tako s pojasnjevalno spremenljivko kot z odzivno spremenljivko. Če je ne nadzorujemo, lahko ustvari lažno navidezno povezavo ali pa resnično vzročno zvezo povsem prikrije.',
    example: 'Povezava med prodajo sladoleda in številom utopitev: moteča spremenljivka je zunanja temperatura (v vročih dneh ljudje jedo več sladoleda in več plavajo).'
  },

  // ==========================================
  // 3. MERE SREDNJIH VREDNOSTI IN RAZPRŠENOSTI
  // ==========================================
  {
    id: 'aritmeticna-sredina',
    slo: 'Aritmetična sredina (Povprečje)',
    eng: 'Arithmetic Mean',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-2',
    unitId: 'unit-2-1',
    definition: 'Vsota vseh izmerjenih vrednosti, deljena s skupnim številom enot. Predstavlja gravitacijsko težišče podatkov, vendar je zelo občutljiva na skrajne vrednosti (osamelce).',
    formula: '\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i, \\quad \\mu = \\frac{1}{N} \\sum_{i=1}^N x_i',
    example: 'Povprečje podatkov [2, 4, 6, 8, 10] je (2+4+6+8+10)/5 = 6.'
  },
  {
    id: 'mediana',
    slo: 'Mediana (Središčna vrednost)',
    eng: 'Median',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-2',
    unitId: 'unit-2-1',
    definition: 'Vrednost, ki po velikosti urejen nabor podatkov razdeli na natanko dve enaki polovici: 50 % enot ima manjšo ali enako vrednost, 50 % pa večjo ali enako vrednost. Je robustna mera srednje vrednosti.',
    example: 'V nizu [1.200 €, 1.300 €, 1.500 €, 1.600 €, 120.000 €] je mediana 1.500 €, medtem ko je povprečje kar 25.120 €.'
  },
  {
    id: 'modus',
    slo: 'Modus (Gostiščna vrednost)',
    eng: 'Mode',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-2',
    unitId: 'unit-2-1',
    definition: 'Tista vrednost ali kategorija v naboru podatkov, ki se pojavi z največjo frekvenco (najpogosteje). Porazdelitev ima lahko en modus (unimodalna), dva (bimodalna) ali več.',
    example: 'V naboru krvnih skupin [0, A, A, B, A, 0, AB] je modus krvna skupina A.'
  },
  {
    id: 'varianca',
    slo: 'Varianca (Populacijska in vzorčna)',
    eng: 'Variance',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-2',
    unitId: 'unit-2-1',
    definition: 'Povprečje kvadratov odstopanj posameznih vrednosti od njihove srednje vrednosti. Meri skupno stopnjo razpršenosti podatkov okrog povprečja. Pri vzorčni varianci delimo z (n-1) zaradi Besselovega popravka nepristranskosti.',
    formula: 's^2 = \\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2, \\quad \\sigma^2 = \\frac{1}{N} \\sum_{i=1}^N (x_i - \\mu)^2'
  },
  {
    id: 'standardni-odklon',
    slo: 'Standardni odklon (Standardna deviacija)',
    eng: 'Standard Deviation',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-2',
    unitId: 'unit-2-1',
    definition: 'Kvadratni koren iz variance. Predstavlja tipično (povprečno) odstopanje posameznih podatkov od njihovega povprečja v istih merskih enotah kot originalni podatki.',
    formula: 's = \\sqrt{s^2} = \\sqrt{\\frac{1}{n-1} \\sum_{i=1}^n (x_i - \\bar{x})^2}'
  },
  {
    id: 'iqr-rule',
    slo: 'Medkvartilni razmik (IQR) in kvartili',
    eng: 'Interquartile Range and Quartiles',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-2',
    unitId: 'unit-2-1',
    definition: 'Razpon osrednjih 50 % podatkov med prvim kvartilom (Q1 - 25. percentil) in tretjim kvartilom (Q3 - 75. percentil). Predstavlja robustno mero razpršenosti.',
    formula: '\\text{IQR} = Q_3 - Q_1, \\quad \\text{Osamelci zunaj: } [Q_1 - 1{,}5\\text{IQR}, \\; Q_3 + 1{,}5\\text{IQR}]',
    example: 'Če je Q1 = 20 in Q3 = 50, je IQR = 30. Vrednost nad 50 + 1,5×30 = 95 velja za osamelec.'
  },
  {
    id: 'asimetrija-skewness',
    slo: 'Asimetrija (Poševnost / Skewness)',
    eng: 'Skewness',
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-2',
    unitId: 'unit-2-1',
    definition: 'Mera nesimetričnosti porazdelitve okrog srednje vrednosti. Pri desno (pozitivno) poševni porazdelitvi se rep razteza v desno proti visokim vrednostim (velja: povprečje > mediana). Pri levo poševni se rep razteza v levo (povprečje < mediana).',
    example: 'Porazdelitev dohodkov je izrazito desno poševna (večina ljudi ima nižje plače, nekaj zelo visokih plač potegne povprečje navzgor).'
  },
  {
    id: 'simpsons-paradox',
    slo: 'Simpsonov paradoks',
    eng: "Simpson's Paradox",
    category: 'Opisna statistika in spremenljivke',
    chapterId: 'chapter-2',
    unitId: 'unit-2-2',
    definition: 'Statistični fenomen, pri katerem se smer povezave med dvema spremenljivkama popolnoma obrne ali izgine, ko podatke razdelimo na podskupine glede na skrito motečo spremenljivko.',
    example: 'Navidezna spolna pristranskost pri vpisih na fakulteto izgine, ko upoštevamo, da so se ženske v večjem deležu prijavljale na oddelke z nižjo splošno stopnjo sprejema.'
  },

  // ==========================================
  // 4. VZORČENJE, EKSPERIMENTI IN BIOMEDICINSKI NAČRTI
  // ==========================================
  {
    id: 'enostavno-slucajno-vzorcenje',
    slo: 'Enostavno slučajno vzorčenje (SRS)',
    eng: 'Simple Random Sampling (SRS)',
    category: 'Vzorčenje in poskusi',
    chapterId: 'chapter-1',
    unitId: 'unit-1-2',
    definition: 'Zlati standard verjetnostnega vzorčenja, kjer ima vsaka posamezna enota v populaciji in vsaka možna kombinacija n enot natanko enako verjetnost izbire v vzorec.',
    example: 'Žrebanje 100 dobitnikov iz bobna z 10.000 oštevilčenimi kroglicami ali z generatorjem naključnih števil.'
  },
  {
    id: 'stratified-sampling',
    slo: 'Stratificirano (plastevito) vzorčenje',
    eng: 'Stratified Sampling',
    category: 'Vzorčenje in poskusi',
    chapterId: 'chapter-1',
    unitId: 'unit-1-2',
    definition: 'Metoda vzorčenja, kjer populacijo najprej razdelimo na homogene podskupine (stratume/plasti glede na spol, starost, regijo), nato pa iz vsake plasti neodvisno izberemo slučajni vzorec sorazmerne velikosti.',
    example: 'Anketiranje dijakov z ločenim vzorčenjem iz 1., 2., 3. in 4. letnika, da so vsi letniki zagotovo pravično zastopani.'
  },
  {
    id: 'cluster-sampling',
    slo: 'Vzorčenje v gručah (Grozdno vzorčenje)',
    eng: 'Cluster Sampling',
    category: 'Vzorčenje in poskusi',
    chapterId: 'chapter-1',
    unitId: 'unit-1-2',
    definition: 'Vzorčenje, kjer populacijo razdelimo na heterogene naravne geografske ali organizacijske enote (gruče/grozde), nato naključno izberemo nekaj gruč in v raziskavo vključimo VSE enote iz izbranih gruč.',
    example: 'Namesto posameznih učencev po celi državi naključno izberemo 15 osnovnih šol in anketiramo vse učence na teh šolah.'
  },
  {
    id: 'opazovalna-studija',
    slo: 'Opazovalna študija in poskus (Eksperiment)',
    eng: 'Observational Study vs. Experiment',
    category: 'Vzorčenje in poskusi',
    chapterId: 'chapter-1',
    unitId: 'unit-1-3',
    definition: 'V opazovalni študiji raziskovalci le zbirajo podatke brez poseganja v okolje (lahko dokažemo le korelacijo/povezanost). V randomiziranem poskusu pa raziskovalci aktivno dodelijo terapije/pogoje preizkušancem z randomizacijo (kar omogoča dokazovanje vzročnosti).',
    example: 'Opazovalna: primerjava zdravja kadilcev in nekadilcev. Poskus: naključna dodelitev novega zdravila polovici pacientov in placeba drugi polovici.'
  },
  {
    id: 'itt-analysis',
    slo: 'Analiza po namenu zdravljenja (Intention-to-Treat / ITT)',
    eng: 'Intention-to-Treat Analysis (ITT)',
    category: 'Vzorčenje in poskusi',
    chapterId: 'chapter-1',
    unitId: 'unit-1-3',
    definition: 'Standardna metodologija v kliničnih preskušanjih, pri kateri so vsi randomizirani bolniki vključeni v končno analizo v skupini, v katero so bili prvotno dodeljeni, ne glede na to, ali so terapijo v celoti zaključili, izpustili ali odstopili.',
    example: 'Če 352 pacientov prejme vareniklin in jih 93 odstopi zaradi neželenih učinkov, analiza ITT vseh 352 pacientov obravnava v skupini vareniklina, da ohrani nepristranskost randomizacije.',
    details: 'Izključitev pacientov, ki niso zaključili zdravljenja (per-protocol analiza), lahko povzroči resno pristranskost zaradi motenja (confounding).'
  },
  {
    id: 'blocking',
    slo: 'Blokiranje v eksperimentalnem načrtu',
    eng: 'Blocking in Experimental Design',
    category: 'Vzorčenje in poskusi',
    chapterId: 'chapter-1',
    unitId: 'unit-1-3',
    definition: 'Eksperimentalna tehnika, kjer udeležence pred randomizacijo razdelimo v bloke glede na znan vplivni dejavnik (npr. spol, stopnja bolezni), nato pa znotraj vsakega bloka naključno dodelimo eksperimentalne pogoje, s čimer zmanjšamo variabilnost.',
    example: 'Pacientom z blagim in pacientom s hudim potekom bolezni ločeno naključno dodelimo zdravilo ali placebo.'
  },
  {
    id: 'placebo-double-blind',
    slo: 'Placebo učinek in dvojno slepi poskus',
    eng: 'Placebo Effect and Double-Blind Experiment',
    category: 'Vzorčenje in poskusi',
    chapterId: 'chapter-1',
    unitId: 'unit-1-3',
    definition: 'Placebo je navidezna terapija brez učinkovine. V dvojno slepem poskusu niti udeleženec niti zdravnik/ocenjevalec ne vesta, kdo prejema pravo zdravilo in kdo placebo, kar izniči psihološka pričakovanja in pristranskost ocenjevanja.',
    example: 'Klinično testiranje cepiva s fiziološko raztopino v identičnih oštevilčenih ampulah.'
  },

  // ==========================================
  // 5. VERJETNOST, DIAGNOSTIKA IN STATISTIKA V MEDICINI
  // ==========================================
  {
    id: 'verjetnost-def',
    slo: 'Verjetnost dogodka',
    eng: 'Probability of an Event',
    category: 'Verjetnost',
    chapterId: 'chapter-3',
    unitId: 'unit-3-1',
    definition: 'Številska mera negotovosti ali pogostosti pojava dogodka A pri ponavljanju poskusa v enakih pogojih, omejena na interval med 0 (nemogoč dogodek) in 1 (gotov dogodek).',
    formula: '0 \\le P(A) \\le 1, \\quad P(\\text{Gotov}) = 1, \\quad P(A^c) = 1 - P(A)'
  },
  {
    id: 'conditional-probability',
    slo: 'Pogojna verjetnost',
    eng: 'Conditional Probability',
    category: 'Verjetnost',
    chapterId: 'chapter-3',
    unitId: 'unit-3-1',
    definition: 'Verjetnost, da se zgodi dogodek A ob predpostavki (pogoju), da se je dogodek B že zanesljivo zgodil.',
    formula: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad \\text{pri } P(B) > 0'
  },
  {
    id: 'neodvisnost-dogodkov',
    slo: 'Statistična neodvisnost dogodkov',
    eng: 'Independence of Events',
    category: 'Verjetnost',
    chapterId: 'chapter-3',
    unitId: 'unit-3-1',
    definition: 'Dva dogodka A in B sta statistično neodvisna, če dejstvo, da se je zgodil B, prav nič ne spremeni verjetnosti za nastop dogodka A.',
    formula: 'P(A \\mid B) = P(A) \\iff P(A \\cap B) = P(A) \\cdot P(B)'
  },
  {
    id: 'bayes-theorem',
    slo: 'Bayesov izrek (Bayesovo pravilo)',
    eng: "Bayes' Theorem",
    category: 'Verjetnost',
    chapterId: 'chapter-3',
    unitId: 'unit-3-2',
    definition: 'Temeljni verjetnostni izrek, ki omogoča posodobitev apriorne verjetnosti hipoteze P(H) v aposteriorno verjetnost P(H|D) ob upoštevanju novih opazovanih podatkov in verjetja dokazov.',
    formula: 'P(H \\mid D) = \\frac{P(D \\mid H) \\cdot P(H)}{P(D)} = \\frac{P(D \\mid H) P(H)}{P(D \\mid H)P(H) + P(D \\mid H^c)P(H^c)}'
  },
  {
    id: 'prevalence-incidence',
    slo: 'Prevalenca in incidenca bolezni',
    eng: 'Prevalence and Incidence',
    category: 'Verjetnost',
    chapterId: 'chapter-3',
    unitId: 'unit-3-2',
    definition: 'Prevalenca je delež posameznikov v populaciji, ki imajo določeno bolezen v danem trenutku. Incidenca pa je delež novih primerov bolezni, ki se razvijejo v določenem časovnem obdobju.',
    example: 'Prevalenca raka dojke pri ženskah nad 40 let v Kanadi je 0,35 % (35 na 10.000 žensk letno).'
  },
  {
    id: 'sensitivity-specificity',
    slo: 'Občutljivost (Senzitivnost) in specifičnost',
    eng: 'Sensitivity and Specificity',
    category: 'Verjetnost',
    chapterId: 'chapter-3',
    unitId: 'unit-3-2',
    definition: 'Občutljivost (True Positive Rate) je verjetnost pozitivnega testa pri bolni osebi P(T+|Bolezen). Specifičnost (True Negative Rate) je verjetnost negativnega testa pri zdravi osebi P(T-|Zdrav).',
    formula: '\\text{Občutljivost} = \\frac{TP}{TP+FN} = P(T^+ \\mid D), \\quad \\text{Specifičnost} = \\frac{TN}{TN+FP} = P(T^- \\mid D^c)'
  },
  {
    id: 'ppv-npv',
    slo: 'Pozitivna (PPV) in negativna (NPV) napovedna vrednost',
    eng: 'Positive and Negative Predictive Value (PPV / NPV)',
    category: 'Verjetnost',
    chapterId: 'chapter-3',
    unitId: 'unit-3-2',
    definition: 'PPV je verjetnost, da pacient dejansko ima bolezen, če je njegov test pozitiven P(D|T+). NPV je verjetnost, da je pacient res zdrav, če je njegov test negativen P(Dc|T-). Obe vrednosti sta močno odvisni od prevalence bolezni.',
    formula: '\\text{PPV} = \\frac{\\text{Senzitivnost} \\times \\text{Prevalenca}}{\\text{Senzitivnost} \\times \\text{Prevalenca} + (1-\\text{Specifičnost}) \\times (1-\\text{Prevalenca})}',
    example: 'Pri mamografiji z 89 % senzitivnostjo in 93 % specifičnostjo ob prevalenci 0,35 % je PPV le 4,3 % (večina pozitivnih testov je lažno pozitivnih zaradi nizke prevalence).'
  },
  {
    id: 'expected-value',
    slo: 'Pričakovana vrednost (Matematično upanje)',
    eng: 'Expected Value E(X)',
    category: 'Verjetnost',
    chapterId: 'chapter-3',
    unitId: 'unit-3-3',
    definition: 'Teoretično povprečje (težišče) slučajne spremenljivke, izračunano kot z verjetnostmi utežena vsota vseh možnih vrednosti.',
    formula: 'E(X) = \\mu = \\sum_{i} x_i P(X = x_i) \\quad \\text{ali} \\quad \\int_{-\\infty}^\\infty x f(x) dx'
  },
  {
    id: 'linear-combination-rv',
    slo: 'Linearna kombinacija slučajnih spremenljivk',
    eng: 'Linear Combinations of Random Variables',
    category: 'Verjetnost',
    chapterId: 'chapter-3',
    unitId: 'unit-3-3',
    definition: 'Matematična formula za pričakovano vrednost in varianco vsote ali razlike dveh slučajnih spremenljivk: E(aX + bY) = aE(X) + bE(Y). Za neodvisni spremenljivki velja Var(aX + bY) = a²Var(X) + b²Var(Y). Pri koreliranih pa prištejemo 2abCov(X,Y).',
    formula: '\\text{Var}(aX + bY) = a^2\\text{Var}(X) + b^2\\text{Var}(Y) + 2ab\\,\\sigma_X\\sigma_Y\\rho_{X,Y}'
  },

  // ==========================================
  // 6. TEORETIČNE IN DISKRETNE PORAZDELITVE
  // ==========================================
  {
    id: 'normalna-porazdelitev',
    slo: 'Normalna (Gaussova) porazdelitev',
    eng: 'Normal (Gaussian) Distribution',
    category: 'Porazdelitve',
    chapterId: 'chapter-4',
    unitId: 'unit-4-1',
    definition: 'Zvezna zvonasta simetrična verjetnostna porazdelitev, v celoti določena s povprečjem μ in varianco σ². Velja za najpomembnejšo porazdelitev v statistiki zaradi centralnega limitnega izreka.',
    formula: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}, \\quad X \\sim N(\\mu, \\sigma^2)'
  },
  {
    id: 'z-score',
    slo: 'Z-vrednost (Standardizacija)',
    eng: 'Z-score',
    category: 'Porazdelitve',
    chapterId: 'chapter-4',
    unitId: 'unit-4-1',
    definition: 'Število standardnih odklonov, za kolikor je določena izmerjena vrednost x oddaljena nad ali pod povprečjem porazdelitve.',
    formula: 'z = \\frac{x - \\mu}{\\sigma} \\quad \\text{ali} \\quad z = \\frac{x - \\bar{x}}{s}'
  },
  {
    id: 'empirical-rule',
    slo: 'Empirično pravilo (68 - 95 - 99,7 %)',
    eng: 'Empirical Rule (68-95-99.7 Rule)',
    category: 'Porazdelitve',
    chapterId: 'chapter-4',
    unitId: 'unit-4-1',
    definition: 'Za vsako normalno porazdeljeno spremenljivko velja: približno 68,3 % podatkov leži znotraj ±1σ od povprečja, 95,4 % znotraj ±2σ in 99,7 % znotraj ±3σ.',
    formula: 'P(\\mu - \\sigma \\le X \\le \\mu + \\sigma) \\approx 0{,}683, \\quad P(\\mu - 2\\sigma \\le X \\le \\mu + 2\\sigma) \\approx 0{,}954'
  },
  {
    id: 'binomial-distribution',
    slo: 'Binomska porazdelitev',
    eng: 'Binomial Distribution',
    category: 'Porazdelitve',
    chapterId: 'chapter-4',
    unitId: 'unit-4-2',
    definition: 'Diskretna porazdelitev števila k uspehov v n zaporednih, neodvisnih Bernoullijevih poskusih, kjer je verjetnost uspeha v vsakem poskusu enaka p.',
    formula: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad E(X) = np, \\quad \\text{Var}(X) = np(1-p)'
  },
  {
    id: 'geometric-distribution',
    slo: 'Geometrijska porazdelitev',
    eng: 'Geometric Distribution',
    category: 'Porazdelitve',
    chapterId: 'chapter-4',
    unitId: 'unit-4-2',
    definition: 'Diskretna porazdelitev, ki modelira čakalni čas oziroma število neodvisnih poskusov do nastopa prvega uspeha pri konstantni verjetnosti uspeha p.',
    formula: 'P(X = k) = (1-p)^{k-1}p, \\quad E(X) = \\frac{1}{p}, \\quad \\text{Var}(X) = \\frac{1-p}{p^2}',
    example: 'Število odvzemov krvi pri naključnih darovalcih, dokler ne najdemo prvega krvodajalca s krvno skupino 0- (p = 0,08; v povprečju 1/0,08 = 12,5 oseb).'
  },
  {
    id: 'negative-binomial',
    slo: 'Negativna binomska porazdelitev',
    eng: 'Negative Binomial Distribution',
    category: 'Porazdelitve',
    chapterId: 'chapter-4',
    unitId: 'unit-4-2',
    definition: 'Posplošitev geometrijske porazdelitve, ki modelira število poskusov k, potrebnih za dosego natanko r uspehov pri neodvisnih Bernoullijevih poskusih.',
    formula: 'P(X = k) = \\binom{k-1}{r-1} p^r (1-p)^{k-r}, \\quad E(X) = \\frac{r}{p}, \\quad \\text{Var}(X) = \\frac{r(1-p)}{p^2}'
  },
  {
    id: 'hypergeometric-distribution',
    slo: 'Hipergeometrična porazdelitev',
    eng: 'Hypergeometric Distribution',
    category: 'Porazdelitve',
    chapterId: 'chapter-4',
    unitId: 'unit-4-2',
    definition: 'Diskretna porazdelitev verjetnosti k uspehov v vzorcu velikosti n, izbranem BREZ vračanja iz končne populacije velikosti N, ki vsebuje m uspehov.',
    formula: 'P(X = k) = \\frac{\\binom{m}{k}\\binom{N-m}{n-k}}{\\binom{N}{n}}, \\quad E(X) = n\\frac{m}{N}',
    example: 'Metoda ulova in ponovnega ulova (capture-recapture) pri ocenjevanju števila živali v gozdu ali Fisherjev eksaktni test v medicini.'
  },
  {
    id: 'poisson-distribution',
    slo: 'Poissonova porazdelitev',
    eng: 'Poisson Distribution',
    category: 'Porazdelitve',
    chapterId: 'chapter-4',
    unitId: 'unit-4-2',
    definition: 'Diskretna porazdelitev števila redkih dogodkov, ki se zgodijo v fiksnem časovnem obdobju ali prostorskem območju s konstantno povprečno stopnjo pojavljanja λ.',
    formula: 'P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad E(X) = \\lambda, \\quad \\text{Var}(X) = \\lambda'
  },

  // ==========================================
  // 7. TEMELJI SKLEPANJA, STATISTIČNA MOČ IN TESTIRANJE HIPOTEZ
  // ==========================================
  {
    id: 'sampling-distribution',
    slo: 'Vzorčna porazdelitev',
    eng: 'Sampling Distribution',
    category: 'Temelji sklepanja',
    chapterId: 'chapter-5',
    unitId: 'unit-5-1',
    definition: 'Verjetnostna porazdelitev vrednosti vzorčne statistike (npr. x̄ ali p̂), ki bi jo dobili, če bi iz populacije neskončnokrat ponovili neodvisno vzorčenje enake velikosti n.',
    example: 'Porazdelitev vseh možnih vzorčnih povprečij x̄ iz vzorcev velikosti n = 40.'
  },
  {
    id: 'standard-error',
    slo: 'Standardna napaka (SE)',
    eng: 'Standard Error (SE)',
    category: 'Temelji sklepanja',
    chapterId: 'chapter-5',
    unitId: 'unit-5-1',
    definition: 'Standardni odklon vzorčne porazdelitve statistike. Meri velikost tipične napake vzorčenja med vzorčno oceno in resničnim populacijskim parametrom.',
    formula: 'SE(\\bar{x}) = \\frac{\\sigma}{\\sqrt{n}} \\approx \\frac{s}{\\sqrt{n}}, \\quad SE(\\hat{p}) = \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}'
  },
  {
    id: 'central-limit-theorem',
    slo: 'Centralni limitni izrek (CLT)',
    eng: 'Central Limit Theorem (CLT)',
    category: 'Temelji sklepanja',
    chapterId: 'chapter-5',
    unitId: 'unit-5-1',
    definition: 'Z naraščanjem velikosti vzorca n se vzorčna porazdelitev povprečja x̄ približuje normalni porazdelitvi N(μ, σ²/n), ne glede na to, kako asimetrična ali nenormalna je osnovna populacija.',
    formula: '\\bar{X}_n \\xrightarrow{d} N\\left(\\mu, \\frac{\\sigma^2}{n}\\right) \\quad \\text{ko } n \\to \\infty'
  },
  {
    id: 'confidence-interval',
    slo: 'Interval zaupanja (CI)',
    eng: 'Confidence Interval (CI)',
    category: 'Temelji sklepanja',
    chapterId: 'chapter-5',
    unitId: 'unit-5-1',
    definition: 'Interval verjetnih vrednosti za populacijski parameter, konstruiran tako, da pri 95 % stopnji zaupanja 95 % vseh tako izračunanih intervalov iz ponovljenih vzorcev dejansko vsebuje pravi parameter.',
    formula: '\\text{Ocena} \\pm (\\text{Kritična vrednost}) \\cdot \\text{SE} \\iff \\bar{x} \\pm z^* \\frac{s}{\\sqrt{n}}'
  },
  {
    id: 'sample-size-power',
    slo: 'Izračun velikosti vzorca in statistična moč (Power Analysis)',
    eng: 'Sample Size Calculation and Statistical Power',
    category: 'Temelji sklepanja',
    chapterId: 'chapter-5',
    unitId: 'unit-5-1',
    definition: 'Postopek določitve minimalnega števila preizkušancev n v študiji, ki zagotavlja želeno verjetnost (običajno 80 % ali 90 %) za zavrnitev ničelne hipoteze, če obstaja resnična minimalna klinično pomembna razlika Δ.',
    formula: 'n = \\frac{(\\sigma_1^2 + \\sigma_2^2)(z_{1-\\alpha/2} + z_{1-\\beta})^2}{\\Delta^2}',
    example: 'Za 80 % moč zaznave znižanja krvnega tlaka za Δ = 3 mmHg pri σ = 12 mmHg in α = 0,05 potrebujemo najmanj 251 pacientov na skupino.'
  },
  {
    id: 'bootstrapping',
    slo: 'Ponovno vzorčenje z vračanjem (Bootstrapping)',
    eng: 'Bootstrapping',
    category: 'Temelji sklepanja',
    chapterId: 'chapter-5',
    unitId: 'unit-5-2',
    definition: 'Neparametrična računalniška simulacijska metoda za ocenjevanje standardne napake in intervalov zaupanja z večtisočkratnim generiranjem vzorcev enake velikosti n iz originalnega vzorca z vračanjem.',
    example: 'Iz vzorca 50 podatkov z vračanjem ustvarimo 10.000 bootstrap vzorcev in določimo 95 % CI med 2,5. in 97,5. percentilom.'
  },
  {
    id: 'randomization-test',
    slo: 'Randomizacijski / Permutacijski test',
    eng: 'Randomization Test',
    category: 'Temelji sklepanja',
    chapterId: 'chapter-5',
    unitId: 'unit-5-2',
    definition: 'Računalniški test hipotez, ki z večtisočkratnim naključnim premeščanjem oznak skupin simulira nično porazdelitev testne statistike pod predpostavko veljavnosti nične hipoteze H0.',
    example: 'Premešanje podatkov med poskusno in kontrolno skupino za preverjanje p-vrednosti učinka zdravila.'
  },
  {
    id: 'null-alternative-hypothesis',
    slo: 'Ničelna (H0) in alternativna (HA) hipoteza',
    eng: 'Null and Alternative Hypothesis',
    category: 'Temelji sklepanja',
    chapterId: 'chapter-5',
    unitId: 'unit-5-3',
    definition: 'Ničelna hipoteza H0 trdi, da ni razlike, učinka ali povezave (status quo). Alternativna hipoteza HA pa trdi, da razlika, učinek ali sprememba dejansko obstaja (raziskovalna hipoteza).',
    formula: 'H_0: \\mu_1 - \\mu_2 = 0 \\quad \\text{proti} \\quad H_A: \\mu_1 - \\mu_2 \\neq 0'
  },
  {
    id: 'p-value',
    slo: 'P-vrednost (Verjetnost opazovanega učinka)',
    eng: 'p-value',
    category: 'Temelji sklepanja',
    chapterId: 'chapter-5',
    unitId: 'unit-5-3',
    definition: 'Verjetnost, da bi ob predpostavki, da je nična hipoteza H0 resnična, dobili testno statistiko, ki je vsaj tako ekstremna kot ta, ki smo jo dejansko izmerili v našem vzorcu.',
    example: 'Če je p = 0,003, pomeni, da bi ob neobstoju učinka tako velik rezultat po naključju opazili le v 3 od 1.000 poskusov.'
  },
  {
    id: 'type-1-2-error',
    slo: 'Napaka tipa I (α) in napaka tipa II (β)',
    eng: 'Type I and Type II Errors',
    category: 'Temelji sklepanja',
    chapterId: 'chapter-5',
    unitId: 'unit-5-3',
    definition: 'Napaka tipa I (lažni alarm, stopnja značilnosti α): zavrnitev resnične nične hipoteze H0. Napaka tipa II (zgrešeni učinek, β): nezavrnitev napačne H0. Moč statističnega testa je (1 - β).',
    formula: 'P(\\text{Zavrni } H_0 \\mid H_0 \\text{ je resnična}) = \\alpha, \\quad \\text{Moč} = 1 - \\beta'
  },

  // ==========================================
  // 8. KATEGORIČNA ANALIZA, RELATIVNO TVEGANJE IN FISHERJEV TEST
  // ==========================================
  {
    id: 'relative-risk',
    slo: 'Relativno tveganje (RR - Relative Risk)',
    eng: 'Relative Risk (RR)',
    category: 'Kategorični podatki',
    chapterId: 'chapter-6',
    unitId: 'unit-6-1',
    definition: 'Razmerje med verjetnostjo pojava dogodka v izpostavljeni skupini in verjetnostjo v neizpostavljeni skupini v kohortnih študijah ali randomiziranih poskusih.',
    formula: '\\text{RR} = \\frac{a / (a + b)}{c / (c + d)} = \\frac{P(\\text{Dogodek} \\mid \\text{Izpostavljen})}{P(\\text{Dogodek} \\mid \\text{Neizpostavljen})}',
    example: 'V študiji LEAP je bilo tveganje za alergijo na arašide pri otrocih, ki so se jim izogibali, RR = 7,31-krat večje kot pri otrocih z zgodnjim uživanjem.'
  },
  {
    id: 'case-control-study',
    slo: 'Študija primerov s kontrolami (Case-Control Study)',
    eng: 'Case-Control Study',
    category: 'Kategorični podatki',
    chapterId: 'chapter-6',
    unitId: 'unit-6-1',
    definition: 'Retrospektivni raziskovalni načrt, pri katerem preizkušance vzorčimo glede na izid (primeri z boleznijo vs. zdrave kontrole), nato pa raziskujemo preteklo izpostavljenost. Ker delež primerov določi raziskovalec, absolutnega tveganja in RR ni mogoče izračunati, temveč računamo razmerje obetov (OR).',
    example: 'Raziskava povezave med jemanjem antidepresivov SSRI v nosečnosti in redko pljučno hipertenzijo novorojenčkov (PPHN).'
  },
  {
    id: 'rare-disease-assumption',
    slo: 'Predpostavka redke bolezni (Rare Disease Assumption)',
    eng: 'Rare Disease Assumption',
    category: 'Kategorični podatki',
    chapterId: 'chapter-6',
    unitId: 'unit-6-1',
    definition: 'Epidemiološki izrek, po katerem je pri redkih boleznih (prevalenca < 5-10 %) razmerje obetov (OR) odličen približek za relativno tveganje (RR): OR ≈ RR.',
    formula: '\\text{Ko } P(D) \\approx 0 \\implies 1 - P(D) \\approx 1 \\implies \\text{OR} \\approx \\text{RR}'
  },
  {
    id: 'pooled-proportion',
    slo: 'Združeni delež',
    eng: 'Pooled Proportion',
    category: 'Kategorični podatki',
    chapterId: 'chapter-6',
    unitId: 'unit-6-2',
    definition: 'Skupni tehtani delež uspehov ob združitvi dveh vzorcev pod nično hipotezo H0: p1 = p2, uporabljen za izračun združene standardne napake.',
    formula: '\\hat{p}_{pool} = \\frac{x_1 + x_2}{n_1 + n_2}, \\quad SE = \\sqrt{\\hat{p}_{pool}(1-\\hat{p}_{pool})\\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)}'
  },
  {
    id: 'chi-square-test',
    slo: 'Hi-kvadrat (χ²) test neodvisnosti in skladnosti',
    eng: 'Chi-Square (χ²) Test',
    category: 'Kategorični podatki',
    chapterId: 'chapter-6',
    unitId: 'unit-6-3',
    definition: 'Test za preverjanje skladnosti opazovanih frekvenc s teoretično pričakovanimi ali za preverjanje statistične neodvisnosti dveh kategoričnih spremenljivk v kontingenčni tabeli.',
    formula: '\\chi^2 = \\sum_{i,j} \\frac{(O_{ij} - E_{ij})^2}{E_{ij}}, \\quad E_{ij} = \\frac{R_i \\cdot C_j}{N}, \\quad df = (r-1)(c-1)'
  },
  {
    id: 'fisher-exact-test',
    slo: 'Fisherjev eksaktni test',
    eng: "Fisher's Exact Test",
    category: 'Kategorični podatki',
    chapterId: 'chapter-6',
    unitId: 'unit-6-3',
    definition: 'Natančni neparametrični statistični test za preverjanje neodvisnosti v tabelah 2×2, ki temelji na hipergeometrični porazdelitvi ob fiksnih robnih vsotah in se uporablja, kadar so pričakovane frekvence celic majhne (< 10 ali < 5).',
    formula: 'P(a,b,c,d) = \\frac{\\binom{a+b}{a}\\binom{c+d}{c}}{\\binom{n}{a+c}} = \\frac{(a+b)!(c+d)!(a+c)!(b+d)!}{a!\\,b!\\,c!\\,d!\\,n!}',
    example: 'Klinični poskus z 29 pacienti za primerjavo fekalne mikrobiotne transplantacije (13/16 ozdravljenih) in vankomicina (4/13 ozdravljenih) pri okužbi s C. difficile (p = 0,0095).'
  },

  // ==========================================
  // 9. ŠTEVILSKA ANALIZA IN ANOVA
  // ==========================================
  {
    id: 'students-t',
    slo: 'Studentova t-porazdelitev',
    eng: "Student's t-distribution",
    category: 'Številska analiza in ANOVA',
    chapterId: 'chapter-7',
    unitId: 'unit-7-1',
    definition: 'Simetrična porazdelitev z debelejšimi repi kot standardna normalna, ki upošteva dodatno negotovost zaradi ocenjevanja neznanega populacijskega odklona σ z vzorčnim odklonom s pri majhnih vzorcih.',
    formula: 't = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}, \\quad df = n - 1'
  },
  {
    id: 'paired-t-test',
    slo: 'Parjeni t-test (Odvisni vzorci)',
    eng: 'Paired t-test',
    category: 'Številska analiza in ANOVA',
    chapterId: 'chapter-7',
    unitId: 'unit-7-2',
    definition: 'Preizkus razlike povprečij za parne meritve na istih enotah (meritve pred in po terapiji), kjer analiziramo razlike d_i = x_{1i} - x_{2i}.',
    formula: 't = \\frac{\\bar{d} - 0}{s_d / \\sqrt{n}}, \\quad df = n - 1'
  },
  {
    id: 'anova-f-test',
    slo: 'Analiza variance (ANOVA) in F-test',
    eng: 'Analysis of Variance (ANOVA)',
    category: 'Številska analiza in ANOVA',
    chapterId: 'chapter-7',
    unitId: 'unit-7-4',
    definition: 'Postopek za sočasno primerjavo povprečij treh ali več skupin s primerjavo variance med skupinami (MSG) in variance znotraj posameznih skupin (MSE).',
    formula: 'F = \\frac{\\text{MSG}}{\\text{MSE}} = \\frac{\\frac{\\text{SSG}}{k - 1}}{\\frac{\\text{SSE}}{N - k}}, \\quad H_0: \\mu_1 = \\mu_2 = \\dots = \\mu_k'
  },
  {
    id: 'bonferroni-correction',
    slo: 'Bonferronijev popravek za večkratno testiranje',
    eng: 'Bonferroni Correction',
    category: 'Številska analiza in ANOVA',
    chapterId: 'chapter-7',
    unitId: 'unit-7-4',
    definition: 'Prilagoditev praga značilnosti α pri večkratnih primerjavah (post-hoc testi), ki prepreči napihovanje skupne napake tipa I: α* = α / K. V genomiki (GWAS) se uporablja prag α = 5 × 10⁻⁸.',
    formula: '\\alpha^* = \\frac{\\alpha}{K}, \\quad K = \\binom{k}{2} = \\frac{k(k-1)}{2}'
  },

  // ==========================================
  // 10. LINEARNA IN MULTIPLA REGRESIJA
  // ==========================================
  {
    id: 'pearson-correlation',
    slo: 'Pearsonov koeficient korelacije (r)',
    eng: 'Pearson Correlation Coefficient',
    category: 'Linearna regresija',
    chapterId: 'chapter-8',
    unitId: 'unit-8-1',
    definition: 'Brezdimenzijska mera smeri in jakosti linearne povezanosti med dvema številskima spremenljivkama, omejena na interval [-1, +1]. Vrednost 0 pomeni odsotnost linearne povezanosti.',
    formula: 'r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{(n-1) s_x s_y} = \\frac{\\text{Cov}(X,Y)}{s_x s_y}'
  },
  {
    id: 'ols-line',
    slo: 'Metoda najmanjših kvadratov (OLS premica)',
    eng: 'Ordinary Least Squares (OLS)',
    category: 'Linearna regresija',
    chapterId: 'chapter-8',
    unitId: 'unit-8-2',
    definition: 'Postopek ocenjevanja regresijske premice ŷ = b0 + b1*x, ki minimizira vsoto kvadratov navpičnih odstopanj (ostankov) med opazovanimi podatki in premico.',
    formula: '\\hat{y} = b_0 + b_1 x, \\quad b_1 = r \\frac{s_y}{s_x}, \\quad b_0 = \\bar{y} - b_1 \\bar{x}'
  },
  {
    id: 'r-squared',
    slo: 'Determinacijski koeficient (R²)',
    eng: 'Coefficient of Determination (R²)',
    category: 'Linearna regresija',
    chapterId: 'chapter-8',
    unitId: 'unit-8-3',
    definition: 'Delež celotne variabilnosti odzivne spremenljivke Y, ki jo lahko linearno pojasnimo s pojasnjevalnimi spremenljivkami v modelu.',
    formula: 'R^2 = 1 - \\frac{\\text{SSE}}{\\text{SST}} = \\frac{\\text{SSReg}}{\\text{SST}} = r^2 \\text{ (pri enostavni regresiji)}'
  },
  {
    id: 'adjusted-r-squared',
    slo: 'Prilagojeni koeficient determinacije (Adjusted R²)',
    eng: 'Adjusted R-squared',
    category: 'Linearna regresija',
    chapterId: 'chapter-8',
    unitId: 'unit-8-3',
    definition: 'Korigirana mera pojasnjene variabilnosti v multipli regresiji, ki penalizira dodajanje novih napovednih spremenljivk, če te bistveno ne izboljšajo napovedne moči modela.',
    formula: 'R_{adj}^2 = 1 - \\left(1 - R^2\\right) \\frac{n - 1}{n - p - 1} = 1 - \\frac{\\text{Var}(e_i)/(n-p-1)}{\\text{Var}(y_i)/(n-1)}'
  },
  {
    id: 'prediction-interval',
    slo: 'Predikcijski interval za posamezno vrednost',
    eng: 'Prediction Interval for a New Observation',
    category: 'Linearna regresija',
    chapterId: 'chapter-8',
    unitId: 'unit-8-3',
    definition: 'Interval zaupanja za posamezno prihodnjo meritev ŷ|x*, ki poleg negotovosti ocene povprečne premice upošteva tudi naravno variabilnost posameznih enot s², zato je bistveno širši od intervala za povprečje.',
    formula: 'SE(\\hat{Y} \\mid x^*) = s \\sqrt{1 + \\frac{1}{n} + \\frac{(x^* - \\bar{x})^2}{\\sum (x_i - \\bar{x})^2}}'
  },
  {
    id: 'statistical-interaction',
    slo: 'Statistična interakcija (Učinek interakcije)',
    eng: 'Statistical Interaction',
    category: 'Linearna regresija',
    chapterId: 'chapter-8',
    unitId: 'unit-8-3',
    definition: 'Pojav v multipli regresiji, ko je vpliv ene pojasnjevalne spremenljivke X1 na odziv Y odvisen od vrednosti druge pojasnjevalne spremenljivke X2 (v modelu predstavljen kot produktni člen X1 × X2).',
    formula: 'E(Y) = \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2 + \\beta_3 (X_1 \\times X_2)',
    example: 'Povezava med starostjo in nivojem holesterola: pri diabetikih se s starostjo holesterol znižuje (zaradi terapije s statini), pri nediabetikih pa zvišuje.'
  },
  {
    id: 'line-conditions',
    slo: 'LINE diagnostični pogoji za regresijo',
    eng: 'LINE Conditions for Regression',
    category: 'Linearna regresija',
    chapterId: 'chapter-8',
    unitId: 'unit-8-4',
    definition: 'Štirje ključni pogoji za veljavnost sklepov v linearni regresiji: L - Linearnost, I - Independenca (neodvisnost napak), N - Normalnost ostankov, E - Enaka varianca ostankov (homoscedastičnost).',
    example: 'Preverjamo z grafikonom ostankov proti prilegajočim vrednostim in Q-Q grafikonom normalnosti.'
  },
  {
    id: 'leverage-influential',
    slo: 'Vzvodna in vplivna točka (Outliers)',
    eng: 'High Leverage vs. Influential Point',
    category: 'Linearna regresija',
    chapterId: 'chapter-8',
    unitId: 'unit-8-4',
    definition: 'Točka z visokim vzvodom ima ekstremno vrednost X daleč od povprečja x̄. Vplivna točka pa je tista opazovana enota, katere izbris iz nabora bistveno spremeni naklon regresijske premice.',
    example: 'Ena sama ekstremna točka v kotu razsevnega diagrama lahko umetno ustvari močno korelacijo.'
  },

  // ==========================================
  // 11. LOGISTIČNA REGRESIJA IN GLM
  // ==========================================
  {
    id: 'odds-ratio',
    slo: 'Obeti (Odds) in razmerje obetov (Odds Ratio)',
    eng: 'Odds and Odds Ratio (OR)',
    category: 'Logistična regresija in GLM',
    chapterId: 'chapter-9',
    unitId: 'unit-9-1',
    definition: 'Obeti so razmerje med verjetnostjo uspeha in verjetnostjo neuspeha p/(1-p). Razmerje obetov (OR) pa primerja obete dogodka med dvema skupinama (npr. izpostavljeni proti neizpostavljeni).',
    formula: '\\text{Odds} = \\frac{p}{1-p}, \\quad \\text{OR} = \\frac{\\text{Odds}_1}{\\text{Odds}_2} = \\frac{ad}{bc}'
  },
  {
    id: 'logit-link',
    slo: 'Logit transformacija in sigmoidna funkcija',
    eng: 'Logit Link and Sigmoid Function',
    category: 'Logistična regresija in GLM',
    chapterId: 'chapter-9',
    unitId: 'unit-9-1',
    definition: 'Povezovalna funkcija logistične regresije, ki naravni logaritem obetov poveže z linearno kombinacijo napovednih spremenljivk ter verjetnost p preslika na celotno realno os (-∞, +∞).',
    formula: '\\text{logit}(p) = \\ln\\left(\\frac{p}{1-p}\\right) = \\beta_0 + \\sum \\beta_j x_j \\iff p = \\frac{e^{\\beta_0 + \\sum \\beta_j x_j}}{1 + e^{\\beta_0 + \\sum \\beta_j x_j}}'
  },
  {
    id: 'aic-criterion',
    slo: 'Akaikejev informacijski kriterij (AIC)',
    eng: 'Akaike Information Criterion (AIC)',
    category: 'Logistična regresija in GLM',
    chapterId: 'chapter-9',
    unitId: 'unit-9-2',
    definition: 'Mera relativne kakovosti statističnih modelov za dani nabor podatkov, ki nagrajuje dobro prileganje podatkom (-2 ln L) in strogo kaznuje preveliko število parametrov (+2k). Nižji AIC pomeni optimalnejši model.',
    formula: '\\text{AIC} = 2k - 2\\ln(\\hat{L})'
  },
  {
    id: 'cross-validation',
    slo: 'k-kratno navzkrižno preverjanje (Cross-Validation)',
    eng: 'k-Fold Cross-Validation',
    category: 'Logistična regresija in GLM',
    chapterId: 'chapter-9',
    unitId: 'unit-9-3',
    definition: 'Validacijska tehnika za oceno posplošljivosti modela, pri kateri podatke razdelimo na k enakih delov, model natreniramo na k-1 delih ter ocenimo napako na preostalem neodvisnem testnem delu.',
    formula: '\\text{CV SSE} = \\sum_{i=1}^n (y_i - \\hat{y}_{cv,i})^2'
  },
  {
    id: 'confusion-matrix',
    slo: 'Matrika zmedenosti (Klasifikacijska matrika)',
    eng: 'Confusion Matrix and Accuracy',
    category: 'Logistična regresija in GLM',
    chapterId: 'chapter-9',
    unitId: 'unit-9-3',
    definition: 'Tabela velikosti 2×2, ki primerja dejanske razrede z napovedanimi razredi klasifikacijskega modela ter razčleni pravilno pozitivne (TP), pravilno negativne (TN), lažno pozitivne (FP) in lažno negativne (FN) primere.',
    formula: '\\text{Točnost (Accuracy)} = \\frac{TP + TN}{TP + TN + FP + FN}, \\quad \\text{Natančnost (Precision)} = \\frac{TP}{TP + FP}'
  }
];

export const UNIT_GLOSSARY_MAP: Record<string, string[]> = {
  'unit-0-1': ['statistika-def', 'opisna-statistika', 'sklepna-statistika', 'tidy-data'],
  'unit-0-2': ['populacija-vzorec', 'parameter-statistika', 'numericne-spremenljivke', 'kategoricne-spremenljivke'],
  'unit-1-1': ['tidy-data', 'numericne-spremenljivke', 'zvezna-spremenljivka', 'diskretna-spremenljivka', 'kategoricne-spremenljivke', 'nominalna-spremenljivka', 'ordinalna-spremenljivka', 'indikatorska-spremenljivka'],
  'unit-1-2': ['pojasnjevalna-odzivna', 'confounding-variable', 'enostavno-slucajno-vzorcenje', 'stratified-sampling', 'cluster-sampling'],
  'unit-1-3': ['opazovalna-studija', 'blocking', 'placebo-double-blind', 'itt-analysis'],
  'unit-2-1': ['aritmeticna-sredina', 'mediana', 'modus', 'varianca', 'standardni-odklon', 'iqr-rule', 'asimetrija-skewness'],
  'unit-2-2': ['simpsons-paradox', 'indikatorska-spremenljivka', 'kategoricne-spremenljivke'],
  'unit-3-1': ['verjetnost-def', 'conditional-probability', 'neodvisnost-dogodkov'],
  'unit-3-2': ['bayes-theorem', 'prevalence-incidence', 'sensitivity-specificity', 'ppv-npv'],
  'unit-3-3': ['bayes-theorem', 'ppv-npv'],
  'unit-3-4': ['expected-value', 'linear-combination-rv'],
  'unit-3-5': ['expected-value'],
  'unit-3-6': ['geometric-distribution', 'negative-binomial', 'hypergeometric-distribution'],
  'unit-4-1': ['normalna-porazdelitev', 'z-score', 'empirical-rule'],
  'unit-4-2': ['binomial-distribution', 'geometric-distribution', 'negative-binomial', 'hypergeometric-distribution', 'poisson-distribution'],
  'unit-5-1': ['sampling-distribution', 'standard-error', 'central-limit-theorem', 'confidence-interval'],
  'unit-5-2': ['bootstrapping', 'randomization-test'],
  'unit-5-3': ['null-alternative-hypothesis', 'p-value', 'type-1-2-error'],
  'unit-5-4': ['sample-size-power', 'itt-analysis', 'type-1-2-error'],
  'unit-6-1': ['sampling-distribution', 'standard-error'],
  'unit-6-2': ['pooled-proportion', 'p-value'],
  'unit-6-3': ['chi-square-test'],
  'unit-6-4': ['relative-risk', 'case-control-study', 'rare-disease-assumption', 'fisher-exact-test'],
  'unit-7-1': ['students-t', 'standard-error', 'confidence-interval'],
  'unit-7-2': ['paired-t-test'],
  'unit-7-3': ['students-t', 'p-value'],
  'unit-7-4': ['anova-f-test', 'bonferroni-correction'],
  'unit-8-1': ['pearson-correlation'],
  'unit-8-2': ['ols-line'],
  'unit-8-3': ['r-squared', 'line-conditions'],
  'unit-8-4': ['line-conditions', 'leverage-influential'],
  'unit-8-5': ['prediction-interval', 'statistical-interaction', 'adjusted-r-squared'],
  'unit-9-1': ['odds-ratio', 'logit-link'],
  'unit-9-2': ['aic-criterion'],
  'unit-9-3': ['cross-validation', 'confusion-matrix'],
};
