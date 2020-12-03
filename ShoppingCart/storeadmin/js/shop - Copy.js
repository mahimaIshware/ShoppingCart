
var baseurl = "http://localhost:8080/store";
var allProducts;

function loadCategories(){
  var xmlhttp1;
  try{
    xmlhttp1 = new XMLHttpRequest();
  }catch(e)
  {
    try{
      xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
    }catch(e)
    {
      try {
        xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
      } catch (e) {
        alert("BROWSER BROKE");
        return false;
      }
    }
  }
  //alert("GET CATEGORIES CALLED....1");
	//var xmlhttp1 = new XMLHttpRequest();
	xmlhttp1.open("POST", baseurl+"/getCategories", true);

  //alert("GET CATEGORIES CALLED....2");
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

  //alert("GET CATEGORIES CALLED....3");
  xmlhttp1.onreadystatechange = function(){
    if(this.status == 200 && this.responseText != null && this.responseText != "")
        {
          //alert(this.status+"::"+this.responseText);
          var categoryHTMLStart = '<div class="collapse navbar-collapse" id="bs-megadropdown-tabs"><ul class="nav navbar-nav nav_1"><li><a href="index.html" onClick ="alert("ALL");">All</a></li>';
          var categoryMiddle = "";
          var catgoryHTMLEnd = '</ul></div>';
          var res = JSON.parse(this.responseText);
          //alert("RESPONSE>>>>"+res.response);

          var catarr = JSON.parse(res.response);

          //alert("LENGTH>>>>"+catarr.length);
          for (i=0;i < catarr.length ; i++){
            categoryMiddle += '<li><a href="#" onClick="getCategoryProducts('+catarr[i].id+')">'+catarr[i].id+'</a></li>';
            alert("CATEGORY>>>"+categoryMiddle);
          }
              document.getElementById('bs-megadropdown-tabs').innerHTML = categoryHTMLStart + categoryMiddle + catgoryHTMLEnd;
          //alert(document.getElementById('bs-megadropdown-tabs').innerHTML);
        }
      };

//  alert("GET CATEGORIES CALLED....4");
	xmlhttp1.send('{ "storeID": "9999"}');
	alert(xmlhttp1.responseText);
  }

  function loadAllProducts(){
    var xmlhttp1;
    try{
      xmlhttp1 = new XMLHttpRequest();
    }catch(e)
    {
      try{
        xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
      }catch(e)
      {
        try {
          xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
          alert("BROWSER BROKE");
          return false;
        }
      }
    }
    //alert("GET CATEGORIES CALLED....1");
  	//var xmlhttp1 = new XMLHttpRequest();
  	xmlhttp1.open("POST", baseurl+"/getProducts", true);

    //alert("GET CATEGORIES CALLED....2");
  	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

    //alert("GET CATEGORIES CALLED....3");
  	xmlhttp1.onreadystatechange = function(){
      if(this.status == 200 && this.responseText != null && this.responseText != "")
          {
            //alert(this.status+"::"+this.responseText);
            var categoryHTMLStart = '<div class="collapse navbar-collapse" id="bs-megadropdown-tabs"><ul class="nav navbar-nav nav_1"><li><a href="index.html" onClick ="alert("ALL");">All</a></li>';
            var categoryMiddle = "";
            var catgoryHTMLEnd = '</ul></div>';
            var res = JSON.parse(this.responseText);
            //alert("RESPONSE>>>>"+res.response);

            var catarr = JSON.parse(res.response);

            //alert("LENGTH>>>>"+catarr.length);
            for (i=0;i < catarr.length ; i++){
              categoryMiddle += '<li><a href="#" onClick="getCategoryProducts('+catarr[i].id+')">'+catarr[i].id+'</a></li>';
              alert("CATEGORY>>>"+categoryMiddle);
            }
                document.getElementById('bs-megadropdown-tabs').innerHTML = categoryHTMLStart + categoryMiddle + catgoryHTMLEnd;
            //alert(document.getElementById('bs-megadropdown-tabs').innerHTML);
          }
        };

  //  alert("GET CATEGORIES CALLED....4");
  	xmlhttp1.send('{ "storeID": "9999"}');
  	alert(xmlhttp1.responseText);
    }


function healthCheck(){

		alert("HEALTHCHECK CALLED...1");
		var xmlhttp1;

		try{
			xmlhttp1 = new XMLHttpRequest();
		}catch(e)
		{
			try{
				xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e)
			{
				try {
					xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
				} catch (e) {
					alert("BROWSER BROKE");
					return false;
				}
			}
		}



		xmlhttp1.open("GET", baseurl+"/healthcheck", true);
		xmlhttp1.onreadystatechange = function() {
			if(this.status == 200 && this.responseText != null && this.responseText != "")
			{
				alert(this.status+"::"+this.responseText.response);
				//var cats = JSON.parse(xmlhttp.responseText)
				//alert("DONE");
			}
		};
    xmlhttp1.send();
	  alert("HEALTHCHECK CALLED...2");


}

function getCategoryProducts(categ)
{
  alert("CATEGORY>>>>>"+categ);
}
function getResponseMessage(rsp)
{
  var resp = "";
  //resp = rsp.
}

function replaceContainer(page)
{
  var xmlhttp1;
  try{
    xmlhttp1 = new XMLHttpRequest();
  }catch(e)
  {
    try{
      xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
    }catch(e)
    {
      try {
        xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
      } catch (e) {
        alert("BROWSER BROKE");
        return false;
      }
    }
  }

  alert("page>>"+page);
  if(page == "about" || page == "contact")
    {
      //alert("about");
      xmlhttp1.open("GET","./"+page+"_container.html", true);
      //document.getElementById('container').innerHTML = "../about_container.html";
    }


    xmlhttp1.onreadystatechange = function() {
        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" ) {
            document.getElementById("container").innerHTML = xmlhttp1.responseText;
        }
    }
    xmlhttp1.send();

}

<!-- javascript-for-getting-config -->
window.onload = function() {
	//healthCheck();
	//loadCategories();
	//loadProducts();
}
