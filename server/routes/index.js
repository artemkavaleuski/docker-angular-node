const express = require('express');
const router = express.Router();

router.get('/', (_req, res, _next) => {
  res.send({
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum augue semper ligula maximus efficitur. Nulla et risus nec metus tincidunt porttitor vitae ut turpis. Curabitur auctor eleifend libero eget faucibus. Curabitur facilisis eros ut maximus vulputate. Ut vitae pretium lacus. In ultricies quis erat id pulvinar. Integer enim velit, feugiat quis dignissim ac, elementum sit amet diam. In iaculis mauris felis, sed ornare nulla egestas nec. Nunc feugiat sodales congue. Duis id venenatis diam, et tincidunt mauris. Vivamus pellentesque condimentum nibh non pretium. In sit amet nisl posuere, efficitur ex quis, faucibus est.'
  });
});

module.exports = router;
