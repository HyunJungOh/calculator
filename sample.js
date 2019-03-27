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
var totalPrice = 0;
//add first list item
$("#btn").on("click", function(){
    makeSelect();
    });
// add second item
$(document).on("click", ".plus_btn",function(){
    makeSelect();
    });
// delete list item
$(document).on("click", ".delete_btn",function(){
    console.log("a");
    $(this).parents("div .item").empty();
    });


//add Radio options
$(document).on("change", ".category",function(){
    var selectedOption = $(this).val();
    var appendDiv = $(this).parent('div');
    if (selectedOption !== 'none' && selectedOption === 'tel'){
        makeElement(telOptions, appendDiv);
    } else if (selectedOption !== 'none' && selectedOption === 'email'){
        makeElement(mailOptions,appendDiv);
        } else if (selectedOption !== 'none' && selectedOption === 'deal'){
        console.log('deal');
    }
})

function makeSelect(){
    var $item   = $('<div>').addClass('item')
    $select = $('<select>')
    .addClass("category")

    $(".list").append($item)
    $item.append($select);
    $.each(options, function(key, val){
        $option = $('<option>').val(key).text(val)
        $select.append($option)
    })
}
function makeElement(optionObj, eventPlace){
    var $input    = $("<input type='text'>").addClass("num").attr('placeholder','件数');
    var $netPrice = $("<span>").addClass("net_price");
    var $buttons  = $("<span>").addClass("buttons");
    var $addBtn   = $("<button>").addClass("plus_btn"); 
    var $deleteBtn= $("<button>").addClass("delete_btn");
    var $btn      = $buttons.append($addBtn).append($deleteBtn);
    $.each(optionObj, function(key, val){
        var $label = $('<label>').text(val);
        $label.appendTo(eventPlace);
        $telOption = $('<input type="radio">').val(key).attr('name', 'length')
        $label.prepend($telOption)
    });
    
    eventPlace.append($input).append('件')
              .append($netPrice).append('円')
              .append($btn);
}

/*phone call radio change 
 * 10 or less 500 yen (set)
 * 
 * 10 or more 1000 yen (set)
 */

/* phone call times
 * set * times 
 *  show on net & total
 */ 