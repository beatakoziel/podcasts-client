const state = {
  podcasts: [{
      imagePath: "https://images.unsplash.com/photo-1527788263495-3518a5c1c42d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1083&q=80",
      title: "Pieniądze a władza",
      description: "Pierwszy tak dokładny podcast, który pokazuje słabości ludzi bogatych.",
      category: 'money'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      title: "Jak zostać królem?",
      description: "Kolejny podcast z serii 'Jak zostać królem własnego losu?'. Polecany dla amatorów sukcesu.",
      category: 'mindset'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "Wiosenny ogród",
      description: "Co sadzić i siać, gdy przychodzi wiosna?",
      category: 'garden'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1560285843-9d9d94edff8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "Pozytywne myślenie",
      description: "Jak wzbudzić wokół siebie pozytywne wibracje i zaakceptować zmiany?",
      category: 'mindset'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1445633743309-b60418bedbf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      title: "Rodzic czy kolega?",
      description: "Jak poradzić sobie z trudami rodzicielstwa? Odpowiedzi na pytania czytelników.",
      category: 'parent'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1528092744838-b91de0a10615?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "Zasady ogrodnika",
      description: "Wraz z wiosną odkrywamy nowe pasje. Zapraszamy tych, którzy zajęli się ogrodnictwem.",
      category: 'garden'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1512474331201-782fc6a4ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "Książkowy rozum",
      description: "Jak książki kreują nasze spojrzenie na świat? Przewaga książek nad telewizją.",
      category: 'mindset'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1485783522162-1dbb8ffcbe5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80",
      title: "Bunt trzylatka",
      description: "W rozmowie z psychologiem dr Anną Maj dowiesz się jak radzić sobie z niesfornym 3-latkiem.",
      category: 'parent'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1522410818928-5522dacd5066?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "Znajdź sobie hobby",
      description: "O tym jak ważne jest hobby w rozwoju samego siebie i relacjach z innymi.",
      category: 'mindset'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "Rośliny doniczkowe",
      description: "Jak dbać o rośliny doniczkowe, tak by jak najdłużej cieszyły oczy?",
      category: 'garden'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1475137979732-b349acb6b7e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "Zabójcze myślenie",
      description: "Jak panować nad własnymi myślami i emocjami, tak by się w nich nie zatracić?",
      category: 'mindset'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1486591038957-19e7c73bdc41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "Odpocznij sobie",
      description: "Rola odpoczynku przy codziennym biegu po marzenia.",
      category: 'mindset'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1444392061186-9fc38f84f726?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80",
      title: "Aranżacja ogrodu",
      description: "Jak rozplanować ogród, aby efekt końcowy nie mijał sie z wyobrażeniami?",
      category: 'garden'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1489702932289-406b7782113c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80",
      title: "Młody talent",
      description: "Jak rozpoznać przejawy zainteresowania u dziecka i co z tym zrobić?",
      category: 'parent'
    },
    {
      imagePath: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      title: "Grosz do grosza",
      description: "O tym jak uzbierać na swój cel - sprawdzone metody.",
      category: 'money'
    }
  ]
};

const getters = {
  podcasts(state) {
    return state.podcasts;
  }
};

export default {
  state,
  getters
};
