var baseStoreurl = "http://lincolnshire.mynetgear.com:8080/store";
var baseStoreAdminurl = "http://lincolnshire.mynetgear.com:8080/admin";
var imageFileUploadUrl ="http://lincolnshire.mynetgear.com:8080/fileUploadDownload";
var baseshopurl = "http://lincolnshire.mynetgear.com/shop";
var managerserviceUrl = "http://lincolnshire.mynetgear.com:8080/manager";
var redirectbaseurl = "http://lincolnshire.mynetgear.com"
var allProducts;
var billedCartProductDetails=[];
var allbilledCart;
var billedCartaddress=[];
var storeID = "0000000002";
var getConfigJSON = JSON.stringify ({
  "storeID" : storeID
});

const VENDOR_STORE_CONFIG_IMAGE ="image/vendorConfig";
const VENDOR_PRODUCT_IMAGE="image/vendorProduct";
const VENDOR_CATEGORY_IMAGE ="image/vendorCategory";
const VENDOR_ODERS_IMAGE ="image/vendorOrders";
const VENDOR_USERS_IMAGE ="image/vendorUsers";
const VENDOR_OFFERS_IMAGE ="image/vendorOffers";

function initAddUpdateProducts(pname, pdesc, rate, stock,thumbnailPath,squareImmagePath,cate,product_id)
{
	var xmlhttp1;
	var vendorId;
	if(new URLSearchParams(window.location.search).get("vendorId") == null || new URLSearchParams(window.location.search).get("vendorId") == 'null'){
  	  vendorId ="0000000002";
      }else{
       vendorId = new URLSearchParams(window.location.search).get("vendorId");
      }
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
	xmlhttp1.open("POST", baseStoreAdminurl+"/addUpdateProducts", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	xmlhttp1.onreadystatechange = function(){
	    if(this.status == 200 && this.responseText != null && this.responseText != "")
	        {
	    	 var res = JSON.parse(this.responseText);
	    	 var resp = res.response;	
		 window.location.href = "products.html?vendorId="+vendorId;
	        }
	      };
		xmlhttp1.send(JSON.stringify({"product":[{"product_name":pname,"product_description":pdesc, "product_price":rate, "product_quantity_avlbl":stock,"product_img_sqr_link":squareImmagePath,"product_img_link":thumbnailPath,"product_category":cate,"product_id":product_id}],"storeID":vendorId}));
}
function loadStoreConfig(){
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
	xmlhttp1.open("POST", baseStoreurl+"/getConfig", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
  alert("URL>>>>"+baseStoreurl+"/getConfig");
  xmlhttp1.onreadystatechange = function(){
    if(this.status == 200 && this.responseText != null && this.responseText != "")
        {

          //var res = JSON.parse(this.responseText);
          alert("RESPONSE>>>>"+this.responseText);
          var mainResponse = JSON.parse(this.responseText);
          var response = JSON.parse(mainResponse.response);
          alert("RESPONSE>>"+response);
          var tableData = "";

            tableData += '<tr class="rem1 odd">';
            tableData += '<td class="invert">Categories</td>';
            tableData += '<td class="invert">'+response[0].categories+'</td>';
            tableData += '</tr>';

            tableData += '<tr class="rem1 even">';
            tableData += '<td class="invert">Delivery Flag</td>';
            tableData += '<td class="invert">'+response[0].deliveryFlag+'</td>';
            tableData += '</tr>';

            tableData += '<tr class="rem1 odd">';
            tableData += '<td class="invert">Delivery Start Time</td>';
            tableData += '<td class="invert">'+response[0].deliveryStartTime+'</td>';
            tableData += '</tr>';

            tableData += '<tr class="rem1 even">';
            tableData += '<td class="invert">Delivery End Time</td>';
            tableData += '<td class="invert">'+response[0].deliveryEndTime+'</td>';
            tableData += '</tr>';

            tableData += '<tr class="rem1 odd">';
            tableData += '<td class="invert">Store Open Time</td>';
            tableData += '<td class="invert">'+response[0].storeStartTime+'</td>';
            tableData += '</tr>';

            tableData += '<tr class="rem1 even">';
            tableData += '<td class="invert">Store Close Time</td>';
            tableData += '<td class="invert">'+response[0].storeEndTime+'</td>';
            tableData += '</tr>';

            tableData += '<tr class="rem1 odd">';
            tableData += '<td class="invert">Store Days</td>';
            tableData += '<td class="invert">'+response[0].storeOpenDays+'</td>';
            tableData += '</tr>';
          //   categoryMiddle += '<li><a href="#" onClick="getCategoryProducts('+catarr[i].id+')">'+catarr[i].id+'</a></li>';
          //   alert("CATEGORY>>>"+categoryMiddle);
          alert(document.getElementById('container').innerHTML);
          alert(tableData);
          document.getElementById('container').innerHTML = tableData;
        }
      };

   alert(getConfigJSON);
	 xmlhttp1.send(getConfigJSON);
	 alert("OUTSIDE>>"+xmlhttp1.responseText);
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
  	xmlhttp1.open("POST", baseStoreAdminurl+"/getProducts", true);
  	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
  	xmlhttp1.onreadystatechange = function(){
      if(this.status == 200 && this.responseText != null && this.responseText != ""&&this.readyState==4)
          {
          var mainResponse = JSON.parse(this.responseText);
          var response = JSON.parse(mainResponse.response);
	  console.log(response);
	  tableData = '';
 	  for(i=0;i<response.length;i++)
	  {	
		console.log(i);
		var urlParam= "product_name="+response[i].product_name+"&product_id="+response[i].product_id+"&product_description="+response[i].product_description+"&product_price="+response[i].product_price+
						"&product_img_link="+encodeURI(response[i].product_img_link)+"&product_img_sqr_link="+encodeURI(response[i].product_img_sqr_link)+"product_id="+response[i].product_id+
						"&product_quantity_avlbl="+response[i].product_quantity_avlbl+"&product_status=Active"+"&editMode="+true+"&product_category="+response[i].product_category+"&vendorId="+new URLSearchParams(window.location.search).get("vendorId");
		if(i%2==0){
			tableData+='<tr id = '+response[i].product_id+' class = "rem'+[i]+' even">';
			tableData+= '<td class="invert"><input type="checkbox" id="checkbox'+[i]+'"/></td>';
			tableData+= '<td class="invert">'+response[i].product_id+'</td>';
			if(response[i].product_img_link === null || response[i].product_img_link ===""){
				tableData+='<td class="invert-image"><img src="images/channa.jpg" alt=" " class="img-responsive"></td>';
			}else{
				tableData+='<td class="invert-image"><img src="'+response[i].product_img_link+'" alt=" " class="img-responsive"></td>';
			}
			tableData+='<td class="invert">'+response[i].product_quantity_avlbl+'</td>';
			tableData+='<td class="invert">'+response[i].product_name+'; Description: '+response[i].product_description+'</td>';
			tableData+='<td class="invert">'+response[i].product_price+'</td>';
			tableData+='<td class="invert">Available</td>';
			tableData+='<td class="invert"><a href="productsEdit.html?'+urlParam+'"><button class="log_out">Edit</button></a></td>';
			tableData+='<td class="invert"><button class="log_out" onclick = "removeProducts('+response[i].product_id+')">Remove</button></td></tr>';
		} else{
			tableData+='<tr id = '+response[i].product_id+' class = "rem'+[i]+' odd ">';
			tableData+= '<td class="invert"><input type="checkbox" id="checkbox'+[i]+'"/></td>';
			tableData+='<td class="invert">'+response[i].product_id+'</td>';
			if(response[i].product_img_link === null || response[i].product_img_link ===""){
				tableData+='<td class="invert-image"><img src="images/channa.jpg" alt=" " class="img-responsive"></td>';
			}else{
				tableData+='<td class="invert-image"><img src="'+response[i].product_img_link+'" alt=" " class="img-responsive"></td>';
			}
			tableData+='<td class="invert">'+response[i].product_quantity_avlbl+'</td>';
			tableData+='<td class="invert">'+response[i].product_name+'; Description: '+response[i].product_description+'</td>';
			tableData+='<td class="invert">'+response[i].product_price+'</td>';
			tableData+='<td class="invert">Available</td>';
			tableData+='<td class="invert"><a href="productsEdit.html?'+urlParam+'"><button class="log_out">Edit</button></a></td>';
			tableData+='<td class="invert"><button class="log_out" onclick = "removeProducts('+response[i].product_id+')">Remove</button></td></tr>';
		}
		
		console.log(tableData);
	  }
	   document.getElementById('tbody-container').innerHTML = tableData;
          }
        };
        if(new URLSearchParams(window.location.search).get("vendorId") == null || new URLSearchParams(window.location.search).get("vendorId") == 'null'){
        	xmlhttp1.send('{ "storeID": "0000000002"}');
        	 $('#new_product_add').attr('href','productsEdit.html?vendorId=0000000002'); 
        }else{
        	var vendorId = new URLSearchParams(window.location.search).get("vendorId");
        	xmlhttp1.send(JSON.stringify({ "storeID":vendorId}));
        	 $('#new_product_add').attr('href','productsEdit.html?vendorId='+vendorId); 
        }
  	
    }
  function loadProductEditPage(url){
	  populateCategoryDropDown (url);
	  if(url.get("product_name") != null){
		  console.log("Ready to load edit page data...")
		  $("#product_name").val(url.get('product_name'));
		  $("#product_desc").val(url.get('product_description'));
		  $("#product_rate").val(url.get('product_price'));
		  $("#product_stock").val(url.get('product_quantity_avlbl'));
		  $("#product_img_link").attr('src',decodeURI(url.get('product_img_link')));
		  $("#product_id_hidden").val(url.get('product_id'));
		  if(decodeURI(url.get('product_img_link'))== null ||decodeURI(url.get('product_img_link'))== null ){
			  $("#product_img_link").attr('src','images/channa.jpg.jpg');  
		  }
		  $("#product_img_sqr_link").attr('src',decodeURI(url.get('product_img_sqr_link')));
		  if(decodeURI(url.get('product_img_link'))== null ||decodeURI(url.get('product_img_sqr_link'))== null ){
			  $("#product_img_sqr_link").attr('src','images/channa.jpg.jpg');  
		  }
	  }
  }
  function populateCategoryDropDown (url){
	  $.ajax({
			type:"POST",
			contentType:"APPLICATION/JSON",
			content:"JSON",
			crossDomain : true,
			async: true,
			headers: {"Authorization": "Bearer" + localStorage.getItem("token")},
			url:baseStoreAdminurl + "/getConfig",
			data:JSON.stringify({"storeID":url.get("vendorId")}),
			success: function(data){
				var res = JSON.parse(data.response);
				if(!$.isEmptyObject(res)){
					console.log(res[0].vendorId)
					var cattr = res[0].categories.split(",");
					if(!$.isEmptyObject(cattr)){
						console.log("populating drop down..")
						var selectHTMLSart= '<select id = "product_category" class="form-control" type="text" placeholder="Category">';
						var selectHTMLMiddle='';
						var selectHTMLEnd='</select>';
						$.each(cattr, function(k,val) {
						selectHTMLMiddle+= '<option value="'+val+'">'+val+'</option>';
						 console.log('value='+val+',text='+val);
						});
						console.log("drop down populated")
						$('#product_category').html(selectHTMLSart+selectHTMLMiddle+selectHTMLEnd);
						if(url.get("product_name") != null){
						setTimeout(function() {
							$("#product_category option:contains("+url.get("product_category")+")").attr('selected',true);
						}, 1000)}
					}
				}
			},
			error: function(XMLHttpRequest, txtStatus, error){
				alert("exception occurs in getting vendor config")
			}
			
		});  
  }
  
  function removeProducts(i)
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
	xmlhttp1.open("POST", baseStoreAdminurl+"/removeProduct", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	xmlhttp1.onreadystatechange = function(){
	    if(this.status == 200 && this.responseText != null && this.responseText != "")
	        {
	    	 var res = JSON.parse(this.responseText);
	    	 var resp = res.response;
	         console.log(resp);
	         window.location.href = "products.html";
	        }
	      };

		xmlhttp1.send(JSON.stringify({"product":[{"product_id":i}],"storeID":storeID}));
  }
	
  function mergeProductsUtil(pid1, pid2)
  {
	var xmlhttp1;
	var xmlhttp2;
	  try{
	    xmlhttp1 = new XMLHttpRequest();
	    xmlhttp2 = new XMLHttpRequest();
	  }catch(e)
	  {
	    try{
	      xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
	      xmlhttp2 = new ActiveXObject("Msxml2.XMLHTTP");
	    }catch(e)
	    {
	      try {
	        xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
		xmlhttp2 = new ActiveXObject("Microsoft.XMLHTTP")
	      } catch (e) {
	        alert("BROWSER BROKE");
	        return false;
	      }
	    }
	  }
	var stock1, stock2;
	document.getElementById("section").innerHTML = '<table id = "merge_table" border = "1px solid black"></table>';
	document.getElementById("merge_table").innerHTML = '<tr><th>Product 1</th><th>Product 2</th></tr>';
	document.getElementById("merge_table").innerHTML += '<tr><td id = "p1_name"></td><td id = "p2_name"></td></tr>';
	document.getElementById("merge_table").innerHTML += '<tr><td id = "p1_price"></td><td id = "p2_price"></td></tr>';
	document.getElementById("merge_table").innerHTML += '<tr><td id = "p1_description"></td><td id = "p2_description"></td></tr>';
	document.getElementById("section").innerHTML += '<br><button class="submit check_out" id="product_merge">Submit</button>';
	xmlhttp1.open("POST", baseStoreAdminurl+"/getProductMerge?storeID="+storeID+"&id="+(pid1.toString()), true);
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	xmlhttp1.onreadystatechange = function(){
	    if(this.status == 200 && this.responseText != null && this.responseText != "")
	        {
	    	 var res = JSON.parse(this.responseText);
		 var resp = JSON.parse(res.response);
		document.getElementById("p1_name").innerHTML = '<input type="radio" name="p_name" id = "p1_name_radio" value="'+resp.product_name+'">'+resp.product_name;
		document.getElementById("p1_price").innerHTML = '<input type="radio" name="p_price" id = "p1_price_radio" value="'+resp.product_price+'">'+resp.product_price;
		document.getElementById("p1_description").innerHTML = '<input type="radio" name="p_desc" id = "p1_desc_radio" value="'+resp.product_description+'">'+resp.product_description;
		stock1 = resp.product_quantity_avlbl;
		console.log(document.getElementById("p1_description").innerHTML);
	        }
	      };
	xmlhttp1.send();
	xmlhttp2.open("POST", baseStoreAdminurl+"/getProductMerge?storeID="+storeID+"&id="+(pid2.toString()), true);
	xmlhttp2.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	xmlhttp2.onreadystatechange = function(){
	    if(this.status == 200 && this.responseText != null && this.responseText != "")
	        {
		console.log("Call 2");
	    	var res = JSON.parse(this.responseText);
		 var resp = JSON.parse(res.response);
		document.getElementById("p2_name").innerHTML = '<input type="radio" id = "p2_name_radio" name="p_name" value="'+resp.product_name+'">'+resp.product_name;
		document.getElementById("p2_price").innerHTML = '<input type="radio" id = "p2_price_radio" name="p_price" value="'+resp.product_price+'">'+resp.product_price;
		document.getElementById("p2_description").innerHTML = '<input type="radio" id = "p2_desc_radio" name="p_desc"  value="'+resp.product_description+'">'+resp.product_description;
		stock2 = resp.product_quantity_avlbl;

	        }
	      };
	xmlhttp2.send();
	
	$("#product_merge").click(function (e) {
		var name;
		var price;
		var description;
		var pid_to_be_removed;
		if (document.getElementById('p1_name_radio').checked) {
			  name = document.getElementById('p1_name_radio').value;
			  pid_to_be_removed = pid2;
		}	
		else
		{
			name = document.getElementById('p2_name_radio').value;
			pid_to_be_removed = pid1;
		}
		if (document.getElementById('p1_price_radio').checked) {
			  price = document.getElementById('p1_price_radio').value;
		}	
		else
		{
			price = document.getElementById('p2_price_radio').value;
		}

		if (document.getElementById('p1_desc_radio').checked) 	
		{		  
			description = document.getElementById('p1_desc_radio').value;
		}	
		else
		{	
			description = document.getElementById('p2_desc_radio').value;
		}
		var temp = stock1 + stock2;
		alert(temp);
		initAddUpdateProducts(name,description,price,temp);
		removeProducts(pid_to_be_removed);
		alert("Process Completed");
	});
  }
  
 function mergeProducts(){
	 var selected_product_id =[];
		if($("#product_table input[type=checkbox]:checked").length ==2){
			$("#product_table input[type=checkbox]:checked").each(function (){
				var row = $(this).closest('tr');
				selected_product_id.push(row[0].cells[1].innerText);
			})
			if(selected_product_id.length==2){
				window.location.href="productsMerge.html?product_one="+selected_product_id[0]+"&product_two="+selected_product_id[1];
			}
		} else if($("#product_table input[type=checkbox]:checked").length >2){
			alert("can not select more than two items to merge.")
		} else if($("#product_table input[type=checkbox]:checked").length==1){
			alert("Please select one more product to merge and check related check boxe.")
		}else if($("#product_table input[type=checkbox]:checked").length==0){
			alert("You have not selected any Items to merge.Please select two items to merge")
		}
 }
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
  	xmlhttp1.open("POST", baseStoreAdminurl+"/getProducts", true);

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
  	xmlhttp1.send('{ "storeID": "0000000002"}');
  	//alert(xmlhttp1.responseText);
    }

  function healthCheck(){
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
		xmlhttp1.open("GET", baseStoreAdminurl+"/healthcheck", true);
		xmlhttp1.onreadystatechange = function() {
			if(this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState==4)
			{
				var res = JSON.parse(this.responseText);
				if(res.rspnsCode === 1000){
					console.log(res.rspnsMsg);
				}
				if(res.rspnsMsg == "DB DOWN" && res.rspnsCode==700){
					alert(res.rspnsMsg+"!")
				}
			}else if(this.status == 0 && this.responseText != null && this.responseText == "")
			{
				alert("ERR_CONNECTION")
			}
		};
		xmlhttp1.send();
		console.log("HEALTHCHECK CALLED FOR SHOP ADMIN..");

	}

/*load vendor configuration on dom ready event*/
function loadVendorConfig(vendorId){
	var ven_id ="0000000002";
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
	  	xmlhttp1.open("POST", baseStoreAdminurl+"/getConfig", true);
	  	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	  	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	  	xmlhttp1.onreadystatechange = function(){
	      if(this.status == 200 && this.responseText != null && this.responseText != "")
	          {
	          var mainResponse = JSON.parse(this.responseText);
	          var response = JSON.parse(mainResponse.response);
	          if(!$.isEmptyObject(response)){
	          var tableData = "";

	          	tableData += '<tr class="rem1 odd">';
	            tableData += '<td class="invert">Shop Name</td>';
	            tableData += '<td class="invert">'+response[0].shopName+'</td>';
	            tableData += '</tr>';
	            
	            tableData += '<tr class="rem1 even">';
	            tableData += '<td class="invert">Categories</td>';
	            tableData += '<td class="invert">'+response[0].categories+'</td>';
	            tableData += '</tr>';
	            
	            tableData += '<tr class="rem1 odd">';
	            tableData += '<td class="invert">Category Description:</td>';
	            tableData += '<td class="invert">'+response[0].categoryDescription+'</td>';
	            tableData += '</tr>';

	            tableData += '<tr class="rem1 even">';
	            tableData += '<td class="invert">Delivery Flag</td>';
	            tableData += '<td class="invert">'+response[0].deliveryFlag+'</td>';
	            tableData += '</tr>';

	            tableData += '<tr class="rem1 odd">';
	            tableData += '<td class="invert">Delivery Start Time</td>';
	            tableData += '<td class="invert">'+response[0].deliveryStartTime+'</td>';
	            tableData += '</tr>';

	            tableData += '<tr class="rem1 even">';
	            tableData += '<td class="invert">Delivery End Time</td>';
	            tableData += '<td class="invert">'+response[0].deliveryEndTime+'</td>';
	            tableData += '</tr>';

	            tableData += '<tr class="rem1 odd">';
	            tableData += '<td class="invert">Store Open Time</td>';
	            tableData += '<td class="invert">'+response[0].storeStartTime+'</td>';
	            tableData += '</tr>';

	            tableData += '<tr class="rem1 even">';
	            tableData += '<td class="invert">Store Close Time</td>';
	            tableData += '<td class="invert">'+response[0].storeEndTime+'</td>';
	            tableData += '</tr>';

	            tableData += '<tr class="rem1 odd">';
	            tableData += '<td class="invert">Store Days</td>';
	            tableData += '<td class="invert">'+response[0].storeOpenDays+'</td>';
	            tableData += '</tr>';
	            
	            tableData += '<tr class="rem1 even">';
	            tableData += '<td class="invert">Status</td>';
	            tableData += '<td class="invert">'+response[0].status+'</td>';
	            tableData += '</tr>';
	            
	            tableData += '<tr class="rem1 odd">';
	            tableData += '<td class="invert">Delivery Location Id</td>';
	            tableData += '<td class="invert">'+response[0].deliveryLocationId+'</td>';
	            tableData += '</tr>';
	            
	            tableData += '<tr class="rem1 even">';
	            tableData += '<td class="invert">Contact</td>';
	            tableData += '<td class="invert">'+response[0].phone+'</td>';
	            tableData += '</tr>';
	            
	            tableData += '<tr class="rem1 odd">';
	            tableData += '<td class="invert">email</td>';
	            tableData += '<td class="invert">'+response[0].email+'</td>';
	            tableData += '</tr>';
	            
	            tableData += '<tr class="rem1 even">';
	            tableData += '<td class="invert">Address</td>';
	            tableData += '<td class="invert">'+response[0].address+'</td>';
	            tableData += '</tr>';
	            
	            tableData += '<tr class="rem1 odd">';
	            tableData += '<td class="invert">Country</td>';
	            tableData += '<td class="invert">'+response[0].country_code+'</td>';
	            tableData += '</tr>';
	            var imagesrcEncoded = encodeURI(response[0].shopLogoLink);
	            var imageAboutEncoded = encodeURI(response[0].aboutShopLogoLink);
	            var url ="storeConfigEdit.html?vendorId="+response[0].vendorId+"&shopName="+response[0].shopName+"&categories="+response[0].categories+"&categoryDescription="
	            +response[0].categoryDescription+"&deliveryFlag="+response[0].deliveryFlag+"&deliveryStartTime="+response[0].deliveryStartTime+
	            "&deliveryEndTime="+response[0].deliveryEndTime+"&storeStartTime="+response[0].storeStartTime+"&storeEndTime="+response[0].storeEndTime+
	            "&storeOpenDays="+response[0].storeOpenDays+"&status="+response[0].status+"&deliveryLocationId="+response[0].deliveryLocationId+
	            "&phone="+response[0].phone+"&email="+response[0].email+"&address="+response[0].address+"&shopLogoLink="+imagesrcEncoded+"&aboutShopLogoLink="+imageAboutEncoded+
	            "&featuresOne="+response[0].featuresOne+"&featuresTwo="+response[0].featuresTwo+"&featuresThree="+response[0].featuresThree+"&featuresFour="+response[0].featuresFour+
	            "&featuresFive="+response[0].featuresFive+"&featuresSix="+response[0].featuresSix+"&aboutUs="+response[0].aboutUs+"&editMode="+true+"&country_code="+response[0].country_code;
	            $('#tbl_body_container').html(tableData);
	            $('#aboutUs').text(response[0].aboutUs);
	            $('#featuresOne').text(response[0].featuresOne);
	            $('#featuresTwo').text(response[0].featuresTwo);
	            $('#featuresThree').text(response[0].featuresThree);
	            $('#featuresFour').text(response[0].featuresFour);
	            $('#featuresFive').text(response[0].featuresFive);
	            $('#featuresSix').text(response[0].featuresSix);
	            $('#shopLogoLink').attr("src",response[0].shopLogoLink);
	            if(response[0].shopLogoLink == null || response[0].shopLogoLink =="" )
	            {
	            	$('#shopLogoLink').attr("src","images/logo.png");
	            }
	            $('#aboutShopLogoLink').attr("src",response[0].aboutShopLogoLink);
	            if(response[0].aboutShopLogoLink == null || response[0].aboutShopLogoLink =="" )
	            {
	            	$('#aboutShopLogoLink').attr("src","images/shopping-basket.png");
	            }
	            $("#edit_link").attr("href",url);
	            $("#vendor_id").val(response[0].vendorId);
	            $("#vendor_config_add_manger").attr("href","addManager.html?vendorId="+response[0].vendorId);
	          }
	          else{
	        	  $("#edit_link").attr("href","storeConfigEdit.html?vendorId="+new URLSearchParams(window.location.search).get('vendorId')+""); 
	          }
	          }
	        };
	        if(vendorId != null){
	        	ven_id = vendorId;
	        }
	  	xmlhttp1.send(JSON.stringify ({"storeID" : ven_id}));
}

function addUpdateVendorConfig(url){
	var jsonStr="";
	var category_name_new =	$("#category_name").val();
	var category_des_new=$("#categoryDescription").val();
	var status_new = $("#status").val();
	var shop_name_new = $("#shopName").val();
	var deliveryFlag_new = $("#deliveryFlag").val();
	var deliveryLocationId_new = $("#deliveryLocationId").val();
	var deliveryStartTime_new = $("#deliveryStartTime").val();
	var deliveryEndTime_new = $("#deliveryEndTime").val();
	var storeStartTime_new = $("#storeStartTime").val();
	var storeEndTime_new = $("#storeEndTime").val();
	var storeOpenDays_new = $("#storeOpenDays").val();
	var phone_new = $("#phone").val();
	var address_new = $("#address").val();
	var shopLogoLink_new = $("#shopLogoLinkEdit").attr('src');
	var aboutShopLogoLink_new = $("#aboutShopLogoLink").attr('src');
	var featuresOne_new  = $("#featuresOne").val();
	var featuresTwo_new  = $("#featuresTwo").val();
	var featuresThree_new  = $("#featuresThree").val();
	var featuresFour_new  = $("#featuresFour").val();
	var featuresFive_new  = $("#featuresFive").val();
	var featuresSix_new  = $("#featuresSix").val();
	var aboutUs_new  = $("#aboutUs").val();
	var email_new  = $("#email").val();
	var country_code_new = $("#country_code").val();
	if(deliveryFlag_new=="Enabled"){
		deliveryFlag_new= 1;
	}else{
		deliveryFlag_new= 0;
	}
	jsonStr = JSON.stringify({"vendorId":url.get("vendorId"),"categories":category_name_new,"categoryDescription":category_des_new,"deliveryFlag":deliveryFlag_new,
		"deliveryStartTime":deliveryStartTime_new,"deliveryEndTime":deliveryEndTime_new,"storeStartTime":storeStartTime_new,"storeEndTime":storeEndTime_new,
		"storeOpenDays":storeOpenDays_new,"status":status_new,"shopName":shop_name_new,"deliveryLocationId":deliveryLocationId_new,"phone":phone_new,
		"address":address_new,"shopLogoLink":shopLogoLink_new,"email":email_new,"featuresOne":featuresOne_new,"featuresTwo":featuresTwo_new,"featuresThree":featuresThree_new,"featuresFour":featuresFour_new,
		"featuresFive":featuresFive_new, "featuresSix":featuresSix_new,"aboutUs":aboutUs_new,"aboutShopLogoLink":aboutShopLogoLink_new,"country_code":country_code_new
	});
	
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
	xmlhttp1.open("POST", baseStoreAdminurl+"/addUpdateStoreCfg", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	xmlhttp1.onreadystatechange = function(){
	    if(this.status == 200 && this.responseText != null && this.responseText != "")
	        {
	    	 var res = JSON.parse(this.responseText);
	    	 var resp = res.response;
	         console.log(resp);
	         window.location.href = "storeConfig.html?vendorId="+url.get("vendorId");
	        }
	      };

		xmlhttp1.send(jsonStr);
}
 function loadVendorConfigEditPage(url){
	 	$("#shopName").val(url.get("shopName"));
	 	$("#category_name").val(url.get("categories"));	
		 $("#categoryDescription").val(url.get("categoryDescription"));
		$("#status option:contains(\""+url.get("status")+"\")").attr('selected',true);
		$("#country_code option:contains(\""+url.get("country_code")+"\")").attr('selected',true);
		if(url.get("deliveryFlag") ==1){
			$("#deliveryFlag option:contains(\"Enabled\")").attr('selected',true);
		}else{
			$("#deliveryFlag option:contains(\"Disabled\")").attr('selected',true);
		}
		$("#deliveryLocationId").val(url.get("deliveryLocationId"));
		$("#deliveryStartTime").val(url.get("deliveryStartTime"));
		$("#deliveryEndTime").val(url.get("deliveryEndTime"));
		$("#storeStartTime").val(url.get("storeStartTime"));
		$("#storeEndTime").val(url.get("storeEndTime"));
		$("#storeOpenDays").val(url.get("storeOpenDays"));
		$("#phone").val(url.get("phone"));
		$("#address").val(url.get("address"));
		$("#shopLogoLink").attr('src',decodeURI(url.get("shopLogoLink")));
		$("#shopLogoLinkEdit").attr('src',decodeURI(url.get("shopLogoLink")));
		if(decodeURI(url.get("shopLogoLink")) =="" || decodeURI(url.get("shopLogoLink"))==null){
			$("#shopLogoLink").attr('src',"images/logo.png");
			$("#shopLogoLinkEdit").attr('src',"images/logo.png");
		}
		$("#aboutShopLogoLink").attr('src',decodeURI(url.get("aboutShopLogoLink")));
		if(decodeURI(url.get("shopLogoLink")) =="" || decodeURI(url.get("aboutShopLogoLink"))==null){
			$("#aboutShopLogoLink").attr('src',"images/shopping-basket.png");
		}
		$("#email").val(url.get("email"));
		$("#featuresOne").val(url.get("featuresOne"));
		$("#featuresTwo").val(url.get("featuresTwo"));
		$("#featuresThree").val(url.get("featuresThree"));
		$("#featuresFour").val(url.get("featuresFour"));
		$("#featuresFive").val(url.get("featuresFive"));
		$("#featuresSix").val(url.get("featuresSix"));
		$("#aboutUs").val(url.get("aboutUs"));
 }
function softDeleteVendorConfig(storeID){
	$.ajax({
		type:"DELETE",
		contentType:"APPLICATION/JSON",
		content:"JSON",
		crossDomain : true,
		headers: {"Authorization": "Bearer" + localStorage.getItem("token")},
		async: true,
		url:baseStoreAdminurl + "/deleteStoreCfg",
		data:JSON.stringify({"storeID":storeID}),
		success: function(data){
			if(data.response==="VENDOR CONFIG DELETED!"){
				window.location.href ="storeConfig.html"
			}
		},
		error: function(XMLHttpRequest, txtStatus, error){
			alert("exception while deleting vendor config")
		}
		
	});
}
function export_table_to_csv(html, filename) {
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
	xmlhttp1.open("POST", baseStoreAdminurl+"/productCSV", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	xmlhttp1.onreadystatechange = function(){
	    if(this.status == 200 && this.responseText != null && this.responseText != "")
	        {
		       var res = JSON.parse(this.responseText);
       	    	       var resp = res.response;
		       console.log(resp);
		       download_csv(resp, filename);
	        }
	      };
		xmlhttp1.send(JSON.stringify({"product":[],"storeID":storeID}));	
}

function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;
    csvFile = new Blob([csv], {type: "text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
} 
function uploadFile()
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
        var formdata = new FormData(document.getElementById("upload-csv"));
	xmlhttp1.open("POST", baseStoreAdminurl+"/uploadCSV?storeID="+storeID, true);
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	xmlhttp1.send(formdata);
}

<!-- file upload -->
function validateImage(file,vendorId, type, imageType,edit,product_id){
	var imageTypeDesc;
	if(imageType ==="vendorProduct"){
		imageTypeDesc=VENDOR_PRODUCT_IMAGE;
	} else if(imageType ==="vendorConfig"){
		imageTypeDesc=VENDOR_STORE_CONFIG_IMAGE;
	} else if(imageType ==="vendorCategory"){
		imageTypeDesc=VENDOR_CATEGORY_IMAGE;
	} else if(imageType ==="vendorOrders"){
		imageTypeDesc=VENDOR_ODERS_IMAGE;
	} else if(imageType ==="vendorUsers"){
		imageTypeDesc=VENDOR_USERS_IMAGE;
	} else if(imageType ==="vendorOffers"){
		imageTypeDesc=VENDOR_OFFERS_IMAGE;
	}
	var thumbail = type ==="thumbnail" ? true : false
	var isEdit = false;
	if(edit == "true"){
		isEdit = true;
	}
	var fd = new FormData();
	fd.append('file', file);
	fd.append('vendorId', vendorId);
	fd.append('type', imageTypeDesc);
	fd.append("isThumbnail",thumbail)
	fd.append("isEdit",isEdit)
	fd.append("productId", product_id)
	$.ajax({
		  url: imageFileUploadUrl+"/validateImage",
		    type: 'POST',
		    processData: false,
		    contentType: false,
		    headers: {"Authorization": "Bearer" + localStorage.getItem("token")},
		    data: fd,
		    success: function (data, status, jqxhr) {
		    	var responseText = data.response;
		    	if(imageType ==="vendorConfig"){
		    		if(type ==="thumbnail"){
			    		if(responseText === "INVALID IMAGE FORMAT"){
				    		$("#shopLogoSelect").val("");
				    		$("#shopLogoSelect").focus();
				    		alert("Please use only jpeg/png format!")
				    		return false;
				    	}
				    	if(responseText === "INVALID FILE NAME"){
				    		$("#shopLogoSelect").val("");
				    		$("#shopLogoSelect").focus();
				    		alert("File name contains invalid characters!")
				    		return false;
				    	}
				    	if(responseText === "FILE SIZE EXCEEDE"){
				    		$("#shopLogoSelect").val("");
				    		$("#shopLogoSelect").focus();
				    		alert("Please select image maximum 2MB!")
				    		return false;
				    	}
				    	if(responseText === "FILE NAME EXIST!"){
				    		$("#shopLogoSelect").val("");
				    		$("#shopLogoSelect").focus();
				    		alert("Duplicate not allowed. Please contact administarion services!")
				    		return false;
				    	}
				    	if(responseText === "VALID IMAGE FILE"){
				    		console.log("selected image is valid image!");
				    		$("#btn_image_upload").attr('disabled', false);
				    		$("#btn_image_upload").addClass('btn-primary');
				    	}
			    	} else{
			    		if(responseText === "INVALID IMAGE FORMAT"){
				    		$("#shopLogoSelectAbout").val("");
				    		$("#shopLogoSelectAbout").focus();
				    		alert("Please use only jpeg/png format!")
				    		return false;
				    	}
				    	if(responseText === "INVALID FILE NAME"){
				    		$("#shopLogoSelectAbout").val("");
				    		$("#shopLogoSelectAbout").focus();
				    		alert("File name contains invalid characters!")
				    		return false;
				    	}
				    	if(responseText === "FILE SIZE EXCEEDE"){
				    		$("#shopLogoSelectAbout").val("");
				    		$("#shopLogoSelectAbout").focus();
				    		alert("Please select image maximum 2MB!")
				    		return false;
				    	}
				    	if(responseText === "FILE NAME EXIST!"){
				    		$("#shopLogoSelectAbout").val("");
				    		$("#shopLogoSelectAbout").focus();
				    		alert("Duplicate not allowed. Please contact administarion services!")
				    		return false;
				    	}
				    	if(responseText === "VALID IMAGE FILE"){
				    		console.log("selected image is valid image!");
				    		$("#btn_image_upload_about").attr('disabled', false);
				    		$("#btn_image_upload_about").addClass('btn-primary');
				    	}
			    	}
		    	} else if(imageType ==="vendorProduct"){
		    		if(responseText === "INVALID IMAGE FORMAT"){
			    		$("#shopLogoSelect").val("");
			    		$("#shopLogoSelect").focus();
			    		alert("Please use only jpeg/png format!")
			    		return false;
			    	}
			    	if(responseText === "INVALID FILE NAME"){
			    		$("#product_image_select").val("");
			    		$("#product_image_select").focus();
			    		alert("File name contains invalid characters!")
			    		return false;
			    	}
			    	if(responseText === "FILE SIZE EXCEEDE"){
			    		$("#product_image_select").val("");
			    		$("#product_image_select").focus();
			    		alert("Please select image maximum 2MB!")
			    		return false;
			    	}
			    	if(responseText === "FILE NAME EXIST!"){
			    		$("#product_image_select").val("");
			    		$("#product_image_select").focus();
			    		alert("Duplicate not allowed. Please contact administarion services!")
			    		return false;
			    	}
			    	if(responseText === "VALID IMAGE FILE"){
			    		console.log("selected image is valid image!");
			    		$("#btn_image_upload").attr('disabled', false);
			    		$("#btn_image_upload").addClass('btn-primary');
			    	}
		    	}
		    	
		    },
		    error: function (jqxhr, status, msg) {
		       alert("error in image validation!")
		    }
	})
}

function uploadImage(file,vendorId,type, imageType,product_id,edit){
	var imageTypeDesc;
	if(imageType ==="vendorProduct"){
		imageTypeDesc=VENDOR_PRODUCT_IMAGE;
	} else if(imageType ==="vendorConfig"){
		imageTypeDesc=VENDOR_STORE_CONFIG_IMAGE;
	} else if(imageType ==="vendorCategory"){
		imageTypeDesc=VENDOR_CATEGORY_IMAGE;
	} else if(imageType ==="vendorOrders"){
		imageTypeDesc=VENDOR_ODERS_IMAGE;
	} else if(imageType ==="vendorUsers"){
		imageTypeDesc=VENDOR_USERS_IMAGE;
	} else if(imageType ==="vendorOffers"){
		imageTypeDesc=VENDOR_OFFERS_IMAGE;
	}				
	var fd = new FormData();
	var thumbail = type ==="thumbnail" ? true : false
	var isEdit = false;
	if(edit == "true"){
		isEdit = true;
	}
	fd.append('file', file);
	fd.append('vendorId', vendorId);
	fd.append('type', imageTypeDesc);
	fd.append("isThumbnail", thumbail);
	fd.append("productId", product_id);
	fd.append("isEdit",isEdit);
	
	$.ajax({
		  	url: imageFileUploadUrl+'/upload',
		    type: 'POST',
		    async:true,
		    processData: false,
		    contentType: false,
		    headers: {"Authorization": "Bearer" + localStorage.getItem("token")},
		    data: fd,
		    success: function (data, status, jqxhr) {
		    	var responseText = data.response;
		    	if(imageType ==="vendorConfig"){
		    		if(type ==="thumbnail"){
				    	if(responseText.indexOf(".png")|| responseText.indexOf(".jpeg")||responseText.indexOf(".jpg")){
				    		console.log("selected image is valid image!");
				    		$("#btn_image_upload").attr('disabled', true);
				    		$("#btn_image_upload").removeClass('btn-primary');
				    		$("#div_shop_logo").show();
							$("#div_shop_file_select").hide();
							$("#shopLogoLinkEdit").attr('src',responseText); 
				    	}
			    	} else{
			    		if(responseText === "FILE NAME EXIST!"){
				    		$("#btn_image_upload_about").attr('disabled', true);
				    		$("#btn_image_upload_about").addClass('btn-primary');
				    		$("#shopLogoSelectAbout").val("");
				    		$("#shopLogoSelectAbout").focus();
				    		alert("Please select another image. Image name alredy exists!")
				    		return false;
				    	} 
				    	if(responseText.indexOf(".png")|| responseText.indexOf(".jpeg")||responseText.indexOf(".jpg")){
				    		console.log("selected image is valid image!");
				    		$("#btn_image_upload_about").attr('disabled', true);
				    		$("#btn_image_upload_about").removeClass('btn-primary');
				    		$("#div_shop_logo_about").show();
							$("#div_shop_file_select_about").hide();
							$("#aboutShopLogoLink").attr('src',responseText); 
				    	}
			    	}
		    	} else if(imageType ==="vendorProduct"){
		    		var imageThumb = responseText.split(",")[0];
		    		var imagesquare = responseText.split(",")[1];
			    	if(responseText.indexOf(".png")|| responseText.indexOf(".jpeg")||responseText.indexOf(".jpg")){
			    		console.log("selected image is valid image!");
			    		$("#btn_image_upload").attr('disabled', true);
			    		$("#btn_image_upload").removeClass('btn-primary');
			    		$("#div_product_image").show();
						$("#div_product_image_select").hide();
						$("#product_img_link").attr('src',imageThumb); 
						$("#product_img_sqr_link").attr('src',imagesquare); 
			    	}
		    	}
		    },
		    error: function (jqxhr, status, msg) {
		       alert("error in image validation!")
		    }
	})
}

function getAdminDetailsByID(vendorId){
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
	xmlhttp1.open("GET", baseStoreAdminurl+"/getUser?vendorId="+vendorId, true);
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	xmlhttp1.onreadystatechange = function() {
		if(this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState==4)
		{
			var res = JSON.parse(this.responseText);
			if(res.response){
				globalAdmin = JSON.parse(res.response);
				$("#admin_name").html("Welcome <span>"+globalAdmin.firstName.toLocaleUpperCase()+"&nbsp"+globalAdmin.lastName.toLocaleUpperCase()+"</span> !!.")
				console.log(globalAdmin.firstName);
			}
			
		}
	};
	xmlhttp1.send();
}

function checkforneworders(vendorId){
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
	xmlhttp1.open("POST", baseStoreAdminurl+"/getallbilledCart", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	xmlhttp1.onreadystatechange = function() {
		if(this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState==4)
		{
			var res = JSON.parse(this.responseText);
			var billedCart = JSON.parse(res.response);
			if(!$.isEmptyObject(billedCart)){
				if(billedCart.length > 9){
					$("#new_cart_count").show();
					$('#new_cart_count').html('9<sup>+</sup>');
				}else{
					$("#new_cart_count").show();
					$("#new_cart_count").text(""+billedCart.length+"");
				}
			}else{
				$("#new_cart_count").hide();
			}
			
		}
	};
	xmlhttp1.send(JSON.stringify({"storeID":vendorId}));
}

function getAllBilledCart(vendorId){
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
	xmlhttp1.open("POST", baseStoreAdminurl+"/getallbilledCart", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	xmlhttp1.onreadystatechange = function() {
		if(this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState==4)
		{
			var res = JSON.parse(this.responseText);
			allbilledCart = JSON.parse(res.response);
			if(!$.isEmptyObject(allbilledCart)){
				for(var i=0; i<allbilledCart.length; i++){
					getBilledCartProductDetails(allbilledCart[i].cartID,allbilledCart.length,i);
				}
			} else{
				showorderdetails();
			}
		}
	};
	xmlhttp1.send(JSON.stringify({"storeID":vendorId}));
}

function getBilledCartProductDetails(billedCartID,cartlength,iteration){
	var pramString = JSON.stringify({"cartID":billedCartID});
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
	  xmlhttp1.open("POST", baseStoreAdminurl+"/getMyCart", true);
	  xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	  xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))

	    xmlhttp1.onreadystatechange = function() {
	        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && xmlhttp1.readyState==4) {
	        	var res = JSON.parse(this.responseText);
	        	cartProductDetails = JSON.parse(res.response);
	        	if(!$.isEmptyObject(cartProductDetails)){
	        		billedCartProductDetails.push(cartProductDetails);
	        		getBilledCartAddress("",cartProductDetails[0].order_id,cartlength,iteration);
				   }
	        }
	    }
	    xmlhttp1.send(pramString);
}

function getBilledCartAddress(userId,cartID,cartlength,iteration){
	var pramString = JSON.stringify({"userID":userId,"cartID":cartID});
	
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
	xmlhttp1.open("POST", baseStoreAdminurl+"/getCartDeliveryAddress", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	
	xmlhttp1.onreadystatechange = function() {
		if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != ""&& xmlhttp1.readyState==4) {
			var res = JSON.parse(this.responseText);
            var cartaddress = JSON.parse(res.response);
            if(!$.isEmptyObject(cartaddress)){
            	billedCartaddress.push(cartaddress[0]);
            }
            if(cartlength-1==iteration){
            	showorderdetails();
            }
		}
	}
	xmlhttp1.send(pramString);
}

function showorderdetails(){
	if(!$.isEmptyObject(allbilledCart) && !$.isEmptyObject(billedCartProductDetails)){
		tableData="";
		for(var i=0; i<allbilledCart.length; i++){
			var orderId=allbilledCart[i].cartID;
			var time_stamp= new Date(allbilledCart[i].create_ts).toLocaleDateString("en-US");
			var amount=allbilledCart[i].total_cost;
			var product_details="";
			var dilivery_to = billedCartaddress[i].fullName+"\n"+billedCartaddress[i].houseNo+","+billedCartaddress[i].addressFirst;
			dilivery_to += "\n"+billedCartaddress[i].addressTwo+","+billedCartaddress[i].city;
			dilivery_to += "\n"+billedCartaddress[i].landmark+","+billedCartaddress[i].zip;
			var state =billedCartaddress[i].state;
			var status =allbilledCart[i].payment_status;
			var user_name ="";
			for(var j=0; j<billedCartProductDetails[i].length; j++){
				if(j==0){
					product_details += billedCartProductDetails[i][j].product_name;
				}else{
					product_details += ","+ billedCartProductDetails[i][j].product_name;
				}
				
			}
			
			if(i%2==0){
				tableData+='<tr class = "rem'+[i]+' even">';
				tableData+= '<td class="invert">'+orderId+'</td>';
				tableData+='<td class="invert">'+time_stamp+'</td>';
				tableData+='<td class="invert">N/A</td>';
				tableData+='<td class="invert">'+product_details+'</td>';
				tableData+='<td class="invert">'+amount+'</td>';
				tableData+='<td class="invert">'+dilivery_to+'</td>';
				tableData+='<td class="invert">'+state+'</td>';
				tableData+='<td class="invert">'+status+'</td>';
				tableData+='<td class="invert"><button class="log_out" onclick = "editorder()">Accept</button></td></tr>';
			} else{
				tableData+='<tr class = "rem'+[i]+' odd">';
				tableData+= '<td class="invert">'+orderId+'</td>';
				tableData+='<td class="invert">'+time_stamp+'</td>';
				tableData+='<td class="invert">N/A</td>';
				tableData+='<td class="invert">'+product_details+'</td>';
				tableData+='<td class="invert">'+amount+'</td>';
				tableData+='<td class="invert">'+dilivery_to+'</td>';
				tableData+='<td class="invert">'+state+'</td>';
				tableData+='<td class="invert">'+status+'</td>';
				tableData+='<td class="invert"><button class="log_out" onclick = "editorder()">Accept</button></td></tr>';
			}
			
		}
		 document.getElementById('order_detail_container').innerHTML = tableData;
	   }
}

function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i <ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
	  }
	  return "";
	}
<!--manager registration -->
function initManagerSignUpServices(vendorid) {
	var email = $("#email_id").val();
	var phone = $("#phone").val();
	var firstName = $("#first_name").val();
	var lastName = $("#last_name").val();
	var pass = $("#txtConfirmPassword").val();
	var xmlhttp1;
	try {
		xmlhttp1 = new XMLHttpRequest();
	} catch (e) {
		try {
			xmlhttp1 = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlhttp1 = new ActiveXObject("Microsoft.XMLHTTP")
			} catch (e) {
				alert("BROWSER BROKE");
				return false;
			}
		}
	}
	xmlhttp1.open("POST", managerserviceUrl + "/addUpdateManager", true);
	xmlhttp1.setRequestHeader('Content-type','application/json;charset=UTF-8');
	xmlhttp1.onreadystatechange = function() {
		if (this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState==4) {
			var res = JSON.parse(this.responseText);
			var loginRes = res.response;
			console.log(loginRes);
			var uid = loginRes.split("=")[1];
			if(uid != null && uid !=""){
				window.location.href = "managerList.html?vendorId="+vendorid;
			}
			else{
				$("#signup_form_error").show();
				$("#spn_error").text("ERROR WHILE REGISTERING MANAGER USER:"+loginRes);
			}
		}
	};

	xmlhttp1.send(JSON.stringify({
		"created_by": vendorid,
		"createdBy":vendorid,
		"emailId" : email,
		"first_name" : firstName,
		"last_name" : lastName,
		"password" : pass,
		"phone" : phone,
		"roles" : []
	}));
	console.log("waiting for server response....");
}
function enableManagerSubmitButton(){
	var enable_next_button = false;
	if($('#first_name').val() == ""||$('#first_name').val() == null){
		$("#first_name").focus();
		return enable_next_button = false;
	}if($('#last_name').val() == ""||$('#last_name').val() == null){
		$("#last_name").focus();
		return true;
	}if($('#email_id').val() == ""||$('#email_id').val() == null){
		$("#email_id").focus();
		return enable_next_button = false;
	} if($('#phone').val() == ""||$('#phone').val() == null){
		$("#phone").focus();
		return enable_next_button = false;
	} if ($('#txtNewPassword').val() =="") {
		$('#txtNewPassword').focus();
		return enable_next_button = false;
	}  if ($('#txtConfirmPassword').val() =="") {
		$('#txtConfirmPassword').focus();
		return enable_next_button = false;
	} 
	
	if(enable_next_button){
		$("#reg_form_submit").attr('disabled',true);
	}else{
		$("#reg_form_submit").attr('disabled',false);
	}		
}

function managerEmailValidation(){
	var emailRegx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (emailRegx.test($("#email_id").val())) {
		$.ajax({
			type : "GET",
			contentType : "APPLICATION/JSON",
			crossDomain : true,
			dataType : "json",
			url : managerserviceUrl + "//checkExistingLoginID",
			data : {
				"email_id" : $("#email_id").val()
			},
			success : function(data) {
					if(data.rspnsMsg == "ID ALREADY EXISTS" && data.rspnsCode==700){
						alert("This Email Id is already registered.\nPlease Use different");
						$("#email_id").focus();
						$("#error_mail").show();
						$("#error_mail").html("<strong>Error:</strong>Entered email Id is already registered.Please Use different email Id.");
						return false;
					}else{
						$("#error_mail").hide();
					}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	} else{
		$("#email_id").focus();
		$("#error_mail").show();
		$("#error_mail").html("<strong>Error:</strong>Entered email Id is not valid Email.Please enter email in valid format.");
	}
}

function showManagerPassword(th){
	$(th).toggleClass("fa-eye fa-eye-slash");
		var input = $("#txtNewPassword");
		input.attr('type') === 'password' ? input.attr('type','text') : input.attr('type','password')
	
}
function matchManagerPassword() {
	if ($('#txtNewPassword').val() != $('#txtConfirmPassword').val()) {
		alert("Entered passwrd does not match.Please enter again!");
		$("#txtConfirmPasswordSpan").hide();
		$('#txtConfirmPassword').val("");
		$('#txtConfirmPassword').focus();
		return false;
	} else {
		$("#txtConfirmPasswordSpan").show();
		$("#reset_form_submit").attr('disabled', false);
	}
}

function managerPasswordValidation(){
	var passRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
	if(!passRegx.test($("#txtNewPassword").val())){
		$("#txtNewPassword").focus();
		$("#exp_pass").hide();
		$("#error_pass").show();
		$("#error_pass").html("<strong>Error:</strong>Entered Password is not valid.Please Use 8 or up to 16 characters with at least one upper case letter, one lower case letter, one number and one special character.");
	} 
	else{
		$("#exp_pass").show();
		$("#error_pass").hide();
	}
}
function managerPhoneValidation(){
	var telRegx = /^(0|\+91)?-?[123456789]\d{9}$/;
	if(!telRegx.test($("#phone").val())){
		$("#phone").focus();
		$("#exp_phone").hide();
		$("#error_phone").show();
		$("#error_phone").html("<strong>Error:</strong>Entered Phone number is not valid.Please use 0-XXXXXXXXXX, 0XXXXXXXXXX, +91-XXXXXXXXXX OR Simply 10 digit mobile number.");
	} else{
		$.ajax({
			type : "GET",
			contentType : "APPLICATION/JSON",
			crossDomain : true,
			dataType : "json",
			url : managerserviceUrl + "/checkExistingPhoneNumber",
			data : {
				"phone" : $("#phone").val()
			},
			success : function(data) {
					if(data.rspnsMsg == "PHONE NUMBER ALREADY EXISTS" && data.rspnsCode==302){
						alert("This phone number is already registered.\nPlease Use different.");
						$("#phone").focus();
						$("#exp_phone").hide();
						$("#error_phone").show();
						$("#error_phone").html("<strong>Error:</strong>Entered Phone number is not valid.Please use 0-XXXXXXXXXX, 0XXXXXXXXXX, +91-XXXXXXXXXX OR Simply 10 digit mobile number.");
						return false;
					}else{
						$("#error_phone").hide();
						$("#exp_phone").show();
					}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	}
}
function firstNameValidation(){
	var firstNameRegx = /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/;
	if(!firstNameRegx.test($("#first_name").val())){
		$("#first_name").focus();
		alert("Mandatory single name with alphabate only, optional additional names, WITH spaces, WITH special characters like(hyphon, apostrophy and dot).");
	} 
}

function lastNameValidation(){
	var lastNameRegx = /^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/;
	if(!lastNameRegx.test($("#last_name").val())){
		$("#last_name").focus();
		alert("Mandatory single name with alphabate only, optional additional names, WITH spaces, WITH special characters like(hyphon, apostrophy and dot).");
	} 
}

function loadVendorManagerList(createdBy){
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
		xmlhttp1.open("GET", managerserviceUrl+"/getAllManager?createdBy="+createdBy, true);
		xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
		xmlhttp1.onreadystatechange = function() {
			if(this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState==4)
			{
				var tableData='';
				var res = JSON.parse(this.responseText);
				if(res.response){
					var response = JSON.parse(res.rspnsMsg);
					if(response.length>0){
						for(var i=0; i<response.length; i++){
							if(i%2==0){
								tableData+='<tr id = '+response[i].userId+' class = "rem'+[i]+' even">';
								tableData+='<td class="invert">'+response[i].id+'</td>';
								tableData+='<td class="invert">'+response[i].first_name+''+response[i].last_name+'</td>';
								tableData+='<td class="invert">'+response[i].emailId+'</td>';
								tableData+='<td class="invert">'+response[i].phone+'</td>';
								if(response[i].isEnabled){
									tableData+='<td class="invert">Active</td>';
								}else{
									tableData+='<td class="invert">Disabled</td>';
								}
								tableData+='<td class="invert">'+response[i].roles[0].roleName+'</td>';
								tableData+='<td class="invert">'+response[i].created_by+'</td>';
								tableData+='<td class="invert"><a href="addManager.html?vendorId='+new URLSearchParams(window.location.search).get("vendorId")+'"><button class="log_out">Edit</button></a></td>';
								tableData+='<td class="invert"><button class="log_out" onclick = "removeProducts('+response[i].id+')">Remove</button></td></tr>';
							} else{
								tableData+='<tr id = '+response[i].userId+' class = "rem'+[i]+' odd ">';
								tableData+='<td class="invert">'+response[i].id+'</td>';
								tableData+='<td class="invert">'+response[i].first_name+''+response[i].last_name+'</td>';
								tableData+='<td class="invert">'+response[i].emailId+'</td>';
								tableData+='<td class="invert">'+response[i].phone+'</td>';
								if(response[i].isEnabled){
									tableData+='<td class="invert">Active</td>';
								}else{
									tableData+='<td class="invert">Disabled</td>';
								}
								tableData+='<td class="invert">'+response[i].roles[0].roleName+'</td>';
								tableData+='<td class="invert">'+response[i].created_by+'</td>';
								tableData+='<td class="invert"><a href="addManager.html?vendorId='+new URLSearchParams(window.location.search).get("vendorId")+'"><button class="log_out">Edit</button></a></td>';
								tableData+='<td class="invert"><button class="log_out" onclick = "removeProducts('+response[i].id+')">Remove</button></td></tr>';
							}
						}	
					}
					
					console.log(tableData);
				  }
				   document.getElementById('tbody-container').innerHTML = tableData;
				}
		};
		xmlhttp1.send();
}
<!--manaer registration -->
<!-- category->


function initAddUpdateCategory()
{

var categoryName= $("#Category_Name").val();
var categoryDescription= $("#Category_Details").val();
var categoryStatus = $("#category_Status option:selected").val();
//var category_id = $("#category_id_hidden").val();
     	
                   
  var vendorId;
	
	if(categoryName=="")
	{
		alert("please fill valid Category_Name field");
		$(".Category_Name").focus();
		return false;
	}
	if(categoryDescription=="")
	{
		alert("please fill valid Category_Details field");
		$(".Category_Details").focus();
		return false;
	}
	var regName = /^[a-zA-Z]+$/;
  
	if(!regName.test(categoryName)){
        alert('Please enter valid categoryName.');
        document.getElementById('categoryName').focus();
        return false;
    }
	
	 
	if(!regName.test(categoryDescription)){
        alert('Please enter valid categoryDetails.');
        document.getElementById('categoryDetails').focus();
        return false;
    }
 if(new URLSearchParams(window.location.search).get("vendorId") == null || new URLSearchParams(window.location.search).get("vendorId") == 'null'){
  	  vendorId ="0";
      }else{
       vendorId = new URLSearchParams(window.location.search).get("vendorId");
      }
	  try{
	    xmlhttp = new XMLHttpRequest();
	  }catch(e)
	  {
	    try{
	      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	    }catch(e)
	    {
	      try {
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
	      } catch (e) {
	        alert("BROWSER BROKE");
	        return false;
	      }
	    }
	  }
  xmlhttp.open("POST",baseStoreAdminurl+"/addCategory", true);
	xmlhttp.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xmlhttp.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
xmlhttp.onreadystatechange=function()
                {
                    if(xmlhttp.status == 0)
                    {
                        var message="request not initialized";
                        console.log("request not initialized");
                        alert("request not initialized");
                    }
                    else if(xmlhttp.status==200 && this.readyState == 4)
                    {
                        var meassgae="category added successfully";
                        alert(meassgae);
                        console.log(meassgae);
                         window.location.href = "category.html?vendorId="+vendorId;
                    }
                    else{
                        console.log("Test!!");
                    }
                };
//xmlhttp.send(JSON.stringify({"Category_Name":Category_Name,"categoryDescription":categoryDescription,"Vendor_id":Vendor_id}));     
xmlhttp.send(JSON.stringify({"categoryName":categoryName,"categoryDescription":categoryDescription,"vendorId":vendorId,"categoryStatus":categoryStatus}));
}

//*************************load category function
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
    	xmlhttp1.open("POST", baseStoreAdminurl+"/getAllCategories", true);
    


  	xmlhttp1.open("POST", getCategoryUrl, true);
  	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
	xmlhttp1.onreadystatechange = function()
  {
    if(this.status == 200 && this.responseText  != null && this.responseText  != "" && this.readyState==4)
        {
          var mainResponse = JSON.parse(this.responseText );
          var response = JSON.parse(mainResponse.response);
                console.log(response);  
                var tableData = '';
                var num=0;
                for(i=0;i<response.length;i++)
                  {	
                    console.log(i);
                    var urlParam ="categoryName="+response[i].categoryName+"&categoryDescription="+response[i].categoryDescription+
                    "categoryStatus="+response[i].categoryStatus+"&vendorId="+new URLSearchParams(window.location.search).get("vendorId");
                    tableData+='<td class="invert">'+i+'</td>';  
                    tableData+='<td class="invert">'+response[i].categoryName+'</td>';  
                    tableData+='<td class="invert">'+response[i].categoryDescription+'</td>';  
                    tableData+='<td class="invert">'+response[i].categoryStatus+'</td>';  
                    tableData+='<td class="invert"><a href="categoryEdit.html?"><button id="new_category_add" class="btn btn-danger">Edit</button></a></td>';
                    tableData+='<td class="invert"><button onclick = "removeProducts('+response[i].id+')"class="btn btn-primary">Remove</button></td></tr>';

                  }
                
                 console.log(tableData);
	      }
	       document.getElementById('tbody-container').innerHTML = tableData;
  }

 if(new URLSearchParams(window.location.search).get("vendorId") == null || new URLSearchParams(window.location.search).get("vendorId") == 'null'){
        	xmlhttp1.send('{ "vendorId": "0000000002"}');
        	 $('#new_category_add').attr('href','categoryEdit.html?vendorId=0000000002'); 
        }else{
        	var vendorId = new URLSearchParams(window.location.search).get("vendorId");
        	xmlhttp1.send(JSON.stringify({ "vendorId":vendorId}));
        	 $('#new_category_add').attr('href','categoryEdit.html?vendorId='+vendorId); 
        }
  };     

<!-- category->



<!-- javascript-for-getting-config -->
window.onload = function() {
	healthCheck();
	var token = getCookie("token");
	if(token){
		localStorage.setItem("token", token);
	}
	//loadStoreConfig();
	//loadCategories();
	//loadProducts();
	if(new URLSearchParams(window.location.search).get("vendorId") == null){
		window.location.href = baseshopurl+"/index.html"+"?error_code=VENDOR_ID_NULL";
	}else{
		var storeId = new URLSearchParams(window.location.search).get("vendorId");
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
		    xmlhttp1.open("GET",baseStoreAdminurl+"/isValidStore?vendorId="+storeId, true);
		    xmlhttp1.setRequestHeader("Authorization", "Bearer" + localStorage.getItem("token"))
			
			xmlhttp1.onload = function() {
				if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "") {
					var res = JSON.parse( xmlhttp1.responseText);
					if(res.rspnsMsg =="Store Exists!"){
						var SideNavStartHTML = '<div class="collapse navbar-collapse" id="bs-megadropdown-tabs"><ul class="nav navbar-nav nav_1">'
							var sideNavMiddleHTML = '';
							sideNavEndHTML = '</ul> <button class="log_out">Log Out</button></div>';
							sideNavMiddleHTML +='<li class="active"><a href="storeConfig.html?vendorId='+new URLSearchParams(window.location.search).get("vendorId")+'">Store Config</a></li>'
							sideNavMiddleHTML +='<li><a href="category.html?vendorId='+new URLSearchParams(window.location.search).get("vendorId")+'">Category</a></li>'
							sideNavMiddleHTML +='<li><a href="products.html?vendorId='+new URLSearchParams(window.location.search).get("vendorId")+'">Products</a></li>'
							sideNavMiddleHTML +='<li><a href="orders.html?vendorId='+new URLSearchParams(window.location.search).get("vendorId")+'">Orders<span class="notification_bubble" style="display:none" id="new_cart_count"></span></a></li>'
							sideNavMiddleHTML +='<li><a href="users.html?vendorId='+new URLSearchParams(window.location.search).get("vendorId")+'">Users</a></li>'
							sideNavMiddleHTML +='<li><a href="offer.html?vendorId='+new URLSearchParams(window.location.search).get("vendorId")+'">Offers</a></li>'
							sideNavMiddleHTML +='<li><a href="managerList.html?vendorId='+new URLSearchParams(window.location.search).get("vendorId")+'">Managers</a></li>'
							sideNavMiddleHTML +='<li class="btn-warning"><a target="_blank" href="'+redirectbaseurl+'/storefront/index.html?vendorId='+new URLSearchParams(window.location.search).get("vendorId")+'">Show My Shop</a></li>'
							document.getElementById('bs-megadropdown-tabs').innerHTML = SideNavStartHTML+sideNavMiddleHTML+sideNavEndHTML;
							getAdminDetailsByID(new URLSearchParams(window.location.search).get("vendorId"));
							checkforneworders(new URLSearchParams(window.location.search).get("vendorId"));
					} else if(res.rspnsMsg =="Store Not found!"){
						window.location.href = baseshopurl+"/index.html"+"?error_code=VENDOR_STOTRE_CONFIG_ERROR";
					}
					
				}
			}
			xmlhttp1.send();
	}
}
