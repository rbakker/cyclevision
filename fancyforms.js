function getValue(field) {
  if (typeof field == 'string') field = getElem(field)
  if (field.tagName.toLowerCase() == 'input') {
    if (field.type == 'text') return field.value
    if (field.type == 'date') return field.value
    if (field.type == 'radio') {
      return $('input[name='+field.id+']:checked').val()
    }
  } else if (field.tagName.toLowerCase() == 'select') {
    return field.selectedIndex < 0 ? undefined : field.options[field.selectedIndex].value
  } else if (field.tagName.toLowerCase() == 'textarea') {
    return field.value
  }
}

function setValue(field,value) {
  if (field.tagName.toLowerCase() == 'input') {
    if (field.type == 'text') field.value = value
    if (field.type == 'date') field.value = value
    if (field.type == 'radio') {
      var radios = document.getElementsByName(field.id);
      for (var i=0; i<radios.length; i++) {
        var r = radios[i]
        r.checked = (r.value == value ? true : false)
      }
    }
  } else if (field.tagName.toLowerCase() == 'select') {
    var options = field.options
    for (var i=0; i<options.length; i++) if (options[i].value == value) field.selectedIndex = i
  } else if (field.tagName.toLowerCase() == 'textarea') {
    field.value = value
  }
}

function updateItems(formKey) {
  var items = DATA[formKey]
  var form = FORMS[formKey]
  var fields = form.fields
  var a = []
  a.push('<div class="list"><span class="EN">List of '+form.items.EN+'</span><span class="NL">Lijst met '+form.items.NL+'</span>:<table class="list">')
  for (var id in items) {
    var r = items[id]
    if (r) {
      a.push('<tr onclick="selectItem('+id+',\''+formKey+'\')"><td>'+(parseInt(id)+1)+'</td>')
      for (var k in r) {
        if (k.charAt(0) == '_') continue
        var f = fields[k]
        var opts = (f && f.options && f.options()) || {}
        var v = opts[r[k]]
        v = v ? '<span class="NL">'+v.NL+'</span><span class="EN">'+v.EN+'</span>' : r[k]
        a.push('<td>'+v+'</td>')
      }
      a.push('</tr>')
    }
  }
  a.push('<tr onclick="selectItem('+next(items)+',\''+formKey+'\')"><td colspan="100"><span class="EN">(next)</span><span class="NL">(volgende)</span></td></tr></tr>')
  a.push('</table></div>')
  getElem(''+formKey+'-list').innerHTML = a.join('')
  a = []
  for (var id in items) {
    a.push('<option value="'+id+'">'+(parseInt(id)+1)+'</option>')
  }
  id = next(items)
  a.push('<option selected value="'+id+'">'+(id+1)+'</option>')
  getElem(''+formKey+'-id').innerHTML = a.join('')
  selectItem(id,formKey)
}

function formButtons(formKey,itemExists) {
  var form = FORMS[formKey]
  var thisItem = (form.thisItem ? form.thisItem : form.item)
  if (itemExists) {
    var editHtml = '<span class="EN">Edit '+thisItem.EN+'</span><span class="NL">Wijzig '+thisItem.NL+'</span>'
    var deleteHtml = '<span class="EN">Delete '+thisItem.EN+'</span><span class="NL">Verwijder '+thisItem.NL+'</span>'
    return '<button class="submit" onclick="addItem(\''+formKey+'\')">'+editHtml+'</button>&nbsp;<button onclick="deleteItem(\''+formKey+'\')"/>'+deleteHtml+'</button>'
  } else {
    var editHtml = '<span class="EN">Add '+thisItem.EN+'</span><span class="NL">Voeg '+thisItem.NL+' toe</span>'
    return '<button class="submit" onclick="addItem(\''+formKey+'\')">'+editHtml+'</button>'
  }
}

function selectItem(id,formKey) {
  var items = DATA[formKey]
  var r = items[id]
  var fields = FORMS[formKey].fields
  var elem = getElem(''+formKey+'-buttons')
  elem.innerHTML = formButtons(formKey,r)
  if (!r) { 
    r = {}; 
    for (var k in fields) { 
      r[k] = fields[k].default || ''
    }
  }
  var elem = getElem(''+formKey+'-id')
  var options = elem.options
  for (var k in options) { if (options[k] && options[k].value == id) elem.selectedIndex = k }
  for (var k in fields) {
    setValue(getElem(formKey+'-'+k),r[k])
  }
}

/* updates form values and options */
function updateForm(formKey) {
  var fields = FORMS[formKey].fields
  for (var k in fields) {
    var f = fields[k]

    var val = f.preset && f.preset(formKey)
    var elem = getElem(formKey+'-'+k)
    if (val) setValue(elem,val)
    if (f.type == 'select') elem.disabled = !!val

    var options = (f.type == 'select') && f.options(formKey)
    if (options) {
      setOptions(elem,options)
    }
  }
}

function updateForms(modifiedItem) {
  var skip = true
  for (var formKey in FORMS) {
    if (formKey == modifiedItem) skip = false
    if (!skip) {
      updateForm(formKey)
    }
  }
}

function toggleError(id,msg) {
  if (msg) {
    FORM_ERROR = true
    var e = getElem(''+id+'-error'); e.innerHTML = msg; e.style.display = 'block'
  } else {
    var e = getElem(''+id+'-error'); e.innerHTML = msg; e.style.display = 'none'
  }
}

/* initialization of forms and values */
function initForm(formKey) {
  var a = []
  var form = FORMS[formKey]
  var fields = form.fields
  var complex = !form.simple
  if (form.descr) getElem(''+formKey+'-descr').innerHTML = multiLang(form.descr)
  a.push('<table class="add">')
  a.push('<tr>')
  if (complex) {
    var nameHtml = '<span class="EN">'+form.item.EN+'</span><span class="NL">'+form.item.NL+'</span>'
    a.push('<td rowspan="'+(2*count(fields)+2)+'" style="padding-right:2ex"><div class="id">'+nameHtml+'<br><select id="'+formKey+'-id" onchange="selectItem(getValue(this),\''+formKey+'\')"><option selected value="0">0</option></select></div></td>')
  }
  a.push('<td colspan="4"><div id="'+formKey+'-form-error" class="error"/></td></tr>')
  for (var k in fields) {
    var f = fields[k]
    a.push('<tr><td colspan="4"><div id="'+formKey+'-'+k+'-error" class="error"/></td></tr>')
    a.push('<tr><td class="key'+(f.tooltip ? ' tt0' : '')+'">'+(f.tooltip ? '<span class="EN tt1">'+f.tooltip.EN+'</span><span class="NL tt1">'+f.tooltip.NL+'</span>' : '')+'<span class="EN">'+f.name.EN+'</span><span class="NL">'+f.name.NL+'</span></td><td class="price">'+(f.price ? '&euro; '+f.price.toFixed(2) : '')+'</td><td class="colon">:</td><td class="value">')
    if (f.type == 'text') a.push('<input id="'+formKey+'-'+k+'" type="text" value=""/>')
    if (f.type == 'textarea') a.push('<textarea id="'+formKey+'-'+k+'" rows="3" value=""></textarea>')
    if (f.type == 'date') a.push('<input id="'+formKey+'-'+k+'" type="date" value=""/>')
    if (f.type == 'select') {
      a.push('<select id="'+formKey+'-'+k+'"'+(complex ? 'onchange="updateForm(\''+formKey+'\')"' : 'onchange="simpleChange(\''+formKey+'\',\''+k+'\')"')+'>')
      a.push('</select>')
    }
    if (f.type == 'radio') {
      var options = f.options()
      var first = true
      for (var n in options) {
        var optionName = '<span class="EN">'+options[n].EN+'</span><span class="NL">'+options[n].NL+'</span>'
        a.push('<input '+(first ? 'id="'+formKey+'-'+k+'" ' : '')+' name="'+formKey+'-'+k+'" type="radio" value="'+n+'"/>'+optionName)
        first = false
      }
    }
    a.push('</td></tr>')
  }
  if (complex) {
    a.push('<tr><td colspan="4"><span id="'+formKey+'-buttons">'+formButtons(formKey)+'</span></td></tr>')
  }
  a.push('</table>')
  getElem(formKey+'-form').innerHTML = a.join('') 
  updateForm(formKey) // will populate options for select fields
  if (complex) updateItems(formKey)
  else updateValues(formKey)
}
