var DATA = {}

var FORMS = {
  rider: {
    item: { NL:'rijder',EN:'rider' },
    thisItem: { NL:'deze rijder',EN:'this rider' },
    items: { NL:'rijders',EN:'riders' },
    stringify: function(row) { if (row) return row.firstName+' '+row.lastName },
    fields: {
      firstName: { name: { NL: "Voornaam", EN: "First name" }, type: "text", check: checkName },
      lastName: { name: { NL: "Achternaam", EN: "Last name" }, type: "text", check: checkName },
      gender: { name: { NL: "Geslacht", EN: "Gender" }, type: "radio", check: checkRadio, options: genderOptions },
      city: { name: { NL: "Woonplaats", EN: "Place of residence" }, type: "text", check: checkName },
      country: { name: { NL: "Land", EN: "Country" }, type: "text", check: checkName },
      birthDate: { name: { NL: "Geboortedatum", EN: "Date of birth" }, type: "date", check: checkBirth },
      email: { name: { NL: "Email adres", EN: "Email address" }, type: "text", check: checkEmail, default: '' },
      nickname: { name: { NL: "Bijnaam", EN: "Nick name" }, type: "text", check: checkName, default: '' },
      ligfietsnet: { name: { NL: "Ligfiets.net ID", EN: "Ligfiets.net ID" }, type: "text", check: checkLigfietsnet, default: '', tooltip:{EN:"Needed if you want to see your race results at Ligfiets.net.",NL:"Nodig als je je resultaten op Ligfiets.net wilt zien."} },
      bend: { name: { NL: "Verdien punten voor BeND", EN: "Earn points for BeND" }, type: "radio", check: checkRadio, options: bendOptions, default: "no", tooltip: {EN:"BeND is the Belgian-Dutch-German joint HPV competition. Select 'yes' if you participate in it.",NL:"BeND is de Belgisch-Nederlands-Duitse HPV competitie. Selecteer 'ja' als je daaraan deelneemt."} },
      about: { name: { NL: "Over jezelf (voor pers)", EN: "About yourself (for press)" }, type: "textarea", check: checkName, default: '' }
    }
  },
  bike: {
    item: { NL:'fiets',EN:'bike' },
    thisItem: { NL:'deze fiets',EN:'this bike' },
    items: { NL:'fietsen',EN:'bikes' },
    stringify: function(row) { if (row) return (row.name ? '"'+row.name+'" ' : '') + row.make },
    fields: {
      name: { name: { NL: "Koosnaam", EN: "Given name" }, type: "text", check: checkName, default: '' },
      standard: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: standardOptions, default: '_' },
      make: { name: { NL: "&nbsp;&nbsp;Merk en type", EN: "&nbsp;&nbsp;Make and type" }, type: "text", check: checkName, preset: makePreset, default: '' },
      track: { name: { NL: "&nbsp;&nbsp;Aantal wielen", EN: "&nbsp;&nbsp;Number of wheels" }, type: "radio", check: checkRadio, options: trackOptions, preset: trackPreset, default: '' },
      tandem: { name: { NL: "&nbsp;&nbsp;Aantal rijders", EN: "&nbsp;&nbsp;Number of riders" }, type: "radio", check: checkRadio, options: tandemOptions, preset: tandemPreset, default: "no" },
      fairing: { name: { NL: "&nbsp;&nbsp;Stroomlijn", EN: "&nbsp;&nbsp;Fairing" }, type: "radio", check: checkRadio, options: fairingOptions, preset: fairingPreset, default: "full" },
      drive: { name: { NL: "&nbsp;&nbsp;Aandrijving", EN: "&nbsp;&nbsp;Drive" }, type: "select", check: checkSelect, options: driveOptions, preset: drivePreset },
      about: { name: { NL: "Over je fiets (voor pers)", EN: "About your bike (for press)" }, type: "textarea", check: checkName, default: '' }
    }
  },
  onehour: {
    item: { NL:'deelnemer',EN:'entry' },
    thisItem: { NL:'deze deelnemer',EN:'this entry' },
    items: { NL:'rijders+fietsen voor de 1-uurs race',EN:'riders+bikes for the 1 hour race'},
    name: {EN:'One hour race',NL:'Eenuursrace'},
    day: 1,
    fields: {
      rider: { name: { NL: "Rijder", EN: "Rider" }, type: "select", check: checkSelect, options: riderOptions },
      bike: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: bikeOptions },
      speed: { name: { NL: "Verwachte snelheid", EN: "Expected speed" }, type: "select", check: checkSelect, options: speedOptions, tooltip: {EN:'Used for start-order.',NL:'Wordt gebruikt voor start volgorde.'} }
    }
  },
  indoor1lap: {
    item: { NL:'deelnemer',EN:'entry' },
    thisItem: { NL:'deze deelnemer',EN:'this entry' },
    items: { NL:'rijders+fietsen voor de snelste ronde in het velodrome',EN:'riders+bikes for the fastest lap indoor' },
    name: {EN:'Fastest lap 200m indoor',NL:'Snelste ronde 200m binnen'},
    day: 1,
    fields: {
      rider: { name: { NL: "Rijder", EN: "Rider" }, type: "select", check: checkSelect, options: riderOptions },
      bike: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: bikeOptions },
      speed: { name: { NL: "Verwachtte snelheid", EN: "Expected speed" }, type: "select", check: checkSelect, options: speedOptions, tooltip: {EN:'Used for start-order.',NL:'Wordt gebruikt voor start volgorde.'} }
    }
  },
  criterium: {
    item: { NL:'deelnemer',EN:'entry' },
    thisItem: { NL:'deze deelnemer',EN:'this entry' },
    items: { NL:'rijders+fietsen voor het criterium',EN:'riders+bikes for the criterium' },
    name: {EN:'Criterium outdoor',NL:'Criterium buiten'},
    day: 1,
    fields: {
      rider: { name: { NL: "Rijder", EN: "Rider" }, type: "select", check: checkSelect, options: riderOptions },
      bike: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: bikeOptions },
      which: { name: { NL: "Welk criterium", EN: "Which criterium" }, type: "radio", check: checkRadio, options: criteriumOptions }
    }
  },
  outdoor1lap: {
    item: { NL:'deelnemer',EN:'entry' },
    thisItem: { NL:'deze deelnemer',EN:'this entry' },
    items: { NL: 'rijders+fietsen voor de snelste ronde op de buitenbaan',EN:'riders+bikes for the fastest lap outdoor circuit' },
    name: {EN:'Fastest lap 2.5 km outdoor',NL:'Snelste ronde 2.5 km buiten'},
    day: 2,
    fields: {
      rider: { name: { NL: "Rijder", EN: "Rider" }, type: "select", check: checkSelect, options: riderOptions },
      bike: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: bikeOptions },
      speed: { name: { NL: "Verwachtte snelheid", EN: "Expected speed" }, type: "select", check: checkSelect, options: speedOptions, tooltip: {EN:'Used for start-order.',NL:'Wordt gebruikt voor startvolgorde.'} }
    }
  },
  threehour: {
    item: { NL:'deelnemer',EN:'entry' },
    thisItem: { NL:'deze deelnemer',EN:'this entry' },
    items: { NL:'rijders+fietsen voor de gecombineerde 3/6 uurs race',EN:'riders+bikes for the combined 3/6 hour race' },
    name: {EN:'3/6 hour race',NL:'3/6-uursrace'},
    descr: {
      EN:'The 3 and 6 hour race are held at the same time but have separate rankings. You must choose in advance which one you participate in, but note that in the 6-hour race you can collect 1.5 times more points for the final ranking. If you change your mind: email cyclevision@gmail.com <b>no later than</b> 22nd of June.',
      NL:'De 3- en 6-uursrace worden gelijktijdig gehouden. Je moet vooraf kiezen aan welke je deelneemt maar let op, in de 6-uurs kun je 1,5 keer zoveel punten verzamelen voor het eindklassement. Als je wilt wijzigen, email cyclevision@gmail.com <b>uiterlijk</b> 22 juni.'
    },
    day: 2,
    fields: {
      rider: { name: { NL: "Rijder", EN: "Rider" }, type: "select", check: checkSelect, options: riderOptions },
      bike: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: bikeOptions },
      duration: { name: { NL: "Duur", EN: "Duration" }, type: "radio", check: checkRadio, options: durationOptions, tooltip:{EN:"The 3 and 6 hour races are held at the same time, you must choose in advance in which one you compete. The 6 hour race counts for 150% in the final ranking.",NL:"De 3- en 6-uursraces worden tegelijk gehouden, je moet vooraf kiezen aan welke je deelneemt. De 6-uursrace telt voor 150% mee in het eindklassement."} }
    }
  },
  camping: {
    item: { NL:'camping',EN:'camping' },
    items: { NL:'camping',NL:'camping' },
    simple: true,
    descr: {
      EN:'We camp on the grass around the Velodrome in Sportpark Sloten, and use the facilities of the Olympia Cycling Club.',
      NL:'We kamperen op de grasvelden rondom het Velodrome in Sportpark Sloten, en gebruiken de faciliteiten van wielervereniging Olympia.'
    },
    fields: {
      adultFri: { name: { NL: "Volwassenen vrijdag/zaterdag", EN: "Adults Friday/Saturday" }, price: 4, type: "select", options: countOptions, tooltip: {EN:"No electricity, use of bathrooms and showers of the velodrome.",NL:"Geen electriciteit, gebruik wc/douche van velodrome."} },
      childFri: { name: { NL: "Kinderen &lt;16 vrijdag/zaterdag", EN: "Children &lt;16 Friday/Saturday" }, price: 2, type: "select", options: countOptions },
      adultSat: { name: { NL: "Volwassenen zaterdag/zondag", EN: "Adults Saturday/Sunday" }, price: 4, type: "select", options: countOptions, tooltip: {EN:"No electricity, use of bathrooms and showers of the velodrome.",NL:"Geen electriciteit, gebruik wc/douche van velodrome."} },
      childSat: { name: { NL: "Kinderen &lt;16 zaterdag/zondag", EN: "Children &lt;16 Saturday/Sunday" }, price: 2, type: "select", options: countOptions }
    }
  },
  meal: {
    item: { NL:'maaltijd',EN:'meal' },
    items: { NL:'maaltijden',EN:'meals' },
    simple: true,
    descr: {
      EN:'Meals are provided by the Olympia canteen, except on Friday when we have them delivered by a local Chinese restaurant. Breakfast includes bread rolls, savory/sweet toppings, coffee, tea, orange juice and milk. Pasta dish includes soup, pasta with choice of 2 sauces, green salad/tomato and mozarella, drink, dessert.',
      NL:'Maaltijden worden verzorgd door de kantine van ASV Olympia, behalve op vrijdag, dan laten we ze bezorgen door de locale Chinees. Ontbijt bevat broodjes, hartig beleg, zoet beleg, koffie, thee, jus d’orange en melk. Pastamaaltijd bevat soep vooraf, pasta met 2 soorten saus, groene salade/tomaat en mozzarella, drankje, dessert. NB. In een eerdere versie van dit formulier werden de iets lagere prijzen van vorig jaar gehanteerd.'
    },
    fields: {
      mealFri: { name: { NL: "Chinees buffet vrijdagavond", EN: "Meal (Chinese) Friday evening" }, price: 10, type: "select", options: countOptions, tooltip: {EN:"Chinese buffet, organized by NVHPV.",NL:"Chinees buffet, besteld door NVHPV."} },
      mealFriVeg: { name: { NL: "&nbsp;&nbsp;Vegetarisch", EN: "&nbsp;&nbsp;Vegetarian" }, price: 10, type: "select", options: countOptions },
      mealPlan: { name: { NL: "Maaltijden Zaterdag/Zondag (A+B+C combi)", EN: "Meals Saturday/Sunday (A+B+C combo)" }, price: 30, type: "select", options: countOptions, tooltip: {EN:"Organized by Olympia. A+B+C package-deal.",NL:"Verzorgd door Olympia A+B+C combi-voordeel."} },
      mealPlanVeg: { name: { NL: "&nbsp;&nbsp;Vegetarisch (A+B+C combi)", EN: "&nbsp;&nbsp;Vegetarian (A+B+C combo)" }, price: 30, type: "select", options: countOptions },
      breakfastSat: { name: { NL: "A. Ontbijt zaterdagochtend", EN: "A. Breakfast Saturday morning" }, price: 7.50, type: "select", options: countOptions, tooltip: {EN:"Organized by Olympia.",NL:"Verzorgd door Olympia."} },
      breakfastSatVeg: { name: { NL: "&nbsp;&nbsp;Vegetarisch", EN: "&nbsp;&nbsp;Vegetarian" }, price: 7.50, type: "select", options: countOptions },
      mealSat: { name: { NL: "B. Pasta maaltijd zaterdagavond", EN: "B. Dinner (Italian pasta) Saturday evening" }, price: 20, type: "select", options: countOptions, tooltip: {EN:"Organized by Olympia.",NL:"Verzorgd door Olympia."} },
      mealSatVeg: { name: { NL: "&nbsp;&nbsp;Vegetarisch", EN: "&nbsp;&nbsp;Vegetarian" }, price: 20, type: "select", options: countOptions },
      breakfastSun: { name: { NL: "C. Ontbijt zondagochtend", EN: "C. Breakfast Sunday morning" }, price: 7.50, type: "select", options: countOptions, tooltip: {EN:"Organized by Olympia.",NL:"Verzorgd door Olympia."} },
      breakfastSunVeg: { name: { NL: "&nbsp;&nbsp;Vegetarisch", EN: "&nbsp;&nbsp;Vegetarian" }, price: 7.50, type: "select", options: countOptions }
    }
  },
  general: {
    item: { NL:'item',EN:'item' },
    items: { NL:'items',EN:'items' },
    simple: true,
    fields: {
      comment: { name: { NL: "Algemene opmerking of feedback", EN: "General comment or feedback" }, type: "textarea", default: '' }
    }
  }
}

var HIDDEN = {   
  race: {
    oneDay: { price: 15 },
    twoDays: { price: 25 }
  }
}

var LANG = {
  rider: {
    NL: ['rijder','rijders'],
    EN: ['rider','riders']
  },
  bike: {
    NL: ['fiets','fietsen'],
    EN: ['bike','bikes']
  },
  onehour: {
    NL: ['deelnemer','rijders+fietsen voor de 1-uurs race'],
    EN: ['entry','riders+bikes for the 1 hour race']
  },
  indoor1lap: {
    NL: ['deelnemer','rijders+fietsen voor de snelste ronde in het velodrome'],
    EN: ['entry','riders+bikes for the fastest lap indoor']
  },
  outdoor1lap: {
    NL: ['deelnemer','rijders+fietsen voor de snelste ronde op de buitenbaan'],
    EN: ['entry','riders+bikes for the fastest lap outdoor circuit']
  },
  criterium: {
    NL: ['deelnemer','rijders+fietsen voor het criterium'],
    EN: ['entry','riders+bikes for the criterium']
  },
  threehour: {
    NL: ['deelnemer','rijders+fietsen voor de gecombineerde 3/6 uurs race'],
    EN: ['entry','riders+bikes for the combined 3/6 hour race']
  },
  camping: {
    NL: ['camping','camping'],
    EN: ['camping','camping']
  },
  meal: {
    NL: ['maaltijd','maaltijden'],
    EN: ['meal','meals']
  }
}

function multiLang(txt) {
  var ans = []
  for (var lang in txt) ans.push('<span class="'+lang+'">'+txt[lang]+'</span>')
  return ans.join('')
}

/* field value validation functions */
function checkName(val,formKey,f) {
  val = val.trim()
  var name = FORMS[formKey].fields[f].name.EN
  toggleError(formKey+'-'+f,val && val.length>=2 ? '' : 'Error: enter a valid '+name+'.')
  return val
}

var checkLigfietsnet = checkName

function checkRadio(val,formKey,f) {
  toggleError(formKey+'-'+f,val !== undefined ? '' : 'Error: select a value.')
  return val
}

function checkSelect(val,formKey,f) {
  toggleError(formKey+'-'+f,val !== '_' ? '' : '<span class="EN">Error: select a value.</span><span class="NL">Fout: kies een waarde.</span>')
  return val
}

function checkEmail(val,formKey,f) {
  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  toggleError(formKey+'-'+f,re.test(val) ? '' : '<span class="EN">Error: invalid email address.</span><span class="NL">Fout: ongeldig email adres.</span>')
  return val
}
  
function checkBirth(val,formKey,f) {
  if (val) {
    var date = new Date(val)
    var year = date.getFullYear()
    toggleError(formKey+'-'+f,year>1900 && year<2016 ? '' : '<span class="EN">Error: invalid year.</span><span class="NL">Fout: ongeldig jaar.</span>')
  } else {
    toggleError(formKey+'-'+f,val ? '' : '<span class="EN">Error: enter a date.</span><span class="NL">Fout: vul een datum in.</span>')
  }
  return val
}

/* option generation functions */
function genderOptions() {
  return {
    male: {EN:'male',NL:'man'},
    female: {EN:'female',NL:'vrouw'}
  }
}

function speedOptions() {
  var options = {}
  options['_'] = {EN:"Used for start order",NL:"Gebruikt voor startvolgorde"}
  options['~25-'] = {EN:"25 or below",NL:"25 of minder"}
  for (var s=26.0; s<80.0; s*=1.06) {
    var s = Math.round(s)
    options['~'+s] = {EN:''+s+" km/h",NL:''+s+" km/u"}
  }
  options['~80+'] = {EN:"80 or more",NL:"80 of meer"}
  return options
}

function standardOptions() {
  return {
    _: {EN:'Choose ...',NL:'Kies ...'},
    unfaired2: {EN:'Unfaired bike',NL:'Ongestroomlijnde tweewieler'},
    unfaired3: {EN:'Unfaired trike',NL:'Ongestroomlijnde trike'},
    tailfaired2: {EN:'Tailfaired bike',NL:'Tweewieler met staartpunt'},
    tailfaired3: {EN:'Tailfaired trike',NL:'Trike met staartpunt'},
    fullyfaired2: {EN:'Fully faired bicycle',NL:'Volledig gestroomlijnde tweeweler'},
    fullyfaired3: {EN:'Fully faired tricycle',NL:'Volledig gestroomlijnde trike'},
    quest: {EN:'Velomobiel.nl Quest',NL:'Velomobiel.nl Quest'},
    df: {EN:'InterCityBike DF',NL:'InterCityBike DF'},
    rowing: {EN:'Rowing bike',NL:'Roeifiets'},
    thys222: {EN:'Thys 222 rowing bike',NL:'Thys 222 roeifiets'},
    handbike: {EN:'Handbike',NL:'Handbike'},
    other: {EN:'Other ...',NL:'Anders ...'}
  }
}

function trackOptions() {
  return {
    single: {EN:'Two or less',NL:'Twee of minder'},
    multi: {EN:'Three or more',NL:'Drie of meer'}
  }
}

function tandemOptions() {
  return {
    no: {EN:'1',NL:'1'},
    yes: {EN:'2 or more',NL:'2 of meer'}
  }
}

function fairingOptions() {
  return {
    full: {EN:'Fully faired',NL:'Gestroomlijnd'},
    front: {EN:'Front fairing',NL:'Alleen voorkant'},
    rear: {EN:'Tail fairing',NL:'Staartpunt'},
    none: {EN:'Unfaired',NL:'Ongestroomlijnd'}
  }
}

function driveOptions() {
  return {
    pedal: {EN:'Regular',NL:'Normaal'},
    rowing: {EN:'Rowing movement',NL:'Roeibeweging'},
    hand: {EN:'Hand drive',NL:'Handaabndrijving'},
    special: {EN:'Special',NL:'Speciaal'}
  }
}

function bendOptions() {
  return {
    yes: {EN:'Yes',NL:'Ja'},
    no: {EN:'No',NL:'Nee'}
  }
}

function riderOptions() {
  var riders = DATA.rider
  var options = {}
  for (var k in riders) {
    var r = riders[k]
    if (r) {
      var name = r.firstName+' '+r.lastName
      options[k] = { NL:name,EN:name }
    }
  }
  if (!count(options)) options = { '_': {NL:'Maak eerst rijder aan',EN:'Define riders first'} }
  return options
}

function bikeOptions() {
  var bikes = DATA.bike
  var options = {}
  for (var k in bikes) {
    var r = bikes[k]
    var name = '"'+r.name+'" '+r.make
    options[k] = { NL:name,EN:name }
  }
  if (!count(options)) options = { '_': {NL:'Maak eerst fiets aan',EN:'Define bikes first'} }
  return options
}

function criteriumOptions() {
  return {
    semifaired: {EN:'Un/semifaired',NL:'On- of halfgestroomlijnd'},
    open: {EN:'Fully faired',NL:'Volledig gestroomlijnd'}
  }
}

function durationOptions() {
  return {
    '3':{EN: '3 hours', NL: '3 uur'},
    '6':{EN: '6 hours', NL: '6 uur'}
  }
}

function countOptions() {
  var options = {}
  for (var i=0; i<=10; i++) {
    var s = ''+i
    options[s] = {EN:s,NL:s}
  }
  return options
}

function makePreset(formKey) {
  var ans = {
    thys222: 'Thys 222',
    quest: 'Velomobiel.nl Quest',
    df: 'InterCityBike DF'
  }
  return ans[getValue(formKey+'-standard')]
}

function trackPreset(formKey) {
  var ans = {
    unfaired2: 'single',
    unfaired3: 'multi',
    tailfaired2: 'single',
    tailfaired3: 'multi',
    fullyfaired2: 'single',
    fullyfaired3: 'multi',
    quest: 'multi',
    df: 'multi',
    thys222: 'single'
  }
  return ans[getValue(formKey+'-standard')]
}

function fairingPreset(formKey) {
  var ans = {
    unfaired2: 'none',
    unfaired3: 'none',
    tailfaired2: 'tail',
    tailfaired3: 'tail',
    fullyfaired2: 'full',
    fullyfaired3: 'full',
    thys222: 'none',
    quest: 'full',
    df: 'full'
  }
  return ans[getValue(formKey+'-standard')]
}

function tandemPreset(formKey) {
  var ans = {
    quest: 'no',
    df: 'no',
    thys222: 'no'
  }
  return ans[getValue(formKey+'-standard')]
}

function drivePreset(formKey) {
  var ans = {
    unfaired2: 'pedal',
    unfaired3: 'pedal',
    tailfaired2: 'pedal',
    tailfaired3: 'pedal',
    fullyfaired2: 'pedal',
    fullyfaired3: 'pedal',
    quest: 'pedal',
    df: 'pedal',
    rowing: 'pedal',
    thys222: 'rowing',
    tandem: 'pedal',
    handbike: 'hand'
  }
  return ans[getValue(formKey+'-standard')]
}
