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
  {
    id: 'anscombe-vanhove-patterns',
    title: 'Anscombov kvartet & Vanhovejeva razpršenost',
    subtitle: 'Enaka korelacija ($r = 0.81$ oz. $0.60$), enaka povprečja, a radikalno različna resničnost',
    category: 'Korelacija',
    chapterLink: 'unit-9-1',
    story:
      'Leta 1973 je statistik Francis Anscombe sestavil štiri podatkovne nize, ki imajo identično povprečje $X$, identično povprečje $Y$, identično varianco in identično korelacijo ($r = 0.816$) ter isto regresijsko premico $\\hat{y} = 3.0 + 0.5x$. Ko pa podatke narišemo, je prvi niz lepa premica, drugi popolna nelinearna parabola, tretji ravna črta z enim osamelcem, četrti pa navpičen stolpec točk z eno samo ločeno točko!',
    realWorldExample:
      'Jan Vanhove (2016) je to razširil na 16 različnih podatkovnih vzorcev – vsi imajo Pearsonov $r = 0.60$. Med njimi so bimodalne porazdelitve, heteroscedastičnost (lihasto naraščanje šuma), sinusoidno nihanje in dve ločeni skupini. Če bi se zanašali zgolj na številko $r = 0.60$, bi zgrešili bistveno dinamiko pojava.',
    mathExplanation:
      'Povzetek s povprečjem in kovarianco predpostavlja bivariatno normalnost. Pearsonov koeficient $r = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{(n-1)s_x s_y}$ povzema zgolj linearno komponento in je izjemno občutljiv na posamezne vzvodne točke (*high leverage points*). Šele grafikon ostankov ($e_i = y_i - \\hat{y}_i$) razkrije manjkajoče nelinearne člene.',
    howToAvoid: [
      'Nikoli ne sprejmite statističnega sklepa o korelaciji ali regresiji brez predhodnega vizualnega pregleda razsevnega grafikona (*scatterplot*).',
      'Vedno narišite grafikon ostankov (*residuals vs fitted*) – če ostanki kažejo kakršenkoli vzorec ali lok, linearni model ni primeren.',
      'Preverite vplivnost osamelcev s Cookovo razdaljo ali primerjajte z robustno regresijo (RLM).',
    ],
    simulationType: 'spurious',
  },
  {
    id: 'dynamite-plots-fallacy',
    title: 'Past "dinamitnih grafov" (Dynamite Plots Fallacy)',
    subtitle: 'Zakaj stolpčni grafikoni z brki popačijo simetrično negotovost in prikrijejo pravo porazdelitev',
    category: 'Pasti sklepanja',
    chapterLink: 'unit-7-1',
    story:
      'V mnogih znanstvenih revijah avtorji še vedno rišejo stolpčne diagrame za zvezne podatke z eno samo črtico na vrhu (ki spominja na vžigalnik za dinamit). Ta oblika grafa prikrije asimetrijo, bimodalnost in osamelce ter ustvari napačen vtis, da se vsa teža podatkov nahaja znotraj telesa stolpca.',
    realWorldExample:
      'Dva podatkovna niza imata lahko popolnoma enako povprečje $\\bar{x} = 50$ in enak standardni odklon $s = 10$. Vendar ima prvi niz popolnoma normalno Gaussovo obliko, drugi pa dve ločeni skupini (bimodalnost pri 40 in 60) ali pa 90 % točk pri 45 in en ogromen osamelec pri 95. Dinamitni grafikon bo za oba narisal identičen stolpec!',
    mathExplanation:
      'Telo stolpca v stolpčnem grafikonu naravno kodira dolžino od ničle ($0 \\to \\bar{x}$), kar je smiselno za števne ali frekvenčne podatke, povsem nesmiselno pa za zvezne porazdelitve. Vizualna površina stolpca privlači pozornost na območje med $0$ in $\\bar{x}$, kjer pogosto sploh ni podatkov, medtem ko je prava negotovost simetrična okrog ocene $\\bar{x} \\pm t^* \\cdot \\text{SE}$.',
    howToAvoid: [
      'Uporabite točkovne grafe z intervali (*pointrange* ali *Forest plot*), kjer točka predstavlja oceno, daljica pa 95 % interval zaupanja.',
      'Za prikaz porazdelitve uporabite škatle z brki (*boxplot*), violinske grafe (*violin plot*) ali grebenske grafe gostote (*ridgelines*).',
      'Kadar je podatkov malo ($N < 50$), prikažite surove točke z rahlim stresanjem (*jittered scatter*).',
    ],
    simulationType: 'simpson',
  },
];
