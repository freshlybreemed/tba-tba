import Helmet from 'react-helmet';
import Page from '../../hocs/defaultPage';
// import Create from '../containers/Create';

export default Page(props => {
  console.log(props);
  const { event } = props;
  return (
    <div>
      <Helmet>
        <title>Create Event</title>
        <link
          href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
          rel="stylesheet"
        />
      </Helmet>
      <main>
        <article class="bg-white">
          <div
            class="vh-75 cover bg-center"
            style={{
              backgroundImage: `url(${event.image})`,
            }}
          ></div>
          <div class="ph4 ph5-m ph6-l">
            <div class="measure f3 center mb5 black-70">
              {/* <h1 class="fw6 f3 avenir">{event.title}</h1> */}
              <p
                class="lh-copy measure f4 f3-ns black-70 baskerville"
                dangerouslySetInnerHTML={{ __html: event.description }}
              ></p>
              {/* <p class="lh-copy measure f4 f3-ns black-70 baskerville">
                The memories came to him, how he felt then. "It was very pure,
                if I can say it right," he'd explain later. "It was pure in 1984
                … I was still dreaming." During the Olympics, he was deep in
                negotiations with Nike for his first shoe contract. He traded
                pins with other athletes. Eight years later, when he was the
                most famous person in the world and the Dream Team was forced to
                stay outside the Olympic Village, he'd be disappointed when that
                separation kept him from swapping pins again.
              </p> */}
            </div>
            <img src="http://mrmrs.github.io/photos/005.jpg" class="db w-100" />
            <blockquote class="mh0 pr0 mt5">
              <p class="f2 f1-l fw1 mv0 tc lh-title baskerville">
                “I remember going up to that McDonald's and getting my damn
                McRib. When I first got there.”
              </p>
              <p class="tc f6 gray">Michael Jordan</p>
            </blockquote>
            <div class="measure f4 f3-ns center mv5 black-70">
              <p class="lh-copy measure f3 black-70 baskerville">
                There's an unspoken shadow over the stories about that town
                house on Essex Drive. James Jordan remodeled the basement for
                his son. Did all the work himself, because he'd never let
                Michael pay for something he could do on his own. The first
                winter, while Michael was out of town for the All-Star Game, his
                pipes froze. His dad ripped out the walls, replacing the pipes
                himself, patching and repainting when he finished. He spent two
                weeks fixing his son's home. James and Mike -- that's where all
                this nostalgia has been headed, from the moment it began.
              </p>
              <div class="aspect-ratio aspect-ratio--16x9 mv5">
                <iframe
                  src="https://www.youtube.com/embed/LAr6oAKieHk"
                  class="aspect-ratio--object"
                  frameborder="0"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </article>
        <section class="cf mt5 pv5 bt b--black-05 ph6-l">
          <h1 class="tc f5 ttu fw6 tracked mb4 avenir">Other Projects</h1>
          <a
            href="#0"
            class="fl w-third w-25-ns border-box overflow-hidden ba bw2 white"
            title=""
          >
            <div
              class="grow cover bg-center pv5 pv6-l"
              style={{
                backgroundImage:
                  'url(https://s3-us-west-2.amazonaws.com/prnt/hw-080411-cargo_960.jpg)',
              }}
            ></div>
          </a>
          <a
            href="#0"
            class="fl w-third w-25-ns border-box overflow-hidden  ba bw2 white"
            title=""
          >
            <div
              class="grow cover bg-top pv5 pv6-l"
              style={{
                backgroundImage:
                  'url(https://s3-us-west-2.amazonaws.com/prnt/hwspringtour-cargo_960-1.jpg)',
              }}
            ></div>
          </a>
          <a
            href="#0"
            class="fl w-third w-25-ns border-box overflow-hidden ba bw2 white"
            title=""
          >
            <div
              class="grow cover bg-top pv5 pv6-l"
              style={{
                backgroundImage:
                  'url(https://s3-us-west-2.amazonaws.com/prnt/cc010611.s_960.jpg)',
              }}
            ></div>
          </a>
          <a
            href="#0"
            class="fl w-100 w-25-ns border-box overflow-hidden ba bw2 white"
            title=""
          >
            <div
              class="grow cover bg-top pv5 pv6-l"
              style={{
                backgroundImage:
                  'url(https://s3-us-west-2.amazonaws.com/prnt/adam-stern-031209_960-2.jpg)',
              }}
            ></div>
          </a>
          <a
            href="#0"
            class="fl w-50 border-box overflow-hidden ba bw2 white"
            title=""
          >
            <div
              class="grow cover bg-center pv5 pv7-l"
              style={{
                backgroundImage:
                  'url(https://s3-us-west-2.amazonaws.com/prnt/zh170311.4.cargo_960.jpg)',
              }}
            ></div>
          </a>
          <a
            href="#0"
            class="fl w-50 border-box overflow-hidden ba bw2 white"
            title=""
          >
            <div
              class="grow cover bg-center pv5 pv7-l"
              style={{
                backgroundImage:
                  'url(https://s3-us-west-2.amazonaws.com/prnt/hw090911_960.jpg)',
              }}
            ></div>
          </a>
        </section>
      </main>
      yooo
    </div>
  );
});
