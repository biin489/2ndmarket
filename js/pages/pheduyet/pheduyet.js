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

function setData(){
    var rootRef = firebase.database().ref().child('PendingPosts');
    $('#dataTable').find('tbody').empty();
    rootRef.on("child_added", async snap => {
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
                    <a href="#" class="btn btn-success btn-circle approve" id="`+postId+`" data='`+data+`'><i class="fas fa-check"></i></a>
                    <a href="#" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `)
    });
}
$(document).ready(function(){
    setData();

    $(document).on('click', '.approve', function(e){
        value = JSON.parse($(this).attr('data'))
        firebase.database().ref('Posts/' + value.post_id).set(value);
        firebase.database().ref('PendingPosts/' + value.post_id).remove();
        setData();
    })
})
