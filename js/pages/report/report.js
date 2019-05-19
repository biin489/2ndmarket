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
    var rootRef = firebase.database().ref().child('Reports');
    var user = firebase.database().ref().child('User');
    $('#dataTable').find('tbody').empty();
    rootRef.on("child_added", async snap => {
        var arrayData = await snap.val();

        user_report_id = await user.child(snap.val().rp_user_report_id).once('value', snap => snap.val())
                        .then(value => {
                            return value.val().user_fullname!=null?value.val().user_fullname:'';
                        })//Người report
        
        user_id = await user.child(snap.val().rp_user_id).once('value', snap => snap.val())
                        .then(value => {
                            return value.val().user_fullname!=null?value.val().user_fullname:'';
                        })//Người bị report

        var data = JSON.stringify(arrayData);

        var btnClass = "fas fa-check";
        if(arrayData.user_rule == 1){
            btnClass = "fas fa-times";
        }

        if(arrayData.rp_status == 1){
            await $('#table_body').append(`
                <tr>
                    <td style="vertical-align:middle">`+user_report_id+`</td>
                    <td style="vertical-align:middle">`+user_id+`</td>
                    <td style="vertical-align:middle">`+arrayData.rp_content+`</td>
                    <td><img src="`+arrayData.rp_image+`" style="display:block; width:50%; height:auto;"></td>
                    <td style="vertical-align:middle">
                        <a href="#" class="btn btn-success btn-circle approve" data='`+data+`'><i class="`+btnClass+`"></i></a>
                        <a href="#" class="btn btn-danger btn-circle remove" id="`+arrayData.rp_id+`"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
            `)
        }
    });
}
$(document).ready(function(){
    setData();

    $(document).on('click', '.approve', async function(e){
        value = JSON.parse($(this).attr('data'));

        updates = {};
        updates['/User/' + value.rp_user_id + '/user_rule'] = 0;
        updates['/Reports/' + value.rp_id + '/rp_status'] = 0;

        await firebase.database().ref().update(updates)
            .catch(error => {
                if(error){
                    alert(error);
                }
            });
        await setData();
    })

    $(document).on('click', '.remove', async function(e){
        await firebase.database().ref('Reports/' + $(this).attr('id')).remove()
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
