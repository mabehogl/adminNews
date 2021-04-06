
auth.onAuthStateChanged(function(user){
    if(user){
        var starCountRef = db.ref().child('articles/articles');
starCountRef.on('value', function(snapshot) {
  setupArticles(snapshot.val());
  setupUI(user)
  
})
}
    else{
        setupUI();
       setupArticles([]);
    }
})

var login = document.querySelector('#login');
login.addEventListener('submit', function(reload){
    reload.preventDefault()

const username = login['username'].value;
const password = login['pass'].value;

auth.signInWithEmailAndPassword(username, password)
.then(function(cred){
    console.log(cred.user)
})
.catch(function(err){
    console.log('Wrong user', err)
})
    const model = document.querySelector('#modal-login')
    M.Modal.getInstance(model).close();
    login.reset();
})

var signout = document.querySelector('#signOut');
signout.addEventListener('click', function(reload){
    reload.preventDefault()
    auth.signOut()
})