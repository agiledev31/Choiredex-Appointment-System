/** @format */

const translations = {
  general: {
    or: "ou",
    name: "nom",
    required: "requis",
    cancel: "canceller",
    add: "ajouter",
    added: "ajouté",
    actions: "actions",
    edit: "editer",
    delete: "effacer",
    deleteConfirmation: "êtes-vous certain de vouloir l'effacer?",
    deleted: "éffacé",
    update: "mettre à jour",
    updated: "mis à jour",
    firstName: "prénom",
    lastName: "nom",
    optional: "optionnel",
    more: "plus",
    blank: "laisser vide",
    metric: {
      distanceAcronym: "km",
    },
    imperial: {
      distanceAcronym: "milles",
    },
    time: {
      hours: "heures",
      minutes: "minutes",
      seconds: "secondes",
      days: "jours",
      milliseconds: "millisecondes",
      months: "mois",
      years: "années",
    },
  },
  recover: {
    invalid: "token invalide",
    missing: "token manquant",
    version: "version {version} invalide",
    title: "vous avez déjà un rendez-vous",
    send: "récupérez votre rendez-vous",
    description: "remplissez ce formulaire si vous avez déjà un rendez-vous",
    maybe:
      "si un rendez-vous lié à votre e-mail ou/et à votre numéro de téléphone, vous allez recevoir un lien pour continuer",
    welcome: "VOUS AVEZ DÉJÀ RENDEZ-VOUS",
  },
  select: {
    emptyResult: "Aucuns résultats dispobibles",
  },
  authentication: {
    username: "nom d'usager",
    password: "mot de passe",
    email: "e-mail",
    register: {
      duplicateEmail: "l'e-mail existe déjà",
      invalidEmail: "e-mail invalide",
      duplicateUsername: "le nom d'usager existe déjà",
      action: "s'enregistrer",
      result: "le compte à été créé",
    },
    login: {
      action: "connexion",
      result: "connecté",
      failure: "impossible de se connecter ",
    },
    logout: {
      action: "déconnexion",
      result: "déconnecté",
      expired: "session expirée",
    },
  },
  agent: {
    sectionDescription: "agent sous-section",
    attendance: {
      title: "présence",
      description: "entrée ou sortie des magasins",
      start: "commencer",
      end: "terminer",
      hold: "est en attente",
      location: "magasin",
      checkout: "sortie d'un magasin",
      checkinAction: "entrée dans un magasin",
      checkin: "entrée",
      checkincheckout: "entrée/sortie",
    },
  },
  operator: {
    sectionDescription: "opérateur sous-section",
    title: "opérateur",
  },
  settings: {
    invalidType: "configuration invalide",
    phone: "téléphone",
    instruction: "veuillez entrer vos coordonnées",
    languages: {
      title: "langues",
      description: "veuillez chosir votre langue de communication favorite",
      help: "vous pouvez choisir plusieurs langues et les triées dans l'ordre de priorité",
    },
    communications: {
      title: "communications",
    },
  },
  administration: {
    openDrawer: "ouvrir le tiroir",
    name: "nom",
    id: "id",
    description: "description",
    active: "active",
    eCommerce: {
      title: "eCommerce",
      description: "eCommerce",
      currencies: {
        title: "devise",
        description: "monnaie en cours légal",
        iso4217: "ISO code 4127",
        symbol: "symbole",
        duplicateName: "une devise avec le même nom existe déjà",
        duplicateCode: "une devise avec le même code existe déjà",
      },
      products: {
        title: "produits",
        description: "gérer la liste de produits",
        metadata: "metadata",
        duplicateName: "un produit avec le même nom existe déjà",
      },
      prices: {
        title: "prix",
        description: "gérer le prix des produits",
        duplicate: " un prix pour ce produit et cette devise existe déjà",
      },
      inventory: {
        title: "inventaire",
        description: "disponibilité des produits dans chaque magasin",
        stock: "inventaire",
        duplicate: "l'inventaire pour ce produit et ce magasin existe déjà",
      },
    },
    locations: {
      title: "emplacements",
      description: "gérer les emplacements de magasin",
      help: "vous pouvez en sélectionner plus d'un et choisir l'ordre de priorité",
      address: "adresse",
      position: "position",
      timezone: "fuseau horaire",
      offset: "délai",
      duplicateName: "un emplacement avec le même nom existe déjà",
      duplicateAddress: "un emplacement avec la même adresse existe déjà",
    },
    visitors: {
      title: "visiteurs",
      description: "gérer les visiteurs",
    },
    queues: {
      title: "files d'attente",
      description: "gérer les files d'attente",
      duplicate: "l'emplacement et le service sont déjà reliés",
    },
    languages: {
      title: "langues",
      description: "gérer les langues",
      isoCode: "code ISO 693-2 ",
      scripts: {
        item: "alphabet",
        title: "alphabets",
        description: "gérer l'alphabet",
        iso15924: "code ISO 15924",
      },
      duplicateActive: "une autre langues avec le même nom existe déjà",
      dupliateCode: "une autre langue avec le même code existe déjà",
    },
    countries: {
      item: "pays",
      title: "pays",
      description: "gérer les pays",
      iso3166: "code ISO 3166 ",
      callingCode: "code d'appel",
      duplicateName: "un autre pays avec le même nom existe déjà",
      duplicateIsoCode: "une autre pays avec le même code existe déjà",
      duplicateCode: "un autre pays avec le même code d'appel existe déjà",
      flag: "drapeau",
      invalidFlag: "il n'y a pas de drapeau pour ce pays {{iso3166}}",
      timezone: "fuseau horaire par défaut",
      phoneNumberFormat: "format de numéro de téléphone par défaut",
    },
    agents: {
      title: "agents",
      description: "gérer les agents",
      attendances: {
        title: "présence",
        description: "présence des agents",
        delete: "l'usager {{username}} à {{location}} commençant {{start}}",
        overlap: "une présence existe déjà pour cet agent",
      },
      users: {
        title: "utilisateurs",
        description: "utilisateurs avec le rôle d'agent",
        metadata: "métadata",
        alreadyExists: "l'utilisateur est déjà un agent",
      },
      locations: {
        alreadyAssigned: "l'agent est déjà assigné à cet emplacement",
      },
      services: {
        alreadyAssigned: "l'agent est déjà assigné à ce service",
      },
    },
    sectionDescription: "administration",
    actions: {
      title: "actions",
      description: "actions de l'infrastructure",
      sms: {
        title: "SMS",
        description: "SMS envoyé",
        message: "message",
      },
      creation: "création",
      email: {
        title: "courriel",
        description: "courriel envoyé",
        address: "adresse",
        message: "message",
        subject: "sujet",
      },
    },
    services: {
      title: "services",
      description: "gestion des services",
      imagePath: "'path' de l'image SVG",
      image: "image SVG",
      duplicateName: "un service avec le même nom existe déjà",
      duplicateDescription: "un service avec la même description existe déjà",
      duplicateImage: "un service avec la même image existe déjà",
      translations: {
        service: "service",
      },
    },
    translations: {
      title: "traductions",
      description: "traductions des nom et descriptions",
      language: "language",
    },
    authentication: {
      title: "authentification",
      description: "utilisateurs et rôles",
      roles: {
        title: "rôles",
        description: "gestion des rôles",
        duplicateName: "un autre role avec le même nom existe déjà",
        duplicateDescription:
          "un autre rôle avec la même description existe déjà",
      },
      users: {
        email: "courriel",
        title: "utilisateurs",
        description: "gestion d'utilisateurs",
      },
    },
  },
  infrastructure: {
    invalidRole: "role invalide",
    graphql: {
      permissionDenied: "permission refusée pour l'opération du serveur",
    },
  },
  welcome: "bienvenue à Choiredex",
  form: {
    next: "suivant",
    previous: "précédent",
  },
  appointment: {
    sectionDescription: "prendre un rendez-vous",
    services: {
      label: "services",
      title:
        "bienvenue, prenez un rendez-vous. Veuiller choisir le service que vous désirez aujourd'hui.",
    },
    type: {
      label: "type d'horaire",
      title: "veuillez choisir quand vous voulez prendre rendez-vous",
      now: "maintenant",
      later: "plus tard",
    },
    future: {
      label: "type de rendez-vous",
      title:
        "Voulez-prendre rendez-vous dans un shop en particulier ou à une heure précise?",
      byTime: "par heure",
      byLocation: "par shop",
      selectDay: {
        title: "Choix de l’heure",
      },
      selectHour: {
        title: "Choix du jour",
      },
    },
    locations: {
      book: "réserver pour maintenant (départ immédiat)",
      title: "Choix du shop",
      address:
        "veuiller entrer une adresse pour trouver les magasins que vous pouvez visiter le plus rapidement.",
      initialLocation: {
        geolocationTimeout:
          "impossible de trouver la position géo-localisée, ré-essayez",
        geolocationPermission:
          "géo-localisation non-authorisée, réessais avec une méthode moins précise",
        geolocationUnavailable:
          "impossible de trouver votre position géo-locatisée, réessais avec une méthode moins précise",
        googleMapsError: "impossible de trouver un lieux d'une prédiction",
        browserDetection: "utiliser ma position",
        address: "ville, adresse et code postal",
      },
      distance: {
        googleMapsError: "impossible de trouver un lieux d'une prédiction",
        googleMapsInvalidDistance:
          "impossible de calculer la distance d'une destination",
        googleMapsErrorLength:
          "impossible de trouver toute les distances des emplacements",
        unsupportedTravelMode:
          "le mode de transport choisit ne peux atteindre la destination",
      },
      meetingAt: "rencontre à {{ start }}",

      meetingEnd: "termine à {{ end }}",
    },
    registration: {
      title: "enregistrement",
      action: "enregistrez-vous maintenant",
      requiredField:
        "vous devez avoir un courriel et/ou un numéro de téléphone",
      message:
        "{{ name }}, nous confirmons votre rendez-vous {{ time }}, au {{ location }}, {{ address }}. Cliquer sur {{ url }}, pour être informé de tout délais, ou modifier votre rendez-vous.",
      subject: "rendez-vous Choiredex confirmé",
      recover: {
        message: {
          subject: "information sur le compte",
          /* eslint-disable-next-line no-template-curly-in-string */
          text: "Visitez le lien suivant {{ url }}/recover/${TOKEN} pour continuer votre session",
          /* eslint-disable-next-line no-template-curly-in-string */
          html: 'Visitez <a href="{{ url }}/recover/${TOKEN}">ce lien</a> pour continuer votre session',
        },
        ui: {
          title: "déjà enregistré",
          text: "nous avons trouvé un compte existant avec vos informations personnelles, un message a été envoyé à votre e-mail et votre téléphone, please click the provided link to resume the session",
        },
      },
    },
    status: {
      title: "visiter un magasin",
      description: "nous vous attendons!",
      thankyou: "merci pour votre patience!",
      cancel: "annuler mon rendez-vous",
      notification: {
        template: "Vous avez reçu un message à: {{destination}}",
        meeting: "Votre rendez-vous à {{location}} aujourd'hui à {{time}}",
        sms: "{{phoneNumber}} par SMS",
        email: "{{emailAddress}}",
      },
      position: {
        title: "votre position",
        format: "{{current}} de {{total}}",
      },
      time: {
        meetAt: "rencontre à",
        exitAt: "termine à",
        remaining: "temps avant la rencontre avec votre associé",
        service: "temps de service",
      },
    },
  },
};

export default translations;
