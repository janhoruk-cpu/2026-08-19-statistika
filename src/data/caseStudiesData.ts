export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: 'Eksperimenti' | 'Preizkušanje domnev' | 'Regresija' | 'Epidemiologija';
  chapterLink: string;
  summary: string;
  background: string;
  dataSummary: {
    totalN: number;
    groups: { name: string; n: number; successes: number; rate: string }[];
  };
  keyQuestion: string;
  interactiveExploration: {
    type: 'contingency' | 'bar_compare' | 'regression_scatter';
    description: string;
  };
  findings: string[];
  takeaway: string;
  discussionQuestions: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'stent-study',
    title: 'Raziskava o stentih za preprečevanje možganske kapi',
    subtitle: 'Randomiziran poskus z nepričakovanim izidom (Chimowitz et al., 2011)',
    category: 'Eksperimenti',
    chapterLink: 'unit-8-1',
    summary:
      'Zdravniki so desetletja domnevali, da vstavitev žilne opornice (stenta) v zoženo možgansko arterijo zmanjša tveganje za kap. Randomiziran poskus SAMMPRIS pa je razkril presenetljivo resnico.',
    background:
      'V raziskavo je bilo vključenih 451 bolnikov z visoko stopnjo zožitve možganskih arterij (70–99 %). Bolniki so bili naključno razvrščeni v dve skupini: kontrolno skupino (samo agresivna terapija z zdravili) in poskusno skupino (terapija z zdravili + kirurški stent).',
    dataSummary: {
      totalN: 451,
      groups: [
        { name: 'Kontrolna skupina (Zdravila)', n: 227, successes: 28, rate: '12.3 % (kap v 1 letu)' },
        { name: 'Poskusna skupina (Zdravila + Stent)', n: 224, successes: 45, rate: '20.1 % (kap v 1 letu)' },
      ],
    },
    keyQuestion:
      'Ali vstavitev stenta statistično značilno zmanjša tveganje za ponovno kap ali smrt v primerjavi s samo medikamentoznim zdravljenjem?',
    interactiveExploration: {
      type: 'contingency',
      description:
        'Poskus je bil predčasno prekinjen zaradi varnosti bolnikov! V skupini s stentom je bilo tveganje za zaplete skoraj dvakrat večje (relativno tveganje $RR = 1.63$, $p = 0.02$).',
    },
    findings: [
      'Kirurški poseg vstavitve stenta v možganske arterije sam po sebi nosi tveganje za periproceduralno kap (14.7 % v prvih 30 dneh).',
      'Sodobno medikamentozno zdravljenje (statin + dvojna antiagregacijska terapija) je bilo bistveno učinkovitejše, kot so pričakovali zgodovinski podatki.',
      'Raziskava je spremenila globalne medicinske smernice in dokazala nepogrešljivost randomiziranih kontroliranih poskusov pred rutinsko uporabo invazivnih posegov.',
    ],
    takeaway:
      'Intuitivna biološka verjetnost (če odpremo cev, bo tekočina bolje tekla) ne nadomesti empiričnega randomiziranega eksperimenta. Brez kontrolne skupine bi zdravniki visoko preživetje pripisali operaciji namesto zdravilom.',
    discussionQuestions: [
      'Zakaj opazovalne študije brez naključne razvrstitve v tem primeru niso mogle zaznati škodljivosti posega?',
      'Kaj pomeni etična prekinitev kliničnega poskusa in kdaj statistični nadzorni odbor to zahteva?',
    ],
  },
  {
    id: 'resume-audit-study',
    title: 'Poskus z življenjepisi in enakimi možnostmi pri zaposlovanju',
    subtitle: 'Eksperiment z usklajenimi pari življenjepisov (Bertrand & Mullainathan, 2004)',
    category: 'Preizkušanje domnev',
    chapterLink: 'unit-6-1',
    summary:
      'Raziskovalca sta na več kot 1.300 oglasov za delo v Bostonu in Chicagu poslala skoraj 5.000 identičnih fiktivnih življenjepisov, pri čemer sta naključno spreminjala le ime prijavitelja.',
    background:
      'Za preverjanje diskriminacije na trgu dela so ustvarili pare življenjepisov z enako izobrazbo, delovnimi izkušnjami in veščinami. Enemu življenjepisu so pripeli tipično belsko ime (npr. Emily, Brad), drugemu pa afroameriško ime (npr. Lakisha, Jamal).',
    dataSummary: {
      totalN: 4870,
      groups: [
        { name: 'Življenjepisi z belskimi imeni', n: 2435, successes: 235, rate: '9.65 % (vabilo na razgovor)' },
        { name: 'Življenjepisi z afroameriškimi imeni', n: 2435, successes: 157, rate: '6.45 % (vabilo na razgovor)' },
      ],
    },
    keyQuestion:
      'Ali se delež vabil na zaposlitveni razgovor statistično značilno razlikuje med življenjepisi z identičnimi kvalifikacijami glede na zaznano etnično pripadnost imena?',
    interactiveExploration: {
      type: 'bar_compare',
      description:
        'Razlika v deležih znaša $3.20$ odstotnih točk ($Z = 4.05$, $p < 0.0001$). Življenjepisi z belskimi imeni so prejeli $50\\%$ več vabil na razgovor.',
    },
    findings: [
      'Razlika je bila visoko statistično značilna v vseh panogah in ne glede na spol kandidata.',
      'Višja raven kvalifikacij (več izkušenj, dodatni certifikati) je bistveno bolj povečala možnosti za klic pri belskih imenih kot pri afroameriških.',
      'Raziskava je postala klasičen primer eksperimentalnega načrta, ki popolnoma izloči prikrite spremenljivke (delovne izkušnje, šolanje), saj so bile te med skupinama matematično identične.',
    ],
    takeaway:
      'Z eksperimentalno metodo usklajenih parov in randomizacijo lahko izoliramo vpliv ene same spremenljivke in dokažemo vzročno-posledično povezavo tudi pri kompleksnih družbenih vprašanjih.',
    discussionQuestions: [
      'Kako bi postavili ničelno ($H_0$) in alternativno ($H_1$) hipotezo za ta dvostranski test deležev?',
      'Zakaj je bil $p$-vrednost tako izjemno nizek kljub navidez majhni razliki 3.2 odstotnih točk? (Namig: velikost vzorca $n$).',
    ],
  },
  {
    id: 'ames-housing-regression',
    title: 'Modeliranje cen nepremičnin in multikolinearnost',
    subtitle: 'Podatkovni nabor Ames Housing za multivariatno regresijo (De Cock, 2011)',
    category: 'Regresija',
    chapterLink: 'unit-9-1',
    summary:
      'Analiza 2.930 prodaj hiš v mestu Ames, Iowa, prikazuje, kako se enostavna linearna regresija obnaša ob dodajanju novih spremenljivk in kdaj nastopi problem multikolinearnosti.',
    background:
      'Pri napovedovanju prodajne cene hiše ($Y$) je bivalna površina ($X_1$) najmočnejši posamični napovednik ($R^2 = 0.50$). Ko pa v model dodamo število sob ($X_2$), skupno površino kleti ($X_3$) in oceno kakovosti gradnje ($X_4$), se koeficienti spremenijo.',
    dataSummary: {
      totalN: 2930,
      groups: [
        { name: 'Model 1 (samo bivalna površina)', n: 2930, successes: 0, rate: 'R² = 0.509' },
        { name: 'Model 2 (površina + sobe + klet + kakovost)', n: 2930, successes: 0, rate: 'R² = 0.785' },
      ],
    },
    keyQuestion:
      'Zakaj koeficient za število sob v multivariatnem modelu včasih postane negativen, čeprav imajo večje hiše višjo ceno?',
    interactiveExploration: {
      type: 'regression_scatter',
      description:
        'To je klasičen pojav multikolinearnosti: če imata dve hiši enako kvadraturo (fiksna površina), več sob pomeni manjše, bolj utesnjene sobe, kar zniža ceno!',
    },
    findings: [
      'Razlaga koeficientov v multivariatni regresiji vedno velja *ceteris paribus* (ob nespremenjenih ostalih spremenljivkah).',
      'Dodajanje visoko koreliranih spremenljivk poveča standardne napake cenilk in lahko povzroči nelogične predznake koeficientov.',
      'Residualna analiza (graf ostankov) je ključna za prepoznavo nelinearnosti (npr. logaritmiranje cen nepremičnin stabilizira varianco).',
    ],
    takeaway:
      'V multivariatni regresiji koeficient $\\beta_j$ ne meri preproste povezave med $X_j$ in $Y$, temveč *dodatni* prispevek $X_j$, ko so vsi ostali vplivi že upoštevani.',
    discussionQuestions: [
      'Kaj pomeni koeficient determinacije $R^2 = 0.785$ za prodajne cene?',
      'Zakaj je pri cenah nepremičnin pogosto smiselno uporabiti logaritemsko transformacijo $\\ln(\\text{Cena})$?',
    ],
  },
  {
    id: 'smallpox-vaccine-trial',
    title: 'Zgodnji poskusi z inokulacijo črnih koz v Bostonu (1721)',
    subtitle: 'Zgodovinski začetki primerjalne epidemiologije (Boylston & Mather)',
    category: 'Epidemiologija',
    chapterLink: 'unit-2-1',
    summary:
      'Med epidemijo črnih koz v Bostonu leta 1721 sta zdravnik Zabdiel Boylston in duhovnik Cotton Mather prvič v zgodovini sistematično beležila preživetje med inokuliranimi in neinokuliranimi prebivalci.',
    background:
      'Pred izumom sodobnih cepiv so zdravniki izvajali variolacijo (vnos majhne količine virusa skozi kožo). Javnost je bila prepričana, da je postopek smrtonosen. Boylston je začel zbirati natančne podatke o vseh primerih v mestu.',
    dataSummary: {
      totalN: 6038,
      groups: [
        { name: 'Neinokulirani (naravna okužba)', n: 5794, successes: 844, rate: '14.57 % umrljivost' },
        { name: 'Inokulirani (variolacija)', n: 244, successes: 6, rate: '2.46 % umrljivost' },
      ],
    },
    keyQuestion:
      'Kako sta Boylston in Mather s preprosto primerjavo dveh deležev postavila temelje sodobne biostatistike in epidemiologije?',
    interactiveExploration: {
      type: 'contingency',
      description:
        'Razmerje obetov (Odds Ratio) za smrt pri inokulaciji je bilo le $OR = 0.147$ ($95\\% \\text{ IZ } [0.065, 0.334]$), kar pomeni skoraj $85\\%$ zmanjšanje tveganja za smrt.',
    },
    findings: [
      'Čeprav variolacija ni bila popolnoma brez tveganja (2.46 % umrljivost), je bilo tveganje skoraj 6-krat manjše kot pri naravni okužbi (14.57 %).',
      'Podatki so prepričali zdravstvene oblasti v Evropi in Ameriki ter kasneje omogočili Edwardu Jennerju razvoj varnega cepiva proti kravjim kozam.',
      'To je bil eden prvih primerov uporabe kvantitativne statistike za premagovanje javnih predsodkov in strahu pred medicinskimi posegi.',
    ],
    takeaway:
      'Pri ocenjevanju tveganja v medicini ne primerjamo posega z absolutno varnostjo, temveč z alternativnim tveganjem neukrepanja (*risk-benefit ratio*).',
    discussionQuestions: [
      'Zakaj je bila primerjava dveh deležev v 18. stoletju tako revolucionarna metoda?',
      'Katera morebitna pristranskost izbire (selection bias) bi lahko vplivala na te rezultate, saj ni šlo za randomiziran poskus?',
    ],
  },
  {
    id: 'challenger-disaster',
    title: 'Katastrofa raketoplana Challenger & Logistična regresija (1986)',
    subtitle: 'Vpliv nizke temperature na odpoved tesnilnih O-obročev (Dalal et al., 1989)',
    category: 'Regresija',
    chapterLink: 'unit-9-1',
    summary:
      '28. januarja 1986 je raketoplan Challenger razpadel 73 sekund po vzletu zaradi odpovedi gumijastih O-obročev pri nizki temperaturi (31 °F / -0.5 °C).',
    background:
      'Inženirji so pred vzletom opozarjali na nevarnost mraza, vendar so v preteklih 23 poletih analizirali le polete, kjer so se poškodbe že zgodile (odrezan vzorec), in zmotno sklepali, da korelacija ni jasna. Ko vključimo vseh 23 poletov z logistično regresijo, postane povezava kristalno jasna.',
    dataSummary: {
      totalN: 138,
      groups: [
        { name: 'Poleti pri T > 65 °F (18 °C)', n: 17, successes: 3, rate: '17.6 % poškodb' },
        { name: 'Poleti pri T < 60 °F (15 °C)', n: 6, successes: 5, rate: '83.3 % poškodb' },
      ],
    },
    keyQuestion:
      'Kako logistični model $\\text{logit}(p) = 11.66 - 0.216 \\cdot T$ napove verjetnost odpovedi tesnila pri temperaturi vzleta 31 °F?',
    interactiveExploration: {
      type: 'regression_scatter',
      description:
        'Logistični model pri temperaturi $31^\\circ\\text{F}$ napove verjetnost odpovedi tesnila $p > 0.99$ (skoraj gotova odpoved), medtem ko je pri $75^\\circ\\text{F}$ tveganje manjše od $1\\%$.',
    },
    findings: [
      'Izključitev poletov brez poškodb (analiza le problematičnih) je ustvarila usodno pristranskost preživelih (pristranskost izbire).',
      'Logistična regresija je optimalno orodje za modeliranje fizikalnih verjetnosti odpovedi komponent.',
      'Katastrofa velja za najpomembnejši zgodovinski primer nujnosti pravilne statistične analize pri odločanju o življenju in smrti.',
    ],
    takeaway:
      'V statistiki so podatki o dogodkih, kjer se napaka NI zgodila, enako pomembni kot podatki o okvarah. Nikoli ne analizirajte le filtriranih vzorcev!',
    discussionQuestions: [
      'Zakaj je izbira odrezanega vzorca (brez poletov z 0 poškodbami) zakrila resnično povezavo med temperaturo in odpovedjo?',
      'Kako bi inženirji z vizualizacijo logistične krivulje prepričali vodstvo Nase o preklicu izstrelitve?',
    ],
  },
  {
    id: 'avandia-cardiovascular-study',
    title: 'Varnost zdravila za diabetes Avandia & Analiza tveganja',
    subtitle: 'Nacionalna opazovalna študija na 227.571 bolnikih (Graham et al., JAMA 2010)',
    category: 'Preizkušanje domnev',
    chapterLink: 'unit-7-1',
    summary:
      'Študija ameriške agencije Medicare je primerjala srčno-žilne zaplete pri bolnikih s sladkorno boleznijo tipa 2, ki so prejemali zdravilo Avandia (rosiglitazon) ali Actos (pioglitazon).',
    background:
      'V retrospektivni kohortni študiji 227.571 bolnikov, starejših od 65 let, so zdravniki primerjali stopnjo miokardnega infarkta, možganske kapi in smrti v obeh skupinah zdravljenja.',
    dataSummary: {
      totalN: 227571,
      groups: [
        { name: 'Rosiglitazon (Avandia)', n: 67593, successes: 2593, rate: '3.84 % srčno-žilnih zapletov' },
        { name: 'Pioglitazon (Actos)', n: 159978, successes: 5386, rate: '3.37 % srčno-žilnih zapletov' },
      ],
    },
    keyQuestion:
      'Ali je bila razlika v deležu zapletov med zdraviloma (3.84 % vs. 3.37 %) statistično značilna ali zgolj posledica naključja?',
    interactiveExploration: {
      type: 'contingency',
      description:
        'Razlika deležev znaša $0.47$ odstotne točke ($Z = 5.58$, $p < 0.0001$). Zaradi ogromnega vzorca $n > 220.000$ je bil učinek visoko značilen in je vodil v umik zdravila.',
    },
    findings: [
      'Zaradi zelo velikega vzorca je standardna napaka $SE = 0.00084$, kar je omogočilo zanesljivo zaznavo tudi majhne razlike v deležih (0.47 %).',
      'Čeprav je navidezna razlika majhna v odstotkih, v populaciji več milijonov bolnikov 0.47 % pomeni več tisoč preprečljivih smrti.',
      'Raziskava poudarja razliko med statistično značilnostjo in klinično/praktično pomembnostjo.',
    ],
    takeaway:
      'Pri epidemioloških raziskavah zdravil na velikih populacijah lahko majhne razlike v deležih rešijo tisoče življenj, zato je zanesljivo določanje intervalov zaupanja ključno.',
    discussionQuestions: [
      'Zakaj je bila pri 227.000 bolnikih p-vrednost manjša od 0.0001 kljub razliki le 0.47 odstotne točke?',
      'Kaj so morebitne prikrite spremenljivke v retrospektivni opazovalni študiji?',
    ],
  },
  {
    id: 'berkeley-admissions-simpson',
    title: 'Sprejemi na UC Berkeley & Simpsonov paradoks (1973)',
    subtitle: 'Kako združevanje podatkov ustvari navidezno pristranskost (Bickel et al., Science 1975)',
    category: 'Epidemiologija',
    chapterLink: 'unit-1-1',
    summary:
      'Univerza UC Berkeley je bila leta 1973 tožena zaradi domnevne diskriminacije žensk pri vpisih na podiplomski študij, saj je bilo sprejetih 44 % moških in le 35 % žensk.',
    background:
      'Ko so raziskovalci podatke razdelili po posameznih oddelkih (A, B, C, D, E, F), so ugotovili, da je večina oddelkov imela celo *višjo* stopnjo sprejema za ženske ali pa razlik ni bilo. Kako je to mogoče?',
    dataSummary: {
      totalN: 12763,
      groups: [
        { name: 'Vsi moški prijavitelji (Skupno)', n: 8442, successes: 3738, rate: '44.3 % sprejetih' },
        { name: 'Vse ženske prijaviteljice (Skupno)', n: 4321, successes: 1494, rate: '34.6 % sprejetih' },
      ],
    },
    keyQuestion:
      'Kako lahko skupna stopnja sprejema kaže prednost moškim, čeprav posamezni oddelki sprejemajo enak ali večji delež žensk?',
    interactiveExploration: {
      type: 'bar_compare',
      description:
        'Simpsonov paradoks: Ženske so se v bistveno večjem številu prijavljale na oddelke z nizko stopnjo sprejema (humanistika: sprejem < 10 %), moški pa na tehnične oddelke z visoko stopnjo sprejema (inženirstvo: sprejem > 60 %).',
    },
    findings: [
      'Prikrita spremenljivka (izbira oddelka) je bila korelirana tako s spolom prijavitelja kot s težavnostjo vpisa.',
      'Po stratifikaciji po oddelkih ni bilo nobenega dokaza o sistemski diskriminaciji s strani komisij.',
      'Primer je postal svetovno znan kot klasična ponazoritev Simpsonovega paradoksa.',
    ],
    takeaway:
      'Združevanje heterogenih podatkov brez upoštevanja stratifikacije in motilcev vodi v povsem zmotne vzročne sklepe.',
    discussionQuestions: [
      'Kako bi lahko s stratificiranim vzorčenjem ali večkratno logistično regresijo nadzorovali vpliv izbire oddelka?',
      'Zakaj je preprosto seštevanje odstotkov iz različnih oddelkov matematično nekorektno?',
    ],
  },
  {
    id: 'mario-kart-auctions',
    title: 'Dražbe igre Mario Kart na eBayu & Izbira spremenljivk',
    subtitle: 'Večkratna regresija, indikatorske spremenljivke in multikolinearnost (IMS2 2024)',
    category: 'Regresija',
    chapterLink: 'unit-10-1',
    summary:
      'Nabor 141 dražb igre Mario Kart za Nintendo Wii na eBayu. Kako začetna cena, trajanje dražbe, stanje igre (nova/rabljena) in število priloženih volanov določajo končno doseženo ceno?',
    background:
      'Pri prodaji rabljenih videoiger na spletu se prodajalci sprašujejo, kateri dejavniki maksimirajo končno ceno. Ali daljše trajanje dražbe prinese več kupcev ali le signalizira obup? Kako stanje artikla (nova vs. rabljena) vpliva na premijo?',
    dataSummary: {
      totalN: 141,
      groups: [
        { name: 'Nove igre (v originalni foliji)', n: 42, successes: 38, rate: 'Povprečna cena 53.77 $' },
        { name: 'Rabljene igre', n: 99, successes: 41, rate: 'Povprečna cena 42.87 $' },
      ],
    },
    keyQuestion:
      'Ali trajanje dražbe (3, 5 ali 7 dni) statistično značilno zviša končno prodajno ceno, ko v večkratnem modelu nadzorujemo stanje igre in število priloženih volanov?',
    interactiveExploration: {
      type: 'regression_scatter',
      description:
        'V enostavni regresiji se zdi, da trajanje dražbe znižuje ceno ($b_1 = -1.08 $, $p < 0.05$). Vendar večkratna regresija razkrije, da so prodajalci daljše dražbe pogosteje uporabljali za rabljene igre z manj dodatki. Po vključitvi stanja igre vpliv trajanja postane statistično neznačilen ($p = 0.43$).',
    },
    findings: [
      'Indikatorska spremenljivka (t.i. navidezna spremenljivka ali indikator) za novo igro doda povprečno $+7.28\\$$ k ceni ob enakem številu volanov.',
      'Vsak priloženi igralni volan v povprečju zviša ceno za $+7.29\\$$ ($p < 0.0001$).',
      'Izločanje osamelcev: Dve dražbi sta vsebovali celotno konzolo namesto le igre in sta predstavljali ekstremni vplivni točki ($y > 100\\$$), ki sta morali biti analizirani ločeno.',
    ],
    takeaway:
      'Enostavna regresija lahko zavaja zaradi prikritih razlik med skupinami. Večkratna regresija omogoča izolacijo specifičnega marginalnega učinka posameznega parametra (ceteris paribus).',
    discussionQuestions: [
      'Kako bi interpretirali koeficient indikatorske spremenljivke cond_new v modelu ŷ = 36.05 + 5.18 * cond_new + 7.29 * wheels?',
      'Zakaj je bilo preverjanje pogojev LINE ključno pred sprejetjem zaključkov o cenovni premiji?',
    ],
  },
  {
    id: 'opportunity-cost-coin-dish',
    title: 'Eksperiment s 50 centi in opredelitev stroška izgubljene priložnosti',
    subtitle: 'Randomizirani vedenjsko-ekonomski poskus (Frederick et al., 2009; IMS2 Poglavje 2)',
    category: 'Eksperimenti',
    chapterLink: 'unit-10-3',
    summary:
      'Ali preprost opomnik na to, da denar lahko prihranimo za druge nakupe, zmanjša impulzivno nakupovanje? Randomiziran poskus s 150 študenti.',
    background:
      'Študentom so ponudili nakup DVD filma po znižani ceni 14.99 $. Naključno so bili razdeljeni v dve skupini. Kontrolna skupina je izbirala med: (A) Kupi DVD ali (B) Ne kupi DVD-ja. Poskusna skupina pa je izbirala med: (A) Kupi DVD ali (B) Ne kupi DVD-ja in obdrži 14.99 $ za druge nakupe.',
    dataSummary: {
      totalN: 150,
      groups: [
        { name: 'Kontrolna skupina (Brez opomnika)', n: 75, successes: 56, rate: '74.7 % se je odločilo za nakup' },
        { name: 'Poskusna skupina (Eksplicitni opomnik)', n: 75, successes: 41, rate: '54.7 % se je odločilo za nakup' },
      ],
    },
    keyQuestion:
      'Ali eksplicitna navedba stroška izgubljene priložnosti (oportunitetnega stroška) statistično značilno zmanjša verjetnost nakupa?',
    interactiveExploration: {
      type: 'contingency',
      description:
        'Razlika v deležih nakupov znaša natanko $20.0$ odstotnih točk (74.7 % proti 54.7 %). Randomizacijski test in dvovzorčni Z-test za deleže dasta $Z = 2.58$, $p = 0.0098$.',
    },
    findings: [
      'Ker je šlo za strog randomiziran eksperiment, je mogoče sklepati na neposredno vzročno-posledično povezavo med opomnikom in odločitvijo o nakupu.',
      'Razlika je statistično značilna na ravni $\\alpha = 0.01$ ($p < 0.01$).',
      'Študija ponazarja moč preprostih vedenjskih spodbud in pomen jasne opredelitve ničelne hipoteze o neodvisnosti $H_0: p_1 - p_2 = 0$.',
    ],
    takeaway:
      'Formulacija alternativnih možnosti (uokvirjanje problema) močno vpliva na človeško presojo, statistični randomizacijski testi pa omogočajo natančno kvantifikacijo tega učinka.',
    discussionQuestions: [
      'Kako bi izvedli permutacijski/randomizacijski test za ta poskus s simulacijo mešanja 150 kartic?',
      'Zakaj je bila randomizacija ključna za preprečitev motilcev (npr. osebnega dohodka študentov)?',
    ],
  },
  {
    id: 'leap-peanut-allergy',
    title: 'Preprečevanje alergij na arašide pri dojenčkih (Študija LEAP)',
    subtitle: 'Prebojni randomizirani poskus z blokovno stratifikacijo (Du Toit et al., NEJM 2015; Harvard Biostat 1.1)',
    category: 'Eksperimenti',
    chapterLink: 'unit-1-1',
    summary:
      'Zgodovinske smernice so staršem narekovale strogo izogibanje arašidom v prvem letu otrokovega življenja. Študija LEAP (Learning Early About Peanut Allergy) je dokazala, da zgodnje vnašanje arašidov dramatično zmanjša pojavnost alergije za več kot 80 %!',
    background:
      'V študijo je bilo vključenih 640 dojenčkov z visokim tveganjem (hudi ekcemi ali alergija na jajca) v starosti od 4 do 11 mesecev. Dojenčke so najprej razvrstili v bloke glede na začetni kožni vbodni test (brez reakcije vs. blaga reakcija), nato pa znotraj vsakega bloka naključno razporedili v skupino z uživanjem (vsaj 6 g arašidovih beljakovin na teden do 5. leta) ali skupino z izogibanjem. Pri 5 letih so opravili oralni provokacijski test (OFC).',
    dataSummary: {
      totalN: 530,
      groups: [
        { name: 'Skupina z izogibanjem arašidom (Kontrola)', n: 263, successes: 36, rate: '13.7 % razvilo alergijo (pozitiven provokacijski test)' },
        { name: 'Skupina z zgodnjim uživanjem (Terapija)', n: 267, successes: 5, rate: '1.9 % razvilo alergijo (pozitiven provokacijski test)' },
      ],
    },
    keyQuestion:
      'Ali zgodnja izpostavljenost arašidom statistično značilno zmanjša verjetnost razvoja hude alergije pri 5 letih starosti v primerjavi s popolnim izogibanjem?',
    interactiveExploration: {
      type: 'contingency',
      description:
        'V skupini z izogibanjem je bila incidenca alergije 13.7 %, v skupini z uživanjem pa le 1.9 %. Relativno tveganje znaša $RR = \\frac{0.137}{0.019} = 7.31$ ($p = 8.3 \\times 10^{-7}, \\chi^2 = 24.29$). Otroci z izogibanjem so imeli več kot 7-krat večje tveganje za alergijo!',
    },
    findings: [
      'Zgodnje kontrolirano uživanje arašidov je povzročilo 86 % relativno zmanjšanje tveganja za nastanek alergije na arašide.',
      'Blokovna randomizacija (stratifikacija po začetnem kožnem testu) je zagotovila, da sta bili obe skupini popolnoma uravnoteženi glede genetske nagnjenosti.',
      'Analiza po načelu namena zdravljenja (Intention-to-Treat - ITT) je potrdila robustnost rezultatov, ki so privedli do takojšnje spremembe pediatričnih smernic po vsem svetu.',
    ],
    takeaway:
      'Brez kliničnega poskusa z randomizacijo bi zdravstvene smernice še naprej spodbujale napačno prakso izogibanja. LEAP študija je zlati standard biostatističnega eksperimenta z blokovno randomizacijo.',
    discussionQuestions: [
      'Zakaj je bila blokovna stratifikacija po kožnem testu ključna za zmanjšanje variabilnosti?',
      'Kako iz podatkov 2x2 tabele izračunamo relativno tveganje (RR) in absolutno zmanjšanje tveganja (ARR)?',
    ],
  },
  {
    id: 'california-dds-simpson',
    title: 'Financiranje razvojne podpore v Kaliforniji & Simpsonov paradoks',
    subtitle: 'Analiza navidezne etnične diskriminacije skozi starostne kohorte (California DDS; Harvard Biostat 1.7.1 & 5.3.4)',
    category: 'Epidemiologija',
    chapterLink: 'unit-5-1',
    summary:
      'Primerjava letnih izdatkov za 1.000 uporabnikov kalifornijskega oddelka za motnje v razvoju (DDS) je na prvi pogled kazala na hudo etnično diskriminacijo, dokler analiza ni upoštevala starosti kot ključne moteče spremenljivke (motilca).',
    background:
      'V Kaliforniji so raziskovalci ugotovili, da je povprečni letni znesek financiranja za belopolte uporabnike znašal 24.698 $, za hispanske uporabnike pa le 11.066 $. Dvovzorčni t-test je pokazal orjaško statistično značilno razliko ($t = 10.1, p < 0.0001$). Vložena je bila tožba zaradi etnične diskriminacije.',
    dataSummary: {
      totalN: 777,
      groups: [
        { name: 'Belopolti uporabniki (Zbirno)', n: 401, successes: 401, rate: 'Povprečni izdatek 24.698 $' },
        { name: 'Hispanski uporabniki (Zbirno)', n: 376, successes: 376, rate: 'Povprečni izdatek 11.066 $' },
      ],
    },
    keyQuestion:
      'Ali razlika v izdatkih predstavlja dokaz etnične diskriminacije ali pa gre za Simpsonov paradoks, ki ga povzroča razlika v starostni strukturi populacij?',
    interactiveExploration: {
      type: 'bar_compare',
      description:
        'Ko podatke razdelimo na 6 starostnih kohort (0–5, 6–12, 13–17, 18–21, 22–50, 51+ let), se izkaže: v starosti 13–17 let Hispanci prejmejo povprečno 3.955 $, Belci 3.904 $ ($p = 0.75$). V starosti 22–50 let Hispanci prejmejo 40.924 $, Belci 40.188 $ ($p = 0.51$). V skoraj vseh kohortah Hispanci prejmejo več!',
    },
    findings: [
      'Simpsonov paradoks: agregirana analiza je bila močno popačena, ker so bili hispanski uporabniki večinoma otroci (kjer so izdatki nizki, saj zanje skrbijo starši), belopolti uporabniki pa večinoma starejši odrasli v domovih (kjer so izdatki 40.000–55.000 $).',
      'Ko v regresijskem modelu ali stratificirani analizi kontroliramo starostno skupino, etnična pripadnost nima nobenega statistično značilnega negativnega vpliva na financiranje.',
      'Raziskava je postala temeljni učbeniški primer nevarnosti zanašanja na enostavne povprečne vrednosti brez preverjanja motečih spremenljivk.',
    ],
    takeaway:
      'Nikoli ne sprejemajte sklepov o vzročnosti ali diskriminaciji na podlagi surovih povprečij, ne da bi preučili distribucijo motilnih spremenljivk. Utežena povprečja lahko popolnoma obrnejo smer opaženega pojava.',
    discussionQuestions: [
      'Kako bi matematično zapisali Simpsonov paradoks z uteženimi povprečji po kohortah?',
      'Zakaj je logaritemska transformacija izdatkov pomagala pri preverjanju pogojev za t-test in regresijo?',
    ],
  },
  {
    id: 'pphn-ssri-case-control',
    title: 'SSRI antidepresivi v nosečnosti in pljučna hipertenzija novorojenčkov',
    subtitle: 'Retrospektivna raziskava primerov s kontrolami in razmerje obetov (Chambers et al., NEJM 2006; Harvard Biostat 8.5)',
    category: 'Epidemiologija',
    chapterLink: 'unit-6-2',
    summary:
      'Perzistentna pljučna hipertenzija novorojenčka (PPHN) je redka, a smrtno nevarna bolezen (1.9 na 1.000 rojstev). Kako so epidemiologi z metodo primerov s kontrolami in razmerjem obetov (Odds Ratio) dokazali povezavo z jemanjem antidepresivov v nosečnosti?',
    background:
      'Ker je bolezen izjemno redka, bi prospektivna kohortna študija zahtevala več sto tisoč nosečnic. Raziskovalci so zato uporabili retrospektivni načrt: vključili so 337 mater, katerih novorojenčki so imeli PPHN (primeri), in 836 primerljivih zdravih mater (kontrole), ter preverili jemanje SSRI po 20. tednu nosečnosti.',
    dataSummary: {
      totalN: 1173,
      groups: [
        { name: 'Primeri (Novorojenčki s PPHN)', n: 337, successes: 14, rate: '14/337 (4.15 %) mater jemalo SSRI' },
        { name: 'Kontrole (Zdravi novorojenčki)', n: 836, successes: 6, rate: '6/836 (0.72 %) mater jemalo SSRI' },
      ],
    },
    keyQuestion:
      'Zakaj pri retrospektivnih študijah primerov s kontrolami ne moremo računati relativnega tveganja (RR) in zakaj je razmerje obetov (OR) matematično enakovredno relativnemu tveganju pri redkih boleznih?',
    interactiveExploration: {
      type: 'contingency',
      description:
        'Ker je delež bolnih v vzorcu (337/1173 = 28.7 %) umetno določen z načrtom vzorčenja, incidenca ni merljiva. Zato izračunamo razmerje obetov: $OR = \\frac{14 \\times 830}{6 \\times 323} = \\frac{11.620}{1.938} = 6.00$. Fisherjev natančni test da $p = 0.00014$.',
    },
    findings: [
      'Dojenčki mater, ki so po 20. tednu jemale SSRI, so imeli 6-krat večje obete za razvoj PPHN ($OR = 6.00, 95\\% \\text{ IZ } [2.3, 15.9]$).',
      'Predpostavka redke bolezni: ker je PPHN v splošni populaciji redek ($< 0.2\\%$), velja $1 - p \\approx 1$, zato je razmerje obetov ($OR$) odličen približek za relativno tveganje ($RR \\approx OR = 6.0$).',
      'Študija ponazarja moč Fisherjevega natančnega testa v medicinski diagnostiki, ko so pričakovane frekvence v celicah majhne ($E_{11} = 5.8 < 10$).',
    ],
    takeaway:
      'Pri raziskavah primerov s kontrolami nikoli ne računamo relativnega tveganja neposredno iz tabelarnih deležev, temveč uporabimo razmerje obetov (OR = ad / bc).',
    discussionQuestions: [
      'Zakaj bi bila prospektivna randomizirana študija v tem primeru medicinsko in etično neizvedljiva?',
      'Kako Bayesov izrek povezuje razmerje obetov izpostavljenosti pri primerih/kontrolah z razmerjem obetov bolezni pri izpostavljenih/neizpostavljenih?',
    ],
  },
  {
    id: 'prevend-statins-cognition',
    title: 'Statini, staranje in kognitivne sposobnosti (Študija PREVEND)',
    subtitle: 'Večkratna regresija in razrešitev prikritih motilcev (Joosten et al., PLoS ONE 2014; Harvard Biostat Poglavje 7)',
    category: 'Regresija',
    chapterLink: 'unit-10-1',
    summary:
      'Ali zdravila za zniževanje holesterola (statini) poslabšujejo kognitivne funkcije pri starejših? Primerjava enostavne in večkratne regresije na podatkih 500 preiskovancev iz nizozemske študije PREVEND.',
    background:
      'Kognitivne sposobnosti so merili s testom fluentnosti figur (Ruff Figural Fluency Test - RFFT, točke 0–175). V enostavni regresiji je bil koeficient za statine močno negativen ($b_1 = -10.05, p = 0.0005$), kar je vzbudilo strah, da statini povzročajo kognitivni upad.',
    dataSummary: {
      totalN: 500,
      groups: [
        { name: 'Uporabniki statinov (Statin = 1)', n: 115, successes: 115, rate: 'Povprečni RFFT: 60.66 točk (Povpr. starost 62.4 let)' },
        { name: 'Neuporabniki statinov (Statin = 0)', n: 385, successes: 385, rate: 'Povprečni RFFT: 70.71 točk (Povpr. starost 52.5 let)' },
      ],
    },
    keyQuestion:
      'Ali statini dejansko zmanjšujejo kognitivne funkcije ali pa je negativen vpliv zgolj posledica dejstva, da so uporabniki statinov v povprečju 10 let starejši?',
    interactiveExploration: {
      type: 'regression_scatter',
      description:
        'V multipli regresiji z vključitvijo starosti ($b_{\\text{age}} = -1.27, p < 0.0001$) postane vpliv statinov pozitiven in statistično neznačilen ($b_{\\text{statin}} = +0.85, p = 0.74$). Po dodatni prilagoditvi za izobrazbo in srčno-žilne bolezni pa vpliv statinov znaša celo $+4.69$ točk ($p = 0.056, R^2 = 43.6\\%$).',
    },
    findings: [
      'Prikrita moteča spremenljivka (motilec): Starost je bila hkrati povezana z večjo verjetnostjo jemanja statinov in z naravnim upadom kognitivnih funkcij.',
      'Po prilagoditvi za starost, stopnjo izobrazbe in prisotnost srčno-žilnih bolezni se je navidezni negativni vpliv statinov popolnoma razblinil.',
      'Pomembnost analize rezidualov: preverjanje konstantne variance napak in normalnosti rezidualov je potrdilo zanesljivost multivariatnega linearnega modela.',
    ],
    takeaway:
      'Enostavna regresija brez upoštevanja motilcev lahko pripelje do napačnih medicinskih zaključkov in opustitve življenjsko pomembnih zdravil. Večkratna regresija omogoča oceno čistega učinka (ceteris paribus).',
    discussionQuestions: [
      'Kako bi zdravniku, ki ga skrbi vpliv statinov na spomin, razložili razliko med rezultatom enostavne in večkratne regresije?',
      'Zakaj je bil $R^2$ v polnem modelu (43.6 %) bistveno višji kot v modelu s samo statini (2.4 %)?',
    ],
  },
];
