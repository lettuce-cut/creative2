
ButtonAction("moButton");
ButtonAction("hButton");
ButtonAction("pButton");
ButtonAction("maButton");
ButtonAction("fButton");
ButtonAction("cButton");
ButtonAction("rButton");
ButtonAction("oButton");

function ButtonAction(whichOne) {
	document.getElementById(whichOne).addEventListener("click", function(event) {
		event.preventDefault();
		const value = document.getElementById(whichOne).value;
		console.log(value);
		if (value === "")
			return;
  
		location_url = "https://ghibliapi.herokuapp.com/locations";
		fetch(location_url)
			.then(function(response) {
				return response.json();
			})
			.then(function(json) {
				console.log(json);
				results = "";
				movies = [];
				count = 0;
				for (let i = 0; i < Object.keys(json).length; i++) {
					if (value === json[i].terrain){
						console.log(json[i].terrain);
						console.log(json[i].films);
						film_url = json[i].films;
						fetch(film_url)
							.then(function(response) {
								return response.json();
							})
							.then(function(json) {
								console.log(json.title);
								if (json.title != undefined) {
									for(k = 0; k < movies.length; k++){
										if (json.title === movies[k]) {
											count += 1;
										}
									}
									if (count === 0) {
										movies.push(json.title);
										results += "<img src=" + json.image + ">";
									}
									document.getElementById("ghibliResults").innerHTML = results;
								}
							})
					}
				}
			})
	});
};

