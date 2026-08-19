import { ChapterConfig } from '../../types';

export const chapter0: ChapterConfig = {
  id: 'chapter-0',
  chapterNumber: 0,
  title: 'Uvod v statistiko in podatkovno vizualizacijo',
  subtitle: 'Kaj je statistika, trije stebri sklepanja in kognitivna znanost vizualnega zaznavanja',
  description: 'Temeljni znanstveni uvod v statistiko: zakaj je statistika znanost o negotovosti in ločevanju signala od šuma, kateri so trije stebri statističnega sklepanja ter kako človeški možgani vizualno dekodirajo grafe (Cleveland-McGillova hierarhija).',
  iconName: 'Sparkles',
  color: '#059669',
  units: [
    {
      id: 'unit-0-1',
      unitNumber: 'Uvod 1',
      chapterId: 'chapter-0',
      title: 'Kaj je statistika in zakaj je pomembna?',
      subtitle: 'Znanost o odločanju in razumevanju sveta v razmerah negotovosti',
      leadParagraph: 'Živimo v svetu, polnem negotovosti in poplave informacij. Statistika je veja znanosti, ki se ukvarja z zbiranjem, urejanjem, analizo in interpretacijo podatkov. Ne gre za suhoparno seštevanje številk, temveč za orodje, ki nam omogoča ločiti resnične vzorce od čistega naključnega šuma.',
      deepDive: 'Brez statistike ne bi imeli varnih zdravil (saj ne bi mogli dokazati njihove učinkovitosti), ne bi imeli zanesljivih vremenskih napovedi, delujočih algoritmov umetne inteligence, niti varnih letalskih potovanj. Statistika je most med posameznimi meritvami in splošnimi zakonitostmi narave.',
      mnemonic: {
        eli5: 'Statistika je kot očala za branje podatkov: brez njih vidiš le zamegljene pike in šum, z njimi pa jasno prepoznaš resnično sliko.',
        anchor: 'Statistika spremeni surove podatke v zanesljivo znanje za sprejemanje odločitev.',
        fallacyWarning: {
          name: 'Zanašanje na anekdotične dokaze',
          description: 'Sprejemanje splošnih odločitev na podlagi ene same osebne zgodbe ali govorice (npr. »Moj sosed je kadil 40 let in doživel 95 let, torej kajenje ni nevarno«).',
          example: 'Ena sama osebna izkušnja je le osamelec (anecdote), statistična analiza pa preuči tisoče ljudi in razkrije pravo zakonitost.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Statistika je umetnost in znanost, kako iz nepopolnih podatkov potegniti zanesljive sklepe.',
        simpleExplanation: 'Ljudje imamo naravno težnjo, da povsod iščemo vzorce – tudi tam, kjer je le naključje. Statistika nam ponuja natančna orodja, s katerimi preverimo: ali ta pojav zares obstaja ali pa gre le za naključno srečo?',
        practicalInsight: 'Vsak dan se srečujemo s statističnimi trditvami v novicah, oglasih in politiki. Razumevanje osnov statistike je najboljša obramba pred manipulacijami s podatki in lažnimi novicami.',
        mathematicalTheory: 'Statistika združuje deskriptivno analizo podatkovnih nizov ter matematično teorijo verjetnosti z namenom ocenjevanja parametrov in preverjanja hipotez.'
      },
      textbookWisdom: {
        simpleQuote: 'Statistika je umetnost in znanost, kako iz nepopolnih podatkov potegniti zanesljive sklepe.',
        simpleExplanation: 'Ljudje imamo naravno težnjo, da povsod iščemo vzorce – tudi tam, kjer je le naključje. Statistika nam ponuja natančna orodja, s katerimi preverimo: ali ta pojav zares obstaja ali pa gre le za naključno srečo?',
        practicalInsight: 'Vsak dan se srečujemo s statističnimi trditvami v novicah, oglasih in politiki. Razumevanje osnov statistike je najboljša obramba pred manipulacijami s podatki in lažnimi novicami.',
        mathematicalTheory: 'Statistika združuje deskriptivno analizo podatkovnih nizov ter matematično teorijo verjetnosti z namenom ocenjevanja parametrov in preverjanja hipotez.'
      },
      cueBannerText: 'Ta uvodna učna enota je namenjena jasnemu razumevanju temeljnih konceptov brez zapletenega računanja.',
      hasSimulation: false,
      poeQuiz: {
        question: 'Prijatelj vam reče: »Videl sem dva človeka, ki sta jedla to dieto in shujšala, torej dieta stoodstotno deluje za vsakogar.« Kakšna je statistična ocena te trditve?',
        prompt: 'Pomislite na razliko med anekdotičnim primerom in statističnim dokazom:',
        options: [
          {
            id: 'opt-1',
            text: 'Gre za anekdotičen dokaz na premajhnem vzorcu (N=2), iz katerega ne moremo veljavno posploševati na celotno populacijo.',
            isCorrect: true,
            explanation: 'Pravilno! Dva posameznika ne predstavljata statističnega dokaza, saj so na rezultat lahko vplivali številni drugi dejavniki (gibanje, metabolizem, naključje).'
          },
          {
            id: 'opt-2',
            text: 'Trditev je povsem zanesljiva, ker temelji na resničnih opazovanjih dveh ljudi.',
            isCorrect: false,
            explanation: 'Napačno. Resničnost posameznega primera še ne pomeni, da je pojav univerzalen ali statistično značilen.'
          },
          {
            id: 'opt-3',
            text: 'Trditev je napačna le, če sta bila oba človeka istega spola.',
            isCorrect: false,
            explanation: 'Napačno. Glavna težava je premajhen vzorec in odsotnost kontrolne skupine.'
          }
        ],
        insight: 'Anekdote niso podatki – za resnične sklepe potrebujemo sistematično zbrane vzorce!',
        followUpExperiment: 'V naslednjih poglavjih boste spoznali, kako pravilno načrtujemo vzorčenje in merimo verjetnost.'
      },
      initialParams: {}
    },
    {
      id: 'unit-0-2',
      unitNumber: 'Uvod 2',
      chapterId: 'chapter-0',
      title: 'Trije stebri statističnega mišljenja',
      subtitle: 'Od opazovanja podatkov prek verjetnosti do znanstvenega sklepanja',
      leadParagraph: 'Vsak učbenik statistike in vsaka resna analiza podatkov temelji na treh medsebojno povezanih stebrih. Razumevanje te poti vam omogoča, da točno veste, kje v učnem procesu se nahajate in zakaj se posamezne teme navezujejo druga na drugo.',
      deepDive: 'Prvi steber nam pove, kaj imamo pred seboj. Drugi steber zgradi matematični model za negotovost in naključje. Tretji steber pa združi podatke in verjetnost, da lahko z izračunano stopnjo zaupanja sprejemamo odločitve o stvareh, ki jih nismo neposredno izmerili.',
      mnemonic: {
        eli5: 'Predstavljaj si detektiva:\n1. Najprej zbere vse sledi in odtise na kraju dogodka (opisna statistika).\n2. Izračuna verjetnosti različnih možnih scenarijev (teorija verjetnosti).\n3. Na sodišču predloži trdne dokaze, ki onkraj razumnega dvoma izključijo naključje (statistično sklepanje).',
        anchor: '1. Opiši podatke → 2. Razumi naključje → 3. Sklepaj o celoti.',
        fallacyWarning: {
          name: 'Zamenjava opisa s sklepom',
          description: 'Prepričanje, da zgolj opis vzorca (npr. »v našem vzorcu je bilo 52 % moških«) samodejno pomeni dokaz za celotno populacijo brez preverjanja statistične značilnosti.',
          example: 'Razlika v vzorcu je lahko zgolj posledica naključnega nihanja, zato potrebujemo teste hipotez.'
        }
      },
      explanationLevels: {
        simpleQuote: '1. Opazuj sedanjost, 2. modeliraj negotovost, 3. zanesljivo napovej prihodnost.',
        simpleExplanation: 'Celotna statistika se deli na tri medsebojno povezane korake:\n1. Opisna statistika (urejanje podatkov, mere srednjih vrednosti, razpršenost in grafikoni).\n2. Verjetnost in porazdelitve (matematični modeli naključja, binomska in Gaussova normalna porazdelitev).\n3. Inferenčna statistika (intervali zaupanja, preverjanje ničelnih hipotez in p-vrednosti).',
        practicalInsight: 'Ko berete znanstveni članek ali poslovno poročilo, boste vedno prepoznali to zaporedje: najprej tabela opisnih podatkov, nato verjetnostni model in na koncu statistični sklep s stopnjo zaupanja.',
        mathematicalTheory: 'Struktura statističnega sklepanja:\n1. Deskriptivna statistika: opazovani vzorec $S = \\{x_1, x_2, \\dots, x_n\\}$.\n2. Verjetnostni prostor: $(\\Omega, \\mathcal{F}, P)$ z naključnimi spremenljivkami $X$.\n3. Inferenčne metode: testne statistike $T(X)$ z določenimi nivoji značilnosti $\\alpha$ in intervali zaupanja $1 - \\alpha$.'
      },
      textbookWisdom: {
        simpleQuote: '1. Opazuj sedanjost, 2. modeliraj negotovost, 3. zanesljivo napovej prihodnost.',
        simpleExplanation: 'Celotna statistika se deli na tri medsebojno povezane korake:\n1. Opisna statistika (urejanje podatkov, mere srednjih vrednosti, razpršenost in grafikoni).\n2. Verjetnost in porazdelitve (matematični modeli naključja, binomska in Gaussova normalna porazdelitev).\n3. Inferenčna statistika (intervali zaupanja, preverjanje ničelnih hipotez in p-vrednosti).',
        practicalInsight: 'Ko berete znanstveni članek ali poslovno poročilo, boste vedno prepoznali to zaporedje: najprej tabela opisnih podatkov, nato verjetnostni model in na koncu statistični sklep s stopnjo zaupanja.',
        mathematicalTheory: 'Struktura statističnega sklepanja:\n1. Deskriptivna statistika: opazovani vzorec $S = \\{x_1, x_2, \\dots, x_n\\}$.\n2. Verjetnostni prostor: $(\\Omega, \\mathcal{F}, P)$ z naključnimi spremenljivkami $X$.\n3. Inferenčne metode: testne statistike $T(X)$ z določenimi nivoji značilnosti $\\alpha$ in intervali zaupanja $1 - \\alpha$.'
      },
      cueBannerText: 'Spoznajte celotno arhitekturo statistike, preden se poglobite v posamezna poglavja.',
      hasSimulation: false,
      poeQuiz: {
        question: 'V katero vejo statistike spada izračun povprečne višine 50 dijakov v razredu?',
        prompt: 'Razmislite, ali gre za zgolj povzetek zbranih podatkov ali za posploševanje na celotno državo:',
        options: [
          {
            id: 'opt-1',
            text: 'V opisno (deskriptivno) statistiko, saj le povzemamo lastnosti skupine, ki smo jo neposredno izmerili.',
            isCorrect: true,
            explanation: 'Tako je! Opisna statistika se ukvarja s povzemanjem in opisovanjem obstoječih podatkov.'
          },
          {
            id: 'opt-2',
            text: 'V inferenčno statistiko, ker smo uporabili matematično formulo.',
            isCorrect: false,
            explanation: 'Napačno. Inferenčna statistika bi bila, če bi iz teh 50 dijakov ocenjevali višino vseh dijakov v državi.'
          },
          {
            id: 'opt-3',
            text: 'V Bayesovo verjetnost.',
            isCorrect: false,
            explanation: 'Napačno. Preprost izračun povprečja ne zahteva Bayesovega modeliranja.'
          }
        ],
        insight: 'Opisna statistika opisuje znano sedanjost, inferenčna statistika pa z verjetnostjo sklepa o neznanem!',
        followUpExperiment: 'V naslednji uvodni enoti boste spoznali kognitivne zakonitosti branja podatkovnih grafov.'
      },
      initialParams: {}
    },
    {
      id: 'unit-0-3',
      unitNumber: 'Uvod 3',
      chapterId: 'chapter-0',
      title: 'Kako človeški možgani berejo grafe: Znanost o vizualnem zaznavanju podatkov',
      subtitle: 'Cleveland-McGillova hierarhija, Gestalt načela in pasti zavajajočih grafov',
      leadParagraph: 'Vizualizacija podatkov ni le estetska izbira ali dekoracija, temveč kognitivni proces prenosa številk v geometrijske oblike. Človeški vidni sistem ima natančno določene biološke zakonitosti: nekatere vizualne lastnosti (kot je položaj na skupni osi) zaznamo hipoma in z visoko natančnostjo, pri drugih (koti v tortnih diagramih, 3D volumni, barvna nasičenost) pa sistematično delamo velike napake.',
      deepDive: 'Znanstvenika William S. Cleveland in Robert McGill (ter kasneje Heer in Bostock) sta z obsežnimi psihofizikalnimi poskusi empirično razvrstila vizualne kanale po natančnosti človeškega dekodiranja:\n\n1. **Položaj na skupni poravnani osi** (npr. standardni točkovni ali stolpčni grafikon z ničelnim izhodiščem) – daleč najnižja stopnja napake pri primerjavi.\n2. **Položaj na neporavnanih oseh** – še vedno zelo natančen.\n3. **Dolžina** (npr. palice brez skupne izhodiščne črte) – nekoliko večja negotovost.\n4. **Kot in nagib** (npr. izseki tortnega diagrama) – možgani sistematično podcenjujejo ostre kote in precenjujejo tope kote.\n5. **Dvodimenzionalna površina** (npr. ploščina krogov ali nepravilnih likov) – človek površino podzavestno kvadrira, kar vodi v dramatično precenjevanje razlik med vrednostmi.\n6. **Tridimenzionalni volumen in globina** (3D stolpci, perspektivni kvadri) – povzročajo največje popačenje in optično iluzijo, kjer je prave vrednosti skoraj nemogoče odčitati.\n7. **Barvna svetlost, nasičenost in barvni ton** – odlični za kategorizacijo in usmerjanje pozornosti (*preattentive pop-out*), a neprimerni za natančno količinsko primerjavo.\n\nK temu se pridružujejo **Gestalt načela** (bližina, podobnost, povezava, zveznost), ki v možganih samodejno združujejo točke v skupine. Zato mora dober statistik poznati ta pravila: grafi z 3D učinki, odrezanimi ali dvojnimi osmi ter neprimernimi barvnimi lestvicami niso le slabi na pogled, temveč bralca neizogibno zavedejo.',
      mnemonic: {
        eli5: 'Predstavljaj si merjenje dveh prijateljev: Če stojita drug ob drugem na ravnih tleh (skupna os), v sekundi vidiš, kdo je za 2 cm višji. Če bi njuni višini primerjal po velikosti dveh napihnjenih balonov (3D volumen), bi bilo to nemogoče uganiti!',
        anchor: 'Najbolj natančno: Položaj na osi > Dolžina > Kot (torta) > Površina (krog) > 3D Volumen.',
        fallacyWarning: {
          name: 'Past 3D grafov in nepravilnega izhodišča',
          description: 'Uporaba 3D stolpčnih grafov s sencami ali odrezana Y-os pri stolpčnih diagramih, kjer višina stolpca vizualno predstavlja celotno količino.',
          example: 'Če pri stolpčnem grafu začnete os pri 95 namesto pri 0, bo razlika med 96 in 99 videti kot 4-kratno povečanje namesto zgolj 3-odstotnega premika. Pri stolpcih je ničelno izhodišče nujno, pri točkovnih grafih pa lahko os prilagodimo razponu podatkov.'
        }
      },
      explanationLevels: {
        simpleQuote: 'Dober grafikon ne olepšuje podatkov, ampak omogoča človeškemu očesu, da brez popačenja prebere resnico.',
        simpleExplanation: 'Ko gledamo graf, naši možgani izvajajo postopek »dekodiranja«: črte, pike in barve pretvarjajo nazaj v številke. Ker so naše oči najbolj natančne pri primerjavi višine ali položaja ob ravni črti, so preprosti točkovni in stolpčni grafi skoraj vedno boljši od pisanih tort ali 3D diagramov.',
        practicalInsight: 'Namesto da v en sam graf natlačite 15 različnih barvnih črt, uporabite fasetiranje (*small multiples* – mrežo majhnih podgrafov). Vsaka podskupina dobi svoj jasen prostor, kar omogoča takojšnjo primerjavo brez vizualnega šuma.',
        mathematicalTheory: 'Vizualna percepcija sloni na psihofizikalnem Stevensovem potenčnem zakonu $S = k \\cdot I^a$, kjer je zaznana intenzivnost $S$ funkcija fizikalne jakosti $I$. Za dolžino je eksponent $a \\approx 1.0$ (linearno zaznavanje), za površino $a \\approx 0.7$ (podcenjevanje razlik), za volumen pa $a \\approx 0.6$ (močno nelinearno popačenje).'
      },
      textbookWisdom: {
        simpleQuote: 'Dober grafikon ne olepšuje podatkov, ampak omogoča človeškemu očesu, da brez popačenja prebere resnico.',
        simpleExplanation: 'Ko gledamo graf, naši možgani izvajajo postopek »dekodiranja«: črte, pike in barve pretvarjajo nazaj v številke. Ker so naše oči najbolj natančne pri primerjavi višine ali položaja ob ravni črti, so preprosti točkovni in stolpčni grafi skoraj vedno boljši od pisanih tort ali 3D diagramov.',
        practicalInsight: 'Namesto da v en sam graf natlačite 15 različnih barvnih črt, uporabite fasetiranje (*small multiples* – mrežo majhnih podgrafov). Vsaka podskupina dobi svoj jasen prostor, kar omogoča takojšnjo primerjavo brez vizualnega šuma.',
        mathematicalTheory: 'Vizualna percepcija sloni na psihofizikalnem Stevensovem potenčnem zakonu $S = k \\cdot I^a$, kjer je zaznana intenzivnost $S$ funkcija fizikalne jakosti $I$. Za dolžino je eksponent $a \\approx 1.0$ (linearno zaznavanje), za površino $a \\approx 0.7$ (podcenjevanje razlik), za volumen pa $a \\approx 0.6$ (močno nelinearno popačenje).'
      },
      cueBannerText: 'Spoznajte zakonitosti človeškega vida in Cleveland-McGillovo hierarhijo pred prehodom na 1. Poglavje.',
      hasSimulation: false,
      poeQuiz: {
        question: 'Zakaj so po raziskavah Clevelanda in McGilla tortni diagrami (pie charts) sistematično manj natančni od vodoravnih stolpčnih ali točkovnih grafov?',
        prompt: 'Pomislite, kateri vizualni kanal človeški možgani uporabljajo za branje torte:',
        options: [
          {
            id: 'opt-1',
            text: 'Ker tortni diagrami podatke kodirajo kot kote in površine, pri katerih človeški vid sistematično dela bistveno večje napake pri ocenjevanju razmerij kot pri položaju na ravni osi.',
            isCorrect: true,
            explanation: 'Točno tako! Ocenjevanje kotov (še posebej ostrih in topih) ter primerjava sosednjih nepravilnih izsekov je kognitivno bistveno bolj zahtevna in nezanesljiva kot primerjava položaja točk ali dolžin ob skupni lestvici.'
          },
          {
            id: 'opt-2',
            text: 'Ker tortni diagrami lahko prikazujejo le do 3 podatkovne točke.',
            isCorrect: false,
            explanation: 'Napačno. Torta lahko tehnično prikazuje poljubno število izsekov, vendar je ravno pri večjem številu izsekov še težje razbrati vrednosti.'
          },
          {
            id: 'opt-3',
            text: 'Ker tortni diagrami ne podpirajo barv.',
            isCorrect: false,
            explanation: 'Napačno. Ravno obratno – pogosto uporabljajo preveč barv, kar še dodatno oteži interpretacijo.'
          }
        ],
        insight: 'Položaj na skupni osi je zlati standard natančne podatkovne komunikacije!',
        followUpExperiment: 'V orodjarni preizkusite Cleveland-McGillov perceptivni laboratorij in sami preizkusite svojo natančnost.'
      },
      initialParams: {}
    }
  ]
};
