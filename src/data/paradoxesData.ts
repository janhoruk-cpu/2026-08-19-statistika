export interface ParadoxItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Pasti sklepanja' | 'Vzorčenje' | 'Korelacija' | 'Preizkušanje';
  chapterLink: string;
  story: string;
  realWorldExample: string;
  mathExplanation: string;
  howToAvoid: string[];
  simulationType?: 'simpson' | 'p_hacking' | 'survivorship' | 'spurious';
}

export const PARADOXES_DATA: ParadoxItem[] = [
  {
    id: 'simpsons-paradox',
    title: 'Simpsonov paradoks',
    subtitle: 'Ko se trend v vseh posameznih skupinah v skupnem seštevku popolnoma obrne',
    category: 'Pasti sklepanja',
    chapterLink: 'unit-8-2',
    story:
      'Zdravilo A je uspešnejše od zdravila B pri blagih primerih bolezni (90 % vs. 80 %) IN zdravilo A je uspešnejše od zdravila B pri hudih primerih bolezni (50 % vs. 40 %). Kljub temu pa ima v skupnem seštevku vseh bolnikov zdravilo B višjo stopnjo uspeha kot zdravilo A!',
    realWorldExample:
      'Klasičen primer z univerze UC Berkeley (1973): Stopnja sprejema na doktorski študij je bila pri moških 44 %, pri ženskah pa le 35 % (očitek spolne diskriminacije). Ko pa so pogledali po posameznih oddelkih, je večina oddelkov sprejela enak ali celo višji delež žensk! Razlog: ženske so se v večjem številu prijavljale na oddelke z nizko stopnjo sprejema (npr. humanistika z 10 % sprejemom), moški pa na oddelke z visoko stopnjo sprejema (npr. inženiring s 75 % sprejemom).',
    mathExplanation:
      'Matematični razlog je prisotnost prikrite spremenljivke (*lurking/confounding variable*), ki je neenakomerno porazdeljena med obema skupinama. Skupno povprečje je utežena vsota podskupin: če so uteži neuravnovešene, skupni delež zavede.',
    howToAvoid: [
      'Vedno preverite podatke po relevantnih podskupinah (stratifikacija), preden sprejmete sklep na ravni celotne populacije.',
      'Uporabite standardizacijo stopenj ali multivariatne regresijske modele, ki kontrolirajo za prikrite spremenljivke.',
      'V eksperimentih uporabite naključno razvrščanje v skupine (randomizacijo), ki samodejno uravnovesi prikrite vplive.',
    ],
    simulationType: 'simpson',
  },
  {
    id: 'p-hacking-multiple-testing',
    title: 'Problem mnogokratnega preizkušanja & P-hacking',
    subtitle: 'Če preizkusite 20 hipotez pri stopnji tveganja 5 %, boste skoraj zagotovo našli "statistično značilnost"',
    category: 'Preizkušanje',
    chapterLink: 'unit-6-3',
    story:
      'Če vržete pošten kovanec 20-krat, je verjetnost, da vsaj enkrat dobite neverjetno zaporedje, visoka. Enako velja za znanstvenike: če testirajo 100 različnih živil za povezavo z rakom, bo vsaj 5 živil pokazalo $p < 0.05$ zgolj zaradi naključja!',
    realWorldExample:
      'Znan eksperiment s čokolado (Bohannon, 2015): Raziskovalci so merili 18 različnih zdravstvenih parametrov pri majhnem vzorcu ljudi, ki so jedli čokolado. Zaradi mnogokratnega testiranja je eden od parametrov (hitrost izgube teže) po naključju dosegel $p = 0.03$. Mediji po vsem svetu so objavili naslove: "Čokolada topi kilograme!", čeprav je šlo za matematični artefakt p-hackiranja.',
    mathExplanation:
      'Družinska stopnja napake tipa I (*Family-Wise Error Rate*) pri $k$ neodvisnih testih znaša: $\\alpha_{\\text{total}} = 1 - (1 - \\alpha)^k$. Za $k = 20$ in $\\alpha = 0.05$ je $\\alpha_{\\text{total}} = 1 - (0.95)^{20} \\approx 64.2\\%$! Bonferronijev popravek to popravi tako, da prag za posamezen test postavi na $\\alpha / k = 0.05 / 20 = 0.0025$.',
    howToAvoid: [
      'Uporabite Bonferronijev popravek ali metodo nadzora stopnje lažnih odkritij (Benjamini-Hochberg FDR).',
      'Predhodno registrirajte hipoteze (*pre-registration*), preden zberete ali pogledate podatke.',
      'Zahtevajte neodvisno ponovitev poskusa (*replication*) na novem podatkovnem vzorcu.',
    ],
    simulationType: 'p_hacking',
  },
  {
    id: 'survivorship-bias',
    title: 'Pristranskost preživelih (Survivorship Bias)',
    subtitle: 'Koncentriranje le na tiste, ki so "preživeli" postopek izbire, in ignoriranje tistih, ki so izpadli',
    category: 'Vzorčenje',
    chapterLink: 'unit-8-2',
    story:
      'Med drugo svetovno vojno so zavezniški inženirji analizirali luknje od nabojev na bombnikih, ki so se vrnili iz misij, in želeli oklep dodati na mesta z največ luknjami (krila in trup). Statistik Abraham Wald je opozoril na usodno napako.',
    realWorldExample:
      'Wald je ugotovil, da so letala prišla nazaj z luknjami na krilih ravno zato, ker lahko bombnik preživi zadetke v krila. Bombniki, ki so bili zadeti v motorje ali pilotsko kabino, pa se niso vrnili in niso bili v vzorcu! Oklep je bilo treba dodati tja, kjer na vrnjenih letalih NI BILO nobenih lukenj (v motorje). Podoben pojav vidimo pri finančnih skladih ali nasvetih uspešnih podjetnikov, kjer poslušamo le tiste, ki so uspeli, pozabimo pa na 99 % tistih, ki so bankrotirali z isto strategijo.',
    mathExplanation:
      'Vzorec $S$ je pogojen z dogodkom preživetja $E$: $P(X \\mid E) \\ne P(X)$. Če opazujemo le podatke z $E = 1$, je ocena parametrov pristranska (*selection truncation bias*).',
    howToAvoid: [
      'Vedno se vprašajte: "Katerih podatkov ali subjektov tukaj ne vidim in zakaj so izpadli?"',
      'Pri analizi kohort upoštevajte izpadle subjekte (*loss to follow-up*) in cenzurirane podatke v analizi preživetja.',
      'Ne sklepajte o receptih za uspeh zgolj na podlagi zmagovalcev.',
    ],
    simulationType: 'survivorship',
  },
  {
    id: 'spurious-correlation-confounding',
    title: 'Lažne korelacije & Prikrite spremenljivke',
    subtitle: 'Korelacija meri zgolj sočasno gibanje, ne pa vzročno-posledične povezave',
    category: 'Korelacija',
    chapterLink: 'unit-7-1',
    story:
      'Med prodajo sladoleda in številom utopitev na morju obstaja močna pozitivna korelacija ($r = 0.88$). Ali to pomeni, da uživanje sladoleda povzroča krče in utopitve?',
    realWorldExample:
      'Seveda ne! Prikrita spremenljivka (*confounder*) je poletna temperatura. Ko je vroče, več ljudi kupuje sladoled IN hkrati se bistveno več ljudi kopa v morju, kar poveča število utopitev. Če kontroliramo temperaturo (opazujemo le vroče dni), korelacija med sladoledom in utopitvami popolnoma izgine.',
    mathExplanation:
      'Kovarianca med $X$ in $Y$ v prisotnosti skupnega vzroka $Z$ je: $\\text{Cov}(X, Y) = \\beta_{XZ}\\beta_{YZ}\\text{Var}(Z) + \\text{Cov}(\\epsilon_X, \\epsilon_Y)$. Če $Z$ ni vključen v regresijo, je cenilka vpliva $X$ pristranska (*omitted variable bias*).',
    howToAvoid: [
      'Pravilo: "Korelacija ne pomeni vzročnosti" (*Cum hoc ergo propter hoc*).',
      'Izvedite randomiziran kontroliran poskus (RCT), kjer manipulirate $X$.',
      'Uporabite usmerjene aciklične grafe (DAG) za identifikacijo prikritih spremenljivk.',
    ],
    simulationType: 'spurious',
  },
  {
    id: 'berksons-fallacy',
    title: 'Berksonov paradoks (Hospital Selection Bias)',
    subtitle: 'Dve neodvisni bolezni ali lastnosti postaneta negativno povezani, če vzorčimo le določeno podskupino',
    category: 'Pasti sklepanja',
    chapterLink: 'unit-4-1',
    story:
      'Če v bolnišnici preučujemo bolnike z diabetesom in hipertenzijo, lahko ugotovimo, da sta stanji negativno povezani: tisti z diabetesom imajo manjšo verjetnost hipertenzije. V splošni populaciji pa sta stanji nevtralni ali celo pozitivno povezani!',
    realWorldExample:
      'Podoben primer: "Privlačni ljudje so neprijetni." Če hodite na zmenke le z ljudmi, ki so bodisi zelo privlačni ALI zelo prijetni (ali oboje), boste v svojem vzorcu opazili negativno korelacijo med lepoto in prijaznostjo, saj ste tiste, ki niso ne eno ne drugo, vnaprej izločili iz vzorčenja!',
    mathExplanation:
      'Pogojna verjetnost dveh neodvisnih dogodkov $A$ in $B$ ob pogoju njune unije $A \\cup B$: $P(A \\mid B, A \\cup B) = P(A \\mid B) = P(A)$, toda $P(A \\mid A \\cup B) > P(A)$. Posledično je $P(A \\cap B \\mid A \\cup B) < P(A \\mid A \\cup B)P(B \\mid A \\cup B)$, kar ustvari navidezno negativno odvisnost (*collider conditioning*).',
    howToAvoid: [
      'Zavedajte se, da je vzorčenje v institucijah (bolnišnice, elitne šole) pogojeno z vstopnim kriterijem (*selection on a collider*).',
      'Rezultatov iz specifičnih kliničnih vzorcev ne posplošujte na splošno populacijo brez ustreznih korekcij.',
    ],
  },
];
