
var fieldCount = 0;
var newId = 'field_' + fieldCount;
var selectedId;
var currentElement;
var currentType;
var xmlDatasource;
var viewVisible = true;

// xmlDatasource
function launchGenerator()
{
	resetForm();
	
	displayBlock("container");
}

function resetForm()
{
	fieldCount = 0;
	selectedId = null;
	currentElement = null;
	currentType = null;
	
	XSL_resetForm();
	HTML_resetForm();
}

function updateNewId(field_)
{
	if (undefined == field_)
		field_ = 'field_';

	fieldCount++;
	newId = field_ + fieldCount;
}

function updateHTML()
{
	XSL_transform(xmlDatasource, function(result){
		HTML_setDocument(result);
	});
}

function addTable()
{
	updateNewId("table");

	currentElement = document.createElement("table");
	currentElement.setAttribute("id", newId);

	// create headers row
	var headersRow = document.createElement("tr");
	var dataRow = document.createElement("tr");
	var rowPattern = document.createElement("xsl:for-each");
	var tmpCell;
	var xslDataPattern;

	rowPattern.setAttribute("select", prompt("Source de donn�es:", ""));

	var nbElems = prompt("Combien d'�l�ments dans le tableau ?", 1);

	for (var i = 0; i < nbElems; i++)
	{
		tmpCell = document.createElement("th");
		tmpCell.innerHTML = prompt("En-t�te n�"+ (i+1) + ": ");

		headersRow.appendChild(tmpCell);

		tmpCell = document.createElement("td");
		xslDataPattern = document.createElement("xsl:value-of");
		xslDataPattern.setAttribute("select", prompt("Champ n�"+ (i+1) + ": "));
		
		tmpCell.appendChild(xslDataPattern);

		dataRow.appendChild(tmpCell);
	}

	rowPattern.appendChild(dataRow);

	currentElement.appendChild(headersRow);
	currentElement.appendChild(rowPattern);

	XSL_addElement(currentElement, viewVisible);

	updateHTML();

	displaySelectedProperties("table");
}

function addLabel()
{
	updateNewId("label");

	currentElement = document.createElement("label");

	currentElement.setAttribute("id", newId);
	currentElement.setAttribute("onMouseUp", "selectNode(\""+newId+"\", \"label\")");
	
	currentElement.innerHTML = "Label";
	
	XSL_addElement(currentElement, viewVisible);

	updateHTML();

	displaySelectedProperties("label");
}

function addTextField()
{ 
	updateNewId("textfield");

	currentElement = document.createElement("input");

	currentElement.setAttribute("id", newId);
	currentElement.setAttribute("name", newId);
	currentElement.setAttribute("type", "text");
	currentElement.setAttribute("value", "");
	
	XSL_addElement(currentElement, viewVisible);

	updateHTML();

	displaySelectedProperties("input");
}

function addPasswordField()
{
	updateNewId("password");

	currentElement = document.createElement("input");

	currentElement.setAttribute("id", newId);
	currentElement.setAttribute("name", newId);
	currentElement.setAttribute("type", "password");
	currentElement.setAttribute("value", "");

	XSL_addElement(currentElement, viewVisible);
	
	updateHTML();

	displaySelectedProperties("input");
}

function addCombobox()
{
	updateNewId("combobox");

	currentElement = document.createElement("select");

	currentElement.setAttribute("id", newId);
	currentElement.setAttribute("name", newId);

	XSL_addElement(XSL_createCombobox(newId, newId, "Result/LIEN_VEHICULE_POTENTIEL_VIEW", "DATE_RELEVE"), viewVisible);

	updateHTML();
	
	displaySelectedProperties("select");
}

function addRadioButton()
{
	updateNewId("radio");

	currentElement = document.createElement("input");

	currentElement.setAttribute("id", newId);
	currentElement.setAttribute("name", newId);
	currentElement.setAttribute("type", "radio");

	XSL_addElement(currentElement, viewVisible);
	
	updateHTML();

	displaySelectedProperties("radio");
}

function addCheckbox()
{
	updateNewId("checkbox");

	currentElement = document.createElement("input");

	currentElement.setAttribute("id", newId);
	currentElement.setAttribute("name", newId);
	currentElement.setAttribute("type", "checkbox");

	XSL_addElement(currentElement, viewVisible);
	
	updateHTML();

	displaySelectedProperties("checkbox");
}

function addEOL()
{
	updateNewId("end");
	
	currentElement = document.createElement("br");

	currentElement.setAttribute("id", newId);

	XSL_addElement(currentElement, viewVisible);
	
	updateHTML();
	
	displaySelectedProperties("eol");
}

function displaySelectedProperties(type)
{
	currentType = type;
	selectedId = currentElement.id;
	document.getElementById("currentId").value = currentElement.id;

	if ("input" == type)
		document.getElementById("defaultValue").value = currentElement.value;
	else
		document.getElementById("defaultValue").value = currentElement.innerHTML;

	// handle properties panels to display
	if ('radio' == type)
	{
		displayBlock('radioProperties');
		hideBlock('checkboxProperties');
		hideBlock('comboProperties');
	}
	else if ('select' == type)
	{
		hideBlock('radioProperties');
		hideBlock('checkboxProperties');
		displayBlock('comboProperties');
	}
	else if ('checkbox' == type)
	{
		hideBlock('radioProperties');
		displayBlock('checkboxProperties');
		hideBlock('comboProperties');
	}
	else
	{
		hideBlock('radioProperties');
		hideBlock('checkboxProperties');
		hideBlock('comboProperties');
	}
}

function selectNode(nodeId, type)
{
	selectedId = nodeId;
	
	displaySelectedProperties(type);
}

function updateSelectedId()
{
	var element = document.getElementById(selectedId);

	element.id = document.getElementById("currentId").value;
	element.setAttribute("name", document.getElementById("currentId").value);
	element.value = document.getElementById("defaultValue").value;
}

function updateSelectedValue()
{
	document.getElementById(selectedId).value  = document.getElementById("defaultValue").value;
}

// swaps between view display and editor display
function swap()
{
	changeVisibility('xsl_container', viewVisible);
	changeVisibility('editor', !viewVisible);
	
	document.getElementById('btnSwap').innerHTML = viewVisible ? 'Afficher source' : 'Afficher �diteur';
	
	viewVisible = !viewVisible;
}
