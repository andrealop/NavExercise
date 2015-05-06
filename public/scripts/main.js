document.addEventListener("DOMContentLoaded", function(event) {
	
	getNavData();

	/**
	* Triggers sidebar
	*/
	document.getElementById("sidebar-trigger").addEventListener("mouseup", function() {
		var toPush = document.getElementsByClassName("push-right");
		toggleActive(document.getElementById("sidebar-trigger"));
		toggleActive(document.getElementById("logo"));
		for (var i = 0; i < toPush.length; i++) {
			toggleActive(toPush[i]);
		}
		// Adding the overlay when menu is open
		var overlay = document.getElementById("overlay");
		var main = document.getElementById('main-content');
		if (!overlay) {
			var main = document.getElementById('main-content');
			var overlayHTML = document.createDocumentFragment();
			var overlayDiv = document.createElement('div');
			overlayDiv.id = 'overlay';
			overlayHTML.appendChild(overlayDiv);
			main.appendChild(overlayHTML);
		}
		// Removing the overlay when menu is closed
		else {
			main.removeChild(overlay);
		}
	});
});


/**
* Basic toggle class function to add it to an element
*/
function toggleActive(element) {
	if(element) element.classList.contains('active') ? element.classList.remove('active') : element.classList.add('active');
}

/**
* Gets JSON object from API athat contains all nav data
*/
function getNavData() {
	var ajax = new XMLHttpRequest();
	ajax.open('GET', '/api/nav.json', true);
	ajax.onload = function() {
 		if (ajax.readyState == 4) {
  			if ((ajax.status >= 200 && ajax.status < 400) || window.location.href.indexOf("http") == -1) {
   				var JSONData = JSON.parse(ajax.response), 
   					navData = JSONData.items;
   				createList(navData, document.getElementById("sidebar").querySelector('.nav-wrapper'), false);
  			}
	  		else {
	   			console.log("There's an error calling the service");
	  		}
	  	}
 	};
 	ajax.onerror = function(error) {
	  	console.log("There's an error calling the service: " + error);
	};
	ajax.send();
}

/**
* Creates an HTML unordered list with the data items received from the API service
*/
function createList(data, parent, isSubmenu) {
	var ulElem = document.createElement("ul");
	ulElem.className = isSubmenu ? 'menu' : '';
	for (var i = 0; i < data.length; i++) {		
		var hasSubmenu = data[i].items && data[i].items.length > 0 ? true : false, 
			navHTML = document.createDocumentFragment(),
			liElem = document.createElement("li"), 
			aElem = document.createElement("a");
		aElem.textContent = data[i].label;
		aElem.href = data[i].url;
		liElem.className = hasSubmenu ? 'sub-menu' : '';
		liElem.appendChild(aElem);
		ulElem.appendChild(liElem);
		// Calls again the recursive method to add a new unordered list in case the link has related sub items. 
		if (hasSubmenu) {
			createList(data[i].items, liElem, true);
			aElem.addEventListener("mouseup", function() {
				var submenuToClose = document.getElementById('sidebar').querySelector('.sub-menu.active');
				if(submenuToClose) {
					if (this.closest('li') == submenuToClose) {
						toggleActive(this.closest('li'));
						toggleActive(this.closest('li').querySelector('.menu'));
					}
					else {
						toggleActive(this.closest('li'));
						toggleActive(this.closest('li').querySelector('.menu'));
						toggleActive(submenuToClose);	
						toggleActive(submenuToClose.querySelector('.menu'));	
					}	
				}
				else {
					toggleActive(this.closest('li'));
					toggleActive(this.closest('li').querySelector('.menu'));
				}
			});
		}
	}
	navHTML.appendChild(ulElem)
	parent.appendChild(navHTML);
}

