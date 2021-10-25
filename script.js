backgroundPic = ["mountains.jpeg", "hill.jpeg", "plain.jpeg", "marsh.jpeg", "forest.jpeg", "city.jpg", "river.jpeg", "ocean.jpeg"];

ButtonAction("moButton", 0);
ButtonAction("hButton", 1);
ButtonAction("pButton", 2);
ButtonAction("maButton", 3);
ButtonAction("fButton", 4);
ButtonAction("cButton", 5);
ButtonAction("rButton", 6);
ButtonAction("oButton", 7);

function ButtonAction(whichOne, picNum) {
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
				document.body.style.backgroundImage = "url(" + backgroundPic[picNum] + ")";
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

