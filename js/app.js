'use strict'

function Creatures(image_url, title, description, keyword, horns){
  this.image_url=image_url;
  this.title=title;
  this.description=description;
  this.keyword=keyword;
  this.horns=horns;
}

Creatures.prototype.renderingWithJQuery = function(){
  $('#photo-template').append(`
    <div class="${this.keyword}">
      <h2>${this.title}</h2>
      <img src="${this.image_url}"></img>
      <p>${this.description}</p>
    </div>`
  )
}

Creatures.prototype.renderingWithHandlebars = function(){

  let hornsTemplate = $('#horns-template').html();

  let hbHornsTemplate = Handlebars.compile(hornsTemplate);

  let html = hbHornsTemplate(this);
  console.log('Creatures Object', this);

  $('#photo-template').append(html);
}

// $.get('../data/page-1.json').then(
$.get('data/page-1.json').then(
  (data) => {
    data.forEach(creatureObjFromFile => {
      let creature = new Creatures( creatureObjFromFile.image_url,creatureObjFromFile.title, creatureObjFromFile.description, creatureObjFromFile.keyword, creatureObjFromFile.horns);
      // creature.renderingWithJQuery();
      creature.renderingWithHandlebars();
    })
  }
)

$(document).ready(function(){
  $('#but_read').click(function() {
    let $animal = $('#keyword-dropdown option:selected').text();

    $('#result').html('animal: ' + $animal)

    $('div').hide();
    $(`div[class="${$animal}"]`).show();
    console.log(`div[class="${$animal}"]`);
  });
});


// PAGE 2 EVENT LISTENER

$(document).ready(function(){
  $('#page_button').click(function() {
    $('div').hide();
    $.get('../data/page-2.json').then(
      (data) => {
        data.forEach(creatureObjFromFile => {
          let creature = new Creatures( creatureObjFromFile.image_url,creatureObjFromFile.title, creatureObjFromFile.description, creatureObjFromFile.keyword, creatureObjFromFile.horns);
          creature.renderingWithJQuery();
        })
      }
    )
  });
});

// SORT BY HORN 
// $(document).ready(function(){
//   $('#but_filter').click(function() {
//     let $animal = $('#keyword-dropdown option:selected').text();

//     $('#result').html('animal: ' + $animal)

//     $('div').hide();
//     $(`div[class="${$animal}"]`).show();
//     console.log(`div[class="${$animal}"]`);
//   });
// });
// this is a test