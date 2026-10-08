/**
 * 30 dialogues dataset: Habla como un español — Խոսի՛ր իսպանացու պես
 * Level: B1–B2 Expresiones coloquiales
 */

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  es: string;
  am: string;
}

export interface Question {
  id: number;
  part: number;
  partTitleEs: string;
  partTitleAm: string;
  topicEs: string;
  topicAm: string;
  dialogue: {
    speakerA: {
      es: string;
      esCompleted?: string;
      am: string;
    };
    speakerB: {
      es: string;
      esCompleted?: string;
      am: string;
    };
  };
  options: QuestionOption[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanationAm: string;
  explanationEs: string;
  prizeAmount: string; // e.g. "50,000 ֏" / milestone
  isMilestone?: boolean;
}

export const PARTS = [
  { id: 1, titleEs: 'Reacciones naturales', titleAm: 'Բնական արձագանքներ', color: 'from-amber-500 to-orange-600', range: [1, 6] },
  { id: 2, titleEs: 'Planes y decisiones', titleAm: 'Ծրագրեր և որոշումներ', color: 'from-yellow-500 to-amber-600', range: [7, 12] },
  { id: 3, titleEs: 'Emociones y sentimientos', titleAm: 'Զգացմունքներ', color: 'from-emerald-500 to-green-600', range: [13, 18] },
  { id: 4, titleEs: 'Hablar con naturalidad', titleAm: 'Բնական խոսակցություն', color: 'from-blue-500 to-cyan-600', range: [19, 24] },
  { id: 5, titleEs: 'Situaciones reales B2', titleAm: 'Իրական իրավիճակներ', color: 'from-purple-500 to-indigo-600', range: [25, 30] },
];

export const PRIZE_LADDER = [
  '1,000', '2,000', '3,000', '5,000', '8,000', '10,000', // 1-6 (Parte 1 Milestone: 10,000)
  '15,000', '20,000', '30,000', '40,000', '50,000', '65,000', // 7-12 (Parte 2 Milestone: 65,000)
  '80,000', '100,000', '125,000', '150,000', '200,000', '250,000', // 13-18 (Parte 3 Milestone: 250,000)
  '300,000', '350,000', '400,000', '500,000', '600,000', '700,000', // 19-24 (Parte 4 Milestone: 700,000)
  '750,000', '800,000', '850,000', '900,000', '950,000', '1,000,000' // 25-30 (Parte 5 Jackpot: 1,000,000)
];

export const QUESTIONS: Question[] = [
  // --- Parte 1: Reacciones naturales ---
  {
    id: 1,
    part: 1,
    partTitleEs: 'Reacciones naturales',
    partTitleAm: 'Բնական արձագանքներ',
    topicEs: 'Una buena noticia',
    topicAm: 'Լավ նորություն',
    dialogue: {
      speakerA: {
        es: '¡He aprobado el examen de español!',
        am: 'Ես հանձնել եմ իսպաներենի քննությունը։',
      },
      speakerB: {
        es: '¡_____! ¡Enhorabuena!',
        esCompleted: '¡Qué guay! ¡Enhorabuena!',
        am: 'Ի՜նչ լավ է։ Շնորհավորում եմ։',
      },
    },
    options: [
      { key: 'A', es: 'Qué pena', am: 'Ի՜նչ ափսոս' },
      { key: 'B', es: 'Qué guay', am: 'Ի՜նչ լավ է / Ի՜նչ հրաշալի է' },
      { key: 'C', es: 'Qué rollo', am: 'Ի՜նչ ձանձրալի է' },
      { key: 'D', es: 'Ni hablar', am: 'Խոսք անգամ չի կարող լինել' },
    ],
    correctKey: 'B',
    explanationAm: '«¡Qué guay!» իսպաներենում շատ տարածված խոսակցական արտահայտություն է, որը նշանակում է «Ի՜նչ լավ է / Ի՜նչ հավես է»: «Qué pena» նշանակում է «ափսոս», իսկ «Qué rollo»՝ «ձանձրալի բան»:',
    explanationEs: '«¡Qué guay!» se usa para expresar alegría o entusiasmo ante una buena noticia. «Qué pena» expresa tristeza y «Qué rollo» aburrimiento.',
    prizeAmount: '1,000 ֏',
  },
  {
    id: 2,
    part: 1,
    partTitleEs: 'Reacciones naturales',
    partTitleAm: 'Բնական արձագանքներ',
    topicEs: 'Un pequeño error',
    topicAm: 'Փոքր սխալ',
    dialogue: {
      speakerA: {
        es: 'Perdona, he olvidado traer tu libro.',
        am: 'Ներիր, մոռացել եմ քո գիրքը բերել։',
      },
      speakerB: {
        es: '_____, puedes traerlo mañana.',
        esCompleted: 'No pasa nada, puedes traerlo mañana.',
        am: 'Ոչինչ, կարող ես վաղը բերել։',
      },
    },
    options: [
      { key: 'A', es: 'No pasa nada', am: 'Ոչինչ / Ոչ մի խնդիր չկա' },
      { key: 'B', es: 'Qué fuerte', am: 'Ա՜յ քեզ բան / Շոկային է' },
      { key: 'C', es: 'Ni hablar', am: 'Խոսք անգամ չի կարող լինել' },
      { key: 'D', es: 'Qué va', am: 'Ի՞նչ ես ասում / Ամենևին' },
    ],
    correctKey: 'A',
    explanationAm: '«No pasa nada» նշանակում է «Ոչինչ, խնդիր չկա» և օգտագործվում է, երբ ինչ-որ մեկը ներողություն է խնդրում մանրուքի համար:',
    explanationEs: '«No pasa nada» se utiliza para tranquilizar a alguien tras una disculpa y quitarle importancia al asunto.',
    prizeAmount: '2,000 ֏',
  },
  {
    id: 3,
    part: 1,
    partTitleEs: 'Reacciones naturales',
    partTitleAm: 'Բնական արձագանքներ',
    topicEs: 'Una sorpresa',
    topicAm: 'Անակնկալ',
    dialogue: {
      speakerA: {
        es: '¡Me voy a vivir a Madrid!',
        am: 'Ես տեղափոխվում եմ Մադրիդ։',
      },
      speakerB: {
        es: '¡_____! ¿De verdad?',
        esCompleted: '¡No me digas! ¿De verdad?',
        am: 'Չես ասի՜։ Իսկապե՞ս։',
      },
    },
    options: [
      { key: 'A', es: 'Me da igual', am: 'Ինձ համար միևնույն է' },
      { key: 'B', es: 'Qué rollo', am: 'Ի՜նչ ձանձրալի է' },
      { key: 'C', es: 'No me digas', am: 'Չես ասի՜ / Չի կարող պատահել' },
      { key: 'D', es: 'Ya veremos', am: 'Կտեսնենք' },
    ],
    correctKey: 'C',
    explanationAm: '«¡No me digas!» բառացի թարգմանվում է «Մի՛ ասա ինձ», սակայն իսպաներենում արտահայտում է անակնկալ կամ զարմանք՝ «Չես ասի՜ / Իսկապե՞ս»:',
    explanationEs: '«¡No me digas!» expresa sorpresa e incredulidad ante una noticia inesperada.',
    prizeAmount: '3,000 ֏',
  },
  {
    id: 4,
    part: 1,
    partTitleEs: 'Reacciones naturales',
    partTitleAm: 'Բնական արձագանքներ',
    topicEs: 'Una decisión',
    topicAm: 'Որոշում',
    dialogue: {
      speakerA: {
        es: '¿Prefieres comer pizza o pasta?',
        am: 'Նախընտրում ես պիցցա՞, թե՞ մակարոն։',
      },
      speakerB: {
        es: '_____. Elige tú.',
        esCompleted: 'Me da igual. Elige tú.',
        am: 'Ինձ համար միևնույն է։ Դու ընտրիր։',
      },
    },
    options: [
      { key: 'A', es: 'Me da igual', am: 'Ինձ համար միևնույն է' },
      { key: 'B', es: 'Estoy harto', am: 'Զզվել եմ / Հոգնել եմ' },
      { key: 'C', es: 'Menos mal', am: 'Լավ է, որ...' },
      { key: 'D', es: 'Ni idea', am: 'Պատկերացում չունեմ' },
    ],
    correctKey: 'A',
    explanationAm: '«Me da igual» նշանակում է «Ինձ համար միևնույն է / Տարբերություն չկա»: Համեմատության համար՝ «Estoy harto» նշանակում է «կուշտ եմ / զզվել եմ»:',
    explanationEs: '«Me da igual» expresa indiferencia entre varias opciones. Equivale a no tener preferencia.',
    prizeAmount: '5,000 ֏',
  },
  {
    id: 5,
    part: 1,
    partTitleEs: 'Reacciones naturales',
    partTitleAm: 'Բնական արձագանքներ',
    topicEs: 'Una noticia inesperada',
    topicAm: 'Անսպասելի լուր',
    dialogue: {
      speakerA: {
        es: 'Carlos ha vendido su coche y se ha comprado una moto.',
        am: 'Կառլոսը վաճառել է իր մեքենան և մոտոցիկլ գնել։',
      },
      speakerB: {
        es: '¡_____! ¡No me lo esperaba!',
        esCompleted: '¡Qué fuerte! ¡No me lo esperaba!',
        am: 'Ա՜յ քեզ բան։ Ես դա չէի սպասում։',
      },
    },
    options: [
      { key: 'A', es: 'Qué pena', am: 'Ի՜նչ ափսոս' },
      { key: 'B', es: 'Qué fuerte', am: 'Ա՜յ քեզ բան / Շոկային է' },
      { key: 'C', es: 'Vale', am: 'Լավ / Եղավ' },
      { key: 'D', es: 'Por si acaso', am: 'Ամեն դեպքում' },
    ],
    correctKey: 'B',
    explanationAm: '«¡Qué fuerte!» իսպաներենում շատ սիրված խոսակցական արտահայտություն է՝ ցնցող, անհավանական կամ զարմանալի լուրերին արձագանքելու համար («Ա՜յ քեզ բան / Վաու»):',
    explanationEs: '«¡Qué fuerte!» indica que algo es impactante, increíble o difícil de asimilar.',
    prizeAmount: '8,000 ֏',
  },
  {
    id: 6,
    part: 1,
    partTitleEs: 'Reacciones naturales',
    partTitleAm: 'Բնական արձագանքներ',
    topicEs: 'Una pregunta difícil',
    topicAm: 'Դժվար հարց',
    dialogue: {
      speakerA: {
        es: '¿Sabes dónde vive ahora Antonio?',
        am: 'Գիտե՞ս, թե հիմա որտեղ է ապրում Անտոնիոն։',
      },
      speakerB: {
        es: 'No tengo _____.',
        esCompleted: 'No tengo ni idea.',
        am: 'Ընդհանրապես պատկերացում չունեմ։',
      },
    },
    options: [
      { key: 'A', es: 'ni ganas', am: 'ոչ էլ ցանկություն' },
      { key: 'B', es: 'ni tiempo', am: 'ոչ էլ ժամանակ' },
      { key: 'C', es: 'ni idea', am: 'ոչ էլ գաղափար (ընդհանրապես պատկերացում չունեմ)' },
      { key: 'D', es: 'ni razón', am: 'ոչ էլ պատճառ' },
    ],
    correctKey: 'C',
    explanationAm: '«No tener ni idea» նշանակում է «ընդհանրապես գաղափար կամ պատկերացում չունենալ» («No sé nada»-ի խոսակցական համարժեքը):',
    explanationEs: '«No tener ni idea» es la forma coloquial de decir que se desconoce por completo la respuesta.',
    prizeAmount: '10,000 ֏',
    isMilestone: true,
  },

  // --- Parte 2: Planes y decisiones ---
  {
    id: 7,
    part: 2,
    partTitleEs: 'Planes y decisiones',
    partTitleAm: 'Ծրագրեր և որոշումներ',
    topicEs: 'Salir con amigos',
    topicAm: 'Ընկերների հետ դուրս գալ',
    dialogue: {
      speakerA: {
        es: '¿Te _____ ir al cine esta noche?',
        esCompleted: '¿Te apetece ir al cine esta noche?',
        am: 'Այս երեկո կինո գնալու հավես ունե՞ս։',
      },
      speakerB: {
        es: '¡Claro! ¡Me encanta el cine!',
        esCompleted: '¡Claro! ¡Me encanta el cine!',
        am: 'Իհարկե։ Ես շատ եմ սիրում կինոն։',
      },
    },
    options: [
      { key: 'A', es: 'apetece', am: 'հավես ունես / ցանկանում ես' },
      { key: 'B', es: 'quieres', am: 'ուզում ես (առանց "te"-ի պետք է լիներ)' },
      { key: 'C', es: 'gusta de', am: 'սիրում ես (de-ով չի օգտագործվում)' },
      { key: 'D', es: 'parece de', am: 'թվում է' },
    ],
    correctKey: 'A',
    explanationAm: '«Apetecer» բայն օգտագործվում է «gustar»-ի պես՝ անուղղակի դերանունով (¿Te apetece...? = Հավես ունե՞ս / Կցանկանայի՞ր):',
    explanationEs: 'El verbo «apetecer» funciona como «gustar»: «¿Te apetece + infinitivo?». Se usa para proponer planes.',
    prizeAmount: '15,000 ֏',
  },
  {
    id: 8,
    part: 2,
    partTitleEs: 'Planes y decisiones',
    partTitleAm: 'Ծրագրեր և որոշումներ',
    topicEs: 'Una invitación',
    topicAm: 'Հրավեր',
    dialogue: {
      speakerA: {
        es: '¿Vienes con nosotros al restaurante?',
        am: 'Մեզ հետ ռեստորան գալի՞ս ես։',
      },
      speakerB: {
        es: 'Hoy no me _____ salir. Estoy cansado.',
        esCompleted: 'Hoy no me apetece salir. Estoy cansado.',
        am: 'Այսօր դուրս գալու հավես չունեմ։ Հոգնած եմ։',
      },
    },
    options: [
      { key: 'A', es: 'apetezco', am: 'սխալ ձև ինֆինիտիվի հետ' },
      { key: 'B', es: 'apetecen', am: 'հոգնակի գոյականների հետ' },
      { key: 'C', es: 'apetece', am: 'հավես ունեմ (եզակի/անորոշ դերբայ)' },
      { key: 'D', es: 'apetecía de', am: 'սխալ կառուցվածք' },
    ],
    correctKey: 'C',
    explanationAm: 'Երբ «apetecer» բային հաջորդում է անորոշ դերբայ (salir), բայը դրվում է եզակի 3-րդ դեմքով՝ «No me apetece salir» (Դուրս գալու հավես չունեմ):',
    explanationEs: 'Con un verbo en infinitivo, «apetecer» se conjuga en tercera persona singular: «no me apetece».',
    prizeAmount: '20,000 ֏',
  },
  {
    id: 9,
    part: 2,
    partTitleEs: 'Planes y decisiones',
    partTitleAm: 'Ծրագրեր և որոշումներ',
    topicEs: 'Planes de vacaciones',
    topicAm: 'Արձակուրդի ծրագրեր',
    dialogue: {
      speakerA: {
        es: '¿Vamos a Barcelona este verano?',
        am: 'Այս ամառ Բարսելոնա գնա՞նք։',
      },
      speakerB: {
        es: '_____, todavía tenemos que ahorrar dinero.',
        esCompleted: 'Ya veremos, todavía tenemos que ahorrar dinero.',
        am: 'Կտեսնենք, դեռ պետք է գումար խնայենք։',
      },
    },
    options: [
      { key: 'A', es: 'Menos mal', am: 'Լավ է, որ...' },
      { key: 'B', es: 'Ya veremos', am: 'Կտեսնենք / Ապագայում պարզ կլինի' },
      { key: 'C', es: 'No me digas', am: 'Չես ասի՜' },
      { key: 'D', es: 'Qué va', am: 'Ի՞նչ ես ասում / Ամենևին' },
    ],
    correctKey: 'B',
    explanationAm: '«Ya veremos» նշանակում է «Կտեսնենք / Ժամանակը ցույց կտա», երբ ծրագրերը դեռ վերջնական որոշված չեն:',
    explanationEs: '«Ya veremos» indica duda o que se tomará la decisión más adelante.',
    prizeAmount: '30,000 ֏',
  },
  {
    id: 10,
    part: 2,
    partTitleEs: 'Planes y decisiones',
    partTitleAm: 'Ծրագրեր և որոշումներ',
    topicEs: 'Dos posibilidades',
    topicAm: 'Երկու հնարավորություն',
    dialogue: {
      speakerA: {
        es: '¿Es mejor viajar en tren o en avión?',
        am: 'Ավելի լա՞վ է ճանապարհորդել գնացքով, թե՞ ինքնաթիռով։',
      },
      speakerB: {
        es: '_____ de la distancia y del precio.',
        esCompleted: 'Depende de la distancia y del precio.',
        am: 'Կախված է հեռավորությունից և գնից։',
      },
    },
    options: [
      { key: 'A', es: 'Dependo', am: 'ես եմ կախված' },
      { key: 'B', es: 'Dependen', am: 'նրանք են կախված' },
      { key: 'C', es: 'Depende', am: 'կախված է (3-րդ դեմք)' },
      { key: 'D', es: 'Dependemos', am: 'մենք ենք կախված' },
    ],
    correctKey: 'C',
    explanationAm: '«Depende de...» նշանակում է «կախված է ...-ից»: Ընդհանուր իրավիճակներում գործածվում է անդեմ 3-րդ դեմքով:',
    explanationEs: '«Depende de...» se usa en tercera persona impersonal para expresar que algo está condicionado por factores externos.',
    prizeAmount: '40,000 ֏',
  },
  {
    id: 11,
    part: 2,
    partTitleEs: 'Planes y decisiones',
    partTitleAm: 'Ծրագրեր և որոշումներ',
    topicEs: 'Llevar algo necesario',
    topicAm: 'Անհրաժեշտ իր վերցնել',
    dialogue: {
      speakerA: {
        es: '¿Por qué llevas una chaqueta? Hace calor.',
        am: 'Ինչո՞ւ ես բաճկոն վերցնում։ Շոգ է։',
      },
      speakerB: {
        es: 'La llevo _____ acaso.',
        esCompleted: 'La llevo por si acaso.',
        am: 'Ամեն դեպքում վերցնում եմ։',
      },
    },
    options: [
      { key: 'A', es: 'para si', am: 'սխալ նախդիր' },
      { key: 'B', es: 'por si', am: 'ամեն դեպքում (por si acaso)' },
      { key: 'C', es: 'porque si', am: 'ուղղակի այդպես' },
      { key: 'D', es: 'desde si', am: 'սխալ ձև' },
    ],
    correctKey: 'B',
    explanationAm: '«Por si acaso» կայուն դարձվածք է, որը նշանակում է «ամեն դեպքում / ինչ լինի՝ չլինի / ապահովության համար»:',
    explanationEs: '«Por si acaso» es una locución fija que expresa precaución ante una posible eventualidad.',
    prizeAmount: '50,000 ֏',
  },
  {
    id: 12,
    part: 2,
    partTitleEs: 'Planes y decisiones',
    partTitleAm: 'Ծրագրեր և որոշումներ',
    topicEs: 'Una propuesta interesante',
    topicAm: 'Հետաքրքիր առաջարկ',
    dialogue: {
      speakerA: {
        es: '¿Qué te parece si pasamos el domingo en familia?',
        am: 'Ի՞նչ կասես, եթե կիրակին անցկացնենք ընտանիքով։',
      },
      speakerB: {
        es: '¡_____! Me parece una idea estupenda.',
        esCompleted: '¡Hecho! Me parece una idea estupenda.',
        am: 'Պայմանավորվեցինք։ Կարծում եմ՝ հիանալի գաղափար է։',
      },
    },
    options: [
      { key: 'A', es: 'Hecho', am: 'Պայմանավորվեցինք / Եղավ' },
      { key: 'B', es: 'Qué pena', am: 'Ի՜նչ ափսոս' },
      { key: 'C', es: 'Ni hablar', am: 'Խոսք անգամ չի կարող լինել' },
      { key: 'D', es: 'No me digas', am: 'Չես ասի՜' },
    ],
    correctKey: 'A',
    explanationAm: '«¡Hecho!» (բառացի՝ արված է) նշանակում է «Պայմանավորվեցինք / Խոսքը գործ է» առաջարկն ընդունելիս:',
    explanationEs: '«¡Hecho!» se dice para aceptar un trato, una apuesta o una propuesta con entusiasmo.',
    prizeAmount: '65,000 ֏',
    isMilestone: true,
  },

  // --- Parte 3: Emociones y sentimientos ---
  {
    id: 13,
    part: 3,
    partTitleEs: 'Emociones y sentimientos',
    partTitleAm: 'Զգացմունքներ',
    topicEs: 'Mucho trabajo',
    topicAm: 'Շատ աշխատանք',
    dialogue: {
      speakerA: {
        es: '¿Cómo estás después de trabajar diez horas?',
        am: 'Ինչպե՞ս ես քեզ զգում տասը ժամ աշխատելուց հետո։',
      },
      speakerB: {
        es: 'Estoy hecho _____.',
        esCompleted: 'Estoy hecho polvo.',
        am: 'Ամբողջովին ուժասպառ եմ։',
      },
    },
    options: [
      { key: 'A', es: 'piedra', am: 'քար' },
      { key: 'B', es: 'polvo', am: 'փոշի (hecho polvo = ուժասպառ)' },
      { key: 'C', es: 'ganas', am: 'ցանկություններ' },
      { key: 'D', es: 'caso', am: 'դեպք' },
    ],
    correctKey: 'B',
    explanationAm: '«Estar hecho polvo» (բառացի՝ փոշի դարձած լինել) նշանակում է «ծայրաստիճան հոգնած կամ ուժասպառ լինել»:',
    explanationEs: '«Estar hecho polvo» significa estar extremadamente agotado física o anímicamente.',
    prizeAmount: '80,000 ֏',
  },
  {
    id: 14,
    part: 3,
    partTitleEs: 'Emociones y sentimientos',
    partTitleAm: 'Զգացմունքներ',
    topicEs: 'Cansado de esperar',
    topicAm: 'Սպասելուց հոգնած',
    dialogue: {
      speakerA: {
        es: '¿Por qué estás tan enfadado?',
        am: 'Ինչո՞ւ ես այդքան բարկացած։',
      },
      speakerB: {
        es: 'Estoy harto _____ esperar.',
        esCompleted: 'Estoy harto de esperar.',
        am: 'Արդեն զզվել եմ սպասելուց։',
      },
    },
    options: [
      { key: 'A', es: 'por', am: 'համար / պատճառով' },
      { key: 'B', es: 'para', am: 'համար' },
      { key: 'C', es: 'de', am: '(estar harto de = հոգնել մի բանից)' },
      { key: 'D', es: 'a', am: 'դեպի' },
    ],
    correctKey: 'C',
    explanationAm: '«Estar harto de + գոյական / բայ» կառույցն է. «de» նախդիրն է պահանջում (Estoy harto de esperar = Զզվել եմ սպասելուց):',
    explanationEs: 'El adjetivo «harto» siempre rige la preposición «de»: «estar harto de algo/hacer algo».',
    prizeAmount: '100,000 ֏',
  },
  {
    id: 15,
    part: 3,
    partTitleEs: 'Emociones y sentimientos',
    partTitleAm: 'Զգացմունքներ',
    topicEs: 'Una noticia sorprendente',
    topicAm: 'Զարմանալի լուր',
    dialogue: {
      speakerA: {
        es: '¿Cómo reaccionaste cuando te contó la verdad?',
        am: 'Ինչպե՞ս արձագանքեցիր, երբ նա քեզ ասաց ճշմարտությունը։',
      },
      speakerB: {
        es: 'Me quedé de _____.',
        esCompleted: 'Me quedé de piedra.',
        am: 'Զարմանքից քարացա։',
      },
    },
    options: [
      { key: 'A', es: 'piedra', am: 'քար (quedarse de piedra = քարանալ)' },
      { key: 'B', es: 'polvo', am: 'փոշի' },
      { key: 'C', es: 'miedo', am: 'վախ' },
      { key: 'D', es: 'suerte', am: 'հաջողություն' },
    ],
    correctKey: 'A',
    explanationAm: '«Quedarse de piedra» իդիոմ է, որը նշանակում է շոկից կամ մեծ զարմանքից «քար կտրել / քարանալ»:',
    explanationEs: '«Quedarse de piedra» significa quedarse paralizado por la sorpresa o el asombro.',
    prizeAmount: '125,000 ֏',
  },
  {
    id: 16,
    part: 3,
    partTitleEs: 'Emociones y sentimientos',
    partTitleAm: 'Զգացմունքներ',
    topicEs: 'Un viaje cancelado',
    topicAm: 'Չեղարկված ճանապարհորդություն',
    dialogue: {
      speakerA: {
        es: 'No podemos viajar mañana. Han cancelado el vuelo.',
        am: 'Վաղը չենք կարող ճանապարհորդել։ Թռիչքը չեղարկվել է։',
      },
      speakerB: {
        es: '¡Qué _____! Tenía muchas ganas de viajar.',
        esCompleted: '¡Qué pena! Tenía muchas ganas de viajar.',
        am: 'Ի՜նչ ափսոս։ Շատ էի ուզում ճանապարհորդել։',
      },
    },
    options: [
      { key: 'A', es: 'fuerte', am: 'ցնցող' },
      { key: 'B', es: 'guay', am: 'հիանալի' },
      { key: 'C', es: 'pena', am: 'ափսոսանք (¡Qué pena! = Ի՜նչ ափսոս)' },
      { key: 'D', es: 'bien', am: 'լավ' },
    ],
    correctKey: 'C',
    explanationAm: '«¡Qué pena!» արտահայտությունն օգտագործվում է ափսոսանք կամ տխրություն հայտնելիս («Ի՜նչ ափսոս / Ի՜նչ ցավալի է»):',
    explanationEs: '«¡Qué pena!» sirve para expresar lástima o desilusión ante una mala noticia.',
    prizeAmount: '150,000 ֏',
  },
  {
    id: 17,
    part: 3,
    partTitleEs: 'Emociones y sentimientos',
    partTitleAm: 'Զգացմունքներ',
    topicEs: 'Llegar a tiempo',
    topicAm: 'Ժամանակին հասնել',
    dialogue: {
      speakerA: {
        es: '¡Hemos llegado cinco minutos antes de que empezara la película!',
        am: 'Հասանք ֆիլմի սկսվելուց հինգ րոպե առաջ։',
      },
      speakerB: {
        es: '¡_____ mal! Pensaba que llegaríamos tarde.',
        esCompleted: '¡Menos mal! Pensaba que llegaríamos tarde.',
        am: 'Լավ է, որ հասցրինք։ Կարծում էի՝ կուշանանք։',
      },
    },
    options: [
      { key: 'A', es: 'Mucho', am: 'շատ' },
      { key: 'B', es: 'Menos', am: 'պակաս (¡Menos mal! = բարեբախտաբար / լավ է, որ)' },
      { key: 'C', es: 'Poco', am: 'քիչ' },
      { key: 'D', es: 'Bastante', am: 'բավականին' },
    ],
    correctKey: 'B',
    explanationAm: '«¡Menos mal!» նշանակում է «Լավ է, որ... / Բարեբախտաբար / Փառք Աստծո»՝ թեթևացման զգացում արտահայտելու համար:',
    explanationEs: '«¡Menos mal!» expresa alivio porque una situación temida no ha ocurrido.',
    prizeAmount: '200,000 ֏',
  },
  {
    id: 18,
    part: 3,
    partTitleEs: 'Emociones y sentimientos',
    partTitleAm: 'Զգացմունքներ',
    topicEs: 'Las ganas de descansar',
    topicAm: 'Հանգստանալու ցանկություն',
    dialogue: {
      speakerA: {
        es: '¿Qué te gustaría hacer este fin de semana?',
        am: 'Ի՞նչ կցանկանայիր անել այս շաբաթավերջին։',
      },
      speakerB: {
        es: 'Tengo ganas _____ descansar y pasar tiempo con mi familia.',
        esCompleted: 'Tengo ganas de descansar y pasar tiempo con mi familia.',
        am: 'Ուզում եմ հանգստանալ և ժամանակ անցկացնել ընտանիքիս հետ։',
      },
    },
    options: [
      { key: 'A', es: 'por', am: 'համար' },
      { key: 'B', es: 'para', am: 'նպատակով' },
      { key: 'C', es: 'de', am: '(tener ganas de = ցանկություն ունենալ)' },
      { key: 'D', es: 'en', am: 'մեջ' },
    ],
    correctKey: 'C',
    explanationAm: '«Tener ganas de + infinitivo» նշանակում է «մի բան անելու ցանկություն / հավես ունենալ»: Միշտ պահանջում է «de»:',
    explanationEs: 'La expresión idiomática es «tener ganas de + infinitivo/sustantivo».',
    prizeAmount: '250,000 ֏',
    isMilestone: true,
  },

  // --- Parte 4: Hablar con naturalidad ---
  {
    id: 19,
    part: 4,
    partTitleEs: 'Hablar con naturalidad',
    partTitleAm: 'Բնական խոսակցություն',
    topicEs: 'Una explicación',
    topicAm: 'Բացատրություն',
    dialogue: {
      speakerA: {
        es: '¿Por qué no viniste ayer?',
        am: 'Ինչո՞ւ երեկ չեկար։',
      },
      speakerB: {
        es: '_____ tuve muchísimo trabajo.',
        esCompleted: 'Es que tuve muchísimo trabajo.',
        am: 'Բանն այն է, որ շատ աշխատանք ունեի։',
      },
    },
    options: [
      { key: 'A', es: 'Es que', am: 'Բանն այն է, որ / Պարզապես' },
      { key: 'B', es: 'Lo que', am: 'Այն, ինչ' },
      { key: 'C', es: 'El que', am: 'Նա, ով' },
      { key: 'D', es: 'Por que', am: 'Որովհետև' },
    ],
    correctKey: 'A',
    explanationAm: '«Es que...» իսպաներենում ամենաբնական ձևն է բացատրություն կամ արդարացում սկսելու համար («Բանն այն է, որ... / Պարզապես...»):',
    explanationEs: '«Es que...» se utiliza habitualmente para introducir una justificación, excusa o explicación espontánea.',
    prizeAmount: '300,000 ֏',
  },
  {
    id: 20,
    part: 4,
    partTitleEs: 'Hablar con naturalidad',
    partTitleAm: 'Բնական խոսակցություն',
    topicEs: 'Aclarar una idea',
    topicAm: 'Միտքը պարզաբանել',
    dialogue: {
      speakerA: {
        es: '_____, ¿quieres decir que no estás de acuerdo conmigo?',
        esCompleted: 'O sea, ¿quieres decir que no estás de acuerdo conmigo?',
        am: 'Այսինքն՝ ուզում ես ասել, որ ինձ հետ համաձայն չե՞ս։',
      },
      speakerB: {
        es: 'Exactamente.',
        esCompleted: 'Exactamente.',
        am: 'Ճիշտ այդպես։',
      },
    },
    options: [
      { key: 'A', es: 'O sea', am: 'Այսինքն / Այլ խոսքով' },
      { key: 'B', es: 'Por si acaso', am: 'Ամեն դեպքում' },
      { key: 'C', es: 'Menos mal', am: 'Բարեբախտաբար' },
      { key: 'D', es: 'Ni hablar', am: 'Խոսք անգամ չի կարող լինել' },
    ],
    correctKey: 'A',
    explanationAm: '«O sea» նշանակում է «այսինքն / այլ կերպ ասած» և գործածվում է միտքը ճշտելու կամ վերաձևակերպելու համար:',
    explanationEs: '«O sea» es un conector discursivo equivalente a «es decir», usado para reformular o aclarar.',
    prizeAmount: '350,000 ֏',
  },
  {
    id: 21,
    part: 4,
    partTitleEs: 'Hablar con naturalidad',
    partTitleAm: 'Բնական խոսակցություն',
    topicEs: 'Una opinión sincera',
    topicAm: 'Անկեղծ կարծիք',
    dialogue: {
      speakerA: {
        es: '¿Te ha gustado el restaurante?',
        am: 'Ռեստորանը քեզ դո՞ւր եկավ։',
      },
      speakerB: {
        es: 'La _____ es que esperaba algo mejor.',
        esCompleted: 'La verdad es que esperaba algo mejor.',
        am: 'Ճիշտն ասած՝ ավելի լավ բան էի սպասում։',
      },
    },
    options: [
      { key: 'A', es: 'razón', am: 'պատճառ' },
      { key: 'B', es: 'verdad', am: 'ճշմարտություն (La verdad es que = Ճիշտն ասած)' },
      { key: 'C', es: 'gana', am: 'ցանկություն' },
      { key: 'D', es: 'idea', am: 'գաղափար' },
    ],
    correctKey: 'B',
    explanationAm: '«La verdad es que...» կառույցը թարգմանվում է «Ճիշտն ասած / Անկեղծ ասած...» և օգտագործվում է անկեղծ կարծիք հայտնելիս:',
    explanationEs: '«La verdad es que...» introduce una confesión o una opinión sincera y directa.',
    prizeAmount: '400,000 ֏',
  },
  {
    id: 22,
    part: 4,
    partTitleEs: 'Hablar con naturalidad',
    partTitleAm: 'Բնական խոսակցություն',
    topicEs: 'Empezar una explicación',
    topicAm: 'Սկսել բացատրությունը',
    dialogue: {
      speakerA: {
        es: 'No entiendo por qué tomaste esa decisión.',
        am: 'Չեմ հասկանում, թե ինչու այդ որոշումը կայացրիր։',
      },
      speakerB: {
        es: '_____, te voy a explicar lo que pasó.',
        esCompleted: 'A ver, te voy a explicar lo que pasó.',
        am: 'Դե տեսնենք, հիմա կբացատրեմ՝ ինչ պատահեց։',
      },
    },
    options: [
      { key: 'A', es: 'A ver', am: 'Դե տեսնենք / Եկ նայենք' },
      { key: 'B', es: 'Qué pena', am: 'Ի՜նչ ափսոս' },
      { key: 'C', es: 'Menos mal', am: 'Բարեբախտաբար' },
      { key: 'D', es: 'Por si acaso', am: 'Ամեն դեպքում' },
    ],
    correctKey: 'A',
    explanationAm: '«A ver...» խոսակցական ներածական արտահայտություն է («Դե տեսնենք / Մի րոպե»), որով հաճախ սկսում են հանգամանալից բացատրությունը:',
    explanationEs: '«A ver» se usa para captar la atención antes de empezar a explicar o mostrar algo.',
    prizeAmount: '500,000 ֏',
  },
  {
    id: 23,
    part: 4,
    partTitleEs: 'Hablar con naturalidad',
    partTitleAm: 'Բնական խոսակցություն',
    topicEs: 'Cambiar de opinión',
    topicAm: 'Կարծիքը փոխել',
    dialogue: {
      speakerA: {
        es: '¿Sigues pensando que es una mala idea?',
        am: 'Դեռ կարծում ե՞ս, որ դա վատ գաղափար է։',
      },
      speakerB: {
        es: '_____, ahora lo veo de otra manera.',
        esCompleted: 'Pues no, ahora lo veo de otra manera.',
        am: 'Դե, հիմա դրան այլ կերպ եմ նայում։',
      },
    },
    options: [
      { key: 'A', es: 'Ni hablar', am: 'Խոսք անգամ չի կարող լինել' },
      { key: 'B', es: 'Pues no', am: 'Դե ոչ / Դե այնքան էլ չէ' },
      { key: 'C', es: 'Qué rollo', am: 'Ի՜նչ ձանձրալի է' },
      { key: 'D', es: 'Por si acaso', am: 'Ամեն դեպքում' },
    ],
    correctKey: 'B',
    explanationAm: '«Pues no» արտահայտությունը նշանակում է «Դե ոչ / Իրականում ոչ»՝ նախորդ կարծիքը բնականորեն հերքելու կամ փոփոխությունը նշելու համար:',
    explanationEs: '«Pues no» sirve para negar de forma natural y coloquial, matizando la respuesta anterior.',
    prizeAmount: '600,000 ֏',
  },
  {
    id: 24,
    part: 4,
    partTitleEs: 'Hablar con naturalidad',
    partTitleAm: 'Բնական խոսակցություն',
    topicEs: 'Animar a un amigo',
    topicAm: 'Քաջալերել ընկերոջը',
    dialogue: {
      speakerA: {
        es: 'No sé si podré aprobar el examen.',
        am: 'Չգիտեմ՝ կկարողանա՞մ հանձնել քննությունը։',
      },
      speakerB: {
        es: '¡_____! ¡Tú puedes!',
        esCompleted: '¡Venga! ¡Tú puedes!',
        am: 'Դե՛, դու կարող ես։',
      },
    },
    options: [
      { key: 'A', es: 'Qué pena', am: 'Ի՜նչ ափսոս' },
      { key: 'B', es: 'Venga', am: 'Դե՛ / Առա՛ջ' },
      { key: 'C', es: 'Ni hablar', am: 'Խոսք անգամ չի կարող լինել' },
      { key: 'D', es: 'Qué rollo', am: 'Ի՜նչ ձանձրալի է' },
    ],
    correctKey: 'B',
    explanationAm: '«¡Venga!» իսպաներենում շատ տարածված բացականչություն է ընկերոջը քաջալերելու («Դե՛ / Առա՛ջ / Դու կարո՛ղ ես»):',
    explanationEs: '«¡Venga!» es una interjección muy común para dar ánimos y motivación a otra persona.',
    prizeAmount: '700,000 ֏',
    isMilestone: true,
  },

  // --- Parte 5: Situaciones reales B2 ---
  {
    id: 25,
    part: 5,
    partTitleEs: 'Situaciones reales B2',
    partTitleAm: 'Իրական իրավիճակներ',
    topicEs: 'Un cambio de planes',
    topicAm: 'Ծրագրերի փոփոխություն',
    dialogue: {
      speakerA: {
        es: '¿Por qué habéis decidido quedaros en casa?',
        am: 'Ինչո՞ւ որոշեցիք տանը մնալ։',
      },
      speakerB: {
        es: 'Después de pensarlo mucho, acabamos _____ cancelar el viaje.',
        esCompleted: 'Después de pensarlo mucho, acabamos por cancelar el viaje.',
        am: 'Երկար մտածելուց հետո ի վերջո չեղարկեցինք ճանապարհորդությունը։',
      },
    },
    options: [
      { key: 'A', es: 'de', am: '(acabar de = հենց նոր անել)' },
      { key: 'B', es: 'a', am: 'սխալ նախդիր' },
      { key: 'C', es: 'por', am: '(acabar por + infinitivo = ի վերջո անել)' },
      { key: 'D', es: 'para', am: 'համար' },
    ],
    correctKey: 'C',
    explanationAm: '«Acabar por + infinitivo» նշանակում է «ի վերջո / երկար տատանումներից հետո անել մի բան»: Ուշադրություն. «acabar de» նշանակում է «հենց նոր անել»:',
    explanationEs: '«Acabar por + infinitivo» indica el desenlace final tras un proceso o deliberación.',
    prizeAmount: '750,000 ֏',
  },
  {
    id: 26,
    part: 5,
    partTitleEs: 'Situaciones reales B2',
    partTitleAm: 'Իրական իրավիճակներ',
    topicEs: 'Una reacción inesperada',
    topicAm: 'Անսպասելի արձագանք',
    dialogue: {
      speakerA: {
        es: '¿Qué hizo Marta cuando escuchó la noticia?',
        am: 'Ի՞նչ արեց Մարտան, երբ լսեց լուրը։',
      },
      speakerB: {
        es: 'Se echó _____ llorar.',
        esCompleted: 'Se echó a llorar.',
        am: 'Հանկարծ սկսեց լաց լինել։',
      },
    },
    options: [
      { key: 'A', es: 'de', am: 'սխալ նախդիր' },
      { key: 'B', es: 'a', am: '(echarse a + infinitivo = հանկարծ սկսել)' },
      { key: 'C', es: 'por', am: 'պատճառով' },
      { key: 'D', es: 'en', am: 'մեջ' },
    ],
    correctKey: 'B',
    explanationAm: '«Echarse a + infinitivo» (օր.՝ echarse a llorar / reír) պերիֆրազ է, որը նշանակում է «հանկարծակի, բուռն կերպով սկսել մի բան անել»:',
    explanationEs: 'La perífrasis «echarse a + infinitivo» denota el inicio repentino de una acción emocional.',
    prizeAmount: '800,000 ֏',
  },
  {
    id: 27,
    part: 5,
    partTitleEs: 'Situaciones reales B2',
    partTitleAm: 'Իրական իրավիճակներ',
    topicEs: 'Una actividad nueva',
    topicAm: 'Նոր գործողություն',
    dialogue: {
      speakerA: {
        es: '¿Qué hiciste después de llegar a casa?',
        am: 'Ի՞նչ արեցիր տուն հասնելուց հետո։',
      },
      speakerB: {
        es: 'Me puse _____ preparar la cena.',
        esCompleted: 'Me puse a preparar la cena.',
        am: 'Սկսեցի ընթրիք պատրաստել։',
      },
    },
    options: [
      { key: 'A', es: 'por', am: 'պատճառով' },
      { key: 'B', es: 'de', am: '-ից' },
      { key: 'C', es: 'a', am: '(ponerse a + infinitivo = գործի անցնել / սկսել)' },
      { key: 'D', es: 'con', am: 'հետ' },
    ],
    correctKey: 'C',
    explanationAm: '«Ponerse a + infinitivo» նշանակում է «սկսել գործողությունը / անցնել գործի»: Պահանջում է «a» նախդիրը:',
    explanationEs: '«Ponerse a + infinitivo» expresa el inicio voluntario de una actividad.',
    prizeAmount: '850,000 ֏',
  },
  {
    id: 28,
    part: 5,
    partTitleEs: 'Situaciones reales B2',
    partTitleAm: 'Իրական իրավիճակներ',
    topicEs: 'Un logro personal',
    topicAm: 'Անձնական ձեռքբերում',
    dialogue: {
      speakerA: {
        es: '¿Cómo consiguió hablar español tan bien?',
        am: 'Ինչպե՞ս կարողացավ այդքան լավ իսպաներեն խոսել։',
      },
      speakerB: {
        es: 'Después de muchos años de práctica, llegó _____ hablar con mucha fluidez.',
        esCompleted: 'Después de muchos años de práctica, llegó a hablar con mucha fluidez.',
        am: 'Երկար տարիների փորձից հետո հասավ նրան, որ սկսեց շատ սահուն խոսել։',
      },
    },
    options: [
      { key: 'A', es: 'de', am: '-ից' },
      { key: 'B', es: 'por', am: 'պատճառով' },
      { key: 'C', es: 'a', am: '(llegar a + infinitivo = հասնել նրան, որ...)' },
      { key: 'D', es: 'para', am: 'համար' },
    ],
    correctKey: 'C',
    explanationAm: '«Llegar a + infinitivo» նշանակում է ջանքերի շնորհիվ «հասնել արդյունքի / հաջողել մի բան անել»:',
    explanationEs: '«Llegar a + infinitivo» indica la culminación o consecución de un logro tras esfuerzo.',
    prizeAmount: '900,000 ֏',
  },
  {
    id: 29,
    part: 5,
    partTitleEs: 'Situaciones reales B2',
    partTitleAm: 'Իրական իրավիճակներ',
    topicEs: 'Algo que acaba de pasar',
    topicAm: 'Քիչ առաջ կատարված իրադարձություն',
    dialogue: {
      speakerA: {
        es: '¿Dónde está tu hermano?',
        am: 'Որտե՞ղ է եղբայրդ։',
      },
      speakerB: {
        es: 'Acaba _____ salir.',
        esCompleted: 'Acaba de salir.',
        am: 'Նա հենց նոր դուրս եկավ։',
      },
    },
    options: [
      { key: 'A', es: 'a', am: 'սխալ նախդիր' },
      { key: 'B', es: 'por', am: 'ի վերջո' },
      { key: 'C', es: 'para', am: 'համար' },
      { key: 'D', es: 'de', am: '(acabar de + infinitivo = հենց նոր անել)' },
    ],
    correctKey: 'D',
    explanationAm: '«Acabar de + infinitivo» նշանակում է «հենց նոր, քիչ առաջ կատարել գործողությունը» (Acaba de salir = Հենց նոր դուրս եկավ):',
    explanationEs: '«Acabar de + infinitivo» expresa una acción completada en el pasado muy reciente.',
    prizeAmount: '950,000 ֏',
  },
  {
    id: 30,
    part: 5,
    partTitleEs: 'Situaciones reales B2',
    partTitleAm: 'Իրական իրավիճակներ',
    topicEs: 'Una conversación sobre el pasado',
    topicAm: 'Զրույց անցյալի մասին',
    dialogue: {
      speakerA: {
        es: '¿Ya habías cenado cuando te llamó tu amigo?',
        am: 'Արդեն ընթրե՞լ էիր, երբ ընկերդ զանգեց։',
      },
      speakerB: {
        es: 'Sí, acababa _____ cenar cuando sonó el teléfono.',
        esCompleted: 'Sí, acababa de cenar cuando sonó el teléfono.',
        am: 'Այո, հենց նոր էի ընթրել, երբ հեռախոսը զանգեց։',
      },
    },
    options: [
      { key: 'A', es: 'por', am: 'ի վերջո' },
      { key: 'B', es: 'a', am: 'սխալ նախդիր' },
      { key: 'C', es: 'de', am: '(acababa de + infinitivo = հենց նոր էի արել)' },
      { key: 'D', es: 'para', am: 'համար' },
    ],
    correctKey: 'C',
    explanationAm: 'Անցյալում կատարված անմիջական գործողության համար օգտագործվում է «acababa de + infinitivo» (հենց նոր էի ընթրել):',
    explanationEs: '«Acabar de + infinitivo» en imperfecto sitúa la acción inmediatamente antes de otro evento pasado.',
    prizeAmount: '1,000,000 ֏ 🏆',
    isMilestone: true,
  },
];

/**
 * Oral Practice bonus dialogue from prompt
 */
export const ORAL_PRACTICE_SAMPLE = {
  titleEs: 'Práctica oral — Բանավոր խոսքի զարգացում',
  descriptionAm: 'Երբ աշակերտը պատասխանի բոլոր 30 հարցերին, առաջարկվում է շարունակել երկխոսությունը՝ յուրաքանչյուր պատասխանից հետո տալով լրացուցիչ հարցեր։',
  lines: [
    {
      speaker: '🇪🇸 A',
      es: 'Estoy hecho polvo.',
      am: 'Ես ամբողջովին ուժասպառ եմ։',
    },
    {
      speaker: '🇪🇸 B',
      es: '¿Por qué? ¿Has trabajado mucho hoy?',
      am: 'Ինչո՞ւ։ Այսօր շա՞տ ես աշխատել։',
    },
    {
      speaker: '🇪🇸 A',
      es: 'Sí, llevo trabajando desde las ocho de la mañana.',
      am: 'Այո, առավոտյան ժամը ութից աշխատում եմ։',
    },
    {
      speaker: '🇪🇸 B',
      es: '¡Madre mía! ¿Y qué vas a hacer ahora?',
      am: 'Վա՜յ։ Իսկ հիմա ի՞նչ ես անելու։',
    },
  ],
};
