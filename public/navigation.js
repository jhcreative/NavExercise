// HUGE navigation exercise
// John Hiemstra June 2015



// from http://stackoverflow.com/questions/5223/length-of-a-javascript-object-that-is-associative-array
// I confess to having lodash installed in recent Angular projects
// so I'm putting this here now in case I want it later
Object.size = function(obj){
  var size = 0, key;
  for (key in obj){
    if(obj.hasOwnProperty(key)) {
      size ++;
    }
  }
  return size;
}


// namespace anything we want to keep safe for this exercise
var navigation = {};


// make basic xhr request for the navigation data
var xhr = new XMLHttpRequest();
xhr.open('GET',('/api/nav.json'));
xhr.onload = function() {
  if (xhr.status === 200) {
    navigation.raw = JSON.parse(xhr.responseText);
  }
    else {
      alert('Request failed.  Returned status of ' + xhr.status);
  }
};
xhr.send();


// navigation markup factory & click events
// wrap build DOM in this for now to ensure we have data, probably better way to make on complete callback in native request
// having to do this with $timeout in Angular always annoys me
setTimeout(function(){
  console.log('-----', navigation.raw, '----------');

  // prep navigation markup factory
  var topnav = navigation.raw.item_array.reverse(),
      numTop = topnav.length,
      widthPct = 100 / numTop,
      widthString = "width: " + widthPct + "%",
      navReplace = '<ul class="topnav-list">';

  // loop through top level navigation data and create base markup string
  while(numTop --){
    var subFlag = false,
        topItemString = '<li class="topnav list-item" data-dsktpwidth="' + widthString + '"><a class="topnav-link"',
        thisTop = topnav[numTop],
        thisTopURL = 'href="' + thisTop.url,
        thisTopLabel = thisTop.label;
    topItemString = topItemString + thisTopURL + '">' + thisTopLabel + '</a>';


    // define subnavigation if present
    if (thisTop.items.length > 0){

      // switch flag
      subFlag = true;

      // prep subnav factory
      var subnav = thisTop.items.reverse(),
          numSub = thisTop.items.length,
          subListString = '<ul class="subnav-list">';

      // loop through sub level navigation data
      while(numSub --){
        var thisSub = thisTop.items[numSub],
            thisSubURL = 'href="' + thisSub.url,
            thisSubLabel = thisSub.label,
            subItemString = '<li class="subnav list-item"><a class="subnav-link"';
        subItemString = subItemString + thisSubURL + '">' + thisSubLabel + '</a></li>';
        // add item to list
        subListString = subListString + subItemString;
      }

      // complete subnav string
      subListString = subListString + '</ul><div class="mobile-subnav-click"></div>';
    }

    // if present, add completed subnavigation markup to its top level navigation item
    if(subFlag === true){
      topItemString = topItemString + subListString;
    }

    // complete this top nav item markup
    topItemString = topItemString + '</li>';

    // now add it to navigation markup
    navReplace = navReplace + topItemString;

  }

  // install new nav markup to the DOM
  document.getElementById('hugeNav').innerHTML = navReplace;



  // click events for navigation organized by breakpoint
  var windowWidth = window.innerWidth;



  // mobile first
  if (windowWidth < 768) {

    var windowHeight = window.innerHeight,
        panel = document.getElementById('hugeNav'),
        lightbox = document.getElementById('hugeLightbox');

    // fill height of mobile nav
    panel.style.height = windowHeight + 'px';


    // opens/closes topnav
    document.getElementById('hugeMobileNav').onclick = function(){

      // control element visual
      this.classList.toggle('close');

      // actually move panel
      panel.classList.toggle('close');

      // lightbox panel
      lightbox.classList.toggle('close');

    }


    // opens/closes subnav
    var mobileSubnavClick = document.getElementsByClassName('mobile-subnav-click'),
        numSubs = mobileSubnavClick.length;

    // assign
    while(numSubs --){
      mobileSubnavClick[numSubs].onclick = function(){

        // control element visual
        this.classList.toggle('close');

        // open menu
        this.previousSibling.classList.toggle('open');
        this.parentNode.classList.toggle('open');
      }

    }


    console.log('well??', mobileSubnavClick);


  // ipad portrait & up
  } else {







  }


























}, 50);

