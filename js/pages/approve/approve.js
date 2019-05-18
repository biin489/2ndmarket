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
    var rootRef = firebase.database().ref().child('PendingPosts');
    $('#dataTable').find('tbody').empty();
    rootRef.on("child_added", snap => {
        var postDetail = snap.child("post_detail").val();
        var postId = snap.child("post_id").val();
        var postImage = snap.child("post_image").val();
        var postMaker = snap.child("post_maker").val();
        var postPrice = snap.child("post_price").val();
        var postTitle = snap.child("post_title").val();
        var postType = snap.child("post_type").val();
        var arrayData = snap.val();
        data = JSON.stringify(arrayData);
        $('#userTableBody').append(`
            <tr>
                <td><img src="`+postImage+`" style="display:block; width:50%; height:auto;"></td>
                <td style="vertical-align:middle">`+postMaker+`</td>
                <td style="vertical-align:middle">`+postTitle+`</td>
                <td style="vertical-align:middle">`+postType+`</td>
                <td style="vertical-align:middle">`+postDetail+`</td>
                <td style="vertical-align:middle">`+postPrice+`</td>
                <td style="vertical-align:middle">
                    <a href="#" class="btn btn-success btn-circle approve"  data='`+data+`'><i class="fas fa-check"></i></a>
                    <a href="#" class="btn btn-danger btn-circle remove" id="`+postId+`"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `)
    });
}
$(document).ready(function(){
    setData();

    $(document).on('click', '.approve', async function(e){
        value = JSON.parse($(this).attr('data'))
        
        error = false;
        await firebase.database().ref('Posts/' + value.post_id).set(value)
            .catch(error => {
                if(error){
                    alert(error);
                }
            });
        await firebase.database().ref('PendingPosts/' + value.post_id).remove()
            .catch(error => {});

        await setData();
    })

    $(document).on('click', '.remove', async function(e){
        await firebase.database().ref('PendingPosts/' + $(this).attr('id')).remove()
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
