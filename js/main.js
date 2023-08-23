let user = [
    {
        id: "00001",
        login: "umid",
        password: "12345",
        userName: "umid"
    }
];

let payArray = [];

$("#editBtn").click(function (){
    let id = $(this).attr("id");
    payArray.forEach(function (item,i){
        if (id == item.id){
            payArray[i].payUser = $('#payEditUser').val();
            payArray[i].payUserId = $('#payEditUserId').val();
            payArray[i].payOrder = $('#payEditOrder').val();
            payArray[i].paySum = $('#payEditSum').val();
            payArray[i].payTarget = $('#payEditTarget').val();
            payArray[i].payType = $('#payEditType').val();
            payArray[i].payDate = $('#payEditDate').val();
        }
    });
    $("#editModal").modal("hide");
    draw();
});

function edit(id){
    payArray.forEach(function (item){
        if (id == item.id){
            $('#payEditUser').val(item.payUser);
            $('#payEditUserId').val(item.payUserId);
            $('#payEditOrder').val(item.payOrder);
            $('#payEditSum').val(item.paySum);
            $('#payEditTarget').val(item.payTarget);
            $('#payEditType').val(item.payType);
            $('#payEditDate').val(item.payDate);
            $('#editBtn').attr("id",item.id);
        }
    });
}

function remove(id){
    payArray.forEach(function (a,b){
        if (id == a.id){
            payArray.splice(b,1);
        }
    });
    draw();
}

function draw(){
    let list = '';
    payArray.forEach(function (item){
        list += '<tr>' +
            '<td>' +item.id+ '</td>' +
            '<td>'+ item.payUser +'</td>' +
            '<td>'+ item.paySum +'</td>' +
            '<td>'+ item.payOrder +'</td>' +
            '<td><span class="badge badge-success">'+ item.payTarget +'</span></td>' +
            '<td>'+ item.payDate +'</td>' +
            '<td>' +
            '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" onclick="edit('+item.id+')">Edit</button>' +
            '<button type="button" class="btn btn-danger" onclick="remove('+item.id+')">Remove</button>' +
            '</td>' +
            '</tr>'
    });
    $("#tbody").html(list);
}

$(document).ready(function (){
    let kirishSoni = 0;
    let payId = 0;
    let kassirId = '';
    $('#startModal').modal("show");
    $("#startBtn").click(function (){
        let login = $("#login").val();
        let password = $("#password").val();
        if (login !="" && password !=""){
            let topildi = false;
            user.forEach(function (item){
                if (login == item.login){
                    topildi = true;
                    if (password == item.password){
                        $("workingBlock").toggleClass("d-none");
                        $("#kassir").html(item.userName);
                        $("#startModal").modal("hide");
                        topildi = true;
                        kassirId = item.id;
                    }
                }
            });
            if (!topildi){
                if (kirishSoni > 2){
                    $('#startModal').modal("hide");
                    alert("Tizim bloklandi!")
                }
                alert("Login yoki parol xato!");
                kirishSoni++;
            }
        }else{
            alert("login va parol qatorlarini to'ldiring!");
        }
    })
    $("#addPay").click(function (){
        let payUser = $("#payUser").val();
        let payUserId = $("#payUserId").val();
        let payOrder = $("#payOrder").val();
        let paySum = $("#paySum").val();
        let payType = $("#payType").val();
        let payTarget = $("#payTarget").val();
        let payDate = $("#payDate").val();
        payId++;
        payArray.push(
            {
                id: payId,
                userId: kassirId,
                payUser: payUser,
                payUserId: payUserId,
                payOrder: payOrder,
                paySum: paySum,
                payType: payType,
                payTarget: payTarget,
                payDate: payDate,
            }
        );
        draw();
    });
});
$(document).ready(function (){
    $('.btn-success').click(function (){
        let login = $('#login').val();
        let password = $('#password').val();
        let num = false;

        if (login == ''){
            alert("Login qatorini to'ldiring!");
        }
        else if (password == ''){
            alert("Parol qatorini to'ldiring!")
        }
        else {
            if (user.length !=0){
                user.forEach(function (item){
                    if (login == item.login){
                        if (password == item.password){
                            num = true;
                            alert("Siz tizimga kirdsingiz!");
                        }
                        else{
                            alert("Parolingiz noto'g'ri!")
                        }
                    }
                })
            }
            else alert("Siz hali ro'yxatdan otmagansiz. Iltimos, ro'yxatdan o'ting!")
        }
    })
    $('.btn-link').click(function (){
        let login = $('#login').val();
        let password = $('#password').val();
        let num = false;

        if (login == ''){
            alert("Login qatorini to'ldiring!");
        }
        else if (password == ''){
            alert("Parol qatorini to'ldiring!")
        }
        else {
            if (user.length !=0){
                user.forEach(function (item){
                    if (login == item.login){
                        num = true
                    }
                });
                if (num){
                    alert("Bunday fotdalanuvchi mavjud!");
                }
                else{
                    alert("Siz ro'yxatdan o'tdingiz!");
                    user.push({login: login, password: password});
                }
            }
            else{
                user.push({login: login, password: password});
            }
        }
    })

    $('.btn-light').on("mousedown",function (){
        let attr = $('#password').attr("type");
        $('#password').attr("type","text");
        $(".fa").toggleClass('fa-eye fa-eye-slash');
        $("#password").css('border-color','red');
    })

    $('.btn-light').on("mouseup",function (){
        let attr = $('#password').attr("type");
        $('#password').attr("type","password");
        $(".fa").toggleClass('fa-eye fa-eye-slash');
        $("#password").css('border-color','blue');
    })
})
