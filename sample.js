var $select;
var options = {
    none  : '-',
    tel   : '電話',
    email : 'メール',
    deal  : '成約'
};
var telOptions = {
    under10 : '10分▼',
    up10    : '10分▲'
};
var mailOptions = {
    new     : '新規',
    format  : '既定'
};

var Price =[

{
    unitPrice :'0',
    qty:'1',
//    netPrice: unitPrice * qty,
},
];

var totalPrice = 0;
//add first list item
$("#btn").on("click", function(){
    $(this).attr("disabled", true);
    makeSelect();
    });
// add second item
$(document).on("click", ".plus-btn",function(){
    makeSelect();
    });
// delete list item
$(document).on("click", ".delete-btn",function(){
    $(this).parents("div .item").remove();
    });


//add Radio options
$(document).on("change", ".category",function(){
    var selectedOption = $(this).val();
    var appendDiv = $(this).parent('div').parent('div');
//console.log(this);
    if (selectedOption !== 'none' && selectedOption === 'tel'){
        makeElement(telOptions, appendDiv, 'length');
    } else if (selectedOption !== 'none' && selectedOption === 'email'){
        makeElement(mailOptions,appendDiv, 'mail_kind');
        } else if (selectedOption !== 'none' && selectedOption === 'deal'){
        makeElement('',appendDiv, 'num');
        }
})

function makeSelect(){
    var $item   = $('<div>').addClass('item')
    var $col1 = $('<div>').addClass('col1');
    $select = $('<select>').addClass("category")

    $(".list").append($item);
    $item.append($col1);
    $col1.append($select);
    $.each(options, function(key, val){
        $option = $('<option>').val(key).text(val)
        $select.append($option)
    })
}

function makeElement(optionObj, eventPlace, name){
    var $container= $('<div>').addClass('container');
    var $col2     = $('<div>').addClass('col2');
    var $col3     = $('<div>').addClass('col3');
    var $col4     = $('<div>').addClass('col4');
    var $col5     = $('<div>').addClass('col5');

    var $input    = $("<input type='text'>").addClass("num").attr('placeholder','件数');
    var $netPrice = $("<span>").addClass("net-price");
    var $buttons  = $("<span>").addClass("buttons");
    var $addBtn   = $("<button>").addClass("plus-btn"); 
    var $deleteBtn= $("<button>").addClass("delete-btn");
    var $btn      = $buttons.append($addBtn).append($deleteBtn);

    if (eventPlace.find('input[type=text]').attr('class')){
        eventPlace.find('.container').remove();
    } 
    
    $container.appendTo(eventPlace);
    $col2.appendTo($container);
    $col3.appendTo($container);
    $col4.appendTo($container);
    $col5.appendTo($container);

    if (optionObj){
        $.each(optionObj, function(key, val){
        var $label = $('<label>').text(val);
        $col2.appendTo($container);
        $label.appendTo($col2);
        $telOption = $('<input type="radio">').val(key).attr('name', name)
        $label.prepend($telOption)
        });
    }
    $col3.append($input).append('件');
    $col4.append($netPrice).append('円');
    $col5.append($btn);
    $container.append($col3).append($col4).append($col5);
            }

/*phone call radio change 
 * 10 or less 500 yen (set)
 * 
 * 10 or more 1000 yen (set)
 */
// $(document).on("change", "input[type=radio][name=length]", function(){
//     console.log("moved");
// })

$("input[type=radio][name=length]").on("change", function(){
    console.log("moved");
})

/* phone call times
 * set * times 
 *  show on net & total
//  */ 
