import * as PIXI from 'pixi.js';
import dat from 'dat.gui';

      const app = new PIXI.Application(1066, 600);
      document.body.appendChild(app.view);
      const gui = new dat.GUI();
      // Create background image
      const background = PIXI.Sprite.from("img/bg.jpg");
      background.width = 1066;
      background.height = 600;
      app.stage.addChild(background);
      // Stop application wait for load to finish
      app.stop();
      PIXI.Loader.shared.add('shader', 'shader.frag').load(onLoaded);
      let filter;
      // Handle the load completed
      const uniforms = {time: 0, kofos: 0.0900}
      function onLoaded(loader, res)
      {
        console.log(res);
        // Create the new filter, arguments: (vertexShader, framentSource)
        filter = new PIXI.Filter(null, res.shader.data, uniforms);
        // Add the filter
        background.filters = [filter];
        gui.add(uniforms, 'time', 0, 2);
        gui.add(uniforms, 'kofos', 0, 23)
        // // Resume application update
        app.start();
      }
      // Animate the filter
      app.ticker.add(function(delta)
      {
        // filter.uniforms.time += 0.004 * delta;
      });
