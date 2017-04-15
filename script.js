/*  CCIS 2591 - JavaScript
    Favorite Things Project
    Cheryl Davis
*/
$(document).ready(function(){
  //clear the page
  let imagesOn = "false";
  $("body p").remove();
  //create page heading
  let headingDiv = "<div class='heading'><h1>Cheryl's Favorite Things</h1></div>";
  $("body").append(headingDiv);

  //get json data
  $.getJSON("data/favorites.json", function(data) {
      let myData = data.favorites;
      createMenu(myData);
      console.log(imagesOn);
        $("#menu h3").on("click", function() {
          console.log(imagesOn);
          if (imagesOn == "false"){
            clickedType = $(this).contents().filter(function() {
                return this.nodeType == 3
              }).text();
              $(this).siblings().toggle();
              imagesOn = createPage(imagesOn, myData);
              $("img").on("click", function(){
                $(this).siblings("p").toggle();
              })
            }
        else {
          console.log("clicked");
          $(this).siblings().toggle();
          $(".col-4").remove();
          imagesOn = "false";
        }
      })//end h3 on click
    })//end of get JSON

})//end of program

//create side menu
function createMenu(favArray){
    htmlCode = "<div id='menu', class='col-3 menu'>";
    prevType = "";
    $.each(favArray, function(index){
      let type = favArray[index].type;
      let favType = type.charAt(0).toUpperCase() + type.slice(1);
      if (favType != prevType){
        htmlCode += "<h3>" + favType + "</h3>";
      }
      prevType = favType;
    })//end loop
    htmlCode += "</div>";
    $("body").append(htmlCode);
}//end createMenu function

//adds images to the page
function createPage(imagesOn, favArray) {
  imagesOn = "true";
  htmlCode = "<div class='col-4'>";
  $.each(favArray, function(index){
      let favType = favArray[index].type;
      let type = clickedType.charAt(0).toLowerCase() + clickedType.slice(1);
      if (favType == type){
        let itemText = favArray[index].text,
            favItem = favArray[index].item,
            imgSrc = favArray[index].image;
            htmlCode += "<h4>" + favItem + "</h4><img src='" + imgSrc + "'</img><p>" + itemText + "</p>";
            $("body").append(htmlCode);
            $("p").hide();
            htmlCode = "<div class='col-4'>";
          }
    })//end of loop
      return imagesOn;
  }//end createPage function
