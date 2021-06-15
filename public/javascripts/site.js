$(function() {
    var userObject={
        isUserLoggedIn:function(){
            if(window.localStorage.getItem('user')==null)
                return false;
            return true;
        },
        saveUser:function(data){
            console.log(data);
            window.localStorage.setItem('user',JSON.stringify(data));
        },
        getUser:function(){
            return window.localStorage.getItem('user');
        },
        removeUser:function(){
            window.localStorage.removeItem('user');
        },
        getUserName : function(){
            var curUserString = this.getUser();
            if(curUserString){
                var json = JSON.parse(curUserString);
                if(json && json.user.username)
                    return json.user.username;
                return "";
            }
            return "";
        },
        getRole : function(){
            var curUserString = this.getUser();
            if(curUserString){
                var json = JSON.parse(curUserString);
                console.log(json);
                if(json && json.user.role)
                    return json.user.role;
                return "";
            }
            return "";
        }
    }
    console.log("Hello from js");
    
    $("#signinbtn").click(function(){
        var usermod={username:'',password:''};
        usermod.username=$("#inname").val();
        usermod.password=$("#inpass").val();
        console.log(usermod);
        $.post("/api/login",usermod)
        .done(function(data){
            console.log(JSON.stringify(data));
            if(data.success==true)
            {
                toastr.success(data.message);
                $(".not_logged").hide();
                $(".logged").show();
                userObject.saveUser(data);
                $("#welcome").html('Welcome  '+userObject.getUserName());
                $("#para1").html('You are '+userObject.getRole());
                
            }
            else{
                toastr.warning(data.message);
            }
        })
    })

    $("#signout").click(function(){
        userObject.removeUser();
        onSignIn(false);
        $.get('/api/logout');
    })

    $("#signupsubmit").click(function(){
        //console.log("Hehe")
        var usermod={username:'',email:'',password:''};
        usermod.username=$("#Username").val();
        usermod.email=$("#Email").val();
        usermod.password=$("#Password").val();
        console.log(usermod);
        $.post("/api/signup",usermod)
        .done(function(data){
            console.log(JSON.stringify(data));
            if(data.success==true){
                toastr.success(data.message)
                $("#signup_form").css('display', 'none');
            }
            else
                toastr.warning(data.message);
        })
        $("#signup_form").css('display', 'none');
    })

    function onSignIn(loggedin){
        if(loggedin==false)
        {
            console.log('NOt logged in')
            $(".logged").hide();
            $(".not_logged").show();
            $("#para1").html('');
            $("#signupbtn").click(function(){
                $("#signup_form").css('display', 'block');
            })
        }
        else{
            console.log(' logged in')
            $(".logged").show();
            $("#signup_form").hide();
            $(".not_logged").hide();
            $("#welcome").html('Welcome  '+userObject.getUserName());
            $("#para1").html('You are '+userObject.getRole());
        }
    }

    if(userObject.isUserLoggedIn()){
        onSignIn(true);
    }
    else{
        onSignIn(false);
    }
 });