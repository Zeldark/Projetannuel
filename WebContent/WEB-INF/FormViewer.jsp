<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    

<%@ page import="java.util.ArrayList" %>
<% com.project.servlets.Tables notreBean;%>
<!DOCTYPE html>

<html>
    <head>

<link type="text/css" rel="stylesheet" href="css/codemirror.css"/>
<script language="javascript" src="js/codemirror.js"></script>
<script language="javascript" src="js/xml.js"></script>
<script language="javascript" src="js/closetag.js"></script>
<script language="javascript" src="js/match-highlighter.js"></script>
<script language="javascript" src="js/searchcursor.js"></script>
<script language="javascript" src="js/formatting.js"></script>
<script language="javascript" src="js/pa-codemirror.js"></script>
<script language="javascript" src="js/pa-ajax.js"></script>
<script language="javascript" src="js/utility/request.js"></script>

<style type="text/css">
      .CodeMirror {border-top: 1px solid black; border-bottom: 1px solid black; background-color: white}
      span.CodeMirror-matchhighlight { background: #e9e9e9 }
      .CodeMirror-focused span.CodeMirror-matchhighlight { background: #e7e4ff; !important }
      
</style>
        <meta charset="utf-8" />
        <title>BDDTOXML</title>
		
		<script src="js/jquery-1.10.1.min.js" type="text/javascript"></script>
		<script src="js/jquery.easing.min.js" type="text/javascript"></script>
		<script src="js/jqueryFileTree/jqueryFileTree.js" type="text/javascript"></script>
		<link href="js/jqueryFileTree/jqueryFileTree.css" rel="stylesheet" type="text/css" media="screen" />
		
		<script type="text/javascript">
			
			$(document).ready( function() {
				
				$('#fileTreeDemo_1').fileTree({ root: '/', script: 'js/jqueryFileTree/connectors/jqueryFileTreeHtml.jsp' }, function(file) { 
					document.getElementById('file').value=file;
					document.getElementById('FormViewerform').submit();
				});
			});
		</script>


	</head>
	
	<body>
 <%@ include file="Header.jsp"%>
     <link href="css/menu_assets/styles.css" rel="stylesheet" type="text/css">

<div id='cssmenu'>
<ul>
   <li class='first'><a href='XMLGen'><span>Génération de fichier XML</span></a></li>
   <li><a href='XSLGen'><span>Génération de fichier XSL</span></a></li>
   <li ><a href='Navigation'><span>Navigation</span></a></li>
   <li class='active' ><a href='FormViewer'><span>Remplissage de formulaire</span></a></li>
      <li ><a href='CreateView'><span>Creation de vues</span></a></li>
   <li class='last'><a href='Contact'><span>Contact</span></a></li>
</ul>
</div>
<script>
function refreshHTML()
{
document.getElementById('xmlajax').value=xmleditor.getValue();
document.getElementById('xslajax').value=xsleditor.getValue();
}
</script>
<h2><p align="center">Remplissage de Formulaire</p></h2>
		<div class="example">
			<h2></h2>

			</a><form method="POST" action="FormViewer" id="FormViewerform">
<input type="hidden" name="file" id="file"/>
<input type="hidden" name="xmlajax" id="xmlajax"/>
<input type="hidden" name="xslajax" id="xslajax"/>

	</form>	<br>
	</div>
	
		<br><br>
<style>
table.dispo td {
  width:1%;
}
</style>
	<table class="dispo">
		
		<tr>
			<td><div id="fileTreeDemo_1" class="demo"></div></td>
			<td><%
	out.println((String) request.getAttribute("filecontenthtml"));
%>
			</td>
			
			
		</tr>
		
	</table>



</body>
</html>