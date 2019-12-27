'use strict'

function Creatures(image_url, title, description, keyword, horns){
  this.image_url=image_url;
  this.title=title;
  this.description=description;
  this.keyword=keyword;
  this.horns=horns;
}

// Creatures.prototype.renderingWithJQuery = function(){
//   $('#photo-template').append(`
//     <div class="${this.keyword}">
//       <h2>${this.title}</h2>
//       <img src="${this.image_url}"></img>
//       <p>${this.description}</p>
//     </div>`
//   )
// }

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

// DROPDOWN SELECTION
// $(document).ready(function(){
//   // $("#keyword-dropdown").select2();
//   $('#but_read').click(function() {
//     let $animal = $('#keyword-dropdown option:selected').text();

//     $('#result').html('animal: ' + $animal)
//     // $('div').each(function(value){

//     // })
//     $('div').hide();
//     // $('div class=this.keyword').show();
//     $(`div[class="${$animal}"]`).show();
//     console.log(`div[class="${$animal}"]`);
//     if ($(this).keyword !== animal)
//       console.log('animal:', animal)
//       $(this).hide();

//     if ($(this).keyword === animal)
//       $(this).show();
//   });
// });

// // SWITCH PAGE ON PAGE 2
// // $(document).ready(function(){
// //   $('#page_button').click(function() {
// //     $('div').hide();
// //     $.get('data/page-1.json').then(
// //       (data) => {
// //         data.forEach(creatureObjFromFile => {
// //           let creature = new Creatures( creatureObjFromFile.image_url,creatureObjFromFile.title, creatureObjFromFile.description, creatureObjFromFile.keyword, creatureObjFromFile.horns);
// //           creature.renderingWithJQuery();
// //         })
// //       }
// //     )
// //   });
// // });


