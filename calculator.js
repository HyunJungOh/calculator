var $select;
var options = {
    none  : '-',
    tel   : '電話',
    email : 'メール',
    deal  : '成約'
};
var telOptions = {
    under10: 500,
    up10: 1000
};
var mailOptions = {
    new     : 10,
    format  : 250
};
var dealOptions = {
    each    : 20000
}
var price = [];
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
// $(document).on("click", ".delete-btn",function(){
//     var deleteId = $(this).data("row");
// console.log(deleteId);
//     if (price[deleteId-1]){

//     }
//     $(this).parents("div .item").remove();

// });


var nameIdCnt = 0;
var name;
var cnt;

//add select options
function makeSelect(){
    var $item   = $('<div>').addClass('item');
    var $col1 = $('<div>').addClass('col1');
    $select = $('<select>').addClass("category");

    $(".list").append($item);
    $item.append($col1);
    $col1.append($select);
    $.each(options, function(key, val){
        $option = $('<option>').val(key).text(val);
        $select.append($option);
    })
    
}

//add Radio options
$(document).on("change", ".category",function(){
    var selectedOption = $(this).val();
    var appendDiv = $(this).parent('div').parent('div');
    cnt       = $(".col1").length;

    if (selectedOption !== 'none' && selectedOption === 'tel'){
        name = 'length' + cnt; 
        makeElement(telOptions, appendDiv, name);
    } else if (selectedOption !== 'none' && selectedOption === 'email'){
        name = 'mail_kind' + cnt;
        makeElement(mailOptions,appendDiv, name);
        } else if (selectedOption !== 'none' && selectedOption === 'deal'){
        name = 'deal_num' + cnt; 
        makeElement('',appendDiv, 'num');
        //set the price at this stage only if "deal" is selected
        setPrice(cnt, 'each',  dealOptions);
        }
    })



function makeElement(optionObj, eventPlace, name){
    var cnt       = $(".col1").length;

    var $container= $('<div>').addClass('container');
    var $col2     = $('<div>').addClass('col2');
    var $col3     = $('<div>').addClass('col3');
    var $col4     = $('<div>').addClass('col4');
    var $col5     = $('<div>').addClass('col5');
    var $input    = $("<input type='text'>").addClass("num")
                    .attr("placeholder", "件数").data("id", cnt);
    var $netPrice = $("<span>").addClass("net-price").addClass("row"+cnt);
    var $buttons  = $("<span>").addClass("buttons");
    var $addBtn   = $("<button>").addClass("plus-btn"); 
    var $deleteBtn= $("<button>").addClass("delete-btn").data("row", cnt);
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
        $.each(optionObj, function(key){
            var msg;
            switch(key){
                case 'up10':
                    msg = '10分▲';
                    break;
                case 'under10':
                    msg = '10分▼';
                    break;
                case 'new':
                    msg = '新規';
                    break;
                case 'format':
                    msg = '既定';
                    break;
                default :
                    null;
                }
            
            var $label = $('<label>').text(msg).addClass('radio');
            $col2.appendTo($container);
            $label.appendTo($col2);
            $telOption = $('<input type="radio">')
                         .val(key)
                         .attr('name', name);
            $label.prepend($telOption);
        });
    }
    $col3.append($input).append('件');
    $col4.append($netPrice).append('円');
    $col5.append($btn);
    $container.append($col3).append($col4).append($col5);

}

//change text upon tel/mail options
$(document).on("click", ".radio input",function(){
    var radioVal = $(this).val();
    var rowNum   = $(this).attr("name").slice(-1);
    var targetPlaceholder = $(this).parents().next(".col3");
    var setOption;
    
    if (radioVal === 'under10' || radioVal === 'up10'){
        setOption = telOptions;
    } else if (radioVal === 'new' || radioVal === 'format'){
        setOption = mailOptions;
        // change the input text
        var placeholder = (radioVal === 'new') ? "文字数" : "件数" ;
        targetPlaceholder.children(".num").attr("placeholder", placeholder);
        if (radioVal === 'new'){
            targetPlaceholder.contents()[1].textContent = "字";
        } else{
            targetPlaceholder.contents()[1].textContent = "件";
        }
        }

    setPrice(rowNum, radioVal, setOption);
});

/* 
 * @function setPrice 
 *  show on net & total
 * e : event
 * option : string value
 * obj : obtion object
//  */
function setPrice(count, option, obj){

    var formulaObj
    $.each(obj, function(key, val){
        if (key === option){
        formulaObj = {
            id       : parseInt(count),
            unitPrice: parseInt(val),
            qty      : 1
            };
        }
    })
    //check if price is already set
    if (price[count-1]){
        price[count-1] = formulaObj;
    } else {
      price.push(formulaObj);
    }
}


$(document).on("keyup", ".num", function(){
    var targetId = $(this).data("id");
    var targetQty = parseInt($(this).val());
    price[targetId-1].id = targetId;
    price[targetId-1].qty = targetQty;
    //show net price
    showNetPrice();
})

function showNetPrice(){
    price.map(function(val){
        var net = val.unitPrice * val.qty;
        val.netPrice = net;
        $(".row"+val.id).html(val.netPrice);
    });
    totalPrice = price.reduce(function(prev, cur){
        return prev + cur.netPrice;

    },0);
    $(".total > h1").text(totalPrice + "　円");
}


//to do
// style for net price span
// delete button 
// detect length and reuse start button
// error message 
