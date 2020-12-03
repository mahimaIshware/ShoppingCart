

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
  xmlhttp.open("POST",+"/addCategory", true);
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
    	xmlhttp1.open("POST", getCategoryUrl+"/getAllCategories", true);
    


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
