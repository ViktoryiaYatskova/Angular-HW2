var POSTS_FILE_ADDR = 'posts.json';


function getJsonData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4) {
            if (this.status === 200) {
                callback(JSON.parse(this.responseText));
            }
            //else network error
        }
    };
    xhr.send(null);
}

function MainCtrl($scope, $rootScope){
    getJsonData(POSTS_FILE_ADDR, function(res){
        if( res instanceof Object && res.hasOwnProperty('posts')){
            $rootScope.posts  = res.posts;
        }
    });
}
function NewPostCtrl($scope, $rootScope){
    $scope.submit = function(){
        this.post.date = new Date();
        $rootScope.posts.push(this.post);
        this.post = {};
        this.postForm.$setPristine();
        angular.element('#modal').modal('hide');
    };
    $scope.showNewPostForm = function(){
        angular.element('#modal').modal('show');
    }
}
