
var model = {
	currentCat : null,
	cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'images/cat1.jpg',
            title : 'Newborn',
            nicknames : ['TabTab','T-Bone','Tabitha Tab Tabby Catty Cat']
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'images/cat4.jpg',
            title : 'Newborn',
            nicknames : ['Tigger','Meow','Mr. T']
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'images/cat2.jpg',
            title : 'Newborn',
            nicknames : ['Casper','Scarce']
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'images/cat3.jpg',
            title : 'Newborn',
            nicknames : ['Ghost','Dead','Claws']
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'images/cat5.jpg',
            title : 'Newborn',
            nicknames : ['Zzzzz','Wake Up','Drowsy']
        }
    ]
};

var octopus = {

    init: function() {
        if (localStorage.cats && localStorage.cats.length >0 ) {
            model.cats = JSON.parse(localStorage.cats);
        }
        else localStorage.cats = JSON.stringify(model.cats);
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
		adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    incrementCounter: function() {
        model.currentCat.clickCount++;
        var clicks = model.currentCat.clickCount;
        if(clicks<10)
                model.currentCat.title =  'Newborn';
            else if(clicks < 50)
                model.currentCat.title = 'Infant';
            else if(clicks < 100)
                model.currentCat.title = 'Child';
            else if(clicks < 200)
                model.currentCat.title = 'Teen';
            else if(clicks < 500)
                model.currentCat.title = 'Adult';
            else model.currentCat.title = 'Ninja';

        localStorage.cats = JSON.stringify(model.cats);    
        catView.render();
    },

    resetCounter : function(){
        model.currentCat.clickCount = 0;
        model.currentCat.title = 'Newborn';
        localStorage.cats = JSON.stringify(model.cats);
        catListView.render();
        catView.render();
    },
	
	addNewCat: function(nameX, imgSrcX, nicknamesX){
		var newCat = {
            clickCount : 0,
            name : nameX,
            imgSrc : imgSrcX,
            title : 'Newborn',
            nicknames : nicknamesX
        };
		model.cats.push(newCat);
        localStorage.cats = JSON.stringify(model.cats);
		catListView.render();

	}
};

var catView = {

    init: function() {
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catTitleElem = document.getElementById('cat-title');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
        this.catNicknamesElem = document.getElementById('cat-nicknames');
        this.resetCounterElem = document.getElementById('resetCounter');
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
            catListView.render();
        });

        this.resetCounterElem.addEventListener('click', function(){
            octopus.resetCounter();
        });
        this.render();
    },

    render: function() {
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catTitleElem.textContent = currentCat.title;
        this.catImageElem.src = currentCat.imgSrc;
        this.catNicknamesElem.innerHTML = '';
        if(currentCat.nicknames.length > 0){
            for (i = 0; i < currentCat.nicknames.length; i++) {
                elem = document.createElement('li');
                elem.textContent = currentCat.nicknames[i];
                this.catNicknamesElem.appendChild(elem);
            }
        }
    }
};

var catListView = {

    init: function() {
        this.catListElem = document.getElementById('cat-list');
        this.render();
    },

    render: function() {
        var cat, elem, i,a;
        var cats = octopus.getCats();

        this.catListElem.innerHTML = '';

        for (i = 0; i < cats.length; i++) {
            cat = cats[i];

            elem = document.createElement('li');
            //a = document.createElement('a');
            //a.textContent = cat.name;
            elem.textContent = cat.name;
            elem.setAttribute('class','list-group-item');
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));
            

            var span = document.createElement('span');
            span.textContent = cat.clickCount;
            span.setAttribute('class','badge');
            //a.appendChild(span);
            elem.appendChild(span);
            this.catListElem.appendChild(elem);
        }
    }
};

var adminView = {
	init : function(){
		document.getElementById('showAdminPanel').addEventListener('click', function(){
			document.getElementById('newCatDetails').style.visibility='visible';
		});
		document.getElementById('saveCat').addEventListener('click', function(){
			var name = document.getElementById('newCatName').value;
			var imgSrc = document.getElementById('newCatImgSrc').value;
            var nicknameStr = document.getElementById('newCatNicknames').value;
			if(name!=="" || imgSrc!== ""){
                if(nicknameStr===""||nicknameStr===null)
				    octopus.addNewCat(name,imgSrc,[]);
                else 
                    octopus.addNewCat(name,imgSrc,nicknameStr.split(','));
			}
			adminView.render();

		});
		document.getElementById('cancelCat').addEventListener('click', function(){
			adminView.render();
        });
	},
    render : function(){
        document.getElementById('newCatImgSrc').value = "";
        document.getElementById('newCatName').value = "";
        document.getElementById('newCatNicknames').value = "";
        document.getElementById('newCatDetails').style.visibility='hidden';
    }
};

octopus.init();