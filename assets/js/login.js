$(function(){
    $('.link_log').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()
    })
    $('.link_reg').on('click',function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })
     

    var form=layui.form
    var layer=layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            //console.log(value);
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post(
            '/api/reguser',
            {
                username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
            },
            function(res){
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
            })
    })

    $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
        url:'/api/login',
        method:'post',
        data:$(this).serialize(),
        success:function(res){
           //console.log(res);
            if (res.status !==0){
                return layer.msg('登录失败')
            }
            layer.msg('登录成功')
            //console.log(res.token);
            localStorage.setItem('token',res.token)
            location.href='/index.html'
        }
    })







    })







}) 
