var firebaseConfig = {
    apiKey: "AIzaSyBfgBCcHaoo5kjt2Myvu8E9vArQ7gs-SKg",
    authDomain: "demodoan1.firebaseapp.com",
    databaseURL: "https://demodoan1.firebaseio.com",
    projectId: "demodoan1",
    storageBucket: "demodoan1.appspot.com",
    messagingSenderId: "585840118644",
    appId: "1:585840118644:web:fe4063bcae520273"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(!firebaseUser){
        window.location.href = "login.html"
    }
})

function setData(){
    var rootRef = firebase.database().ref().child('User');
    $('#dataTable').find('tbody').empty();
    rootRef.on("child_added", snap => {
        var arrayData = snap.val();
        var data = JSON.stringify(arrayData);

        var permission = "Bị chặn";
        var btnClass = "fas fa-check";
        if(arrayData.user_rule == 1){
            permission = "Quyền đầy đủ";
            btnClass = "fas fa-times";
        }

        $('#table_body').append(`
            <tr>
                <td><img src="`+arrayData.user_avatar+`" style="display:block; width:50%; height:auto;"></td>
                <td style="vertical-align:middle">`+arrayData.user_fullname+`</td>
                <td style="vertical-align:middle">`+arrayData.user_name+`</td>
                <td style="vertical-align:middle">`+arrayData.user_email+`</td>
                <td style="vertical-align:middle">`+arrayData.user_gender+`</td>
                <td style="vertical-align:middle">`+arrayData.user_age+`</td>
                <td style="vertical-align:middle">`+arrayData.user_phone+`</td>
                <td style="vertical-align:middle">`+permission+`</td>
                <td style="vertical-align:middle">
                    <a href="#" class="btn btn-success btn-circle approve" data='`+data+`'><i class="`+btnClass+`"></i></a>
                    <a href="#" class="btn btn-danger btn-circle remove" id="`+arrayData.user_id+`"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `)
    });
}
$(document).ready(function(){
    setData();

    $(document).on('click', '.approve', async function(e){
        value = JSON.parse($(this).attr('data'));
        rule = 0;
        if(value.user_rule == 0){
            rule = 1;
        } 

        updates = {};
        updates['/User/' + value.user_id + '/user_rule'] = rule;

        await firebase.database().ref().update(updates)
            .catch(error => {
                if(error){
                    alert(error);
                }
            });
        await setData();
    })

    $(document).on('click', '.remove', async function(e){
        await firebase.database().ref('User/' + $(this).attr('id')).remove()
            .catch(error => {
                if(error){
                    alert(error);
                }
            });
        await setData();
    });

    $(document).on('click', '#btnLogout', function(e){
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
        });
    })
})
