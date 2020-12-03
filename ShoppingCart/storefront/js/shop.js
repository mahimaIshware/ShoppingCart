var baseshopurl = "http://lincolnshire.mynetgear.com/shop";
var baseStoreurl = "http://lincolnshire.mynetgear.com:8080/store";
var storeID;
if(new URLSearchParams(window.location.search).get("vendorId") == null){
	storeID = "0000000002";
}else{
	storeID = new URLSearchParams(window.location.search).get("vendorId");
}
var getConfigJSON = JSON.stringify ({
  "storeID" : storeID
});
var globalCart;
var allProducts;
var storeConfigResponse;
var globalShopName;
var cartProductDetails;
var globalCartaddress;
var globalBilledCartaddress;

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
    if(this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState==4)
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
      if(this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState==4)
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
		xmlhttp1.open("GET", baseStoreurl+"/healthcheck", true);
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
		console.log("HEALTHCHECK CALLED FOR SHOP FRONT..");

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

  if(page == "about" || page == "contact")
    {
      xmlhttp1.open("GET","./"+page+"_container.html", true);
    }


    xmlhttp1.onreadystatechange = function() {
        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && xmlhttp1.readyState==4) {
            document.getElementById("container").innerHTML = xmlhttp1.responseText;
	          if(!$.isEmptyObject(storeConfigResponse)){
	        	  if(page == 'about'){
	        		$('#aboutUs').text(storeConfigResponse[0].aboutUs);
	  	            $('#featuresOne').text(storeConfigResponse[0].featuresOne);
	  	            $('#featuresTwo').text(storeConfigResponse[0].featuresTwo);
	  	            $('#featuresThree').text(storeConfigResponse[0].featuresThree);
	  	            $('#featuresFour').text(storeConfigResponse[0].featuresFour);
	  	            $('#featuresFive').text(storeConfigResponse[0].featuresFive);
	  	            $('#featuresSix').text(storeConfigResponse[0].featuresSix);
	  	            $('#aboutShopLogoLink').attr("src",storeConfigResponse[0].aboutShopLogoLink);
	  	            if(storeConfigResponse[0].aboutShopLogoLink == null || storeConfigResponse[0].aboutShopLogoLink =="" )
	  	            {
	  	            	$('#aboutShopLogoLink').attr("src","images/31.jpg");
	  	            }
	        	  } else{
        		  	$('#phone').text(storeConfigResponse[0].phone);
	  	            $('#email').text(storeConfigResponse[0].email);
	  	            $('#email').attr("href","mailto:"+storeConfigResponse[0].email);
	  	            $('#address').text(storeConfigResponse[0].address);
	        		  
	        	  }
	           
	          }
        }
    }
    xmlhttp1.send();

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
		xmlhttp1.onreadystatechange = function(){
	    if(this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState == 4)
	        {
	    	var responsemsg = JSON.parse(this.responseText);
	    	storeConfigResponse= JSON.parse(responsemsg.response);
	    	loadStoreHeaderAndCategoriesInfo();
	    	loadProductConfig();
	        }
		}
		xmlhttp1.send(JSON.stringify({ "storeID":storeID}));
}
function loadStoreHeaderAndCategoriesInfo(){
  if(!$.isEmptyObject(storeConfigResponse)){
	  	globalShopName = storeConfigResponse[0].shopName;
	  	$('#header_phone').text('(+91)'+storeConfigResponse[0].phone);
        $('#header_email').text(storeConfigResponse[0].email);
        $('#header_email').attr("href","mailto:"+storeConfigResponse[0].email);
        if(storeConfigResponse[0].shopLogoLink == "" || storeConfigResponse[0].shopLogoLink == null){
        	 $('#shopLogoLink').attr("src", 'images/logo.png');
        	 $('#shopLogoLink').css({"alt":"logo", "width":"167", "height":"97"});
        }else{
        	 $('#shopLogoLink').attr("src", storeConfigResponse[0].shopLogoLink);
        	 $('#shopLogoLink').css({"alt":"logo", "width":"167", "height":"97"});
        }
        
        var categoryHTMLStart = '<div class="collapse navbar-collapse" id="bs-megadropdown-tabs"><ul class="nav navbar-nav nav_1 active"><li><a href="index.html" onClick ="alert("ALL");">All</a></li>';
        var categoryMiddle = "";
        var catgoryHTMLEnd = '</ul></div>';
        var catarr = storeConfigResponse[0].categories.split(",");
        for (i=0;i < catarr.length ; i++){
            categoryMiddle += '<li><a href="#" onClick="getCategoryProducts(\'' + catarr[i] + '\')">'+catarr[i]+'</a></li>';
        }
        document.getElementById('bs-megadropdown-tabs').innerHTML = categoryHTMLStart + categoryMiddle + catgoryHTMLEnd;
  }
}

function loadProductConfig(){
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
  	xmlhttp1.open("POST", baseStoreurl+"/getProducts", true);

  	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

  	xmlhttp1.onreadystatechange = function(){
      if(this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState==4)
          {
            var productHTMLStart = '<div class="container" id="container">'
            	if(globalShopName == null || globalShopName == ""){
            		productHTMLStart += '<h3>Our Shop</h3>'
            	}else{
            		productHTMLStart += '<h3>'+globalShopName+'</h3>'
            	}
            var productHTMLMiddle = "";
            var productHTMLEnd = '</div>'
            var res = JSON.parse(this.responseText);

            var catarr = JSON.parse(res.response);

            for (i=0;i < catarr.length ; i++){
            	
	              if(i==0){
	            	  	productHTMLMiddle+= '<div class="a2z_top_brands_grids">';
	              }
             			productHTMLMiddle +='<div class="col-md-3 top_brand_left"><div class="hover14 column"><div class="a2z_top_brand_left_grid"><div class="tag">'
            	  if(true){
            		  productHTMLMiddle +='<img src="images/tag.png" alt=" " class="img-responsive" /></div>'  
            	  }else{
            		  productHTMLMiddle +='<img src="'+catarr[i].product_tag+'" alt=" " class="img-responsive" /></div>' 
            	  }
              			productHTMLMiddle +='<div class="a2z_top_brand_left_grid1"><figure><div class="cart-item block" ><div class="cart-thumb">'
            	  if(catarr[i].product_img_sqr_link=="" || catarr[i].product_img_sqr_link==null){
            		  productHTMLMiddle +='<img title=" " alt=" " src="images/rice.jpeg" />'   
              	  }else{
              		  	productHTMLMiddle +='<img title=" " alt=" " src="'+catarr[i].product_img_sqr_link+'" />' 
              		  	
              	  }
	              		productHTMLMiddle +='<p>'+catarr[i].product_name+'</p>'
	              		productHTMLMiddle +='<form action="#" id="add_to_cart_frm'+i+'" method="post"  onclick="addToCart(\''+catarr[i].product_id+'\',\''+storeID+'\',this,event)"><input type="image" src="images/red-plus-sign.png" alt="Submit" width="35" height="35" style="float:right;"></form>'
	              		if(storeConfigResponse[0].country_code=="USA"){
	              			productHTMLMiddle +='<h4>&#36; '+parseFloat(catarr[i].product_price, 10).toFixed(2)+' <span>&#36; '+parseFloat(parseFloat(catarr[i].product_price)+10.00, 10).toFixed(2)+'</span></h4>'
	            		}else{
	            			productHTMLMiddle +='<h4>&#8377; '+parseFloat(catarr[i].product_price, 10).toFixed(2)+' <span>&#8377; '+parseFloat(parseFloat(catarr[i].product_price)+10.00, 10).toFixed(2)+'</span></h4>'
	            		}
	              		productHTMLMiddle +='</div></div></figure></div></div></div></div>'
	              		if(i>0 && (i+1)%4 ==0){
	    	            	 	productHTMLMiddle +='<div class="clearfix"> </div></div><div class="a2z_top_brands_grids">';
	    	              }
				if(i ==catarr.length-1){
						productHTMLMiddle += '<div class="clearfix"> </div></div>';
				}
            }
                document.getElementById('container').innerHTML = productHTMLStart + productHTMLMiddle + productHTMLEnd;
          }
        };
        xmlhttp1.send(JSON.stringify({ "storeID":storeID}));
    }
function getCategoryProducts(cate){
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
	  	xmlhttp1.open("POST", baseStoreurl+"/getCategoryProducts", true);

	  	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

	  	xmlhttp1.onreadystatechange = function(){
	      if(this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState ==4)
	          {
	            var productHTMLStart = '<div class="container" id="container">'
	            	if(globalShopName == null || globalShopName == ""){
	            		productHTMLStart += '<h3>Our Shop</h3>'
	            	}else{
	            		productHTMLStart += '<h3>'+globalShopName+'</h3>'
	            	}
	            var productHTMLMiddle = "";
	            var productHTMLEnd = '</div>'
	            var res = JSON.parse(this.responseText);

	            var catarr = JSON.parse(res.response);
	            if(!$.isEmptyObject(catarr)&&!$.isEmptyObject(storeConfigResponse)){
	            for (i=0;i < catarr.length ; i++){
	            	
		              if(i==0){
		            	  	productHTMLMiddle+= '<div class="a2z_top_brands_grids">';
		              }
	             			productHTMLMiddle +='<div class="col-md-3 top_brand_left"><div class="hover14 column"><div class="a2z_top_brand_left_grid"><div class="tag">'
	            	  if(true){
	            		  productHTMLMiddle +='<img src="images/tag.png" alt=" " class="img-responsive" /></div>'  
	            	  }else{
	            		  productHTMLMiddle +='<img src="'+catarr[i].product_tag+'" alt=" " class="img-responsive" /></div>' 
	            	  }
	              			productHTMLMiddle +='<div class="a2z_top_brand_left_grid1"><figure><div class="cart-item block" ><div class="cart-thumb">'
	            	  if(catarr[i].product_img_sqr_link=="" || catarr[i].product_img_sqr_link==null){
	            		  productHTMLMiddle +='<img title=" " alt=" " src="images/rice.jpeg" />'   
	              	  }else{
	              		  	productHTMLMiddle +='<img title=" " alt=" " src="'+catarr[i].product_img_sqr_link+'" />' 
	              		  	
	              	  }
		              		productHTMLMiddle +='<p>'+catarr[i].product_name+'</p>'
		              		productHTMLMiddle +='<form action="#" method="post"  onclick="addToCart('+this.event+')"><input type="image" src="images/red-plus-sign.png" alt="Submit" width="35" height="35" style="float:right;"></form>'
		              		if(storeConfigResponse[0].country_code=="USA"){
		              			productHTMLMiddle +='<h4>&#36; '+parseFloat(catarr[i].product_price, 10).toFixed(2)+' <span>&#36; '+parseFloat(parseFloat(catarr[i].product_price)+10.00, 10).toFixed(2)+'</span></h4>'
		            		}else{
		            			productHTMLMiddle +='<h4>&#8377; '+parseFloat(catarr[i].product_price, 10).toFixed(2)+' <span>&#8377; '+parseFloat(parseFloat(catarr[i].product_price)+10.00, 10).toFixed(2)+'</span></h4>'
		            		}
			              	productHTMLMiddle +='</div></div></figure></div></div></div></div>'
		              		if(i>0 && (i+1)%4 ==0){
		    	            	 	productHTMLMiddle +='<div class="clearfix"> </div></div><div class="a2z_top_brands_grids">';
		    	              }
					if(i ==catarr.length-1){
							productHTMLMiddle += '<div class="clearfix"> </div></div>';
					}
	            }
	            } else{
	            	productHTMLMiddle += '<div><h4>No Matching product found or category selected!</h4></div>';
	            }
	                document.getElementById('container').innerHTML = productHTMLStart + productHTMLMiddle + productHTMLEnd;
	          }
	        };
	        xmlhttp1.send(JSON.stringify({ "storeID":storeID,"product_category":cate}));
}

function addToCart(productId,storeId,th,event){
	var userId = null;
	event.preventDefault();
	/*get session ID from session this is for test purpose only*/
	var sessionId ="";
	var cartId = globalCart.cartID;
	var pramString = JSON.stringify({"storeID":storeId,"product_id":productId,"userID":userId,"tranID":globalCart.tranID,"cartID":cartId});
	$.ajax({
		type:"POST",
		contentType:"APPLICATION/JSON",
		content:"JSON",
		crossDomain : true,
		async: true,
		url:baseStoreurl + "/updateMyCart",
		data:pramString,
		success:function(data){
			refreshCartItemsAndcart(globalCart.cartID,null);
			getCart(globalCart.cartID);
		},
		error:function(xrh,data,error){
			alert('error while addind product to cart')
		}
		
	});
}
function showCartItems(page,readonly,isReadytobill){
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
		  xmlhttp1.open("GET","./"+page+"_container.html", true);
		  if(readonly){
			  /*get user id from token.If user id is not null then user is logged in*/
			  var isUserLoggedin = false;
			  if(isUserLoggedin && !isReadytobill){
				  loadAddressContainer();
			  } else if(!isUserLoggedin && !isReadytobill ){
				showpopupforcontinueasguestoruser();
				
			  } else{
				  var cartTableHTMLStart = '<div class="container" id="containerTable"><table id="cart" class="table table-hover table-condensed" readonly>'
					  cartTableHTMLStart+= '<thead><tr><th style="width:50%">Product</th><th style="width:10%">Price</th><th style="width:8%">Quantity</th>'
					  cartTableHTMLStart+= '<th style="width:22%" class="text-center">Subtotal</th></tr></thead>'
					 var cartTableHTMLMiddle = '';
				  	 var cartTableHTMLEnd = '<tfoot><tr class="visible-xs"><td class="text-center"><strong>Total 1.99</strong></td></tr><tr>'
				  	  cartTableHTMLEnd += '<td><a href="#" onclick="showCartItems(\'cartItems\',false)" id="ret_to_main" class="btn btn-warning"><i class="fa fa-angle-left"></i>Back</a></td><td colspan="2" class="hidden-xs"></td>'
				  		if(storeConfigResponse[0].country_code=="USA"){
				  			 cartTableHTMLEnd +='<td class="hidden-xs text-center"><strong>Total &#36;'
		        		}else{
		        			 cartTableHTMLEnd +='<td class="hidden-xs text-center"><strong>Total &#8377;'
		        		}
				  	   cartTableHTMLEnd +='<span id="cartTotal">1.99</span></strong>'
				  	   cartTableHTMLEnd +='<a href="#" onclick="showPaymentOption(\'billing\')" class="btn btn-success btn-block">Continue To Payment<i class="fa fa-angle-right"></i></a></td></td></tr></tfoot></table></div>';

				    xmlhttp1.onreadystatechange = function() {
				        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && this.readyState ==4) {
				            document.getElementById("container").innerHTML = xmlhttp1.responseText;
				            if(!$.isEmptyObject(cartProductDetails) && !$.isEmptyObject(storeConfigResponse)){
					            for (i=0;i < cartProductDetails.length ; i++){
					            		cartTableHTMLMiddle+='<tbody><tr><td data-th="Product"><div class="row">'
					            		cartTableHTMLMiddle+='<div class="col-sm-2 hidden-xs"><img src="'+cartProductDetails[i].product_img_link+'" alt="..." class="img-responsive"/></div>'
					            		cartTableHTMLMiddle+='<div class="col-sm-10"><h4 class="nomargin">'+cartProductDetails[i].product_name+'</h4>'
					            		cartTableHTMLMiddle+='<p>'+cartProductDetails[i].product_description+'</p></div></div></td>'
					            		if(storeConfigResponse[0].country_code=="USA"){
					            			cartTableHTMLMiddle+='<td data-th="Price">&#36;'+cartProductDetails[i].product_price+'</td>'
					            		}else{
					            			cartTableHTMLMiddle+='<td data-th="Price">&#8377;'+cartProductDetails[i].product_price+'</td>'
					            		}
					            		
					            		cartTableHTMLMiddle+='<td data-th="Quantity">'+cartProductDetails[i].product_quantity+'</td>'
					            			if(storeConfigResponse[0].country_code=="USA"){
						            			cartTableHTMLMiddle+='<td data-th="Subtotal" class="text-center">&#36;'+cartProductDetails[i].product_price*cartProductDetails[i].product_quantity+'</td>'
						            		}else{
						            			cartTableHTMLMiddle+='<td data-th="Subtotal" class="text-center">&#8377;'+cartProductDetails[i].product_price+'</td>'
						            		}
					            		cartTableHTMLMiddle+='</tr></tbody>'
					            		
					            }
					            document.getElementById("containerTable").innerHTML= cartTableHTMLStart+ cartTableHTMLMiddle+cartTableHTMLEnd;
					            $('#cartTotal').text(globalCart.total_cost);
				            } 
				        }
				    } 
			  }
			  
		  } else{
			  var cartTableHTMLStart = '<div class="container" id="containerTable"><table id="cart" class="table table-hover table-condensed">'
				  cartTableHTMLStart+= '<thead><tr><th style="width:50%">Product</th><th style="width:10%">Price</th><th style="width:8%">Quantity</th>'
				  cartTableHTMLStart+= '<th style="width:22%" class="text-center">Subtotal</th><th style="width:10%"></th></tr></thead>'
				 var cartTableHTMLMiddle = '';
			  	 var cartTableHTMLEnd = '<tfoot><tr class="visible-xs"><td class="text-center"><strong>Total 1.99</strong></td></tr><tr>'
			  	  cartTableHTMLEnd += '<td><a href="#" onclick="reloadPage(this.id)" id="ret_to_main" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td><td colspan="2" class="hidden-xs"></td>'
			  		if(storeConfigResponse[0].country_code=="USA"){
			  			 cartTableHTMLEnd +='<td class="hidden-xs text-center"><strong>Total &#36;'
	        		}else{
	        			 cartTableHTMLEnd +='<td class="hidden-xs text-center"><strong>Total &#8377;'
	        		}
			  	   cartTableHTMLEnd +='<span id="cartTotal"></span></strong></td><td>'
			  		 if(cartProductDetails.length>0){
			  			cartTableHTMLEnd +='<a href="#" onclick="showCartItems(\'cartItems\',\'readonly\',false)" class="btn btn-success btn-block">SaveCart&ProceedToBuy<i class="fa fa-angle-right"></i></a></td>'
			        	}
			  	 cartTableHTMLEnd +='</tr></tfoot></table></div>';

			    xmlhttp1.onreadystatechange = function() {
			        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && this.readyState ==4) {
			            document.getElementById("container").innerHTML = xmlhttp1.responseText;
			            if(!$.isEmptyObject(cartProductDetails) && !$.isEmptyObject(storeConfigResponse)){
				            for (i=0;i < cartProductDetails.length ; i++){
				            		cartTableHTMLMiddle+='<tbody><tr><td data-th="Product"><div class="row">'
				            		cartTableHTMLMiddle+='<div class="col-sm-2 hidden-xs"><img src="'+cartProductDetails[i].product_img_link+'" alt="..." class="img-responsive"/></div>'
				            		cartTableHTMLMiddle+='<div class="col-sm-10"><h4 class="nomargin">'+cartProductDetails[i].product_name+'</h4>'
				            		cartTableHTMLMiddle+='<p>'+cartProductDetails[i].product_description+'</p>'
				            		cartTableHTMLMiddle+='<p hidden="hidden">'+cartProductDetails[i].product_id+'</p>'
				            		cartTableHTMLMiddle+='<p hidden="hidden">'+cartProductDetails[i].order_id+'</p>'
				            		cartTableHTMLMiddle+='<p hidden="hidden">'+cartProductDetails[i].vendor_id+'</p>'
				            		cartTableHTMLMiddle+='</div></div></td>'
				            		if(storeConfigResponse[0].country_code=="USA"){
				            			cartTableHTMLMiddle+='<td data-th="Price">&#36;'+cartProductDetails[i].product_price+'</td>'
				            		}else{
				            			cartTableHTMLMiddle+='<td data-th="Price">&#8377;'+cartProductDetails[i].product_price+'</td>'
				            		}
				            		
				            		cartTableHTMLMiddle+='<td data-th="Quantity"><input type="number" onchange="addUpdateQuantity(event, this)" class="form-control text-center" min="0" value="'+cartProductDetails[i].product_quantity+'"></td>'
				            			if(storeConfigResponse[0].country_code=="USA"){
					            			cartTableHTMLMiddle+='<td data-th="Subtotal" class="text-center">&#36;'+cartProductDetails[i].product_price*cartProductDetails[i].product_quantity+'</td>'
					            		}else{
					            			cartTableHTMLMiddle+='<td data-th="Subtotal" class="text-center">&#8377;'+cartProductDetails[i].product_price+'</td>'
					            		}
				            		cartTableHTMLMiddle+='<td class="actions" data-th=""><button class="btn btn-info btn-sm" onclick="refreshRow()"><i class="fa fa-refresh"></i></button><button class="btn btn-danger btn-sm" onclick="deleteCartProduct(event, this)")><i class="fa fa-trash-o"></i></button></td></tr></tbody>'
				            		
				            }
				            document.getElementById("containerTable").innerHTML= cartTableHTMLStart+ cartTableHTMLMiddle+cartTableHTMLEnd;
				            $('#cartTotal').text(globalCart.total_cost);
			            }else{
			            	cartTableHTMLMiddle+='<tbody><tr><td data-th="Product">No Item added in cart</td><td></td><td></td><td></td><td></td></tr></tbody>';
			            	 document.getElementById("containerTable").innerHTML= cartTableHTMLStart+ cartTableHTMLMiddle+cartTableHTMLEnd;
			            }
			            
			        }
			    }
		  }
		    xmlhttp1.send();
	
}

function initCart(userId,sessionId,cartId,storeId){
	if(!cartId){
		cartId = "";
	}
	var pramString = JSON.stringify({"storeID":storeId,"userID":"","tranID":sessionId,"cartID":cartId});
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
	  xmlhttp1.open("POST", baseStoreurl+"/initCart", true);
	  xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	  xmlhttp1.setRequestHeader('Accept', 'application/json');
	  xmlhttp1.setRequestHeader('Cache-control', 'false');
	  xmlhttp1.withCredentials = true; // pass along cookies

	    xmlhttp1.onreadystatechange = function() {
	        if (this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState==4) {
	        	console.log(xmlhttp1.readyState+" initCart>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
	        	var res = JSON.parse(this.responseText);
	            var cartDetails = JSON.parse(res.response);
	            if(!$.isEmptyObject(cartDetails)){
	            	globalCart=cartDetails[0];
	            	getCart(globalCart.cartID);
	            }
	        }
	    }
	    xmlhttp1.send(pramString);

}
function getCart(cartId){
	var pramString = JSON.stringify({"storeID":"","userID":"","tranID":"","cartID":cartId});
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
	  xmlhttp1.open("POST", baseStoreurl+"/getMyCart", true);
	  xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

	    xmlhttp1.onreadystatechange = function() {
	        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && xmlhttp1.readyState==4) {
	        	var res = JSON.parse(this.responseText);
	        	cartProductDetails = JSON.parse(res.response);
	        	getAddress("",cartId);
	        	if(cartProductDetails.length==0){
	        		$('#cartCount').hide();
	        	}else if(cartProductDetails.length >= 1){
        			$('#cartCount').show();
        			$('#cartCount').text(cartProductDetails.length);	
	        	}else{
	        		$('#cartCount').hide();
	        	}
	        }
	    }
	    xmlhttp1.send(pramString);
}
function reloadPage(id){
		window.location.href = "index.html?vendorId="+storeID;
}
function deleteCartProduct(e, th){
	e.preventDefault();
	var product_id = $(th).closest('tr')[0].children[0].children[0].children[1].children[2].textContent;
	var cart_id = $(th).closest('tr')[0].children[0].children[0].children[1].children[3].textContent;
	var vendor_id = $(th).closest('tr')[0].children[0].children[0].children[1].children[4].textContent;
	var pramString = JSON.stringify({"product_id":product_id,"order_id":cart_id,"vendor_id":vendor_id});
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
	  xmlhttp1.open("POST", baseStoreurl+"/deleteCartProduct", true);
	  xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

	    xmlhttp1.onreadystatechange = function() {
	        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && xmlhttp1.readyState==4) {
	        	var res = JSON.parse( xmlhttp1.responseText);
	        	if(res.response =="CART PRODUCT DELETED!"){
	        		getCart(globalCart.cartID);
	        		refreshCartItemsAndcart(globalCart.cartID,"deleteCartProduct");
	        	}
	        	
	        }
	    }
	    xmlhttp1.send(pramString);
	
	
}
function addUpdateQuantity(e, th){
	e.preventDefault();
	var qauntity = $(th).val();
	var product_id = $(th).closest('tr')[0].children[0].children[0].children[1].children[2].textContent;
	var cart_id = $(th).closest('tr')[0].children[0].children[0].children[1].children[3].textContent;
	var vendor_id = $(th).closest('tr')[0].children[0].children[0].children[1].children[4].textContent;
	var pramString = JSON.stringify({"product_id":product_id,"order_id":cart_id,"vendor_id":vendor_id,"product_quantity":qauntity});
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
	xmlhttp1.open("POST", baseStoreurl+"/addUpdateQuantity", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	
	xmlhttp1.onreadystatechange = function() {
		if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != ""&& xmlhttp1.readyState==4) {
			var res = JSON.parse( xmlhttp1.responseText);
			if(res.response =="CART PRODUCT UPDATED!"){
				getCart(globalCart.cartID);
				refreshCartItemsAndcart(globalCart.cartID,"addUpdateQuantity");
			}
			
		}
	}
	xmlhttp1.send(pramString);
	
	
}
function refreshCartItemsAndcart(cartId, type){
	var pramString = JSON.stringify({"cartID":cartId});
	$.ajax({
		type:"POST",
		contentType:"APPLICATION/JSON",
		content:"JSON",
		crossDomain : true,
		async: true,
		url:baseStoreurl + "/refreshCart",
		data:pramString,
		success:function(data){
			 var cartDetails = JSON.parse(data.response);
	            if(!$.isEmptyObject(cartDetails)){
	            	globalCart=cartDetails[0];
	            }
			if(type=="deleteCartProduct"){
				showCartItems('cartItems')
			}
			if(type=="addUpdateQuantity"){
				showCartItems('cartItems')
			}
		},
		error:function(xrh,data,error){
			alert('error while refreshing product to cart');
		}
		
	});
}
function showpopupforcontinueasguestoruser(){
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
	     xmlhttp1.open("GET","./popuploginorguest.html", true);
	    xmlhttp1.onreadystatechange = function() {
	        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && this.readyState ==4) {
	            document.getElementById("container").innerHTML = xmlhttp1.responseText;
	            $('#centralModalWarning').modal('show');
	            return true;
	        }
	    }
	    xmlhttp1.send();
}
function continueasUser(e){
	e.preventDefault();
	$('#centralModalWarning').modal('hide');
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
	     xmlhttp1.open("GET","./login_container.html", true);
	    xmlhttp1.onreadystatechange = function() {
	        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && this.readyState ==4) {
	            document.getElementById("container").innerHTML = xmlhttp1.responseText;
	        }
	    }
	    xmlhttp1.send();
}
function continueasGuset(e){
	e.preventDefault();
	$('#centralModalWarning').modal('hide');
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
	     xmlhttp1.open("GET","./guest_container.html", true);
	    xmlhttp1.onreadystatechange = function() {
	        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && this.readyState ==4) {
	            document.getElementById("container").innerHTML = xmlhttp1.responseText;
	        }
	    }
	    xmlhttp1.send();
}
function initlogin(e){
	e.preventDefault();
	loadAddressContainer()
}
function initRegistration(e){
	e.preventDefault();
}
function initGuest(e){
	e.preventDefault();
	loadAddressContainer()
}
function loadAddressContainer(){
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
	     xmlhttp1.open("GET","./address_container.html", true);
	    xmlhttp1.onreadystatechange = function() {
	        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && this.readyState ==4) {
	            document.getElementById("container").innerHTML = xmlhttp1.responseText;
	            if(!$.isEmptyObject(globalCartaddress) && globalCartaddress){
	            	$("#fullName").val(globalCartaddress.fullName)
	            	$("#houseNo").val(globalCartaddress.houseNo)
	            	$("#addressFirst").val(globalCartaddress.addressFirst)
	            	$("#addressTwo").val(globalCartaddress.addressTwo)
	            	$("#city").val(globalCartaddress.city)
	            	$("#state").val(globalCartaddress.state)
	            	$("#zip").val(globalCartaddress.zip)
	            	$("#landmark").val(globalCartaddress.landmark)
	            	$("#country").val(globalCartaddress.country)
	            	$("#phone").val(globalCartaddress.phone)
	            	$("#addressID").val(globalCartaddress.addressID)
	            }
	        }
	    }
	    xmlhttp1.send();
}
function addUpdateDeliveryAddress(event){
	event.preventDefault();
	var fullName = $("#fullName").val()
	var houseNo = $("#houseNo").val()
	var addressFirst = $("#addressFirst").val()
	var addressTwo = $("#addressTwo").val()
	var city = $("#city").val()
	var state = $("#state").val()
	var zip = $("#zip").val()
	var landmark = $("#landmark").val()
	var country = $("#country").val()
	var phone = $("#phone").val()
	var addressID = $("#addressID").val()
	var pramString = JSON.stringify({"userID":"","cartID":globalCart.cartID,"fullName":fullName,"houseNo":houseNo,"addressFirst":addressFirst,
		"addressTwo":addressTwo,"city":city,"state":state,"zip":zip,"landmark":landmark,"country":country,"phone":phone,"addressID":addressID});
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
	xmlhttp1.open("POST", baseStoreurl+"/addUpdateDeliveryAddress", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	
	xmlhttp1.onreadystatechange = function() {
		if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && this.readyState == 4) {
			var res = JSON.parse( xmlhttp1.responseText);
			if(res.response.indexOf("New Delivery Address Addedd")||res.response.indexOf("Cart Delivery Address Updated")){
				showCartItems('cartItems','readonly',true);
				getAddress("",globalCart.cartID)
			}else{
				console.log("error in adding updating address"+res.response);
			}
			
		}
	}
	xmlhttp1.send(pramString);
}
function getAddress(userId,cartId){
	var pramString = JSON.stringify({"userID":userId,"cartID":cartId});
	
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
	xmlhttp1.open("POST", baseStoreurl+"/getCartDeliveryAddress", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	
	xmlhttp1.onreadystatechange = function() {
		if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != ""&& xmlhttp1.readyState==4) {
			var res = JSON.parse(this.responseText);
            var cartaddress = JSON.parse(res.response);
            if(!$.isEmptyObject(cartaddress)){
            	globalCartaddress=cartaddress[0];
            }
		}
	}
	xmlhttp1.send(pramString);
}
function showPaymentOption(page){
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
	  xmlhttp1.open("GET","./"+page+"_container.html", true);
	  xmlhttp1.onreadystatechange = function() {
        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && this.readyState ==4) {
            document.getElementById("container").innerHTML = xmlhttp1.responseText;
            
        }
    }
	xmlhttp1.send();
}
function completePayment(e){
	e.preventDefault();
	var selectedmode = $("input[type='radio']:checked").val();
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
	  xmlhttp1.open("GET","./order_details.html", true);
	  xmlhttp1.onreadystatechange = function() {
       if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && this.readyState ==4) {
           var sessionId ="123e4567-e89b-12d3-a456-426655440000";
           var userId ="";
           $.ajax({
    			type:"POST",
    			contentType:"APPLICATION/JSON",
    			content:"JSON",
    			crossDomain : true,
    			async: true,
    			url:baseStoreurl+"/changeCartStatus",
    			data:JSON.stringify({"storeID":storeID,"userID":"","tranID":sessionId,"cartID":globalCart.cartID,"payment_type":selectedmode}),
    			success:function(data){
    				var res = data.response;
    				if(res == "CART BILLED"){
    					getBilledCart(storeID,sessionId,globalCart.cartID,selectedmode);
    				} else{
    					console.log("error in billing");
    					alert(res.rspnsMsg+"!")
    				}
    			},
    			error:function(xrh,data,error){
    				alert('error in proceeding payment')
    			}
           })
       }
   }
	xmlhttp1.send();
}
function showUserProfile(page){
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
	if(page=='user'||page=='user_profileEdit'||page=='userAddress'||page=='userOrders'){
		xmlhttp1.open("GET","./"+page+"_container.html", true);
	}
	xmlhttp1.onreadystatechange = function() {
		if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && this.readyState ==4) {
			document.getElementById("container").innerHTML = xmlhttp1.responseText;
			
		}
	}
	xmlhttp1.send();
}

function getBilledCart(strID,sessID,cartId,selectedmode){
	 $.ajax({
			type:"POST",
			contentType:"APPLICATION/JSON",
			content:"JSON",
			crossDomain : true,
			async: true,
			url:baseStoreurl+"/getbilledCart",
			data:JSON.stringify({"storeID":strID,"userID":"","tranID":sessID,"cartID":cartId,"payment_type":selectedmode}),
			success:function(data){
			var billedcart = JSON.parse(data.response);
			   if(!$.isEmptyObject(billedcart)){
				   getBilledCartProductDetails(billedcart);
				   getBilledCartAddress("",billedcart); 
			   }
			},
			error:function(xrh,data,error){
				alert('error in proceeding payment');
			}
   })
}

function getBilledCartProductDetails(billedCart){
	var pramString = JSON.stringify({"storeID":"","userID":"","tranID":"","cartID":billedCart[0].cartID});
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
	  xmlhttp1.open("POST", baseStoreurl+"/getMyCart", true);
	  xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

	    xmlhttp1.onreadystatechange = function() {
	        if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != "" && xmlhttp1.readyState==4) {
	        	var res = JSON.parse(this.responseText);
	        	cartProductDetails = JSON.parse(res.response);
	        	if(!$.isEmptyObject(cartProductDetails)){
	        		
				   }
	        }
	    }
	    xmlhttp1.send(pramString);
}
function getBilledCartAddress(userId,billedCart){
	var pramString = JSON.stringify({"userID":userId,"cartID":billedCart[0].cartID});
	
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
	xmlhttp1.open("POST", baseStoreurl+"/getCartDeliveryAddress", true);
	xmlhttp1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
	
	xmlhttp1.onreadystatechange = function() {
		if (xmlhttp1.status == 200 && xmlhttp1.responseText != null && xmlhttp1.responseText != ""&& xmlhttp1.readyState==4) {
			var res = JSON.parse(this.responseText);
            var cartaddress = JSON.parse(res.response);
            if(!$.isEmptyObject(cartaddress)){
            	globalBilledCartaddress=cartaddress[0];
            	showBilledCartDetails(billedCart[0]);
            }
		}
	}
	xmlhttp1.send(pramString);
}



function showBilledCartDetails(cart){
	//	add new cart for user.previous cart has been billed.Pass cart Id as empty to build new cart.
	/*get session ID and put as transaction ID.If sessionID is null then send default predefined unique key as transaction ID*/
	var sessionId ="123e4567-e89b-12d3-a456-426655440000";
	initCart("",sessionId,"",storeID);
	var orderdetailHtmlstart = '<div class="user_registration container" id="ord_detail_container" style="margin-bottom: 2em;"> <h2 class="" style="margin:2em 0;">Order Details</h2><div class="col-sm-12"> '
	 var orderdetailHTMLmiddle = '<div class="col-sm-2" style="border-right: solid #A9A9A9 2px;"> Order on: <span>'+new Date(cart.create_ts).toLocaleDateString("en-US")+'</span> </div>'
		 orderdetailHTMLmiddle += '<div class="col-sm-6">Order #: <span>'+cart.cartID+'</span></div>'
		 orderdetailHTMLmiddle += '<div class="col-sm-4" style="float: right;"> <button type="button" onclick="window.print()" class="btn btn-warning"'
		 orderdetailHTMLmiddle += 'style="float: right;margin-bottom: 5px;width: 8em;padding: 2px;background-image: linear-gradient(to bottom, #CFB53B 44%, #f0ad4e 29%, #D4AF37 100%);">Print Invoice</button> </div></div>'
		 orderdetailHTMLmiddle += '<div class="col-sm-12"  style="background-color:#f6f6f6;border: solid #D8D8D8 1px;padding:0;border-radius: 5px 5px 0 0;;min-height: 15em;">'
		 orderdetailHTMLmiddle += '<div class="col-sm-12  soldfont" style="padding: 1em;">'
		 orderdetailHTMLmiddle += '<div class="col-sm-4"><p><B>Shipping Address</B></p>'
		 orderdetailHTMLmiddle += '<p>'+globalBilledCartaddress.fullName+'</p>'
		 orderdetailHTMLmiddle += '<p>'+globalBilledCartaddress.houseNo+','+globalBilledCartaddress.addressFirst+'</p>'
		 orderdetailHTMLmiddle += '<p>'+globalBilledCartaddress.addressTwo+'</p>'
		 orderdetailHTMLmiddle += '<p>Near :'+ globalBilledCartaddress.landmark+'</p>'
		 orderdetailHTMLmiddle += '<p>'+globalBilledCartaddress.city+' Pin:'+globalBilledCartaddress.zip+'</p>'
		 orderdetailHTMLmiddle += '<p>'+globalBilledCartaddress.state+','+globalBilledCartaddress.country+'</p></div>'
		 orderdetailHTMLmiddle += '<div class="col-sm-4"><p><B>Payment Mode</B></p> <p><i class="fa fa-cc-visa"></i>'+cart.payment_type+'</p> </div>'
		 orderdetailHTMLmiddle += '<div class="col-sm-4"> <p><B>Ordre Summary</B></p> '
		 orderdetailHTMLmiddle += '<p> Order Cost : '+cart.total_cost+'</p> '
		 orderdetailHTMLmiddle += '<p>######## Shipping Cost ########</p>'
		 orderdetailHTMLmiddle += '<p>######## Sub Total ########</p>'
		 orderdetailHTMLmiddle += '<p><b>Grand Total : '+cart.total_cost+'</b></p></div> </div></div>'
		 orderdetailHTMLmiddle += '<div class="col-sm-12" style="padding: 0;border-radius:0 0 5px 5px;background-color:#E8E8E8;border: solid #D8D8D8 1px;"  align="center"> '
		 orderdetailHTMLmiddle += '<button type="button" class="collapsible">Transactions Details</button>'
		 orderdetailHTMLmiddle += '<div class="content">  <div class="col-sm-12"> <div class="col-sm-5"><p><span class="trnspn">Transaction Id: </span><span>##########</span></p>'
		 orderdetailHTMLmiddle += '<p><span class="trnspn">Reference Id: </span><span>##########</span></p>'   
		 orderdetailHTMLmiddle += '</div> <div class="col-sm-5">'       
		 orderdetailHTMLmiddle += '<p><span class="trnspn">Payment Amount: </span><span>##########</span></p>'       
		 orderdetailHTMLmiddle += '<p><span class="trnspn">Payment Date: </span><span>##########</span></p>'
		 var orderdetailHTMLend  = '</div></div></div></div></div>'
			 document.getElementById("container").innerHTML =orderdetailHtmlstart+orderdetailHTMLmiddle+orderdetailHTMLend;
}
// javascript-for-getting-config 
window.onload = function() {
	if(new URLSearchParams(window.location.search).get("vendorId") == null){
		window.location.href = baseshopurl+"/index.html"+"?error_code=STORE_ID_NULL";
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
		  	xmlhttp1.open("GET",baseStoreurl+"/isValidStore?vendorId="+storeId, true);
			xmlhttp1.onreadystatechange = function(){
		    if(this.status == 200 && this.responseText != null && this.responseText != "" && this.readyState==4)
		        {
		    	var res = JSON.parse( xmlhttp1.responseText);
				if(res.rspnsMsg =="Store Exists!"){
					loadStoreConfig();
					/*get session ID and put as transaction ID.If sessionID is null then send default predefined unique key as transaction ID*/
					var sessionId ="123e4567-e89b-12d3-a456-426655440000";
					/*get user ID from session*/
					var userId="";
					if(globalCart){
						initCart(userId,sessionId,globalCart.cartID,storeID);
					}else{
						initCart(userId,sessionId,"",storeID);
					}
					
				} else if(res.rspnsMsg =="Store Not found!"){
					window.location.href = baseshopurl+"/index.html"+"?error_code=STORE_NOT_FOUND";
				}
				
		        }
		      };

			xmlhttp1.send();
		}

}
var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function () {
		this.classList.toggle("active");
		var content = this.nextElementSibling;
		if (content.style.display === "block") {
			content.style.display = "none";
		} else {
			content.style.display = "block";
		}
	});
}