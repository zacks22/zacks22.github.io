window.onload = function() {
    generateNavbar();

    // Set selected values based on URL parameters
    setSelectedBasedOnUrlParam("selectCategory", "category");

    generateRecordings();
}


// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  
// Function to set selected attribute based on URL parameters
function setSelectedBasedOnUrlParam(selectId, paramName) {
    var paramValue = getUrlParameter(paramName);
    if (paramValue) {
      $("#" + selectId).val(paramValue);
    }
  }


// Wait for select box changes
$("#selectCategory").change(function() {
    var categoryValue = $("#selectCategory").val();
    
    var url = [location.protocol, '//', location.host, location.pathname].join('');
    url += "?category=" + categoryValue;
    
    window.location = url;
  });