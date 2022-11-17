/** @format
 * @todo add lint/validation to have all strings as lowercase
 */

const translations = {
  general: {
    missingParameter: "missing paramater {{name}}",
    or: "or",
    name: "name",
    required: "Required",
    cancel: "Cancel",
    add: "Add",
    added: "Added",
    actions: "actions",
    edit: "edit",
    delete: "delete",
    deleteConfirmation: "Are you sure you want to delete?",
    deleted: "deleted",
    update: "update",
    updated: "updated",
    firstName: "First name",
    lastName: "Last name",
    optional: "Optional",
    more: "more",
    blank: "leave blank",
    metric: {
      distanceAcronym: "km",
    },
    imperial: {
      distanceAcronym: "miles",
    },
    time: {
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      days: "days",
      milliseconds: "milliseconds",
      months: "months",
      years: "years",
    },
  },
  recover: {
    invalid: "invalid token",
    missing: "missing token",
    version: "invalid version {version}",
    title: "already have an appointment",
    send: "recover apointment",
    description: "fill this form if you already have an appointment",
    maybe:
      "if an appointment exists for your email and/or phone number, you will receive a link to resume",
    welcome: "Welcome back",
  },
  select: {
    emptyResult: "No available results",
  },
  authentication: {
    username: "Username",
    password: "Password",
    email: "Email",
    register: {
      duplicateEmail: "Email already exists",
      invalidEmail: "Invalid email",
      duplicateUsername: "username already exists",
      action: "register",
      result: "account created",
    },
    login: {
      action: "login",
      result: "logged in",
      failure: "can't login",
    },
    logout: {
      action: "logout",
      result: "logged out",
      expired: "session expired",
    },
  },
  agent: {
    sectionDescription: "agent sub-section",
    attendance: {
      title: "attendance",
      description: "check-in or out of stores",
      start: "start",
      end: "end",
      hold: "is on hold",
      location: "shop",
      checkout: "checkout of a store",
      checkinAction: "check in a store",
      checkin: "check-in",
      checkincheckout: "check-in/check-out",
    },
  },
  operator: {
    sectionDescription: "aperator sub-section",
    title: "operator",
  },
  settings: {
    invalidType: "invalid type of settings",
    phone: "Phone number",
    instruction: "Please enter your contact information",
    languages: {
      title: "languages",
      description: "choose you prefered language for communication",
      help: "you can choose multiple languages and sort them in order",
    },
    communications: {
      title: "communications",
    },
  },
  administration: {
    openDrawer: "open drawer",
    name: "name",
    id: "id",
    description: "description",
    active: "active",
    eCommerce: {
      title: "eCommerce",
      description: "eCommerce",
      currencies: {
        title: "currency",
        description: "fiat currency",
        iso4217: "ISO 4127 code",
        symbol: "symbol",
        duplicateName: "currency with same name already exists",
        duplicateCode: "currency with same code already exists",
      },
      products: {
        title: "products",
        description: "manage product list",
        metadata: "metadata",
        duplicateName: "product with this name already exists",
      },
      prices: {
        title: "prices",
        description: "manage product prices",
        duplicate: "a price for this product and currency already exists",
      },
      inventory: {
        title: "inventory",
        description: "product availablity in each stores",
        stock: "stock",
        duplicate: "a stock for this product and location already exists",
      },
    },
    locations: {
      title: "locations",
      description: "manage store locations",
      help: "you can select more than one and choose and change the order of priority",
      address: "address",
      position: "position",
      timezone: "timezone",
      offset: "offset",
      duplicateName: "location with same name already exists",
      duplicateAddress: "location with same address already exists",
    },
    visitors: {
      title: "visitors",
      description: "manage visitors",
    },
    queues: {
      title: "queues",
      description: "manage queues",
      duplicate: "the location and service are already linked",
    },
    languages: {
      title: "languages",
      description: "manage human languages",
      isoCode: "ISO 693-2 code",
      scripts: {
        item: "script",
        title: "scripts",
        description: "manage human script",
        iso15924: "ISO 15924 code",
      },
      duplicateActive: "an other language with same name exists",
      dupliateCode: "an other language with same code exists",
    },
    countries: {
      item: "country",
      title: "countries",
      description: "manage countries",
      iso3166: "ISO 3166 Code",
      callingCode: "calling code",
      duplicateName: "an other country with same name already exists",
      duplicateIsoCode: "an other country with same code already exists",
      duplicateCode: "an other country with same calling code already exists",
      flag: "flag",
      invalidFlag: "there is no flag for country {{iso3166}}",
      timezone: "default timezone",
      phoneNumberFormat: "default phone number format",
    },
    agents: {
      title: "agents",
      description: "manage agents",
      attendances: {
        title: "attendance",
        description: "attendance of agents",
        delete: "user {{username}} at {{location}} starting {{start}}",
        overlap: "an existing attendance already exists for that user",
      },
      users: {
        title: "users",
        description: "users with agent role",
        metadata: "metadata",
        alreadyExists: "user already an agent",
      },
      locations: {
        alreadyAssigned: "agent is already assigned to this location",
      },
      services: {
        alreadyAssigned: "agent is already assigned to this service",
      },
    },
    sectionDescription: "administration",
    actions: {
      title: "actions",
      description: "infrastructure actions",
      sms: {
        title: "sms",
        description: "sent sms",
        message: "message",
      },
      creation: "creation",
      email: {
        title: "Email",
        description: "Sent email",
        address: "Address",
        message: "Message",
        subject: "Subject",
      },
    },
    services: {
      title: "services",
      description: "services management",
      imagePath: "path of SVG image",
      image: "SVG image",
      duplicateName: "service with the same name already exists",
      duplicateDescription: "service with the same description already exists",
      duplicateImage: "service with the same image already exists",
      translations: {
        service: "service",
      },
    },
    translations: {
      title: "translations",
      description: "translations of name and description",
      language: "language",
    },
    authentication: {
      title: "users management",
      description: "infrastructure users and groups",
      roles: {
        title: "roles",
        description: "roles management",
        duplicateName: "an other rolee with same name already exists",
        duplicateDescription: "an other rolee with same name already exists",
      },
      users: {
        email: "email",
        title: "users",
        description: "Users management",
      },
    },
  },
  infrastructure: {
    invalidRole: "invalid role",
    graphql: {
      permissionDenied: "permission denied for backend operation",
    },
  },
  welcome: "welcome to Choiredex",
  form: {
    next: "next",
    previous: "previous",
    validations: {
      required: "This field is required",
      invalidEmail: "Email is invalid",
    },
  },
  appointment: {
    kiosk: {
      notFound: "no location with id {{id}} exists",
      invalid: "invalid ID {{value}}, must be a number",
      recover: {
        question: "Do you already have an appointment?",
        yes: "I already have an appointment",
        no: "No, I just show up",
      },
      serviceIdNotFound: "Selected service couldn't be found in list",
      welcome: {
        title: "welcome at {{name}}",
        body: "please scan the following to check-in",
        qrcode: "Link to check-in store",
      },
      register: {
        invalidQueue: "Location {{location}} do not have service {{service}}",
      },
    },
    sectionDescription: "make an appointment",
    services: {
      label: "services",
      title:
        "welcome, to schedule your reservation. Please select the service you need today.",
    },
    type: {
      label: "schedule type",
      title: "please choose when you want to take your appointment",
      now: "now",
      later: "later",
    },
    future: {
      label: "appointment type",
      title:
        "do you want to take an appointment for a specific store or a specific time?",
      byTime: "by time",
      byLocation: "by location",
      selectDay: {
        title: "select a day",
      },
      selectHour: {
        title: "select timeslot",
      },
    },
    locations: {
      book: "book for now (depart right now)",
      title: "select a store",
      address:
        "please enter an address to find the stores where you can meet the soonest.",
      initialLocation: {
        geolocationTimeout:
          "could not find geolocation position, please try again",
        geolocationPermission:
          "geolocation is not authorized, switching to less accurate method",
        geolocationUnavailable:
          "geolocation position could not be found, switching to less accurate method",
        googleMapsError: "can't get location from prediction",
        browserDetection: "use my location",
        address: "City, Address, Code postal",
      },
      distance: {
        googleMapsError: "can't get location from prediction",
        googleMapsInvalidDistance: "can't calculate distance to destination",
        googleMapsErrorLength: "can't get all distances from locations",
        unsupportedTravelMode: "selected travel mode can't reach location",
      },
      meetingAt: "meet at {{ start }}",
      meetingEnd: "exit at {{ end }}",
    },
    registration: {
      title: "register",
      action: "register now",
      requiredField: "you must fill an email or phone number",
      message:
        "{{ name }}, we confirm your appointment on {{ time }}, at {{ location }}, {{ address }}. Click on {{ url }}, to be informed of any delay, or to modify your appointment",
      subject: "Choiredex appointment confirmed",
      recover: {
        message: {
          subject: "account information",
          /* eslint-disable-next-line no-template-curly-in-string */
          text: "Visit the following link {{ url }}/recover/${TOKEN} to resume you're session",
          /* eslint-disable-next-line no-template-curly-in-string */
          html: 'Visit <a href="{{ url }}/recover/${TOKEN}">this link</a> to resume you\'re session',
        },
        ui: {
          title: "already registered",
          text: "we found an existing account with your personal information, an email had been sent to your phone and email, please click the provided link to resume the session",
        },
      },
    },
    status: {
      title: "visit shop",
      description: "you are in the queue!",
      thankyou: "thank you for waiting!",
      cancel: "cancel my appointment",
      notification: {
        template: "Now you should received a notification to: {{destination}}",
        meeting: "You will meet at {{location}} on {{date}} at {{time}}",
        sms: "{{phoneNumber}} by SMS",
        email: "{{emailAddress}}",
      },
      position: {
        title: "your position",
        format: "{{current}} / {{total}}",
      },
      time: {
        meetAt: "meet at",
        exitAt: "exit at",
        remaining: "remaining time to the appointment",
        service: "service time",
      },
    },
  },
  breadcrumbs: {
    dashboard: "Home",
  },
  footer: {
    terms: "Terms and Conditions",
    privacy: "Privacy Policy",
    "about-us": "About Us",
  },
};

export default translations;
