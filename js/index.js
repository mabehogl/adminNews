var articles = document.querySelector('.articles');
var publish = document.querySelector('#create-form');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
var filename;
var file = document.getElementById('filename')
const setupUI = (user) => {
  if (user) {
    var acc = document.querySelector('.account-details')
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    const html = `<div>Logged in as ${user.email}</div>`;
    console.log(user.email)
acc.innerHTML = html;
  } else {
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

var setupArticles = function(data){
    var d = document.getElementById('login');
    if(data.length){
    var dom ="";
    var i = 0;
    var keys = Object.keys(data)
    for(i=0; i< keys.length; i++){
        var k = keys[i]
        var image = data[k].urlToImage 
        var li = `<li class="flex-item"><h5>${data[k].title}</h5><img src="${image}"></li>`;
        
        dom+= li
    }
  articles.innerHTML = dom;  
}   else{
    articles.innerHTML = '<div class="h3 ma"> Welcome to the admin page Login</div>'
}

publish.addEventListener('submit', function(e){
  e.preventDefault();
  var key = [i].toString()
  
  var me = "";
  if(file){
    me = file.on('change', function(event){
    filename = event.target.files[0];
  var storageRef = firebase.storage().ref('/Image/' + file.name);
  var uploadTask = storageRef.put(filename)
  uploadTask.on('state_changed', function(snapshot){
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED:
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: 
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    console.log('error loading file')
  }, function() {
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
    });
  })
  })
  } 
  db.ref('articles').child('articles').child(key).update({
     author: publish['author'].value,
     content: publish['content'].value,
     publishedAt: publish['publishedAt'].value,
      title: publish['title'].value,
      
  }).then(function(){
    console.log('Successfully written to Database')
})
.catch(function(err){
    console.log('Error', err)
})
const modal = document.querySelector('#modal-create')
M.Modal.getInstance(modal).close();
publish.reset();
})
}

document.addEventListener('DOMContentLoaded', function(){
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    var items = document.querySelectorAll('collapsible');
    M.Collapsible.init(items);
  
})

