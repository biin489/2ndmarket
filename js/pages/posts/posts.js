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
    var rootRef = firebase.database().ref().child('Posts');
    $('#dataTable').find('tbody').empty();
    rootRef.on("child_added", snap => {
        var arrayData = snap.val();
        data = JSON.stringify(arrayData);
        $('#table_body').append(`
            <tr>
                <td><img src="`+arrayData.post_image+`" style="display:block; width:50%; height:auto;"></td>
                <td style="vertical-align:middle">`+arrayData.post_maker+`</td>
                <td style="vertical-align:middle">`+arrayData.post_title+`</td>
                <td style="vertical-align:middle">`+arrayData.post_type+`</td>
                <td style="vertical-align:middle">`+arrayData.post_detail+`</td>
                <td style="vertical-align:middle">`+arrayData.post_price+`</td>
                <td style="vertical-align:middle">
                    <a href="#" class="btn btn-danger btn-circle remove" id="`+arrayData.post_id+`"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `)
    });
}
$(document).ready(function(){
    setData();

    $(document).on('click', '.remove', async function(e){
        await firebase.database().ref('Posts/' + $(this).attr('id')).remove()
            .catch(error => {
                if(error){
                    alert(error);
                }
            });
        await setData();
    })

    $(document).on('click', '#btnLogout', function(e){
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
        });
    })
})
