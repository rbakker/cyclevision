var DATA = {}

var FORMS = {
  rider: {
    stringify: function(row) { return row.firstName+' '+row.lastName },
    fields: {
      firstName: { name: { NL: "Voornaam", EN: "First name" }, type: "text", check: checkName },
      lastName: { name: { NL: "Achternaam", EN: "Last name" }, type: "text", check: checkName },
      gender: { name: { NL: "Geslacht", EN: "Gender" }, type: "radio", check: checkRadio, options: genderOptions },
      city: { name: { NL: "Woonplaats", EN: "Place of residence" }, type: "text", check: checkName },
      country: { name: { NL: "Land", EN: "Country" }, type: "text", check: checkName },
      birthDate: { name: { NL: "Geboortedatum", EN: "Date of birth" }, type: "date", check: checkBirth },
      email: { name: { NL: "Email adres", EN: "Email address" }, type: "text", check: checkEmail, default: '' },
      nickname: { name: { NL: "Bijnaam", EN: "Nick name" }, type: "text", check: checkName, default: '' },
      ligfietsnet: { name: { NL: "Ligfiets.net ID", EN: "Ligfiets.net ID" }, type: "text", check: checkLigfietsnet, default: '' },
      bend: { name: { NL: "Verdien punten voor BeND", EN: "Earn points for BeND" }, type: "radio", check: checkRadio, options: bendOptions, default: 'no' },
      about: { name: { NL: "Over jezelf (voor pers)", EN: "About yourself (for press)" }, type: "textarea", check: checkName, default: '' }
    }
  },
  bike: {
    stringify: function(row) { return (row.name ? '"'+row.name+'" ' : '') + row.make },
    fields: {
      name: { name: { NL: "Koosnaam", EN: "Given name" }, type: "text", check: checkName, default: '' },
      standard: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: standardOptions },
      make: { name: { NL: "&nbsp;&nbsp;Merk en type", EN: "&nbsp;&nbsp;Make and type" }, type: "text", check: checkName, default: '', preset: makePreset },
      track: { name: { NL: "&nbsp;&nbsp;Aantal wielen", EN: "&nbsp;&nbsp;Number of wheels" }, type: "radio", check: checkRadio, options: trackOptions, preset: trackPreset },
      tandem: { name: { NL: "&nbsp;&nbsp;Aantal wielen", EN: "&nbsp;&nbsp;Number of riders" }, type: "radio", check: checkRadio, options: tandemOptions, preset: tandemPreset, default: "no" },
      fairing: { name: { NL: "&nbsp;&nbsp;Stroomlijn", EN: "&nbsp;&nbsp;Fairing" }, type: "radio", check: checkRadio, options: fairingOptions, preset: fairingPreset, default: "full" },
      drive: { name: { NL: "&nbsp;&nbsp;Aandrijving", EN: "&nbsp;&nbsp;Drive" }, type: "select", check: checkSelect, options: driveOptions, preset: drivePreset },
      about: { name: { NL: "Over je fiets (voor pers)", EN: "About your bike (for press)" }, type: "textarea", check: checkName, default: '' }
    }
  },
  onehour: {
    day: 1,
    fields: {
      rider: { name: { NL: "Rijder", EN: "Rider" }, type: "select", check: checkSelect, options: riderOptions },
      bike: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: bikeOptions }
    }
  },
  indoor1lap: {
    day: 1,
    fields: {
      rider: { name: { NL: "Rijder", EN: "Rider" }, type: "select", check: checkSelect, options: riderOptions },
      bike: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: bikeOptions }
    }
  },
  singletrack: {
    day: 1,
    fields: {
      rider: { name: { NL: "Rijder", EN: "Rider" }, type: "select", check: checkSelect, options: riderOptions },
      bike: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: bikeOptions }
    }
  },
  multitrack: {
    day: 1,
    fields: {
      rider: { name: { NL: "Rijder", EN: "Rider" }, type: "select", check: checkSelect, options: riderOptions },
      bike: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: bikeOptions }
    }
  },
  outdoor1lap: {
    day: 2,
    fields: {
      rider: { name: { NL: "Rijder", EN: "Rider" }, type: "select", check: checkSelect, options: riderOptions },
      bike: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: bikeOptions }
    }
  },
  threehour: {
    day: 2,
    fields: {
      rider: { name: { NL: "Rijder", EN: "Rider" }, type: "select", check: checkSelect, options: riderOptions },
      bike: { name: { NL: "Fiets", EN: "Bike" }, type: "select", check: checkSelect, options: bikeOptions },
      duration: { name: { NL: "Duur", EN: "Duration" }, type: "radio", check: checkRadio, options: durationOptions }
    }
  },
  camping: {
    simple: true,
    fields: {
      adultFri: { name: { NL: "Volwassenen vrijdag/zaterdag", EN: "Adults Friday/Saturday" }, price: 4, type: "select", options: countOptions },
      childFri: { name: { NL: "Kinderen &lt;16 vrijdag/zaterdag", EN: "Children &lt;16 Friday/Saturday" }, price: 2, type: "select", options: countOptions },
      adultSat: { name: { NL: "Volwassenen zaterdag/zondag", EN: "Adults Saturday/Sunday" }, price: 4, type: "select", options: countOptions },
      childSat: { name: { NL: "Kinderen &lt;16 zaterdag/zondag", EN: "Children &lt;16 Saturday/Sunday" }, price: 2, type: "select", options: countOptions }
    }
  },
  meal: {
    simple: true,
    fields: {
      mealFri: { name: { NL: "Chinese maaltijd vrijdagavond", EN: "Meal (Chinese) Friday evening" }, price: 10, type: "select", options: countOptions },
      mealPlan: { name: { NL: "Maaltijden Zaterdag/Zondag (2x ontbijt, 1x diner)", EN: "Meals Saturday/Sunday (2x breakfast, 1x dinner)" }, price: 27.50, type: "select", options: countOptions },
      breakfastSat: { name: { NL: "Ontbijt zaterdagochtend", EN: "Breakfast Saturday morning" }, price: 6.50, type: "select", options: countOptions },
      mealSat: { name: { NL: "Diner zaterdagavond", EN: "Dinner Saturday evening" }, price: 17.50, type: "select", options: countOptions },
      breakfastSun: { name: { NL: "Ontbijt zondagochtend", EN: "Breakfast Sunday morning" }, price: 6.50, type: "select", options: countOptions }
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
  singletrack: {
    NL: ['deelnemer','rijders+fietsen voor het tweewieler criterium'],
    EN: ['entry','riders+bikes for the single track race']
  },
  multitrack: {
    NL: ['deelnemer','rijders+fietsen voor het multi-track criterium'],
    EN: ['entry','riders+bikes for the multi track race']
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
  return ans[fieldValue(formKey,'standard')]
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
  return ans[fieldValue(formKey,'standard')]
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
  return ans[fieldValue(formKey,'standard')]
}

function tandemPreset(formKey) {
  var ans = {
    quest: 'no',
    df: 'no',
    thys222: 'no'
  }
  return ans[fieldValue(formKey,'standard')]
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
  return ans[fieldValue(formKey,'standard')]
}

