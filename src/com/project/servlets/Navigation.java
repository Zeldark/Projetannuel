package com.project.servlets;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

/**
 * Servlet implementation class Navigation
 */
@WebServlet("/Navigation")
public class Navigation extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Navigation() {
		super();

	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		this.getServletContext().getRequestDispatcher( "/WEB-INF/Navigation.jsp" ).forward( request, response );

	}

	/**
	 * @throws IOException 
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{

		request.setCharacterEncoding("UTF-8");
		String xmlajax=request.getParameter("xmlajax");
		String xslajax=request.getParameter("xslajax");
		String path=request.getParameter("file");
		
		boolean temp=false;


		if(path.isEmpty())
		{
			path=this.getServletContext().getRealPath("/")+"temp/temp.xml";
			temp=true;
		}

		if(path.substring(path.lastIndexOf('.')).equals(".xml")||path.substring(path.lastIndexOf('.')).equals(".xsd")||path.substring(path.lastIndexOf('.')).equals(".xsl")||path.substring(path.lastIndexOf('.')).equals(".html")||temp)
		{


			//HTML Temporaire suite à actualisation
			if(temp)
			{
				StringReader xslreader = new StringReader(xslajax);
				StringReader xmlreader = new StringReader(xmlajax);
				StringWriter htmlwriter = new StringWriter();
				TransformerFactory tFactory = TransformerFactory.newInstance();
				try {
					Transformer transformer = tFactory.newTransformer(new StreamSource(xslreader));
					transformer.transform(new StreamSource(xmlreader), new StreamResult(htmlwriter));
				} catch (TransformerException e1) {

					e1.printStackTrace();
				}
				
				try {
					new File(path.substring(0,path.indexOf("temp"))).mkdir(); 
					BufferedWriter out = new BufferedWriter(new FileWriter(path.substring(0,path.lastIndexOf("."))+".html"));
					out.write(htmlwriter.toString());
					out.close();
				}
				catch (IOException e)
				{
					e.printStackTrace();
				}
				request.setAttribute("filecontenthtml", request.getRequestURL().substring(0, request.getRequestURL().lastIndexOf("/"))+path.substring(path.lastIndexOf('/'), path.lastIndexOf('.'))+"/temp.html");
				request.setAttribute("filecontentxml", xmlajax);
				request.setAttribute("filecontentxsl", xslajax);
				System.out.println(xmlajax);
			}
			else
			{
				//HTML final
				
				TransformerFactory tFactory = TransformerFactory.newInstance();
				try {
					Transformer transformer = tFactory.newTransformer(new StreamSource(path.substring(0, path.lastIndexOf('.'))+".xsl"));
					transformer.transform(new StreamSource(path.substring(0, path.lastIndexOf('.'))+".xml"), new StreamResult(path.substring(0, path.lastIndexOf('.'))+".html"));
				} catch (TransformerException e1) {
					e1.printStackTrace();
				}
				request.setAttribute("filecontenthtml", request.getRequestURL().substring(0, request.getRequestURL().lastIndexOf("/"))+path.substring(path.lastIndexOf('/'), path.lastIndexOf('.'))+".html");
						
				Scanner scanner;
				try {
					scanner = new Scanner(new FileReader(path.substring(0, path.lastIndexOf('.'))+".xml"));
					String xml = "";
					while (scanner.hasNextLine()) {
						xml += scanner.nextLine()+"\n";
					}
					request.setAttribute("filecontentxml", xml);
				} catch (FileNotFoundException e) {
					request.setAttribute("filecontentxml", null);
				}

				try{
					scanner = new Scanner(new FileReader(path.substring(0, path.lastIndexOf('.'))+".xsl"));
					String xsl = "";
					while (scanner.hasNextLine()) {
						xsl += scanner.nextLine()+"\n";
					}

					request.setAttribute("filecontentxsl", xsl);
				} catch (FileNotFoundException e) {
					request.setAttribute("filecontentxsl", null);
				}
				try{
					scanner = new Scanner(new FileReader(path.substring(0, path.lastIndexOf('.'))+".xsd"));
					String xsd = "";
					while (scanner.hasNextLine()) {
						xsd += '\n'+scanner.nextLine();
					}
					request.setAttribute("filecontentxsd", xsd);
					scanner.close();
				}
				catch (FileNotFoundException e) {
					request.setAttribute("filecontentxsd", null);
				}
			}

			
		}
		else
		{
			request.setAttribute("filecontentxml", null);
			request.setAttribute("filecontentxsl", null);
			request.setAttribute("filecontentxsd", null);
			request.setAttribute("filecontenthtml", null);
		}
		try {
			this.getServletContext().getRequestDispatcher( "/WEB-INF/Navigation.jsp" ).forward( request, response );
		} catch (IOException e) {
			// TODO Bloc catch g�n�r� automatiquement
			e.printStackTrace();
		}

	}
}
