'use strict'

let creatureImages = [];

function Creatures(image_url, title, description, keyword, horns){
  this.image_url=image_url;
  this.title=title;
  this.description=description;
  this.keyword=keyword;
  this.horns=horns;

  creatureImages.push(this);
}

Creatures.prototype.renderingWithJQuery = function(){
  let hornsTemplate = $('#horns-template').html();
  let hbHornsTemplate = Handlebars.compile(hornsTemplate);
  let html = hbHornsTemplate(this);
  $('#photo-template').append(html);

}

// RENDERING BY PAGE
function getPage(page){
  $.get(page).then(
    (data) => {
      data.forEach(creatureObjFromFile => {
        let creature = new Creatures( creatureObjFromFile.image_url,creatureObjFromFile.title, creatureObjFromFile.description, creatureObjFromFile.keyword, creatureObjFromFile.horns);
        creature.renderingWithJQuery();
      })
    }
  )
}

// CALLING RENDERING FUNCTION FOR PAGE 1
getPage('data/page-1.json');

// FILTER BY TYPE OF CREATURE
$(document).ready(function(){
  $('#but_read').click(function() {
    let $animal = $('#keyword-dropdown option:selected').text();
    $('div[class]').hide();
    $(`div[class="${$animal}"]`).show();
    console.log(`div[class="${$animal}"]`);
  });
});


// SWITCH PAGES
let actualPage = 'data/page-1.json';
$(document).ready(function(){
  $('#page_button').click(function(){
    $('div').hide();
    if(actualPage === 'data/page-1.json'){
      const divs = $('div[data-page="data/page-2.json"]');
      if(!divs.length){
        getPage('data/page-2.json');
      }
      divs.show();
      actualPage = 'data/page-2.json';
    } 
    else {
      const divs = $('div[data-page="data/page-1.json"]');
      if (!divs.length) {
        getPage('data/page-1.json');
      }
      divs.show();
      actualPage = 'data/page-1.json';
    }
  });
});


// HORN FILTER
$('#but_filter').on('click', function(){
  let $horns = $('#filter-dropdown option:selected').text();
  $('div[class]').hide();  
  if ($horns === 'horns') {
    
    console.log('creatureImages:', creatureImages)
    let sorted = creatureImages.sort(function(a,b) {
      if(a.horns > b.horns){
        return 1
      };
      if(b.horns > a.horns){
        return -1
      };
      return 0;
    });

    $('div[class]').remove();
    sorted.forEach(horns => horns.renderingWithJQuery());
    $(`div[class="${$animal}"]`).show();
  };
});