app.controller('PostsCtrl', ['Post', 'action', function (Post, action) {
  var ctrl = this;

  action('index', function(){
    ctrl.posts = Post.query();
  });

  action('show', function (params){
    ctrl.post = Post.get({id: params.id});
  });

  action('new', function(){
    ctrl.post = Post.new();
    ctrl.save = Post.create;
  });

  action('edit', function (params){
    ctrl.post = Post.edit({id: params.id});
    ctrl.save = Post.update;
  })

  action(['edit', 'new'], function(){
  })

  action(['index', 'edit', 'show'], function () {
    ctrl.destroy = function (post) {
      Post.destroy({id: post.id}, function () {
        ctrl.posts = _.select(ctrl.posts, function (_post) {
          return _post.id != post.id
        })
      })
    }
  })
}])
